# Tice.js

A better way to fetch.

```
npm i tice.js
yarn add tice.js
```

## Initialization

It is advised to do this in one file, which you can call something like `api.config.js` or `api.init.js` where the global options of your api will be applied to an instance of the Tice class:

```javascript
import Tice from "tice.js";

const tice = new Tice("https://your-api-endpoint/v1");

export default tice;
```

## Authentication token

It is always very repititive and cumbersome to have to send the authentication token with each request. That's why with Tice.js you can assign a default token on initialization:

```javascript
const tice = new Tice({
  baseEndpoint: "https://mybaseapiendpoint.com/v1",
  defaultBearerToken: "defaulttokenfromcookie",
});
```

Then you can set extra options like for example: `defaultSendToken`, which when set to true, will by default send in this bearer token on each request. Then if you want to disable it on for example a get request, you can pass in a second argument, which is an options object, with the property `sendToken`, which you can set to `false` (when `defaultSendToken` is true this will be true too).

```javascript
tice.get("/customers", { sendToken: false });
```

You can also achieve the opposite behavior by setting `defaultSendToken` to false (which is the default) and explicity set `sendToken` to true on each request.

## Usage

Import the individual actions that you want and extract them from the default exported tice object.

```javascript
import { get, post, put, patch, delete } from "path/to/api.config.js";
```

### GET request:

```javascript
tice.get("https://api.com/endpoint");
```

This will return a promise with the data object already `json()`'d.
Right now tice.get requests only support json responses and plain text responses, it will look at the `Content-Type` header in the response and process it accordingly.

### POST request:

```javascript
tice.post("https://api.com/post-endpoint", {
  field1: "value1",
  field2: "value2",
});
```

No need to `JSON.stringify` it, we do that for you.
Putting the token option with post requests is done with the 3rd parameter:

```javascript
tice.post(
  "https://api.com/post-endpoint",
  {
    field1: "value1",
    field2: "value2",
  },
  { sendToken: true }
);
```

Post requests automatically have the header `'Content-Type': 'application/json'`

### PUT request

```javascript
tice.put("https://api.com/put-endpoint", {
  field1: "value1",
  field2: "value2",
});
```

### DELETE request

Because the `delete` keyword is a reserved word in Javascript, you can use the `_delete` method from Tice:

```javascript
tice._delete("https://api.com/delete-endpoint");
```

Delete can also be used with a body:

```javascript
tice._delete("https://api.com/delete-endpoint", {
  field1: "value1",
  field2: "value2",
});
```

## Error handling

Same as for error handling, this can be extremely cumbersome and repetitive to having to do that on every request. Hence, you can explicitly tell what to do when there is an error in processing the request (the catch block of fetch is called):

```javascript
const tice = new Tice({
  baseEndpoint: "https://myendpoint.com/v1",
  defaultOnError: (err) => console.log(err),
});
```
