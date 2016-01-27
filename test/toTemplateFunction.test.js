import { expect } from 'chai';
import { svgo } from '../src/svgo';
import toTemplateFunction from '../src/toTemplateFunction';
import svgData from './svg';

describe('toTemplateFunction()', () => {
  it('should return a function as a string', () =>
    svgo(svgData, {}, ({ data: svg }) => expect(toTemplateFunction(svg)).to.be.a('string')));
});
