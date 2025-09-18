import { NextFunction, Request, Response } from 'express';
import { GomService } from '../service/gom.service';
import { simpleGameInfo } from '../dto/gom.interface';

export class GomController {
    static GomService: GomService = new GomService();

    public static recentGame = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userName: string | undefined = req.params.name;

            if (!userName) {
                return res.status(400).json({ message: '사용자 이름(name)이 필요합니다.' });
            }
            
            const result: simpleGameInfo = await GomController.GomService.recentGameService(userName);
            //res.status(200).json(result);
            res.render('index', {result});

        } catch (error) {
            console.error('An unexpected error occurred:', error);
            next(error); 
        }
    }

    public static sendMessageToDiscord = async(req: Request, res: Response, next: NextFunction) => {
        try {
            const messageContent = {
                "username": "codie",
                "content": "김민재 바보"
            }

            const vv = await fetch(`${process.env.DISCORD_WEBHOOK}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(messageContent)
                }
            )
        }catch (error){
            console.error('An unexpected error occurred', error);
            next(error);
        }
    }
}