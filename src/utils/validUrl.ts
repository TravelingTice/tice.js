const localhostRegex = /localhost\:[0-9]{4}/;
const regex = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;

const validUrl = (url) => {
  if (!url && url !== "") {
    throw new Error("Missing url argument");
  }

  // split off any params for url checking
  url = url.split("?")[0];

  if (localhostRegex.test(url)) return true;

  return regex.test(url);
};

module.exports = validUrl;
