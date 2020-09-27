const Tice = require("../../src/Tice");
const fetch = require("isomorphic-fetch");
const { Response } = jest.requireActual("node-fetch");

const TEST_API_ENDPOINT = "https://myexampleapp.com/v1";

// const tice = new Tice({ baseEndpoint: TEST_API_ENDPOINT });

// const sampleFetchResponse = {
//   success: true,
//   message: "hi there",
// };

// // Mock the fetch function for us
// jest.mock("isomorphic-fetch");
// fetch.mockImplementation(() => {
//   return Promise.resolve(
//     new Response(JSON.stringify(sampleFetchResponse), {
//       headers: { "Content-Type": "application/json" },
//     })
//   );
// });

// Clear all mocks before each test
beforeEach(() => {
  jest.clearAllMocks();
});

describe("Tice token workings", () => {
  test("should be able to store a bearer token on initialization", () => {
    const tice = new Tice({
      baseEndpoint: TEST_API_ENDPOINT,
      defaultBearerToken: "mytoken",
    });

    expect(tice.defaultBearerToken).toBe("mytoken");
  });

  test("when no token is passed in, by default token is undefined", () => {
    const tice = new Tice({
      baseEndpoint: TEST_API_ENDPOINT,
    });

    expect(tice.defaultBearerToken).toBe(undefined);
  });

  test("defaultBearerToken option should be false by default", () => {
    const tice = new Tice({
      baseEndpoint: TEST_API_ENDPOINT,
      defaultBearerToken: "mysecrettoken",
    });

    expect(tice.defaultSendToken).toBe(false);
  });
});
