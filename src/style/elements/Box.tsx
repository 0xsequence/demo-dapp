import { Box as _Box, BoxProps as _BoxProps } from 'theme-ui'
import { styled } from '~/style'

import { display, DisplayProps, flex, FlexboxProps, position, PositionProps } from 'styled-system'

export interface BoxProps extends _BoxProps, DisplayProps, FlexboxProps, PositionProps {
  className?: string
}

export const Box = styled(_Box)<BoxProps>(display, flex, position)
