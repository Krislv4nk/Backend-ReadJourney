import OpenAI from "openai";


const { OPENAI_API_KEY, $PROJECT_ID } = process.env;

const openai = new OpenAI({
    organization: "",
    project: "$PROJECT_ID",
});

export async function generateSummary(text) {
  const response = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `Summarize the following text: ${text}`,
    max_tokens: 100,
  });
  return response.data.choices[0].text.trim();
}
