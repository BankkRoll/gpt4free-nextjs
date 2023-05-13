import { NextApiRequest, NextApiResponse } from 'next';
import { ChatModelFactory, Model } from '../../../model';

const chatModel = new ChatModelFactory();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { prompt, model = Model.You, ...options } = req.query;

  if (!prompt) {
    res.status(400).json({ error: 'please input prompt' });
    return;
  }

  const models = model ? [model as Model, ...Object.values(Model).filter(m => m !== model)] : Object.values(Model);
  let chatRes;
  let error;

  for (let i = 0; i < models.length; i++) {
    const chat = chatModel.get(models[i]);
    if (!chat) {
      continue;
    }
    try {
      chatRes = await chat.askStream({ prompt: prompt as string, options });
      break;
    } catch (e) {
      error = e;
      continue;
    }
  }

  if (!chatRes) {
    res.status(500).json({ error: error || 'All models failed' });
    return;
  }

  res.setHeader('Content-Type', 'text/event-stream;charset=utf-8');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.status(200).send(chatRes?.text);
};

export default handler;
