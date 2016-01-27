# SVG Icon Template Loader

> Turns your SVG icons into functions that allow you to specify overrides for common SVG attributes such as root element, fill, stroke and stroke width.

[![NPM version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Dependency Status][depstat-image]][depstat-url]

## Installation

`npm install --save-dev svg-icon-template-loader`

## Usage

``` javascript
import iconClose from 'svg-icon-template-loader!./close.svg';
// => returns the SVG as a function that takes an options object containing overrides such as root element, fill, stroke and stroke width.

iconClose({ rootElement: 'symbol', stroke: '#ff0000', strokeWidth: 4 });
// {
//   data: '<symbol viewBox="-1 -1 10 10" xmlns="http://www.w3.org/2000/svg"><g stroke="#ff0000" stroke-width="4" fill="none" fill-rule="evenodd"><path d="M.7 7.3L7.3.7M7.3 7.3L.7.7"/></g></symbol>',
//   originalInfo: { minX: 0, minY: 0, width: 8, height: 8, modeStrokeWidth: 2 },
//   info: { minX: -1, minY: -1, width: 10, height: 10 }
// }
```
**Note:** If you've already defined loaders for SVG files in the configuration, you can override the [loader order](https://webpack.github.io/docs/loaders.html#loader-order) by writing `!!svg-icon-template-loader!./close.svg` to disable all loaders specified in the configuration for that module request.

**Supported overrides:**
- rootElement
- fill
- stroke
- strokeWidth

## Options

You can pass options to the loader via [query parameters](http://webpack.github.io/docs/using-loaders.html#query-parameters).

### svgo
``` javascript
import iconClose from 'svg-icon-template-loader?svgo=false!./close.svg';
// default is true
```

### svgoConfig
``` javascript
const svgoConfig = JSON.stringify({
  plugins: [
    { removeTitle: true },
    { removeDimensions: true },
    { convertColors: { shorthex: true } },
  ],
})

import iconClose from `svg-icon-template-loader?svgoConfig=${ svgoConfig }!./close.svg`;
```

## License

This open source project released by Nordnet is licensed under the [MIT license](http://www.opensource.org/licenses/mit-license.php).

[npm-url]: https://npmjs.org/package/svg-icon-template-loader
[npm-image]: https://img.shields.io/npm/v/svg-icon-template-loader.svg

[travis-url]: https://travis-ci.org/nordnet/svg-icon-template-loader
[travis-image]: https://travis-ci.org/nordnet/svg-icon-template-loader.svg?branch=master

[depstat-url]: https://david-dm.org/nordnet/svg-icon-template-loader
[depstat-image]: https://david-dm.org/nordnet/svg-icon-template-loader.svg
