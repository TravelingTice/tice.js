const Tice = require("../../src/Tice");
const fetch = require("node-fetch");

const TEST_API_ENDPOINT = "https://pdqe-rails-api.herokuapp.com/v1";

const tice = new Tice({ baseEndpoint: TEST_API_ENDPOINT });

jest.mock("node-fetch");
fetch.mockResolvedValue({
  data: true,
});

describe("Get feature in Tice.js", () => {
  test("is a function", () => {
    const { get } = tice;

    expect(typeof get).toBe("function");
  });

  test("returns a thenable object/promise", async () => {
    const { get } = tice;

    expect(typeof get().then == "function").toBeTruthy();
  });

  test("will call the base endpoint for an empty passed in string or nothing passed in", async () => {
    const { get } = tice;

    const data = await get();
    console.log(data);
  });
});
