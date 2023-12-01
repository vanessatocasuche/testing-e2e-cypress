module.exports = {
  // ... otras configuraciones de webpack

  module: {
    rules: [
      {
        test: /\.csv$/,
        use: ['csv-loader'],
      },
    ],
  },
};
