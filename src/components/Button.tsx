import { styled, typography } from '../style'

export const Button = styled('button', typography.button, {
  border: 'none',
  display: 'inline-block',
  userSelect: 'none',
  cursor: 'pointer',

  color: '$textPrimary',
  backgroundColor: '$uiBackground',
  position: 'relative',
  width: '100%',
  height: '50px',
  borderRadius: '15px',
  padding: '15px',
  alignItems: 'center',

  '&:hover': {
    backgroundColor: '$uiBackgroundHover'
  },

  '&:disabled': {
    pointerEvents: 'none',
    cursor: 'default',
    opacity: '0.6'
  }
})
