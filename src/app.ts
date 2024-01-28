import express, { Request, Response, NextFunction } from 'express';
import messageRouter from './application/routes/message';
import emojiRouter from './application/routes/emoji';
import requestRouter from './application/routes/request';
import userRouter from './application/routes/user';

const app = express()
const port = 3000

app.use(express.json());
app.use('/message', messageRouter)
app.use('/emoji', emojiRouter)
app.use('/request', requestRouter)
app.use('/user', userRouter)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });