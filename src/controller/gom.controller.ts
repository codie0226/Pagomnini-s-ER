import { NextFunction, Request, Response } from 'express';
import { GomService } from '../service/gom.service';

export class GomController {
    static GomService: GomService;
    constructor(){
        GomController.GomService = new GomService();
    }

    public static recentGame = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userName: string | undefined = req.params.name;

            if (!userName) {
                return res.status(400).json({ message: '사용자 이름(name)이 필요합니다.' });
            }
            
            const result = await this.GomService.recentGameService(userName);
            res.json(result);

        } catch (error) {
            console.error('An unexpected error occurred:', error);
            next(error); 
        }
    }
}