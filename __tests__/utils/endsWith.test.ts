import endsWith from "../../src/utils/endsWith";

describe("EndsWith util function", () => {
  test("Will work with empty strings", () => {
    expect(endsWith("", "")).toBeTruthy();
    expect(endsWith(" ", "")).toBeFalsy();
    expect(endsWith("", " ")).toBeFalsy();
  });

  test("Will work with strings", () => {
    expect(endsWith("A string", "g")).toBeTruthy();
    expect(endsWith("A string", "c")).toBeFalsy();
    expect(endsWith("A string", "/")).toBeFalsy();
    expect(endsWith("!@#$%^&*(*&^%^&*&^&*(*&(*(*", "*")).toBeTruthy();
    expect(endsWith("//jw/njwq2/", "/")).toBeTruthy();
    expect(endsWith("https://webinargeek.com/v1", "/")).toBeFalsy();
    expect(endsWith("https://webinargeek.com/v1", "1")).toBeTruthy();
  });

  // test("Will work with numbers", () => {
  //   expect(endsWith("538926", 6)).toBeTruthy();
  //   expect(endsWith(583974678, 8)).toBeTruthy();
  //   expect(endsWith(583974678, "8")).toBeTruthy();
  //   expect(endsWith(431343, "3")).toBeTruthy();
  //   expect(endsWith(431343, "8")).toBeFalsy();
  // });
});
