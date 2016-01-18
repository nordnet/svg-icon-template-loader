const viewBoxValuesNames = {
  0: 'minX',
  1: 'minY',
  2: 'width',
  3: 'height',
};

function viewBoxParser(string) {
  const values = string[0].split(' ');
  return values.reduce(
    (result, value, index) => Object.assign(result, getViewBoxValue(value, index)), {});
}

function getViewBoxValue(value, index) {
  return { [viewBoxValuesNames[index]]: parseInt(value, 10) };
}

function getModeStrokeWidth(strings) {
  const frequency = strings.reduce(
    (result, value) => Object.assign(result, { [value]: (result[value] || 0) + 1 }), {});

  const maxFrequencyKey = Object.keys(frequency).reduce(
    (previous, current) => frequency[current] > frequency[previous] ? current : previous);

  return {
    modeStrokeWidth: parseInt(maxFrequencyKey, 10),
  };
}

const regexes = [
  { regex: /viewBox=\"(.+?)\"/g, handler: viewBoxParser },
  { regex: /stroke-width=\"((?!0).*?)\"/g, handler: getModeStrokeWidth },
];

function mapSvg(svg) {
  return ({ regex, handler }) => {
    const matches = matcher(svg)(regex);
    return handler(matches);
  };
}

function matcher(svg) {
  return function matchRegex(regex) {
    const match = regex.exec(svg);
    return match ? match.slice(1).concat(matchRegex(regex)) : [];
  };
}

export default function getInfo(svg) {
  return Object.assign.apply(this, regexes.map(mapSvg(svg)));
}
