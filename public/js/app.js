const express = require('express');
const app = express();
const path = require('path');
const request = require('request');

const client_id = 'C9FIcmwcSRmrVUhtwj5r';
const client_secret = 'gtwKHXLqnB';

// Static files
app.use(express.static(path.join(__dirname, 'public')));

app.get('/search/blog', (req, res) => {
  const api_url = 'https://openapi.naver.com/v1/search/blog?query=' + encodeURI(req.query.query);
  const options = {
    url: api_url,
    headers: {
      'X-Naver-Client-Id': client_id,
      'X-Naver-Client-Secret': client_secret
    }
  };
  request.get(options, (error, response, body) => {
    if (!error && response.statusCode == 200) {
      res.writeHead(200, { 'Content-Type': 'application/json;charset=utf-8' });
      res.end(body);
    } else {
      res.status(response.statusCode).end();
      console.log('error = ' + response.statusCode);
    }
  });
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(3000, () => {
  console.log('http://127.0.0.1:3000 app listening on port 3000!');
});
