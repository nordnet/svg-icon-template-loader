import { expect } from 'chai';
import getInfo from '../src/getInfo';
import svg from './svg';

const expected = { minX: 1, minY: 2, width: 3, height: 4, modeStrokeWidth: 1 };

describe('getInfo', () => {
  it('should get expected info',
    () => expect(getInfo(svg)).to.deep.equal(expected));
});
