import sanitizeUrl from "../../src/utils/sanitizeUrl";

describe("Sanitize url function", () => {
  test("Should work for an empty string", () => {
    expect(sanitizeUrl("")).toBe("");
  });

  test("Should throw for non valid urls", () => {
    expect(() => sanitizeUrl("yourtube")).toThrow();
  });

  test("Should work for valid urls", () => {
    expect(sanitizeUrl("https://youtube.com")).toBe("https://youtube.com");
  });

  // test("Should add protocol https, when no protocol is provided", () => {
  //   expect(sanitizeUrl("youtube.com")).toBe("https://youtube.com");
  // });

  test("Should remove trailing slash", () => {
    expect(sanitizeUrl("https://youtube.com/")).toBe("https://youtube.com");
    expect(sanitizeUrl("youtube.com/")).toBe("youtube.com");
  });
});
