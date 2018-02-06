/* @flow */

import { EventEmitter } from 'events';

import base64id from 'base64id';
import websocket from 'ws';

import ServerProtocolError from '../errors/ServerProtocolError';

import type { ServerOptions } from './Server.type';

export default class Server extends EventEmitter {
  constructor(options: ServerOptions = {}) {
    super();

    var wssOptions = options;
    this.wss = new websocket.Server(wssOptions);
    this.wss.on('error', this.handleServerError.bind(this));
    this.wss.on('connection', this.handleSocketConnection.bind(this));
  }

  generateId() {
    return base64id.generateId();
  }

  handleServerError(error) {
    if (typeof error == 'string') {
      error = new ServerProtocolError(error);
    }
    this.emit('error', error);
  }

  handleSocketError(error) {
    this.emit('warning', error);
  }

  handleSocketConnection() {
    // Add Socket Client here
    let id = this.generateId();
  }
}
