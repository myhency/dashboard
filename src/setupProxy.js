const proxy = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    proxy('/api', {
      target: process.env.REACT_APP_BAAS_BACKEND_URL,
      changeOrigin: true
    }),
    proxy('/socket', {
      target: process.env.REACT_APP_BAAS_SOCKET,
      changeOrigin: true
    })
  );
};