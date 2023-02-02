import React from 'react'
import { Box } from '@0xsequence/design-system'

import * as styles from './styles.css'

export const Button: React.ElementType = ({ children, ...props  }) => (
  <Box as="button" {...props} className={styles.button}>
    {children}
  </Box>
)