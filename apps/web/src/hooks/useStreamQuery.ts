import { useState, useCallback } from 'react'
import { config } from 'src/config.ts'
import { RunQueryDto } from '../api/apiSchemas'

export const useStreamQuery = () => {
  const [isStreaming, setIsStreaming] = useState(false)
  const [streamedResponse, setStreamedResponse] = useState('')
  const [error, setError] = useState<string | null>(null)

  const streamQuery = useCallback((data: RunQueryDto) => {
    setIsStreaming(true)
    setStreamedResponse('')
    setError(null)

    const queryParams = new URLSearchParams({
      prompt: data.prompt,
      maxTokens: data.maxTokens?.toString() || '100',
    }).toString()

    const eventSource = new EventSource(
      `${config.uri}/api/llm/stream?${queryParams}`
    )

    eventSource.onmessage = (event) => {
      console.log('event.data', event.data)
      setStreamedResponse((prev) => prev + event.data)
    }

    eventSource.onerror = () => {
      // TODO: prevent false positive and implement proper error handling
      // setError('An error occurred while streaming the response.')
      eventSource.close()
      setIsStreaming(false)
    }

    eventSource.addEventListener('close', () => {
      eventSource.close()
      setIsStreaming(false)
    })

    return () => {
      eventSource.close()
      setIsStreaming(false)
    }
  }, [])

  return { streamQuery, isStreaming, streamedResponse, error }
}
