# ifrone

A wrapper around page host and iframe communication. An iphone for iframes

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
