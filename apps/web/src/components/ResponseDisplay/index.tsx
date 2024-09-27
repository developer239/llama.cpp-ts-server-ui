import { Paper, Text } from '@mantine/core'
import { FC } from 'react'

interface ResponseDisplayProps {
  readonly response: string
  readonly role: string
}

export const ResponseDisplay: FC<ResponseDisplayProps> = ({ response, role }) => (
  <Paper p="md" withBorder style={{
      opacity: role === 'assistant' ? 1 : 0.65,
  }}>
    <Text><span style={{ opacity: 0.4}}>{role}:</span> {response}</Text>
  </Paper>
)
