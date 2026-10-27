// Karma + Jasmine + webpack (Babel). Navegador por defecto: Chrome sin interfaz.
// Sin Chrome instalado: npm run test:jsdom
const path = require("path");
const webpack = require("webpack");

const conCobertura = process.env.COVERAGE === "1";
const navegador = process.env.KARMA_BROWSER === "jsdom" ? "jsdom" : "ChromeHeadlessCI";

module.exports = function (config) {
  config.set({
    basePath: "",
    frameworks: ["jasmine", "webpack"],
    plugins: [
      "karma-jasmine",
      "karma-webpack",
      "karma-chrome-launcher",
      "karma-jsdom-launcher",
      "karma-spec-reporter",
      "karma-coverage",
    ],
    files: [{ pattern: "test/index.ts", watched: false }],
    preprocessors: { "test/index.ts": ["webpack"] },
    webpack: {
      mode: "development",
      devtool: false,
      resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx"],
        alias: {
          "@": path.resolve(__dirname),
          // mocks de módulos de Next para poder probar los componentes en el navegador
          "next/link$": path.resolve(__dirname, "test/mocks/next-link.tsx"),
          "next/navigation$": path.resolve(__dirname, "test/mocks/next-navigation.ts"),
        },
      },
      module: {
        rules: [
          {
            test: /\.[jt]sx?$/,
            exclude: /node_modules/,
            use: {
              loader: "babel-loader",
              options: {
                presets: [
                  ["@babel/preset-env", { targets: { chrome: "100" } }],
                  ["@babel/preset-react", { runtime: "automatic" }],
                  "@babel/preset-typescript",
                ],
                plugins: conCobertura
                  ? [["istanbul", { exclude: ["test/**", "**/*.spec.ts", "**/*.spec.tsx"] }]]
                  : [],
              },
            },
          },
        ],
      },
      plugins: [new webpack.DefinePlugin({ "process.env.NODE_ENV": JSON.stringify("test") })],
    },
    reporters: conCobertura ? ["spec", "coverage"] : ["spec"],
    coverageReporter: {
      dir: "coverage",
      reporters: [
        { type: "html", subdir: "html" },
        { type: "text-summary" },
        { type: "json-summary", subdir: ".", file: "resumen.json" },
        { type: "text", subdir: ".", file: "detalle.txt" },
      ],
    },
    browsers: [navegador],
    customLaunchers: {
      ChromeHeadlessCI: { base: "ChromeHeadless", flags: ["--no-sandbox"] },
    },
    singleRun: true,
    restartOnFileChange: true,
  });
};
