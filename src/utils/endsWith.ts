const endsWith = (str: string, char: string) => {
  str = str.toString();

  const lastChar = str[str.length - 1] || "";

  return lastChar.toString() === char.toString();
};

export default endsWith;
