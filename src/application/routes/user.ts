import express, {Request, Response, NextFunction} from 'express'
import { last30Query, userQuery } from '../utils/queries/queries'
import executeQuery from '../utils/executeQuery'
import { logger } from '../utils/helperFunctions'

const userRouter = express.Router()

userRouter.get('/last30/:userid', async (req: Request, res: Response, next: NextFunction) => {
    const result = await executeQuery(last30Query, [req.params.userid])
    logger('/last30');
    res.status(200).send(result)
})

userRouter.get('/:userid', async (req: Request, res:Response, next: NextFunction) => {
    const result = await executeQuery(userQuery, [req.params.userid])
    logger('/user');
    res.status(200).send(result)})

export default userRouter