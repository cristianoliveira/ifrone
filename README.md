# ifrone

A tiny wrapper around cross-window communication. A telefone library for windows 😅.
This feature is normally used to communications between page host and iframes, thus, the name "ifrone" an iphone for iframes. (LOL)

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
