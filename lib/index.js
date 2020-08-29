function createListeners(addEventListener, messager, host) {
  const listeners = { onInit: [console.log] };

  listeners['onInit'] = [];
  listeners['onInit'].push(e => {
    console.debug('INIT', e);
  });

  addEventListener('message', event => {
    const {
      data: { eventId, message }
    } = event;
    const handlers = listeners[eventId];
    if (handlers) {
      handlers.forEach(handler => {
        handler(message, { event });
        messager({ eventId: `ACK-${eventId}`, message: 'ok' }, host);
      });
    }
  });

  return {
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
      messager({ eventId, message }, host);
    }
  };
}

export function init({ to: toWindow, host, from = window }) {
  const { postMessage } = toWindow;
  const { addEventListener } = from;

  return createListeners(addEventListener, postMessage, host);
}
