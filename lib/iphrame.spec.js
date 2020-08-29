import iphrame from './iphrame';

const listeners = {};
const addEventListener = (event, callback) => {
  listeners[event] = callback;
};

const sendFakeMessage = data => {
  listeners['message'](data);
};

describe('iphrame', () => {
  let iph;
  beforeEach(function () {
    iph = iphrame(addEventListener, jest.fn(), '*');
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
      iph.send = jest.fn();

      const event = { data: { eventId: 'foo', message: 'bar' } };
      sendFakeMessage(event);

      expect(handler).toHaveBeenCalledWith('bar', { event });
      expect(iph.send).toHaveBeenCalledWith('ACK-foo', 'ok');
    });
  });

  describe('sending messages', () => {
    it('message in the right format', () => {
      const messager = jest.fn();
      iph = iphrame(addEventListener, messager, '*');

      const eventId = 'myEvent';
      const message = 'myMessage';

      iph.send(eventId, message);

      expect(messager).toHaveBeenCalledWith({ eventId, message }, '*');
    });
  });
});
