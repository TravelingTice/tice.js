const handleResponse = (res) => {
  const contentType = res.headers.get("Content-Type");

  if (contentType.match(/application\/json/)) return res.json();
  if (contentType.match(/text\/plain/)) return res.text();

  return res.blob();
};

module.exports = handleResponse;
