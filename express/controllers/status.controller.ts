import { Request, Response } from 'express';
import { Status } from '../interfaces/';

export const getStatusList = (req: Request, res: Response) => {
    const statusList: Array<string> = Object.keys(Status).filter(key=> isNaN(Number(key)));
    res.send(statusList);
}
