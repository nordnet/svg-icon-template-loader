import getInfo from './getInfo.js';
import toTemplateString from './toTemplateString';

export default function (data) {
  const info = getInfo(data);

  const exportString = `module.exports = function(options) {
    var options = options || {};
    var info = ${ JSON.stringify(info) };
    var strokeWidthDifference = options.strokeWidth > 0 ?
      info.modeStrokeWidth - options.strokeWidth : 0;
    var result = { data: '${ toTemplateString(data) }' };

    if (strokeWidthDifference !== 0) {
      result.originalInfo = info;
      result.info = {};
      result.info.minX = result.originalInfo.minX - (strokeWidthDifference / -2);
      result.info.minY = result.originalInfo.minY - (strokeWidthDifference / -2);
      result.info.width = result.originalInfo.width - strokeWidthDifference;
      result.info.height = result.originalInfo.height - strokeWidthDifference;
    } else {
      result.info = info;
    }

    return result;
  }`;

  return exportString.replace(/\n\s+/g, '');
}
