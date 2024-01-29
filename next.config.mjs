const withGoogleFonts = require('next-google-fonts');

module.exports = withGoogleFonts({
  googleFonts: {
    fonts: [
      { family: 'Inter', variants: ['400', '700'] }
    ],
  },
});
