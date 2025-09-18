import { simpleGameInfo } from "../dto/gom.interface";

export class GomService{
  public recentGameService = async (nickname: string): Promise<simpleGameInfo> => {
    const apiResponse = await fetch(`${process.env.ER_API_ENDPOINT}v1/user/nickname?query=${nickname}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": `${process.env.ER_API_KEY}`
      }
    });

    if (!apiResponse.ok) {
      const errorData = await apiResponse.json();
      throw new Error('API 요청 실패');
    }

    const userNumJSON = await apiResponse.json();
    const userNum: number = userNumJSON.user.userNum;
    //console.log(userNum);

    const gamesResponse = await fetch(`${process.env.ER_API_ENDPOINT}v1/user/games/${userNum}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": `${process.env.ER_API_KEY}`
      }
    });

    const resultJSON = await gamesResponse.json();

    const mostRecentGame = resultJSON.userGames[0];
    const mostRecentGameInfo: simpleGameInfo = {
      startDtm: mostRecentGame.startDtm,
      mmrBefore: mostRecentGame.mmrBefore,
      mmrGain: mostRecentGame.mmrGain,
      mmrAfter: mostRecentGame.mmrAfter
    };

    //console.log(resultJSON.userGames[0]);

    return mostRecentGameInfo;
  }

  public sendGameInfo = async () => {
    const mostRecentGameInfo: simpleGameInfo = await this.recentGameService('라그나로스');
  
    const messageContent = {
      "username": "라그나로스 트래커",
      "content": `${mostRecentGameInfo.startDtm}에 ${mostRecentGameInfo.mmrGain} 점수를 얻고 ${mostRecentGameInfo.mmrAfter}점이 되었음.`
    }

    const send = await fetch(`${process.env.DISCORD_WEBHOOK}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(messageContent)
      }
    );

    return send;
  }
}