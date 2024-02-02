import express, { Request, Response, NextFunction } from 'express';
import { totalQuery, topMessageQuery, insertMessageQuery, updateMessageQuery, deleteMessageQuery } from '../utils/queries/queries';
import executeQuery from '../utils/executeQuery'; 
import { logger } from '../utils/helperFunctions';

const messageRouter = express.Router();

messageRouter.get('/total', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await executeQuery(totalQuery); 
    logger(`/total`)
    res.send(result);
  } catch (error) {
    console.error('Error handling total query:', error);
    res.status(500).send('Internal Server Error');
  }
});

messageRouter.get('/topmessage/:userid', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await executeQuery(topMessageQuery, [req.params.userid]);
      logger(`/topmessage`)
      res.send(result);
    } catch (error) {
      console.error('Error handling total query:', error);
      res.status(500).send('Internal Server Error');
    }
  });

messageRouter.post('/insertmessage', async (req: Request, res: Response, next:NextFunction) => { 
    const { channelId, guildId, messageId, createdTime, content, ogContent, authorId } = req.body;
    await executeQuery(insertMessageQuery, [channelId, guildId, messageId, createdTime, content, ogContent, authorId]); 
    console.log(`Message inserted @ ${createdTime}`)
    res.send(`Message inserted @ ${createdTime}`)
})

messageRouter.post('/updatemessage', async (req: Request, res: Response, next: NextFunction) => {
    const { updated_time, content, messageId } = req.body; 
    const messageIdAsInt = BigInt(messageId); 
    
    await executeQuery(updateMessageQuery, [updated_time, content, messageIdAsInt]);
    console.log(`Message updated @ ${updated_time}`);
    res.send(`Message updated @ ${updated_time}`);
});

messageRouter.post('/deletemessage', async (req: Request, res: Response, next: NextFunction) => {
    const { messageId} = req.body; 
    const messageIdAsInt = BigInt(messageId); 
    
    await executeQuery(deleteMessageQuery, [messageIdAsInt])
    console.log(`${messageIdAsInt} Message deleted`)
    res.send(`Message deleted`)
})

export default messageRouter;
