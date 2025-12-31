import { Font } from '@react-pdf/renderer';

// Register Korean font from local file
// Font file is served from /public/fonts/NanumGothic.ttf
try {
  Font.register({
    family: 'NanumGothic',
    src: '/fonts/NanumGothic.ttf',
  });

  // Register fallback for hyphenation
  Font.registerHyphenationCallback((word) => [word]);

  console.log('Korean fonts (NanumGothic) registered successfully from local file');
} catch (error) {
  console.error('Failed to register Korean fonts:', error);
  // Fallback to Helvetica
  Font.registerHyphenationCallback((word) => [word]);
}
