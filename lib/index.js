function initListeners() {
  const listener = {
    listeners: { onInit: [console.log] },
    ackListeners: {}
  };

  listener.listeners['onInit'] = [];
  listener.listeners['onInit'].push(e => {
    console.debug('INIT', e);
  });

  listener.on = (event, handler) => {
    listener.listeners[event] = listener.listeners[event] || [];
    listener.listeners[event].push(handler);
  };

  listener.ack = (event, handler) => {
    listener.listeners[`ACK-${event}`] =
      listener.listeners[`ACK-${event}`] || [];
    listener.listeners[`ACK-${event}`].push(handler);
  };

  return listener;
}

export function emissor(win, host) {
  const messager = win.postMessage;
  return {
    send(eventId, message) {
      messager({ eventId, message }, host);
    }
  };
}

export function listener(messager, host, listener) {
  window.addEventListener('message', event => {
    const {
      data: { eventId, message }
    } = event;
    const handlers = listener.listeners[eventId];
    if (handlers) {
      handlers.forEach(handler => {
        handler(message, { event });
        messager({ eventId: `ACK-${eventId}`, message: 'ok' }, host);
      });
    }
  });

  return listener;
}

export function init({ to: windowEle, host }) {
  const handlers = initListeners();
  const messager = windowEle.postMessage;
  return {
    emissor: emissor(windowEle, host),
    listener: listener(messager, host, handlers)
  };
}
