import Svgo from 'svgo';

export default function(data, config, callback) {
  const svgo = new Svgo(Object.assign({
    plugins: [
      { removeTitle: true },
      { removeDimensions: true },
      { convertColors: { shorthex: true } },
    ],
  }, config));
  svgo.optimize(data, result => {
    callback(result);
  });
}
