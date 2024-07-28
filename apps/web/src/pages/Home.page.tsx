import { Grid, Stack, Text, Switch } from '@mantine/core'
import { FC, useState, useEffect } from 'react'
import { useLlmControllerRunQuery } from '../api/apiComponents'
import { PromptInput } from '../components/PromptInput'
import { ResponseDisplay } from '../components/ResponseDisplay'
import { SubmitButton } from '../components/SubmitButton'
import { useStreamQuery } from '../hooks/useStreamQuery'

export const HomePage: FC = () => {
  const [prompt, setPrompt] = useState('')
  const [maxTokens] = useState(100)
  const [previousPrompt, setPreviousPrompt] = useState<string>()
  const [hasEnteredSamePrompt, setHasEnteredSamePrompt] = useState(false)
  const [useStreaming, setUseStreaming] = useState(false)
  const [response, setResponse] = useState('')

  const runQuery = useLlmControllerRunQuery()
  const {
    streamQuery,
    isStreaming,
    streamedResponse,
    error: streamError,
  } = useStreamQuery()

  useEffect(() => {
    setHasEnteredSamePrompt(false)
  }, [prompt])

  useEffect(() => {
    if (useStreaming) {
      setResponse(streamedResponse)
    } else if (runQuery.data) {
      setResponse(runQuery.data.response)
    }
  }, [useStreaming, streamedResponse, runQuery.data])

  const handleSubmit = () => {
    if (previousPrompt === prompt) {
      setHasEnteredSamePrompt(true)
      return
    }

    if (prompt.trim().length === 0) {
      return
    }

    setResponse('') // Clear previous response

    if (useStreaming) {
      streamQuery({ prompt, maxTokens })
    } else {
      runQuery.mutate({ body: { prompt, maxTokens } })
    }
    setPreviousPrompt(prompt)
  }

  return (
    <Grid>
      <Grid.Col>
        <Stack>
          <PromptInput
            value={prompt}
            onChange={(value) => {
              setHasEnteredSamePrompt(false)
              setPrompt(value)
            }}
          />
          <Switch
            label="Use streaming"
            checked={useStreaming}
            onChange={(event) => setUseStreaming(event.currentTarget.checked)}
          />
          <SubmitButton
            onClick={handleSubmit}
            loading={runQuery.isPending || isStreaming}
            disabled={
              prompt.trim().length === 0 ||
              runQuery.isPending ||
              isStreaming ||
              hasEnteredSamePrompt
            }
          />
          {hasEnteredSamePrompt && (
            <Text c="red">Please enter a different prompt.</Text>
          )}
          {(runQuery.isError || streamError) && (
            <Text c="red">
              {streamError || 'An error occurred. Please try again.'}
            </Text>
          )}
          <ResponseDisplay response={response} />
        </Stack>
      </Grid.Col>
    </Grid>
  )
}
