import express, { Request, Response, NextFunction } from 'express';
import { getAllMessagesQuery, getAllEmojisQuery } from '../utils/queries/queries';
import executeQuery from '../utils/executeQuery'; 

const externalRouter = express.Router();

externalRouter.get('/messages', async (req:Request, res:Response, next:NextFunction) => {
    const results = await executeQuery(getAllMessagesQuery)
    console.log(`${results.length} Messages Retrieved`)
    res.send(results)
})

externalRouter.get('/emojis', async (req:Request, res:Response, next:NextFunction) => {
    const results = await executeQuery(getAllEmojisQuery)
    console.log(`${results.length} Emojis Retrieved`)
    res.send(results)
})

export default externalRouter;