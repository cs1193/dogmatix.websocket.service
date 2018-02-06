import ExtendableError from './ExtendableError';

export default ServerProtocolError extends ExtendableError {
  constructor(message = 'Server Protocol Error') {
    super(message);
  }
}
