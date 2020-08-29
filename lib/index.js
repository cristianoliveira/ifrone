import iphrame from './iphrame';

export function init({ to: toWindow, host, from = window }) {
  const { postMessage } = toWindow;
  const { addEventListener } = from;

  return iphrame(addEventListener, postMessage, host);
}
