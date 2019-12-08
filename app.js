'use strict';

require('dotenv').config()

const express = require('express');
const bodyParser = require('body-parser')

const app = express();

app.use(bodyParser.json());

const textToSpeech = require('./controllers/textToSpeech');

app.post('/', (req, res) => {
  if (req.body.apiKey !== process.env.API_KEY) {
    res
      .status(401)
      .send('Unauthorized')
      .end();
    
    return;
  }

  var result = textToSpeech(req.body.text, req.body.languageCode, req.body.ssmlGender, req.body.name);

  result.then((link) => {
    console.log(result, link);
    res
      .status(200)
      .send(link)
      .end();
  })
});

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});

module.exports = app;
