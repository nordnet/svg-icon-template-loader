function rootElemHandler(match, originalValue, contents) {
  return `<' + (options.rootElement || '${ originalValue }') + ' ' + '${ contents }' + '</' + (options.rootElement || '${ originalValue }')  + '>`;
}

function viewBoxHandler(match, originalValue) {
  const viewBox = originalValue.split(' ').map((value, index) => {
    if (index < 2) return `(${ value } - (strokeWidthDifference / -2))`;
    return `(${ value } - strokeWidthDifference)`;
  }).join(" + ' ' + ");

  return `viewBox="' + ${ viewBox } + '"`;
}

function fillHandler(match, originalValue) {
  return `fill="' + (options.fill || '${ originalValue }') + '"`;
}

function strokeHandler(match, originalValue) {
  return `stroke="' + (options.stroke || '${ originalValue }') + '"`;
}

function strokeWidthHandler(match, originalValue) {
  return `stroke-width="' + (options.strokeWidth || '${ originalValue }') + '"`;
}

const regexes = [
  [/^<(.+?)\s(.+)<\/(.+)>$/g, rootElemHandler],
  [/viewBox=\"(.+?)\"/g, viewBoxHandler],
  [/fill=\"((?!none).+?)\"/g, fillHandler],
  [/stroke=\"((?!none).*?)\"/g, strokeHandler],
  [/stroke-width=\"((?!0).*?)\"/g, strokeWidthHandler],
];

export default function toTemplateString(svg) {
  return regexes.reduce((data, regex) => {
    return ''.replace.apply(data, regex);
  }, svg);
}
