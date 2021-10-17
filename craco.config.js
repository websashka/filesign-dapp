const BabelRcPlugin = require("@jackwilsdon/craco-use-babelrc");
const CracoAlias = require("craco-alias");
const CracoLessPlugin = require("craco-less");

// const stylesConfig = require('./config/styles.json')
// const lessVars = Object.fromEntries(Object.entries(stylesConfig.vars).map(([key,value])=>['@'+key, value]))

module.exports = ({ env }) => ({
  plugins: [
    { plugin: BabelRcPlugin },
    {
      plugin: CracoAlias,
      options: {
        source: "jsconfig",
        baseUrl: "./src"
      }
    },
    { plugin: CracoLessPlugin }
  ],
});
