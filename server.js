const path = require('path');
const express = require('express');
const app = express();

// Start the app by listening on the default
// Heroku port
const forceSSL = function() {
    return function (req, res, next) {
      if (req.headers['x-forwarded-proto'] !== 'https') {
        return res.redirect(['https://', req.get('Host'), req.url].join(''));
      }
      next();
    }
  }
  // Instruct the app
  // to use the forceSSL
  // middleware
app.use(forceSSL());

// Run the app by serving the static files
// in the dist directory
app.use(express.static(__dirname + '/dist/heroku1'));

app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname + '/dist/heroku1/index.html'));
  });

app.listen(process.env.PORT || 8080);