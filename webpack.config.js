module.exports = {
  mode: "production",
  entry: "./asye.ts",
  output: {
      filename: "asye.js",
      path: __dirname
  },
  target: "node",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
};
