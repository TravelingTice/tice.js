# Tice.js

A better way to fetch.

```
npm i tice.js
yarn add tice.js
```

## Initialization

It is advised to do this in one file, which you can call something like `api.config.js` or `api.init.js` where the global options of your api will be applied to an instance of the Tice class:

```
const tice = new Tice('https://your-api-endpoint/v1');

export default tice;
```

## Usage

### GET request:

```
get('https://api.com/endpoint')
```

This will return a promise with the data object already `json()`'d

### POST request:

```
post('https://api.com/post-endpoint', {
  field1: 'value1',
  field2: 'value2'
})
```

No need to `JSON.stringify` it, we do that for you.

### PUT request

```
put('https://api.com/put-endpoint', {
  field1: 'value1',
  field2: 'value2'
})
```

### DELETE request

```
delete('https://api.com/put-endpoint')
```
