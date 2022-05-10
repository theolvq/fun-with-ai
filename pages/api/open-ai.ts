import type { NextApiRequest, NextApiResponse } from 'next';
import { Configuration, CreateCompletionResponse, OpenAIApi } from 'openai';

const configuration = new Configuration({
  organization: 'org-dDwOf8uG8UKRfMqjxn1Jz8fn',
  apiKey: process.env.OPEN_AI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CreateCompletionResponse>,
) {
  const { body: prompt } = req;
  const { data } = await openai.createCompletion('text-curie-001', {
    prompt,
    max_tokens: 100,
    temperature: 0.9,
    echo: true,
  });

  res.status(200).json(data);
}
