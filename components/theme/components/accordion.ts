import { accordionAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(accordionAnatomy.keys);

const variantFilled = definePartsStyle({
  button: {
    backgroundColor: 'gray.200',
    py: 3,
  },
  container: {
    border: 'none',
    mb: 2,
  },
});

const variants = {
  filled: variantFilled,
};

export const accordionTheme = defineMultiStyleConfig({
  variants,
  defaultProps: {
    variant: 'filled',
    size: 'lg',
  },
});
