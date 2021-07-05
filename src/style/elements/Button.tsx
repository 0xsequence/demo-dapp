import React, { forwardRef } from 'react'
import { Button as _Button, ButtonProps as _ButtonProps } from 'theme-ui'
import { useHistory, useLocation } from 'react-router-dom'

export interface ButtonProps extends _ButtonProps {
  to?: string
}

export const Button = ({ sx, to, onClick, ...props }: ButtonProps) => {
  const history = useHistory()

  if (!onClick && to) {
    onClick = () => history.push(to)
  }

  let style = {
    fontSize: '13px',
    borderRadius: '6px',
    boxShadow: '0px 0px 3px primary',
    fontFamily: 'body',
    transition: 'all 0.2s linear',
    ...sx,
    '&:hover': {
      color: 'primary'
    }
  }

  return <_Button sx={style} onClick={onClick} {...props} />
}
