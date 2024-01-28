import express, {Request, Response, NextFunction} from 'express'
import { givenQuery, recievedQuery, whoGaveQuery, whoRecievedQuery, addReactionQuery, updateReactionQuery } from '../utils/queries/queries';
import executeQuery from '../utils/executeQuery';

const emojiRouter = express.Router()

emojiRouter.get('/given/:emoji', async (req: Request, res: Response, next: NextFunction) => {
    try { 
        const result = await executeQuery(givenQuery, [req.params.emoji]);
        console.log(result);
        res.send(result);
      } catch (error) {
        console.error('Error handling query:', error);
        res.status(500).send('Internal Server Error');
      }
})

emojiRouter.get('/recieved/:emoji', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await executeQuery(recievedQuery, [req.params.emoji])
        res.send(result)
        console.log(result)
    } catch (error) { 
        console.error('Error handling query:', error);
        res.status(500).send('Internal Server Error');
    }
})

emojiRouter.get('/whogave/:userid/:emoji', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await executeQuery(whoGaveQuery, [req.params.emoji, req.params.userid])
        res.send(result)
        console.log(result)
    } catch (error) { 
        console.error('Error handling query:', error);
        res.status(500).send('Internal Server Error');
    }
})

emojiRouter.get('/whorecieved/:userid/:emoji', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await executeQuery(whoRecievedQuery, [req.params.emoji, req.params.userid])
        res.send(result)
        console.log(result)
    } catch (error) { 
        console.error('Error handling query:', error);
        res.status(500).send('Internal Server Error');
    }
})

emojiRouter.post('/insertemoji', async (req: Request, res: Response, next: NextFunction) => {
    const {userId, messageId, emojiName, emojiId, channelId, guildId, updateTIme} = req.body
    await executeQuery(addReactionQuery, [userId, messageId, emojiName, emojiId, channelId, guildId, updateTIme])
    console.log(`Emoji inserted`)
    res.send(`Emoji inserted`)
})

emojiRouter.post('/updateemoji', async (req: Request, res: Response, next: NextFunction) => {
    const {updateTIme, messageId, userId, emojiName} = req.body
    const messageIdAsInt = BigInt(messageId); 
    const userIdAsInt = BigInt(userId); 

    await executeQuery(updateReactionQuery, [updateTIme, messageIdAsInt, userIdAsInt, emojiName])
    console.log(updateTIme, messageId, userId, emojiName)
    console.log(`Emoji updated`)
    res.send(`Emoji updated`) 
})

export default emojiRouter;