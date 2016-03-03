function viewBoxParser(string) {
  const viewBoxValuesNames = {
    0: 'minX',
    1: 'minY',
    2: 'width',
    3: 'height',
  };

  const values = string[0].split(' ');
  return values.reduce((result, value, index) => {
    return Object.assign(result, getViewBoxValue(value, index, viewBoxValuesNames));
  }, {});
}

function getViewBoxValue(value, index, viewBoxValuesNames) {
  return { [viewBoxValuesNames[index]]: parseInt(value, 10) };
}

function getModeStrokeWidth(strings) {
  if (strings.length > 0) {
    const frequency = strings.reduce(
      (result, value) => Object.assign(result, { [value]: (result[value] || 0) + 1 }), {});

    const maxFrequencyKey = Object.keys(frequency).reduce(
      (previous, current) => frequency[current] > frequency[previous] ? current : previous);

    return {
      modeStrokeWidth: parseInt(maxFrequencyKey, 10),
    };
  }

  return {
    modeStrokeWidth: 1,
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
