function initListeners(addEventListener, messager, host) {
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
    on: (event, handler) => {
      listeners[event] = listeners[event] || [];
      listeners[event].push(handler);
    },
    ack: (event, handler) => {
      listeners[`ACK-${event}`] = listeners[`ACK-${event}`] || [];
      listeners[`ACK-${event}`].push(handler);
    }
  };
}

export function sender(messager, host) {
  return (eventId, message) => {
    messager({ eventId, message }, host);
  };
}

export function init({ to: toWindow, host, from = window }) {
  const { postMessage } = toWindow;
  const { addEventListener } = from;

  const { on, ack } = initListeners(addEventListener, postMessage, host);
  const send = sender(postMessage, host);

  return {
    send,
    on,
    ack
  };
}
