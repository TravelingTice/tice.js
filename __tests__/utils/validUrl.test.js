const validUrl = require("../../src/utils/validUrl");

describe("validUrl util function", () => {
  test("should throw argument error when passed no arguments", () => {
    try {
      validUrl();
    } catch (e) {
      expect(e.message).toBe("Missing url argument");
    }
  });

  test("should return false for an empty string", () => {
    expect(validUrl("")).toBe(false);
  });

  test("should return true for a valid url", () => {
    const url = "youtube.com";

    expect(validUrl(url)).toBe(true);
  });

  test("should return false for a non valid url", () => {
    const url = "youtube";

    expect(validUrl(url)).toBe(false);
  });
});
