const endsWith = require("./endsWith");
const validUrl = require("./validUrl");

const sanitizeUrl = (url) => {
  if (!url) return "";

  if (!validUrl(url)) {
    throw new Error("Please provide a valid url for the base endpoint");
  }

  // ends with trailing slash
  if (endsWith(url, "/")) {
    return url.substring(0, url.length - 1);
  }

  return url;
};

module.exports = sanitizeUrl;
