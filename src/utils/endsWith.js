const endsWith = (strNum, char) => {
  if (strNum === undefined || char === undefined) return false;

  strNum = strNum.toString();

  const lastChar = strNum[strNum.length - 1] || "";

  return lastChar.toString() === char.toString();
};

module.exports = endsWith;
