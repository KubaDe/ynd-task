import { defineStyleConfig } from '@chakra-ui/react';

export const buttonTheme = defineStyleConfig({
  baseStyle: {
    borderRadius: 3,
  },
  sizes: {
    lg: {
      h: 14,
    },
  },
  defaultProps: {
    size: 'lg',
    variant: 'solid',
    colorScheme: 'blue',
  },
});
