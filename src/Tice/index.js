const validUrl = require("../utils/validUrl");
const fetch = require("node-fetch");

class Tice {
  constructor(options = {}) {
    if (!options.baseEndpoint) return (this.baseEndpoint = "");

    if (!validUrl(options.baseEndpoint)) {
      throw new Error("Please provide a valid url for the base endpoint");
    }

    this.baseEndpoint = options.baseEndpoint;
  }

  get = (endpoint = "") => {
    return fetch(endpoint);
  };
}

module.exports = Tice;
