import { transmitter, receiver } from './dial-peer';

describe('dial peers', () => {
  describe('Transmissor', () => {
    it('is created from a window element', () => {
      const mockedWindow = {
        postMessage: jest.fn()
      };

      const instance = transmitter(mockedWindow, '*');

      expect(instance).not.toBeNull();
      expect(typeof instance.message).toBe('function');
    });

    it('sends message using postMessage', () => {
      const message = { text: 'foo' };
      const mockedWindow = {
        postMessage: jest.fn()
      };

      const instance = transmitter(mockedWindow, '*');
      instance.message(message);

      expect(mockedWindow.postMessage).toHaveBeenCalledWith(message, '*');
    });
  });

  describe('Receiver', () => {
    it('is created from a window element', () => {
      const mockedWindow = {
        addEventListener: jest.fn(),
        removeEventListener: jest.fn()
      };

      const instance = receiver(mockedWindow);

      expect(instance).not.toBeNull();
      expect(instance.addListener).toBe(mockedWindow.addEventListener);
      expect(instance.removeListener).toBe(mockedWindow.removeEventListener);
    });

    it('is created from a window element from old browsers', () => {
      const mockedWindow = {
        attachEvent: jest.fn(),
        detachEvent: jest.fn()
      };

      const instance = receiver(mockedWindow);

      expect(instance).not.toBeNull();
      expect(instance.addListener).toBe(mockedWindow.attachEvent);
      expect(instance.removeListener).toBe(mockedWindow.detachEvent);
    });

    it('calls the given windows element function to start listening', () => {
      const mockedWindow = {
        addEventListener: jest.fn(),
        removeEventListener: jest.fn()
      };
      const callback = jest.fn();

      const instance = receiver(mockedWindow);
      instance.addListener('foo', callback);
      instance.removeListener('foo');

      expect(mockedWindow.addEventListener).toHaveBeenCalledWith(
        'foo',
        callback
      );
      expect(mockedWindow.removeEventListener).toHaveBeenCalledWith('foo');
    });
  });
});
