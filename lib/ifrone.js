export default function iphrame(transmitter, receiver) {
  const listeners = { onInit: [console.log] };

  listeners['onInit'] = [];
  listeners['onInit'].push(e => {
    console.debug('INIT', e);
  });

  const instance = {
    // define new listeners for messages
    on: (eventId, handler) => {
      listeners[eventId] = listeners[eventId] || [];
      listeners[eventId].push(handler);
    },

    // define listeners for ack messages sent using "send" function
    ack: (eventId, handler) => {
      listeners[`ACK-${eventId}`] = listeners[`ACK-${eventId}`] || [];
      listeners[`ACK-${eventId}`].push(handler);
    },

    // send message to the target window
    send: (eventId, message) => {
      transmitter.message({ eventId, message });
    },

    disconnect: () => {
      receiver.removeListener('message');
    }
  };

  receiver.addListener('message', event => {
    const {
      data: { eventId, message }
    } = event;
    const handlers = listeners[eventId];
    if (handlers) {
      handlers.forEach(handler => {
        handler(message, { event });
        instance.send(`ACK-${eventId}`, 'ok');
      });
    }
  });

  return instance;
}
