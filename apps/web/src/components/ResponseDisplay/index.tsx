import { Paper, Text } from '@mantine/core'
import { FC } from 'react'

interface ResponseDisplayProps {
  response: string
}

export const ResponseDisplay: FC<ResponseDisplayProps> = ({ response }) => (
  <Paper p="md" withBorder>
    <Text>{response}</Text>
  </Paper>
)
