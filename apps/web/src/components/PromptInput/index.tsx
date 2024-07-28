import { Textarea } from '@mantine/core'
import { FC } from 'react'

interface PromptInputProps {
  readonly value: string
  readonly onChange: (value: string) => void
}

export const PromptInput: FC<PromptInputProps> = ({ value, onChange }) => (
  <Textarea
    placeholder="Enter your prompt here..."
    value={value}
    onChange={(event) => onChange(event.currentTarget.value)}
    h={200}
    styles={{ wrapper: { height: '100%' }, input: { height: '100%' } }}
  />
)
