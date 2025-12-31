import { Font } from '@react-pdf/renderer';

// Register Dongle font from local files
// Font files are served from /public/fonts/
try {
  Font.register({
    family: 'Dongle',
    fonts: [
      {
        src: '/fonts/Dongle-Light.ttf',
        fontWeight: 300,
      },
      {
        src: '/fonts/Dongle-Regular.ttf',
        fontWeight: 400,
      },
      {
        src: '/fonts/Dongle-Bold.ttf',
        fontWeight: 700,
      },
    ],
  });

  // Register fallback for hyphenation
  Font.registerHyphenationCallback((word) => [word]);

  console.log('Dongle fonts registered successfully from local files');
} catch (error) {
  console.error('Failed to register Dongle fonts:', error);
  // Fallback to Helvetica
  Font.registerHyphenationCallback((word) => [word]);
}
