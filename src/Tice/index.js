const validUrl = require("../utils/validUrl");
const fetch = require("isomorphic-fetch");
const sanitizeUrl = require("../utils/sanitizeUrl");
const handleResponse = require("../utils/handleResponse");

class Tice {
  constructor(options = {}) {
    this.baseEndpoint = sanitizeUrl(options.baseEndpoint);
    this.defaultBearerToken = options.defaultBearerToken;
    this.defaultSendToken = options.defaultSendToken || false;
  }

  get = (endpoint = "/", options) => {
    const address = this.constructAddress(endpoint);

    const fetchOptions = this.constructFetchOptionsFromOptions(options);

    return fetch(address, fetchOptions).then((res) => handleResponse(res));
  };

  post = (endpoint = "/", body, options) => {
    const address = this.constructAddress(endpoint);

    const fetchOptions = this.constructFetchOptionsFromOptions(options);

    return fetch(address, {
      method: "POST",
      "Content-Type": "application/json",
      body: JSON.stringify(body),
      ...fetchOptions,
    }).then((res) => handleResponse(res));
  };

  constructAddress = (endpoint) => {
    if (validUrl(endpoint)) {
      return endpoint;
    } else {
      return this.baseEndpoint + endpoint;
    }
  };

  constructFetchOptionsFromOptions = (options) => {
    const fetchOptions = {};

    if (this.willSendToken(options)) {
      fetchOptions.headers = {};
      fetchOptions.headers.Authorization = `bearer ${this.defaultBearerToken}`;
    }

    return fetchOptions;
  };

  willSendToken = (options) => {
    if (!options) {
      return this.defaultSendToken;
    }

    return options.sendToken;
  };
}

module.exports = Tice;
