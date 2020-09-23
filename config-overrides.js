const {
    override,
    fixBabelImports,
    addLessLoader,
    addWebpackAlias
  } = require("customize-cra");
const rewireReactHotLoader = require("react-app-rewire-hot-loader");
  
  const addEntry = (config) =>{
    let _entry = [];
    _entry.push(config.entry[1]);
    _entry.push(config.entry[0]);
    config.entry = _entry;
    return config;
  }
  
  module.exports = override(
    // addEntry,
    addWebpackAlias({
      "react-dom": "@hot-loader/react-dom"
    }),
    fixBabelImports("import", {
      // libraryName: "antd",
      libraryDirectory: "es",
      // style:'css'
    }),
    addLessLoader({
      javascriptEnabled: true,
      // modifyVars: {
      //   "@table-padding-vertical": "10px",
      //   "@table-padding-horizontal": "10px",
      //   // "@card-head-padding":"10px",
      //   "@tabs-bar-margin": "5px",
      //   "@form-item-margin-bottom": "15px"
      // }
    }),
    // addPostcssPlugins(postcssPlugin),
  
    (config, env) => rewireReactHotLoader(config, env),
  );
  