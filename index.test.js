const Tice = require("./index");

describe("Tice main class", () => {
  test("New instance should be of class Tice", () => {
    const tice = new Tice();

    expect(tice instanceof Tice).toBeTruthy();
  });

  test("can be initialized with an empty options object", () => {
    expect(() => new Tice({})).not.toThrow();
  });

  test("can be initialized with an empty string as base endpoint", () => {
    const tice = new Tice({ baseEndpoint: "" });

    expect(tice.baseEndpoint).toBe("");
  });

  test("Tice can be initialized with a valid endpoint", () => {
    const url = "https://youtube.com";

    expect(() => new Tice({ baseEndpoint: url })).not.toThrow();

    const tice = new Tice({ baseEndpoint: url });

    expect(tice.baseEndpoint).toBe(url);
  });

  test("Tice cannot be initialized with a non valid base endpoint", () => {
    const nonValidUrl = "youtube";

    expect(() => new Tice({ baseEndpoint: nonValidUrl })).toThrow();
  });
});
