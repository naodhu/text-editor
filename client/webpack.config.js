const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackPwaManifest = require("webpack-pwa-manifest");
const path = require("path");
const { InjectManifest } = require("workbox-webpack-plugin");

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: "development",
    entry: {
      main: "./src/js/index.js",
      install: "./src/js/install.js",
      database: "./src/js/database.js",
      editor: "./src/js/editor.js",
      header: "./src/js/header.js",
    },
    output: {
      filename: "[name].bundle.js",
      path: path.resolve(__dirname, "dist"),
    },
    plugins: [
      // TODO: Add a plugin to generate an HTML file with the <script> injected.
      new HtmlWebpackPlugin({
        template: "./index.html",
        title: "JATE",
      }),
      // TODO:  to inject the custom service worker code into the generated service worker.
      new InjectManifest({
        swSrc: "./src-sw.js",
        swDest: "src-sw.js",
      }),
      // TODO: Add a plugin to generate a manifest.json file for PWA
      new WebpackPwaManifest({
        fingerprints: false, // disable the fingerprints
        inject: true, // inject the manifest.json into the html
        name: "A simple text editor", // the name of the app
        short_name: "JATE", // the short name of the app
        description: "JATE is a simple text editor", // the description of the app
        background_color: "#225ca3", // the background color for the app
        theme_color: "#225ca3", // the theme color for the app
        start_url: "/", // the url to start the app from
        publicPath: "/", // the url to start the app from
        icons: [
          {
            src: path.resolve("src/images/logo.png"), // source image(s)
            sizes: [96, 128, 192, 256, 384, 512], // multiple sizes
            destination: path.join("assets", "icons"), // This will output the icons to the `assets/icons` folder
          },
        ],
      }),
    ],

    module: {
      rules: [
        {
          test: /\.css$/i, // regex to match all css files
          use: ["style-loader", "css-loader"], // use these loaders
        },
        {
          test: /\.m?js$/, // regex to match all js files
          exclude: /node_modules/,
          // use babel-loader to transpile JavaScript files
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"], // use this preset
              plugins: [
                "@babel/plugin-transform-runtime", // use this plugin
                "@babel/plugin-proposal-object-rest-spread",
              ],
            },
          },
        },
      ],
    },
  };
};
