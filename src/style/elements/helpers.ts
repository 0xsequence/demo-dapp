import { css } from '~/style'

// Add base flex styles with one line
export const flexBoxType = props => {
  switch (props.type) {
    case 'centered-column': {
      return css({
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      })
    }
    case 'centered-row': {
      return css({
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
      })
    }
    case 'start-column': {
      return css({
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start'
      })
    }
    case 'start-row': {
      return css({
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'flex-start'
      })
    }
    case 'end-row': {
      return css({
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'flex-end'
      })
    }
    case 'end-column': {
      return css({
        flexDirection: 'column',
        alignItems: 'flex-end',
        justifyContent: 'flex-end'
      })
    }
    case 'centered-start-column': {
      return css({
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start'
      })
    }
    case 'centered-start-row': {
      return css({
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start'
      })
    }
    case 'centered-between-row': {
      return css({
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
      })
    }
    case 'centered-end-column': {
      return css({
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-end'
      })
    }
    case 'centered-end-row': {
      return css({
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end'
      })
    }
    // ...more
    default:
      return {}
  }
}
