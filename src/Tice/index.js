const validUrl = require("../utils/validUrl");
const fetch = require("isomorphic-fetch");
const endsWith = require("../utils/endsWith");
const sanitizeUrl = require("../utils/sanitizeUrl");

class Tice {
  constructor(options = {}) {
    this.baseEndpoint = sanitizeUrl(options.baseEndpoint);
    this.defaultBearerToken = options.defaultBearerToken;
    this.defaultSendToken = options.defaultSendToken;

    // this.initBearerTokenOptions({ defaultSendToken: options.defaultSendToken });
  }

  initBearerToken = (newToken) => {
    this.defaultBearerToken = newToken;
  };

  get = (endpoint = "/") => {
    const address = this.baseEndpoint + endpoint;

    return fetch(address).then((res) => {
      const contentType = res.headers.get("Content-Type");

      if (contentType.match(/application\/json/)) return res.json();
      if (contentType.match(/text\/plain/)) return res.text();

      return res.blob();
    });
  };
}

module.exports = Tice;
