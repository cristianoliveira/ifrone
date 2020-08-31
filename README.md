# ifrone. 
[![NPM](https://img.shields.io/npm/v/ifrone.svg)](https://www.npmjs.com/package/ifrone)

A tiny wrapper around cross-window communication.

This feature is normally used for communication between a page host and an iframe.

## Example

```javascript
  <body>
    <iframe id="myiframe" src="./iframe.html" frameborder="0"></iframe>
    <script src="./ifrone.js"></script>
    <script charset="utf-8">
      const iframe = document.getElementById('myiframe');
      var iph = ifrone.connect({
        from: window,
        to: iframe.contentWindow,
        host: '*'
      })

      iph.on('myIframeEvent', (event) => {
        console.log('myIframeEvent', event);
      })

      setInterval(() => {
        iph.send('myHostEvent', 'fooo')
      }, 1000)

      iph.ack('myHostEvent', (event) => {
        console.log('on ack myHostEvent', event);
      })

    </script>
  </body>
```

## Running tests

```
yarn test
```
