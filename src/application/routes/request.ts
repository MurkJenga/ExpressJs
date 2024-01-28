import express, {Request, Response, NextFunction} from 'express'
import executeQuery from '../utils/executeQuery';
import { botRequestQuery } from '../utils/queries/queries';

const requestRouter = express.Router() 

requestRouter.post('/', async (req: Request, res:Response, next:NextFunction) => {
    const { type, request_text, request_time } = req.body;
    const result = await executeQuery(botRequestQuery, [type, request_text, request_time]); 
    console.log(req.body)
    res.send(`${type} request recieved`)
})

export default requestRouter