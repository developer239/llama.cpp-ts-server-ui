import { Injectable } from '@nestjs/common'
// import { Llama } from 'llama.cpp-ts'

@Injectable()
export class LlmService {
  // private readonly llama: Llama

  constructor() {
    // this.llama = new Llama()
    // const initialized = this.llama.initialize('./path/to/your/model.gguf')
    // if (!initialized) {
    //   throw new Error('Failed to initialize the LLM model')
    // }
  }

  runQuery(prompt: string, maxTokens = 100): string {
    return `Running query: ${prompt} with max tokens: ${maxTokens}`
  }
}
