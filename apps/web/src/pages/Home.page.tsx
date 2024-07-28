import { Grid, Stack, Text } from '@mantine/core'
import { FC, useState } from 'react'
import { useLlmControllerRunQuery } from '../api/apiComponents'
import { PromptInput } from '../components/PromptInput'
import { ResponseDisplay } from '../components/ResponseDisplay'
import { SubmitButton } from '../components/SubmitButton'

export const HomePage: FC = () => {
  const [prompt, setPrompt] = useState('')
  const [maxTokens] = useState(100)
  const [previousPrompt, setPreviousPrompt] = useState<string>()
  const [hasEnteredSamePrompt, setHasEnteredSamePrompt] = useState(false)

  const runQuery = useLlmControllerRunQuery()

  const handleSubmit = () => {
    if (previousPrompt === prompt) {
      setHasEnteredSamePrompt(true)
      return
    }

    if (prompt.trim().length === 0) {
      return
    }

    runQuery.mutate({ body: { prompt, maxTokens } })
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
          <SubmitButton
            onClick={handleSubmit}
            loading={runQuery.isPending}
            disabled={
              prompt.trim().length === 0 ||
              runQuery.isPending ||
              hasEnteredSamePrompt
            }
          />
          {hasEnteredSamePrompt && (
            <Text c="red">Please enter a different prompt.</Text>
          )}
          {runQuery.isError && (
            <Text c="red">An error occurred. Please try again.</Text>
          )}
          {runQuery.data && (
            <ResponseDisplay response={runQuery.data.response} />
          )}
        </Stack>
      </Grid.Col>
    </Grid>
  )
}
