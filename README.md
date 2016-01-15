# SVG Icon Template Loader

> Turns your SVG icons into functions that allow you to specify overrides for common SVG attributes such as fill, stroke, stroke width etc.

## Installation

`npm install --save-dev svg-icon-template-loader`

## Usage

``` javascript
import iconClose from 'svg-icon-template-loader!./close.svg';
// => returns the SVG as a function that takes an options object to specify overrides such as fill, stroke, stroke width etc.
```
**Note:** If you've already defined loaders for SVG files in the configuration, you can override the [loader order](https://webpack.github.io/docs/loaders.html#loader-order) by writing `!!svg-icon-template-loader!./close.svg` to disable all loaders specified in the configuration for that module request.

## Options

You can pass options to the loader via [query parameters](http://webpack.github.io/docs/using-loaders.html#query-parameters).

## License

MIT (http://www.opensource.org/licenses/mit-license.php)
