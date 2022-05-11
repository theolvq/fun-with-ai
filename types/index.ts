import { CreateCompletionResponse } from 'openai';

export type Response = CreateCompletionResponse & {
  prompt: string;
};
