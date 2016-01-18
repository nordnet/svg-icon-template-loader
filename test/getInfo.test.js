import { expect } from 'chai';
import getInfo from '../src/getInfo';
import svgData from './svg';
import svgo from '../src/svgo';

const expected = { minX: 0, minY: 0, width: 8, height: 8, modeStrokeWidth: 2 };

describe('getInfo', () => {
  it('should get expected info', () => {
    svgo(svgData, {}, ({ data: svg }) => {
      expect(getInfo(svg)).to.deep.equal(expected);
    });
  });
});
