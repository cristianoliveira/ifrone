export function transmitter(windowElement, host) {
  const { postMessage } = windowElement;
  return {
    message: message => postMessage(message, host)
  };
}

export function receiver(windowElement) {
  const addEventListener =
    windowElement.addEventListener || windowElement.attachEvent;

  const removeEventListener =
    windowElement.removeEventListener || windowElement.detachEvent;

  return {
    addListener: addEventListener,
    removeListener: removeEventListener
  };
}
