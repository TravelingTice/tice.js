const regex = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;

const validUrl = (url) => {
  if (!url && url !== "") {
    throw new Error("Missing url argument");
  }

  return regex.test(url);
};

module.exports = validUrl;
