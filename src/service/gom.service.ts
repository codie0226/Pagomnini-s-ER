export class GomService{
  public recentGameService = async (nickname: string) => {
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

    const gamesResponse = await fetch(`${process.env.ER_API_ENDPOINT}v1/user/games?userNum=${userNum}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": `${process.env.ER_API_KEY}`
      }
    });

    const resultJSON = await gamesResponse.json();

    console.log(resultJSON);
    return resultJSON;
  }
}