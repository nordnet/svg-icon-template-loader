import { expect } from 'chai';
import svgo from '../src/svgo';
import toTemplateFunction from '../src/toTemplateFunction';
// import util from 'util';

const svgData = '<?xml version="1.0" encoding="UTF-8" standalone="no"?><svg width="8px" height="8px" viewBox="0 0 8 8" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns"><!-- Generator: Sketch 3.4.3 (16044) - http://www.bohemiancoding.com/sketch --><title>close</title><desc>Created with Sketch.</desc><defs></defs><g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g id="close" sketch:type="MSLayerGroup" stroke="#00A8EF" stroke-width="2"><path d="M0.700012207,7.29998779 L7.29998779,0.700012207" id="Path-4" sketch:type="MSShapeGroup"></path><path d="M7.29998779,7.29998779 L0.700012207,0.700012207" id="Path-4" sketch:type="MSShapeGroup"></path></g></g></svg>';

describe('svgo', function() {
  it('should return a svg string and an info object', function() {
    svgo(svgData, {}, ({ data: svg }) => {
      console.log(toTemplateFunction(svg));
      // console.log(util.inspect(myObject, false, null));
      expect(svg).to.be.a('string');
    });
  });
});
