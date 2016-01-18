import Svgo from 'svgo';

function svgo(data, config = {}, callback) {
  const defaultConfig = {
    plugins: [
      { removeTitle: true },
      { removeDimensions: true },
      { convertColors: { shorthex: true } },
    ],
  };

  const svgoObj = new Svgo(Object.assign({}, defaultConfig, config));
  svgoObj.optimize(data, result => callback(result));
}

module.exports = {
  svgo,
};
