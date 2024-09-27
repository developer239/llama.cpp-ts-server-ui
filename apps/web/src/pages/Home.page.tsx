/* eslint-disable */
import { Grid, Stack, Text, Switch, Button } from '@mantine/core'
import { FC, useState, useEffect } from 'react'
import {
  useLlmControllerResetConversation,
  useLlmControllerRunQuery,
} from '../api/apiComponents'
import { PromptInput } from '../components/PromptInput'
import { ResponseDisplay } from '../components/ResponseDisplay'
import { SubmitButton } from '../components/SubmitButton'
import { useStreamQuery } from '../hooks/useStreamQuery'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

export const HomePage: FC = () => {
  const [prompt, setPrompt] = useState('')
  const [maxTokens] = useState(4000)
  const [useStreaming, setUseStreaming] = useState(true)
  const [response, setResponse] = useState('')
  const [conversationHistory, setConversationHistory] = useState<Message[]>([])

  const [isResettingConversation, setIsResettingConversation] = useState(false)
  const { mutate: resetConversation } = useLlmControllerResetConversation()

  const runQuery = useLlmControllerRunQuery()
  const {
    streamQuery,
    isStreaming,
    streamedResponse,
    error: streamError,
  } = useStreamQuery()

  useEffect(() => {
    if (useStreaming) {
      setResponse(streamedResponse)
    } else if (runQuery.data) {
      setResponse(runQuery.data.response)
    }
  }, [useStreaming, streamedResponse, runQuery.data])

  const handleSubmit = () => {
    if (prompt.trim().length === 0) {
      return
    }

    setResponse('')
    setConversationHistory((prev) => [
      ...prev,
      { role: 'user', content: prompt },
    ])

    if (useStreaming) {
      streamQuery({ prompt, maxTokens })
    } else {
      runQuery.mutate({ body: { prompt, maxTokens } })
    }
  }

  useEffect(() => {
    if (response && !isStreaming && !runQuery.isPending) {
      setConversationHistory((prev) => [
        ...prev,
        { role: 'assistant', content: response },
      ])
      setPrompt('')
    }
  }, [response, isStreaming, runQuery.isPending])

  const handleResetConversation = async () => {
    setConversationHistory([])
    setPrompt('')
    setResponse('')

    setIsResettingConversation(true)
    await resetConversation({})
    setIsResettingConversation(false)
  }

  return (
    <Grid>
      <Grid.Col>
        <Stack mb={20}>
          {conversationHistory.map((message, index) => (
              <ResponseDisplay
                  key={index}
                  response={message.content}
                  role={message.role}
              />
          ))}
        </Stack>
        <Stack>
          <Button onClick={handleResetConversation}>
            {isResettingConversation ? '...' : 'Reset Conversation'}
          </Button>
          <PromptInput value={prompt} onChange={(value) => setPrompt(value)} />
          <Switch
            label="Use streaming"
            checked={useStreaming}
            onChange={(event) => setUseStreaming(event.currentTarget.checked)}
          />
          <SubmitButton
            onClick={handleSubmit}
            loading={runQuery.isPending || isStreaming}
            disabled={
              prompt.trim().length === 0 || runQuery.isPending || isStreaming
            }
          />
          {(runQuery.isError || streamError) && (
            <Text c="red">
              {streamError || 'An error occurred. Please try again.'}
            </Text>
          )}
          {isStreaming && (
            <ResponseDisplay response={response} role="assistant" />
          )}
        </Stack>
      </Grid.Col>
    </Grid>
  )
}
