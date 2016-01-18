import { expect } from 'chai';
import getInfo from '../src/getInfo';
import svg from './svg';

const expected = { minX: 0, minY: 0, width: 8, height: 8, modeStrokeWidth: 1 };

describe('getInfo', () => {
  it('should get expected info', () => expect(getInfo(svg)).to.deep.equal(expected));
});
