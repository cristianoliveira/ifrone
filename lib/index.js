import ifrone from './ifrone';
import { transmitter, receiver } from './dial-peer';

export function connect({ to: toWindow, host, from: fromWindow }) {
  const transmitter = transmitter(toWindow);
  const receiver = receiver(fromWindow);

  return ifrone(from, emitter, host);
}
