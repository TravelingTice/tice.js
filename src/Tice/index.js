const validUrl = require("../utils/validUrl");
const fetch = require("isomorphic-fetch");
const sanitizeUrl = require("../utils/sanitizeUrl");
const handleResponse = require("../utils/handleResponse");

class Tice {
  constructor(options = {}) {
    this.baseEndpoint = sanitizeUrl(options.baseEndpoint);
    this.defaultOnError = options.defaultOnError;
    this.defaultBearerToken = options.defaultBearerToken;
    this.defaultSendToken = options.defaultSendToken || false;
  }

  defaultErrorHandler = (err) => console.log(err);

  get = (endpoint = "/", options) => {
    const address = this.constructAddress(endpoint);

    const fetchOptions = this.constructFetchOptionsFromOptions(options);

    return this.fetchAction(address, fetchOptions);
  };

  post = (endpoint = "/", body, options) => {
    const address = this.constructAddress(endpoint);

    const fetchOptions = this.constructFetchOptionsFromOptions(options, "POST");
    fetchOptions.body = JSON.stringify(body);

    return this.fetchAction(address, fetchOptions);
  };

  put = (endpoint = "/", body, options) => {
    const address = this.constructAddress(endpoint);

    const fetchOptions = this.constructFetchOptionsFromOptions(options, "PUT");
    fetchOptions.body = JSON.stringify(body);

    return this.fetchAction(address, fetchOptions);
  };

  patch = (endpoint = "/", body, options) => {
    const address = this.constructAddress(endpoint);

    const fetchOptions = this.constructFetchOptionsFromOptions(
      options,
      "PATCH"
    );
    fetchOptions.body = JSON.stringify(body);

    return this.fetchAction(address, fetchOptions);
  };

  constructFetchOptionsFromOptions = (options, method) => {
    const fetchOptions = {};

    if (method) {
      fetchOptions.method = method;
      fetchOptions["Content-Type"] = "application/json";
    }

    if (this.willSendToken(options)) {
      fetchOptions.headers = {};
      fetchOptions.headers.Authorization = `bearer ${this.defaultBearerToken}`;
    }

    return fetchOptions;
  };

  fetchAction = (address, object) => {
    return fetch(address, object)
      .then((res) => handleResponse(res))
      .catch(this.defaultOnError);
  };

  constructAddress = (endpoint) => {
    if (validUrl(endpoint)) {
      return endpoint;
    } else {
      return this.baseEndpoint + endpoint;
    }
  };

  willSendToken = (options) => {
    if (!options) {
      return this.defaultSendToken;
    }

    return options.sendToken;
  };
}

module.exports = Tice;
