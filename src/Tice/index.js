const validUrl = require("../utils/validUrl");
const fetch = require("isomorphic-fetch");
const endsWith = require("../utils/endsWith");
const sanitizeUrl = require("../utils/sanitizeUrl");

class Tice {
  constructor(options = {}) {
    this.baseEndpoint = sanitizeUrl(options.baseEndpoint);
    this.defaultBearerToken = options.defaultBearerToken;
    this.defaultSendToken = options.defaultSendToken || false;
  }

  get = (endpoint = "/", options) => {
    const address = this.constructAddress(endpoint);

    const fetchOptions = this.constructFetchOptionsFromOptions(options);

    return fetch(address, fetchOptions).then((res) => {
      const contentType = res.headers.get("Content-Type");

      if (contentType.match(/application\/json/)) return res.json();
      if (contentType.match(/text\/plain/)) return res.text();

      return res.blob();
    });
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
