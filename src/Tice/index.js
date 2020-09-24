const validUrl = require("../utils/validUrl");
const fetch = require("isomorphic-fetch");
const endsWith = require("../utils/endsWith");

class Tice {
  constructor(options = {}) {
    if (!options.baseEndpoint) return (this.baseEndpoint = "");

    if (!validUrl(options.baseEndpoint)) {
      throw new Error("Please provide a valid url for the base endpoint");
    }

    // ends with trailing slash
    if (endsWith(options.baseEndpoint, "/")) {
      return (this.baseEndpoint = options.baseEndpoint.substring(
        0,
        options.baseEndpoint.length - 1
      ));
    }

    this.baseEndpoint = options.baseEndpoint;
  }

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
