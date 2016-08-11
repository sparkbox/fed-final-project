var connect = require('connect');
var compression = require('compression');
var serveStatic = require('serve-static');
var auth = require('basic-auth');

var app = connect();
var port = process.env.PORT || 8000;
var userName = process.env.USER || 'user';
var password = process.env.PASSWORD || 'password';

app.use(compression());

if (process.env.NODE_ENV === 'production') {
  app.use(function(req, res, next) {
      var user = auth(req);
      if (user === undefined || user['name'] !== userName || user['pass'] !== password) {
          res.statusCode = 401;
          res.setHeader('WWW-Authenticate', 'Basic realm="MyRealmName"');
          res.end('Unauthorized');
      } else {
          next();
      }
  });
}
app.use(serveStatic(__dirname + '/dist'));

app.listen(port, function() {
  console.log('Server started on ' + port);
});
