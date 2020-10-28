import fetch from "isomorphic-fetch";
import validUrl from "../utils/validUrl";
import sanitizeUrl from "../utils/sanitizeUrl";
import handleResponse from "../utils/handleResponse";
import {
  ConstructorParams,
  InputOptions,
  FetchOptions,
  Method,
  Body,
} from "./types";

class Tice {
  baseEndpoint: string;
  defaultOnError: (err?: any) => void;
  defaultBearerToken: string | undefined;
  defaultSendToken: boolean;

  constructor(options: ConstructorParams = {}) {
    this.baseEndpoint = sanitizeUrl(options.baseEndpoint || "");
    this.defaultOnError = options.defaultOnError || this.#defaultErrorHandler;
    this.defaultBearerToken = options.defaultBearerToken;
    this.defaultSendToken = options.defaultSendToken || false;
  }

  #defaultErrorHandler = (err: any) => console.log(err);

  get = (endpoint = "/", options?: InputOptions) => {
    const address = this.#constructAddress(endpoint);

    const fetchOptions = this.#constructFetchOptionsFromOptions(
      options,
      undefined,
      false
    );

    return this.#fetchAction(address, fetchOptions);
  };

  post = (endpoint = "/", body?: Body, options?: InputOptions) => {
    const address = this.#constructAddress(endpoint);

    const fetchOptions = this.#constructFetchOptionsFromOptions(
      options,
      "POST",
      true
    );

    if (body) {
      fetchOptions.body = JSON.stringify(body);
    }

    return this.#fetchAction(address, fetchOptions);
  };

  put = (endpoint = "/", body?: Body, options?: InputOptions) => {
    const address = this.#constructAddress(endpoint);

    const fetchOptions = this.#constructFetchOptionsFromOptions(
      options,
      "PUT",
      true
    );

    if (body) {
      fetchOptions.body = JSON.stringify(body);
    }

    return this.#fetchAction(address, fetchOptions);
  };

  patch = (endpoint = "/", body?: Body, options?: InputOptions) => {
    const address = this.#constructAddress(endpoint);

    const fetchOptions = this.#constructFetchOptionsFromOptions(
      options,
      "PATCH",
      true
    );

    if (body) {
      fetchOptions.body = JSON.stringify(body);
    }

    return this.#fetchAction(address, fetchOptions);
  };

  _delete = (endpoint = "/", body?: Body, options?: InputOptions) => {
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

  #constructFetchOptionsFromOptions = (
    options: InputOptions,
    method?: Method,
    hasBody = false
  ) => {
    const fetchOptions: FetchOptions = {};

    if (method) {
      fetchOptions.method = method;
    }

    if (hasBody) {
      fetchOptions.headers = {};
      fetchOptions.headers["Content-Type"] = "application/json";
    }

    if (this.#willSendToken(options) && this.defaultBearerToken) {
      fetchOptions.headers = fetchOptions.headers || {};
      fetchOptions.headers.Authorization = `Bearer ${this.defaultBearerToken}`;
    }

    return fetchOptions;
  };

  #fetchAction = (address: string, object: any) => {
    return fetch(address, object)
      .then((res) => handleResponse(res))
      .catch(this.defaultOnError);
  };

  #constructAddress = (endpoint: string) => {
    if (validUrl(endpoint)) {
      return endpoint;
    } else {
      return this.baseEndpoint + endpoint;
    }
  };

  #willSendToken = (options: InputOptions) => {
    if (!options) {
      return this.defaultSendToken;
    }

    return options.sendToken;
  };
}

export default Tice;
