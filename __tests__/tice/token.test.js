import Tice from "../../src/Tice";
import fetch from "isomorphic-fetch";
const { Response } = jest.requireActual("node-fetch");

const TEST_API_ENDPOINT = "https://myexampleapp.com/v1";

// const tice = new Tice({ baseEndpoint: TEST_API_ENDPOINT });

// const sampleFetchResponse = {
//   success: true,
//   message: "hi there",
// };

// Mock the fetch function for us
jest.mock("isomorphic-fetch");
fetch.mockImplementation(() => {
  return Promise.resolve(
    new Response(JSON.stringify({ success: true }), {
      headers: { "Content-Type": "application/json" },
    })
  );
});

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

    expect(tice.defaultBearerToken).toBe("mysecrettoken");
    expect(tice.defaultSendToken).toBe(false);
  });

  test("should not pass bearer token by default", () => {
    const tice = new Tice({
      baseEndpoint: TEST_API_ENDPOINT,
      defaultBearerToken: "mysecrettoken",
    });

    tice.get("");

    expect(fetch).toHaveBeenCalledWith(TEST_API_ENDPOINT, {});
  });

  test("use get function with passing in the bearer token should pass it into fetch function", () => {
    const tice = new Tice({
      baseEndpoint: TEST_API_ENDPOINT,
      defaultBearerToken: "mysecrettoken",
    });

    tice.get("", { sendToken: true });

    expect(fetch).toHaveBeenCalledWith(TEST_API_ENDPOINT, {
      headers: { Authorization: "bearer mysecrettoken" },
    });
  });

  test("should pass bearer token into fetch function when setting defaultSendToken to true", () => {
    const tice = new Tice({
      baseEndpoint: TEST_API_ENDPOINT,
      defaultBearerToken: "mysecrettoken",
      defaultSendToken: true,
    });

    tice.get("");

    expect(fetch).toHaveBeenCalledWith(TEST_API_ENDPOINT, {
      headers: { Authorization: "bearer mysecrettoken" },
    });
  });

  test("sendToken should overwrite the default settings", () => {
    const tice = new Tice({
      baseEndpoint: TEST_API_ENDPOINT,
      defaultBearerToken: "mysecret",
      defaultSendToken: true,
    });

    tice.get("", { sendToken: false });

    expect(fetch).toHaveBeenCalledWith(TEST_API_ENDPOINT, {});

    tice.get("", { sendToken: true });

    expect(fetch).toHaveBeenCalledWith(TEST_API_ENDPOINT, {
      headers: { Authorization: "bearer mysecret" },
    });
  });
});
