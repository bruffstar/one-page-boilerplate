# :palm_tree: One-page HTML Boilerplate
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT) ![David](https://img.shields.io/david/dev/bruffstar/one-page-boilerplate)

A super simple boilerplate for generating a (one-page) static HTML website. Includes a minimal Webpack 4 setup with Babel, Sass, Hot Module Replacement, and development/production optimization.

## Installation
```
git clone git@github.com:bruffstar/one-page-boilerplate
npm install
```

## Usage

### Development server

```bash
npm start
```

This will automatically open the development server here:  `localhost:8080`

### Production build

```bash
npm run build
```
This will compile the index.html and all assets into the `\build` folder.

## To Do

- Add comments to Webpack config files
- Add comments about how images are being loaded.
- Add comments about how template variables are being handled.
    - E.g. Need to restart dev-server if `/config/globals.js` has been updated.

## Author

- [Brian Laughlan](https://www.bruffstar.com)

## License

This project is open source and available under the [MIT License](LICENSE).
