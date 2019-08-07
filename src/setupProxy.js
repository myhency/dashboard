const proxy = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    proxy('/api', {
      target: 'http://10.40.111.60:8000/',
      changeOrigin: true
    })
  );
  app.use(
    proxy('/auth', {
      target: 'http://localhost:3000/',
      changeOrigin: true
    })
  );
};