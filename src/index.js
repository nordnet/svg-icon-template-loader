import loaderUtils from 'loader-utils';
import { svgo } from './svgo';
import { toTemplateFunction } from './toTemplate';

module.exports = function svgIconLoader(content) {
  this.cacheable(); // Flag loader as cacheable
  const callback = this.async();
  const query = loaderUtils.parseQuery(this.query);
  const svgoEnabled = query.svgo !== undefined ? query.svgo : true;

  svgo(content, query.svgoConfig, ({ data: svg }) => {
    if (svgoEnabled) {
      callback(null, toTemplateFunction(svg));
    } else {
      callback(null, toTemplateFunction(content));
    }
  });
};
