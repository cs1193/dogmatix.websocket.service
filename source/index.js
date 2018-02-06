/* @flow */

import express from 'express';
import http from 'http';
import url from 'url';
import websocket from 'ws';

const HOST = process.env.HOST || '0.0.0.0';
const PORT = process.env.PORT || 3000;

const app = express();

app.use((req, res) => {
  res.send({
    msg: 'hello',
  });
});

const server = http.createServer(app);
const wss = new websocket.Server({
  server,
});

wss.on('connection', (ws, req) => {
  const location = url.parse(req.url, true);

  ws.on('message', (message) => {
    console.log(`Received ${message} ${JSON.stringify(location)}`);
  });

  console.log(wss.clients.size, clients);

  ws.send('something');
});

server.listen(PORT, HOST, () => {
  console.log(`Listening on ${server.address().port}`);
});
