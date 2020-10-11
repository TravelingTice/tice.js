import fetch from "isomorphic-fetch";
import validUrl from "../utils/validUrl";
import sanitizeUrl from "../utils/sanitizeUrl";
import handleResponse from "../utils/handleResponse";

class Tice {
  constructor(options = {}) {
    this.baseEndpoint = sanitizeUrl(options.baseEndpoint);
    this.defaultOnError = options.defaultOnError || this.#defaultErrorHandler;
    this.defaultBearerToken = options.defaultBearerToken;
    this.defaultSendToken = options.defaultSendToken || false;
  }

  #defaultErrorHandler = (err) => console.log(err);

  get = (endpoint = "/", options) => {
    const address = this.#constructAddress(endpoint);

    const fetchOptions = this.#constructFetchOptionsFromOptions(options);

    return this.#fetchAction(address, fetchOptions);
  };

  post = (endpoint = "/", body, options) => {
    const address = this.#constructAddress(endpoint);

    const fetchOptions = this.#constructFetchOptionsFromOptions(
      options,
      "POST"
    );
    
    fetchOptions.body = JSON.stringify(body);

    return this.#fetchAction(address, fetchOptions);
  };

  put = (endpoint = "/", body, options) => {
    const address = this.#constructAddress(endpoint);

    const fetchOptions = this.#constructFetchOptionsFromOptions(options, "PUT");
    fetchOptions.body = JSON.stringify(body);

    return this.#fetchAction(address, fetchOptions);
  };

  patch = (endpoint = "/", body, options) => {
    const address = this.#constructAddress(endpoint);

    const fetchOptions = this.#constructFetchOptionsFromOptions(
      options,
      "PATCH"
    );

    fetchOptions.body = JSON.stringify(body);

    return this.#fetchAction(address, fetchOptions);
  };

  _delete = (endpoint = "/", body, options) => {
    const address = this.#constructAddress(endpoint);

    const fetchOptions = this.#constructFetchOptionsFromOptions(
      options,
      "DELETE",
      !!body
    );

    if (body) {
      fetchOptions.body = JSON.stringify(body);
    }

    return this.#fetchAction(address, fetchOptions);
  };

  #constructFetchOptionsFromOptions = (options, method, hasBody = true) => {
    const fetchOptions = {};

    if (method) {
      fetchOptions.method = method;
    }

    const methodsWithContentType = ["POST", "PUT", "PATCH", "DELETE"];

    if (methodsWithContentType.includes(method) && hasBody) {
      fetchOptions.headers = {};
      fetchOptions.headers["Content-Type"] = "application/json";
    }

    if (this.#willSendToken(options) && this.defaultBearerToken) {
      fetchOptions.headers = fetchOptions.headers || {};
      fetchOptions.headers.Authorization = `Bearer ${this.defaultBearerToken}`;
    }

    return fetchOptions;
  };

  #fetchAction = (address, object) => {
    return fetch(address, object)
      .then((res) => handleResponse(res))
      .catch(this.defaultOnError);
  };

  #constructAddress = (endpoint) => {
    if (validUrl(endpoint)) {
      return endpoint;
    } else {
      return this.baseEndpoint + endpoint;
    }
  };

  #willSendToken = (options) => {
    if (!options) {
      return this.defaultSendToken;
    }

    return options.sendToken;
  };
}

export default Tice;
