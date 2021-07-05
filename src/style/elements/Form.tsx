import React, { forwardRef } from 'react'
import { Box, BoxProps } from 'theme-ui'

export interface FormProps extends BoxProps {
  onSubmit?: (e) => void
}

export const Form = forwardRef<HTMLFormElement, FormProps>(({ onSubmit, ...props }, ref: any) => (
  <Box
    ref={ref}
    as="form"
    onSubmit={e => {
      e.preventDefault()
      if (onSubmit) {
        onSubmit(e)
      }
    }}
    {...props}
  />
))
