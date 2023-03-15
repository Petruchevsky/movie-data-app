const path = require('path');

module.exports = function override(config) {
  config.resolve.fallback = {
    "https": require.resolve("https-browserify"),
    "http": require.resolve("stream-http"),
    "os": require.resolve("os-browserify/browser"),
    "buffer": require.resolve("buffer/"),
    "url": require.resolve("url/"),
    "stream": require.resolve("stream-browserify"),
    "path": require.resolve("path-browserify"),
    "constants": require.resolve("constants-browserify"),
    "util": require.resolve("util/"),
    "fs": false,
    "crypto": require.resolve('crypto-browserify')
  };

  return config;
}
