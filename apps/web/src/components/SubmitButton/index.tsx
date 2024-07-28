import { Button } from '@mantine/core'
import { FC } from 'react'

interface SubmitButtonProps {
  readonly onClick: () => void
  readonly loading: boolean
  readonly disabled: boolean
}

export const SubmitButton: FC<SubmitButtonProps> = ({
  onClick,
  loading,
  disabled,
}) => (
  <Button onClick={onClick} loading={loading} disabled={disabled}>
    Submit
  </Button>
)
