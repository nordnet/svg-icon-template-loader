import loaderUtils from 'loader-utils';
import svgo from './svgo';
import toTemplateFunction from './toTemplateFunction';

module.exports = function svgIconLoader(content) {
  this.cacheable(); // Flag loader as cacheable
  const query = loaderUtils.parseQuery(this.query);
  const svgoEnabled = true || query.svgo;
  const svgoConfig = {} || query.svgoConfig;

  svgo(content, svgoConfig, ({ data: svg }) => {
    if (svgoEnabled) return toTemplateFunction(svg);
    return toTemplateFunction(content);
  });
};
