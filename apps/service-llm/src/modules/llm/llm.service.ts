/* eslint-disable */
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
    const modelPath = `${__dirname}/../../../${this.appConfigValues.pathToModel}`
    const modelParams = { nGpuLayers: 32 }
    const contextParams = { nContext: 2048 }

    const initialized = this.llama.initialize(modelPath, modelParams, contextParams)
    if (!initialized) {
      throw new Error('Failed to initialize the LLM model')
    }

    this.llama.setSystemPrompt("You are a helpful AI assistant. Always provide clear, concise, and accurate answers.")
  }

  runQuery(prompt: string, maxTokens = 2000): string {
    const tokenStream: TokenStream = this.llama.prompt(prompt)
    let response = ''
    while (true) {
      // @ts-ignore
      const token: string | null = tokenStream.read()
      if (token === null) break
      response += token
    }
    return response
  }

  runQueryStream(prompt: string, maxTokens = 2000): Observable<MessageEvent> {
    return new Observable<MessageEvent>((observer) => {
      const tokenStream: TokenStream = this.llama.prompt(prompt)

      const readStream = async () => {
        try {
          while (true) {
            const token: string | null = await tokenStream.read()
            if (token === null) {
              observer.complete()
              break
            }

            observer.next({ data: token } as MessageEvent)

            await new Promise((resolve) => setImmediate(resolve))
          }
        } catch (error) {
          observer.error(error)
        }
      }

      readStream()

      return () => {
        console.log('Streaming stopped')
      }
    })
  }

  resetConversation(): void {
    this.llama.resetConversation()
  }
}
