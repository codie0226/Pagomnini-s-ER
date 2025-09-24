import { NextFunction, Request, Response } from 'express';
import { GomService } from '../service/gom.service';
import { simpleGameInfo } from '../dto/gom.interface';
import { getDynamicHTML } from '../myutil/crawler';

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
            const result = await GomController.GomService.sendGameInfo();

            res.status(200).send(result);

        }catch (error){
            console.error('An unexpected error occurred', error);
            next(error);
        }
    }

    public static getThreadResult = async(req: Request, res: Response, next: NextFunction) => {
        try {
            const query: string = req.params.query || '';
            const pageCount: number = Number(req.params.page) || 1;

            const result = await getDynamicHTML(query, pageCount);

            //console.log(result);

            res.status(200).render('threads', {result});
        }catch (error){
            console.error('An unexpected error occurred', error);
            next(error);
        }
    }
}