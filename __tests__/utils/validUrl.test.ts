import validUrl from "../../src/utils/validUrl";

describe("validUrl util function", () => {
  test("should return false for an empty string", () => {
    expect(validUrl("")).toBe(false);
  });

  test("should return true for a valid url", () => {
    const url = "youtube.com";

    expect(validUrl(url)).toBe(true);
  });

  test("should return true for a localhost url", () => {
    const url = "http://localhost:3001";

    expect(validUrl(url)).toBe(true);
  });

  test("should return false for a non valid url", () => {
    const url = "youtube";

    expect(validUrl(url)).toBe(false);
  });

  test("should return false for non valid url with url in param", () => {
    const path = "/companies/send-preview-email?email=matthijs29@live.com";

    expect(validUrl(path)).toBe(false);
  });
});
