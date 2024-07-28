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
    return new Observable<MessageEvent>((observer) => {
      const tokenStream: TokenStream = this.llama.runQueryStream(
        prompt,
        maxTokens
      )

      const readStream = async () => {
        while (true) {
          const token = await tokenStream.read()
          if (token === null) {
            observer.complete()
            break
          }
          console.log(token)
          observer.next({ data: token } as MessageEvent)
        }
      }

      readStream().catch((error) => observer.error(error))

      return () => {
        // TODO: make the stream cancelable
      }
    })
  }
}
