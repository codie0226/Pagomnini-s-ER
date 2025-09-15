import { NextFunction } from 'connect';
import {Request, Response} from 'express';

class GomController {
    public recentGame = async (req: Request, res: Response, next: NextFunction) => {
        if(req.params.name === null){
            return null;
        }
        const userName: string | undefined = req.params.name;

        const games = fetch(`${process.env.ER_API_ENDPOINT}v1/user/nickname?query=${userName}`)
    }


}