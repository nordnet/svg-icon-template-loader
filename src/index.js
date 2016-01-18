import loaderUtils from 'loader-utils';
import { svgo } from './svgo';
import { toTemplateFunction } from './toTemplate';

module.exports = function svgIconLoader(content) {
  this.cacheable(); // Flag loader as cacheable
  const query = loaderUtils.parseQuery(this.query);
  const svgoEnabled = query.svgo !== undefined ? query.svgo : true;

  svgo(content, query.svgoConfig,
    ({ data: svg }) => svgoEnabled ? toTemplateFunction(svg) : toTemplateFunction(content));
};
