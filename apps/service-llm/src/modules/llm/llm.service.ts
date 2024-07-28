import { Inject, Injectable } from '@nestjs/common'
import { Llama } from 'llama.cpp-ts'
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
    return this.llama.runQuery(prompt, maxTokens);
  }
}
