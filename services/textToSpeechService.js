import textToSpeech from '@google-cloud/text-to-speech';
import fs from 'fs';
import { promisify } from 'util';

const client = new textToSpeech.TextToSpeechClient();

export async function convertTextToAudio(text, outputFile) {
  const request = {
    input: { text },
    voice: { languageCode: 'en-US', ssmlGender: 'NEUTRAL' },
    audioConfig: { audioEncoding: 'MP3' },
  };

  const [response] = await client.synthesizeSpeech(request);
  const writeFile = promisify(fs.writeFile);
  await writeFile(outputFile, response.audioContent, 'binary');
  return outputFile;
}