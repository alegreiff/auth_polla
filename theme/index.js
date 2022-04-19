import { extendTheme, theme as base } from '@chakra-ui/react';

const pollaTema = extendTheme({
  colors: {
    polla: {
      blanco: '#f2f3f4',
      negro: '#34495e',
      win: '#73c6b6',
      loss: '#e74c3c',
    },
  },
  fonts: {
    heading: `Rokkitt, ${base.fonts.heading}`,
    body: `'Baloo 2', ${base.fonts.heading}`,
  },
});

export default pollaTema;
