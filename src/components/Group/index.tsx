import React from 'react'
import { Box, Text } from '@0xsequence/design-system'

import * as styles from './styles.css'

interface GroupProps {
  label?: JSX.Element | string
  children: React.ReactNode
  style?: any
  className?: string
}

export const Group = (props: GroupProps) => {
  const { label, children, style, className } = props

  return (
    <Box marginTop="10" marginBottom="8" marginX="0" width="full" className={className} style={style}>
      {label && (
        <Box marginBottom="2">
          <GroupTitle>{label}</GroupTitle>
        </Box>
      )}
      <Box className={styles.groupItems}>
        {React.Children.map(children, (child, i) => (
          <Box key={i}>{child}</Box>
        ))}
      </Box>
    </Box>
  )
}

interface GroupTitleProps {
  children?: React.ReactNode
}

export const GroupTitle = (props: GroupTitleProps) => {
  return (
    <Text variant="normal" fontWeight="medium" color="text50">
      {props.children}
    </Text>
  )
}
