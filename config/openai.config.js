import { OpenAI } from 'openai';
import { OPENAI_API_KEY } from './common.config.js';

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
});

export { openai };
