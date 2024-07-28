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
      `${__dirname}/../../../${this.appConfigValues.pathToModel}`,
        80000
    )
    if (!initialized) {
      throw new Error('Failed to initialize the LLM model')
    }
  }

  runQuery(prompt: string, maxTokens = 2000): string {
    return this.llama.runQuery(prompt, maxTokens)
  }

  runQueryStream(prompt: string, maxTokens = 2000): Observable<MessageEvent> {
    return new Observable<MessageEvent>((observer) => {
      const tokenStream: TokenStream = this.llama.runQueryStream(
        prompt,
        maxTokens
      )

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
}
