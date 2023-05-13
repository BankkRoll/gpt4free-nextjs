import { NextApiRequest, NextApiResponse } from 'next';
import { ChatModelFactory, Model } from '../../../model';

const chatModel = new ChatModelFactory();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log('Request received'); // This will log when a request is received
  const { prompt, model = Model.You, ...options } = req.query;

  if (!prompt) {
    console.log('No prompt provided'); // This will log if no prompt is provided
    res.status(400).json({ error: 'please input prompt' });
    return;
  }

  const models = model ? [model as Model, ...Object.values(Model).filter(m => m !== model)] : Object.values(Model);
  console.log('Models:', models); // This will log the models being used
  let chatRes;
  let error;

  for (let i = 0; i < models.length; i++) {
    const chat = chatModel.get(models[i]);
    if (!chat) {
      console.log('No chat found for model:', models[i]); // This will log if no chat is found for a model
      continue;
    }
    try {
      chatRes = await chat.askStream({ prompt: prompt as string, options });
      console.log('Response received:', chatRes); // This will log the response received
      break;
    } catch (e) {
      console.log('Error:', e); // This will log if an error occurs
      error = e;
      continue;
    }
  }

  if (!chatRes) {
    console.log('No response from any model'); // This will log if no response is received from any model
    res.status(500).json({ error: error || 'All models failed' });
    return;
  }

  res.setHeader('Content-Type', 'text/event-stream;charset=utf-8');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.status(200).send(chatRes?.text);
};

export default handler;
