import Svgo from 'svgo';

const defaultConfig = {
  plugins: [
    { removeTitle: true },
    { removeDimensions: true },
    { convertColors: { shorthex: true }},
  ],
};

export default function(data, config = {}, callback) {
  const svgo = new Svgo(Object.assign({}, defaultConfig, config));
  svgo.optimize(data, result => callback(result));
}
