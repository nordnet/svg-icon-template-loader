import { expect } from 'chai';
import { svgo } from '../src/svgo';
import svgData from './svg';

describe('svgo()', () => {
  it('should return a svg string',
    () => svgo(svgData, {}, ({ data: svg }) => expect(svg).to.be.a('string')));
});
