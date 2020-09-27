const Tice = require("../../src/Tice");
const fetch = require("isomorphic-fetch");
const { Response } = jest.requireActual("node-fetch");

const TEST_API_ENDPOINT = "https://exampleapiendpoint.com/v1";

const tice = new Tice({ baseEndpoint: TEST_API_ENDPOINT });

const sampleFetchResponse = {
  success: true,
  message: "it has been updated",
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

describe("Put feature in Tice.js", () => {
  test("is a function", () => {
    expect(typeof tice.put).toBe("function");
  });

  test("returns a thenable object/promise", async () => {
    expect(typeof tice.put().then).toBe("function");
  });

  test("should call fetch with method PUT", () => {
    const { put } = tice;

    put();

    expect(fetch).toHaveBeenCalledWith(TEST_API_ENDPOINT + "/", {
      method: "PUT",
      "Content-Type": "application/json",
    });
  });

  test("should call fetch with body", () => {
    const { put } = tice;

    const bodyObj = {
      value1: "Hi",
      value2: "there",
    };

    put("", bodyObj);

    expect(fetch).toHaveBeenCalledWith(TEST_API_ENDPOINT, {
      method: "PUT",
      "Content-Type": "application/json",
      body: JSON.stringify(bodyObj),
    });
  });

  test("should work with token", () => {
    const { put } = tice;

    tice.defaultBearerToken = "mysecret";
    tice.defaultSendToken = true;

    const bodyObj = {
      value1: "Hi",
      value2: "there",
    };

    put("", bodyObj);

    expect(fetch).toHaveBeenCalledWith(TEST_API_ENDPOINT, {
      method: "PUT",
      "Content-Type": "application/json",
      body: JSON.stringify(bodyObj),
      headers: {
        Authorization: "bearer mysecret",
      },
    });
  });

  test("should receive a parsed json response", async () => {
    const { put } = tice;

    const data = await put();

    expect(data).toMatchObject(sampleFetchResponse);
  });

  test("should receive a parsed text response", async () => {
    const { put } = tice;

    fetch.mockImplementation(() => {
      return Promise.resolve(
        new Response("<h2>TEst text</h2>", {
          headers: { "Content-Type": "text/plain" },
        })
      );
    });

    const data = await put();

    expect(data).toBe("<h2>TEst text</h2>");
  });
});
