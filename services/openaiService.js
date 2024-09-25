import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export async function generateSummary(text) {
  const response = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `Summarize the following text: ${text}`,
    max_tokens: 100,
  });
  return response.data.choices[0].text.trim();
}
