const Tice = require("./index");

describe("Tice main class", () => {
  test("New instance should be of class Tice", () => {
    const tice = new Tice();

    expect(tice instanceof Tice).toBeTruthy();
  });
});
