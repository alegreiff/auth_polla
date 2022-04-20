import { extendTheme, theme as base } from '@chakra-ui/react';

const pollaTema = extendTheme({
  colors: {
    polla: {
      blanco: '#f2f3f4',
      negro: '#34495e',
      gana: '#dff9e8',
      pierde: '#f9d4d4',
      empata: '#f1f1ef',
    },
  },
  fonts: {
    heading: `Rokkitt, ${base.fonts.heading}`,
    body: `'Baloo 2', ${base.fonts.heading}`,
  },
});

export default pollaTema;
