const Tice = require("../../src/Tice");
const fetch = require("isomorphic-fetch");
const { Response } = jest.requireActual("node-fetch");

const TEST_API_ENDPOINT = "https://exampleapiendpoint.com/v1";

const tice = new Tice({ baseEndpoint: TEST_API_ENDPOINT });

const sampleFetchResponse = {
  success: true,
  message: "it has been added",
};

// Mock the fetch function for us
jest.mock("isomorphic-fetch");
fetch.mockImplementation(() => {
  return Promise.resolve(
    new Response(JSON.stringify(sampleFetchResponse), {
      headers: { "Content-Type": "application/json" },
      ok: true,
      status: 200,
    })
  );
});

// Clear all mocks before each test
beforeEach(() => {
  jest.clearAllMocks();
});

describe("Post feature in Tice.js", () => {
  test("should call fetch with method POST", () => {
    const { post } = tice;

    post();

    expect(fetch).toHaveBeenCalledWith(TEST_API_ENDPOINT + "/", {
      method: "POST",
      "Content-Type": "application/json",
    });
  });

  test("should call fetch with body", () => {
    const { post } = tice;

    const bodyObj = {
      value1: "Hi",
      value2: "there",
    };

    post("", bodyObj);

    expect(fetch).toHaveBeenCalledWith(TEST_API_ENDPOINT, {
      method: "POST",
      "Content-Type": "application/json",
      body: JSON.stringify(bodyObj),
    });
  });

  test("should work with token", () => {
    const { post } = tice;

    tice.defaultBearerToken = "mysecret";
    tice.defaultSendToken = true;

    const bodyObj = {
      value1: "Hi",
      value2: "there",
    };

    post("", bodyObj);

    expect(fetch).toHaveBeenCalledWith(TEST_API_ENDPOINT, {
      method: "POST",
      "Content-Type": "application/json",
      body: JSON.stringify(bodyObj),
      headers: {
        Authorization: "bearer mysecret",
      },
    });
  });
});
