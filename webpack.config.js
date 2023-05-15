module.exports = {
  "output": {
    "filename": "[name].pack.js"
  },
  "module": {

    "rules": [
      {
        "loader": "babel-loader",
        "exclude": /node_modules/,
        "test": /\.js$/
      }
    ]
  },
  mode:"development",
  "entry": {
    "index": "./index"
  },
};