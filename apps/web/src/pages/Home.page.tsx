import { Grid, Stack, Text } from '@mantine/core'
import { FC, useState } from 'react'
import { PromptInput } from '../components/PromptInput'
import { ResponseDisplay } from '../components/ResponseDisplay'
import { SubmitButton } from '../components/SubmitButton'

export const HomePage: FC = () => {
  const [prompt, setPrompt] = useState('')
  const [response, setResponse] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = () => {
    // Input validation
    if (prompt.trim().length === 0) {
      setError('Please enter a prompt before submitting.')
      return
    }

    setError('')
    setLoading(true)

    // Simulating API call with potential for error
    setTimeout(() => {
      const success = Math.random() > 0.2 // 80% success rate for demonstration

      if (success) {
        setResponse(`This is a mock response to: "${prompt}"`)
        setLoading(false)
      } else {
        setError(
          'An error occurred while fetching the response. Please try again.'
        )
        setLoading(false)
      }
    }, 1000)
  }

  return (
    <Grid>
      <Grid.Col>
        <Stack>
          <PromptInput value={prompt} onChange={setPrompt} />
          <SubmitButton
            onClick={handleSubmit}
            loading={loading}
            disabled={prompt.trim().length === 0}
          />
          {error && <Text c="red">{error}</Text>}
          {response && <ResponseDisplay response={response} />}
        </Stack>
      </Grid.Col>
    </Grid>
  )
}
