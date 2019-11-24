const express = require("express");
const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");
const path = require('path');

// Create a new Express app
const app = express();

// Set up Auth0 configuration
const authConfig = {
  domain: "lekansogunle.eu.auth0.com",
  audience: "http://localhost:3000"
};

// Define middleware that validates incoming bearer tokens
// using JWKS from lekansogunle.eu.auth0.com
const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${authConfig.domain}/.well-known/jwks.json`
  }),

  audience: authConfig.audience,
  issuer: `https://${authConfig.domain}/`,
  algorithm: ["RS256"]
});


app.use(express.static(path.join(__dirname, 'build')));


app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Define an endpoint that must be called with an access token
app.get("/api/external", checkJwt, (req, res) => {
  res.send({
    msg: "Your Access Token was successfully validated!"
  });
});

// Start the app
app.listen(process.env.PORT || 3001, () => console.log('API listening on 3001'));