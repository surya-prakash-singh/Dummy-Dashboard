
module.exports = (api) => {
  const isTest = api.env('test');
  const presets = [
    [
      "@babel/preset-env",
      {
        "useBuiltIns": "entry",
        "targets": {
          "browsers": [">1%", "not ie <= 8", "ie >=11", "not op_mini all"]
        }
      }
    ],
    "@babel/preset-react"
  ];
  let plugins = [
    ["@babel/plugin-transform-runtime", { "regenerator": true }],
    ["@babel/plugin-proposal-object-rest-spread", { "loose": true, "useBuiltIns": true }],
    ["@babel/plugin-transform-object-assign"],
    ["@babel/plugin-syntax-dynamic-import"]
  ];

return {
  presets,
  plugins,
  "env": {
    "test": {
      "plugins": ["babel-plugin-dynamic-import-node"]
    }
  }
}
}
