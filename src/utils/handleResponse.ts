const handleResponse = (res: Response) => {
  const contentType = res.headers.get("Content-Type");
  if (contentType) {
    if (contentType.match(/application\/json/)) return res.json();
    if (contentType.match(/text\/plain/)) return res.text();
  } else {
    return res.text();
  }

  return res.blob();
};

export default handleResponse;
