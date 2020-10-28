import endsWith from "./endsWith";
import validUrl from "./validUrl";

const sanitizeUrl = (url: string) => {
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

export default sanitizeUrl;
