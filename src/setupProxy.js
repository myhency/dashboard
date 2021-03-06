const proxy = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    proxy('/api', {
      target: process.env.REACT_APP_BAAS_BACKEND_URL,
      changeOrigin: true
    }),
    proxy('/socket', {
      target: process.env.REACT_APP_BAAS_SOCKET,
      ws: true
    })
  );
  app.use(
    proxy('/node', {
      target: process.env.REACT_APP_BAAS_AUTH_BACKEND_URL,
      changeOrigin: true
    })
  );
  app.use(
    proxy('/socket', {
      target: process.env.REACT_APP_BAAS_SOCKET,
      ws: true
    })
  );
};