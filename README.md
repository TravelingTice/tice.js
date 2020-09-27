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
get("/customers", { sendToken: false });
```

You can also achieve the opposite behavior by setting `defaultSendToken` to false (which is the default) and explicity set `sendToken` to true on each request.

## Usage

Import the individual actions that you want and extract them from the default exported tice object.

```javascript
import { get, post, put, patch, delete } from "path/to/api.config.js";
```

### GET request:

```javascript
get("https://api.com/endpoint");
```

This will return a promise with the data object already `json()`'d

### POST request:

```javascript
post("https://api.com/post-endpoint", {
  field1: "value1",
  field2: "value2",
});
```

No need to `JSON.stringify` it, we do that for you.

### PUT request

```javascript
put("https://api.com/put-endpoint", {
  field1: "value1",
  field2: "value2",
});
```

### DELETE request

```javascript
delete "https://api.com/put-endpoint";
```
