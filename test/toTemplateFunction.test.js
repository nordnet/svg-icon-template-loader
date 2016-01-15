import { expect } from 'chai';
import svgo from '../src/svgo';
import toTemplateFunction from '../src/toTemplateFunction';
import svgData from './svg';

describe('toTemplateFunction()', function() {
  it('should return a function as a string', function() {
    svgo(svgData, {}, ({ data: svg }) => {
      const templateFunction = toTemplateFunction(svg);
      console.log(templateFunction);
      expect(templateFunction).to.be.a('string');
    });
  });
});
