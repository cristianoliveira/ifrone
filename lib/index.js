import ifrone from './ifrone';
import { transmitter, receiver } from './dial-peer';

export function connect({ to: toWindow, host, from: fromWindow }) {
  return ifrone(transmitter(toWindow, host), receiver(fromWindow));
}
