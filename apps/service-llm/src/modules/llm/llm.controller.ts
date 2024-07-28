import { Controller, Post, Body, ValidationPipe, Sse, Query, ParseIntPipe } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'
import { Observable } from 'rxjs'
import { QueryResponseDto } from './dto/query-response.dto'
import { RunQueryDto } from './dto/run-query.dto'
import { StreamQueryDto } from './dto/stream-query.dto'
import { LlmService } from './llm.service'

@Controller('llm')
@ApiTags('LLM')
export class LlmController {
  constructor(private readonly llmService: LlmService) {}

  @Post('query')
  @ApiOperation({ summary: 'Run a query on the LLM' })
  @ApiResponse({
    status: 200,
    description: 'Query response',
    type: QueryResponseDto,
  })
  async runQuery(
      @Body(ValidationPipe) runQueryDto: RunQueryDto
  ): Promise<QueryResponseDto> {
    const response = this.llmService.runQuery(
        runQueryDto.prompt,
        runQueryDto.maxTokens
    )
    return { response }
  }

  @Sse('stream')
  @ApiOperation({ summary: 'Stream a query response from the LLM' })
  @ApiResponse({ status: 200, description: 'Streamed query response' })
  streamQuery(
      @Query('prompt') prompt: string,
      @Query('maxTokens', new ParseIntPipe({ optional: true })) maxTokens?: number
  ): Observable<MessageEvent> {
    return this.llmService.runQueryStream(prompt, maxTokens);
  }
}
