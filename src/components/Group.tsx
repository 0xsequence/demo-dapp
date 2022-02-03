import React from 'react'

import { styled, typography } from '../style'

interface GroupProps {
  label?: JSX.Element | string
  children: React.ReactNode
  style?: any
  className?: string
  layout?: 'rows' | 'grid'
}

export const Group = (props: GroupProps) => {
  const { label, children, style, className, layout = 'rows' } = props

  return (
    <GroupContainer className={className} style={style}>
      {label && <GroupTitle>{label}</GroupTitle>}
      <GroupItems layout={layout}>
        {React.Children.map(children, (child, i) => (
          <GroupItem key={i}>{child}</GroupItem>
        ))}
      </GroupItems>
    </GroupContainer>
  )
}

const GroupContainer = styled('div', {
  width: '100%',
  margin: '40px 0 36px'
})

const GroupTitle = styled('h2', typography.h2, {
  color: '$tint9',
  marginBottom: '15px'
})

const GroupItems = styled('div', {
  variants: {
    layout: {
      rows: {
        '& > *:not(:last-child)': {
          marginBottom: '12px'
        }
      },

      grid: {
        display: 'grid',
        gridColumnGap: '12px',
        gridRowGap: '12px',
        gridAutoRows: '1fr',
        gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',

        '@lg': {
          gridTemplateColumns: 'repeat(3, minmax(0, 1fr))'
        }
      }
    }
  }
})

const GroupItem = styled('div')
