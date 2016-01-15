function viewBoxParser(string) {
  const values = string[0].split(' ');
  const valueNames = {
    0: 'minX',
    1: 'minY',
    2: 'width',
    3: 'height',
  };

  return Object.assign.apply(this, values.map((value, index) => {
    return { [valueNames[index]]: parseInt(value, 10) };
  }));
}

function getModeStrokeWidth(strings) {
  const store = strings.map(number => parseInt(number, 10));
  const frequency = {};  // array of frequency.
  let max = 0;  // holds the max frequency.
  let result;   // holds the max frequency element.

  store.forEach((value) => {
    const key = value.toString();
    frequency[key] = (frequency[key] || 0) + 1;
    if (frequency[key] > max) {
      max = frequency[key];
      result = value;
    }
  });

  return {
    modeStrokeWidth: result,
  };
}

const regexes = [
  [/viewBox=\"(.+?)\"/g, viewBoxParser],
  [/stroke-width=\"((?!0).*?)\"/g, getModeStrokeWidth],
];

export default function (svg) {
  return Object.assign.apply(this, regexes.map(([regex, handler]) => {
    let matches = [];
    let match = regex.exec(svg);

    while (match) {
      matches = matches.concat(match.slice(1));
      match = regex.exec(svg);
    }

    return handler(matches);
  }));
}
