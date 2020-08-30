import ifrone from './ifrone';

const listeners = {};
const addEventListener = (event, callback) => {
  listeners[event] = callback;
};

const sendFakeMessage = data => {
  listeners['message'](data);
};

describe('ifrone', () => {
  let iph, mockedPostMessage;
  beforeEach(function () {
    mockedPostMessage = jest.fn();
    iph = ifrone(addEventListener, mockedPostMessage, '*');
  });

  describe('listening messages', () => {
    it('handles registered events', () => {
      const eventId = 'foo';
      const handler = jest.fn();
      iph.on(eventId, handler);

      const event = { data: { eventId: 'foo', message: 'bar' } };
      sendFakeMessage(event);

      expect(handler).toHaveBeenCalledWith('bar', { event });
    });

    it('does not call the handler if the eventId is unknown', () => {
      const eventId = 'foo';
      const handler = jest.fn();
      iph.on(eventId, handler);

      const event = { data: { eventId: 'not_foo', message: 'bar' } };
      sendFakeMessage(event);

      expect(handler).not.toHaveBeenCalledWith('bar', { event });
    });

    it('send ack message when event is handled', () => {
      const eventId = 'foo';
      const handler = jest.fn();
      iph.on(eventId, handler);

      const event = { data: { eventId: 'foo', message: 'bar' } };
      sendFakeMessage(event);

      expect(handler).toHaveBeenCalledWith('bar', { event });
      expect(mockedPostMessage).toHaveBeenCalledWith(
        {
          eventId: 'ACK-foo',
          message: 'ok'
        },
        '*'
      );
    });
  });

  describe('sending messages', () => {
    it('send the message in the right format', () => {
      const eventId = 'myEvent';
      const message = 'myMessage';

      iph.send(eventId, message);

      expect(mockedPostMessage).toHaveBeenCalledWith({ eventId, message }, '*');
    });
  });
});
