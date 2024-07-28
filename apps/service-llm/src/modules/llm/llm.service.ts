import { Inject, Injectable } from '@nestjs/common'
import { Llama, TokenStream } from 'llama.cpp-ts'
import { Observable } from 'rxjs'
import { appConfig, AppConfigType } from '../../config/app.config'

@Injectable()
export class LlmService {
  private readonly llama: Llama

  constructor(
    @Inject(appConfig.KEY)
    private readonly appConfigValues: AppConfigType
  ) {
    this.llama = new Llama()
    const initialized = this.llama.initialize(
      `${__dirname}/../../../${this.appConfigValues.pathToModel}`
    )
    if (!initialized) {
      throw new Error('Failed to initialize the LLM model')
    }
  }

  runQuery(prompt: string, maxTokens = 100): string {
    return this.llama.runQuery(prompt, maxTokens)
  }

  runQueryStream(prompt: string, maxTokens = 100): Observable<MessageEvent> {
    const textToStream = `
      This is a long static text that we will stream in chunks to simulate streaming behavior. 
      We are adding more content here to ensure the text is sufficiently long for testing purposes. 
      Streaming is a powerful way to send data to clients in real-time, allowing for a more interactive 
      experience. This simulation will include artificial delays to mimic the process of data being 
      processed and streamed in chunks over time. 
      This is the last chunk of our sample text.
    `;

    const textChunks = textToStream.match(/.{1,100}/g) || []; // Split the text into chunks of 100 characters

    return new Observable<MessageEvent>(observer => {
      let index = 0;

      const sendNextChunk = async () => {
        if (index < textChunks.length) {
          observer.next({ data: textChunks[index] } as MessageEvent);
          index++;
          setTimeout(sendNextChunk, 500); // Artificial delay of 500ms between chunks
        } else {
          observer.complete();
        }
      };

      sendNextChunk(); // Start the streaming process

      return () => {
        console.log('Streaming stopped');
      };
    });
  }
}
