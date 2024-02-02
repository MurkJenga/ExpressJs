import express, { Request, Response, NextFunction } from 'express';
import messageRouter from './application/routes/message';
import emojiRouter from './application/routes/emoji';
import requestRouter from './application/routes/request';
import userRouter from './application/routes/user';
import config from './config.json';
import externalRouter from './application/routes/external';

const app = express();
const port = 3000;

const apiKeyMiddleware = (allowedApiKey: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const apiKey = req.headers['x-api-key'];

    if (!apiKey || apiKey !== allowedApiKey) {
      return res.status(404).json({ error: 'Missing Resource' });
    }

    next();
  };
};

app.use(express.json());
app.use('/message', apiKeyMiddleware(config.botApiKey), messageRouter);
app.use('/external', apiKeyMiddleware(config.userApiKey), externalRouter);
app.use('/emoji', apiKeyMiddleware(config.botApiKey), emojiRouter);
app.use('/request', apiKeyMiddleware(config.botApiKey), requestRouter);
app.use('/user', apiKeyMiddleware(config.botApiKey), userRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
