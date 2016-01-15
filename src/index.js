import loaderUtils from 'loader-utils';
import svgo from './svgo';
import toTemplateFunction from './toTemplateFunction';

module.exports = function svgIconLoader(content) {
  this.cacheable(); // Flag loader as cacheable
  const query = loaderUtils.parseQuery(this.query);

  svgo(content, query.svgoConfig ,
    ({ data: svg }) => query.svgo ? toTemplateFunction(svg) : toTemplateFunction(content));
};
