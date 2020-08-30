import ifrone from './ifrone';

export function init({ to: toWindow, host, from = window }) {
  const { postMessage } = toWindow;
  const { addEventListener } = from;

  return ifrone(addEventListener, postMessage, host);
}
