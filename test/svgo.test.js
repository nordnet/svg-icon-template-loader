import { expect } from 'chai';
import { svgo } from '../src/svgo';
import svgData from './svg';

describe('svgo()', function() {
  it('should return a svg string',
    () => svgo(svgData, {}, ({ data: svg }) => expect(svg).to.be.a('string')));
});
