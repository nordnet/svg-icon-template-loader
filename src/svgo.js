import Svgo from 'svgo';

export default function (data, config = {}, callback) {
  const defaultConfig = {
    plugins: [
      { removeTitle: true },
      { removeDimensions: true },
      { convertColors: { shorthex: true } },
    ],
  };

  const svgo = new Svgo(Object.assign({}, defaultConfig, config));
  svgo.optimize(data, result => callback(result));
}
