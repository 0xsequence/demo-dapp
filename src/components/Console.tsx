import { styled, keyframes } from '../style'

export interface ConsoleProps {
  message: string | null,
  loading: boolean
}

export const Console = ({ message, loading }: ConsoleProps) => {

  const getLoadingDots = () => {
    if (message) {
      return '\n...'
    }
    return '...'
  }

  return (
    <ConsoleContainer>
      <div>Output:</div>
      <div>
        <ConsoleCode>
          {message}
          {loading && getLoadingDots()}
          {<Cursor>_</Cursor>}
        </ConsoleCode>
      </div>
    </ConsoleContainer>
  )
}

const ConsoleContainer = styled('div', {
  color: '$uiBackground',
  backgroundColor: 'grey',
  padding: '15px',
  borderRadius: '15px'
})

const blink = keyframes({
  '0%': { visibility: 'hidden' },
  '50%': { visibility: 'hidden' },
  '100%': {visibility: 'visible' }
})

const Cursor = styled('div', {
  display: 'inline-block',
  fontSize: '24px',
  animation: `${blink} 2s infinite`,
  lineHeight: '16px',
  top: '-4px',
  position: 'relative',
})

const ConsoleCode = styled('pre', {
  whiteSpace: 'break-spaces',
  overflowWrap: 'anywhere',
})