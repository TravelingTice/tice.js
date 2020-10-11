import Tice from "../../src/Tice";
import fetch from "isomorphic-fetch";
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

describe("Patch feature in Tice.js", () => {
  test("is a function", () => {
    expect(typeof tice.patch).toBe("function");
  });

  test("returns a thenable object/promise", async () => {
    expect(typeof tice.patch().then).toBe("function");
  });

  test("should call fetch with method patch", () => {
    const { patch } = tice;

    patch();

    expect(fetch).toHaveBeenCalledWith(TEST_API_ENDPOINT + "/", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
    });
  });

  test("should call fetch with body", () => {
    const { patch } = tice;

    const bodyObj = {
      value1: "Hi",
      value2: "there",
    };

    patch("", bodyObj);

    expect(fetch).toHaveBeenCalledWith(TEST_API_ENDPOINT, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyObj),
    });
  });

  test("should work with token", () => {
    const { patch } = tice;

    tice.defaultBearerToken = "mysecret";
    tice.defaultSendToken = true;

    const bodyObj = {
      value1: "Hi",
      value2: "there",
    };

    patch("", bodyObj);

    expect(fetch).toHaveBeenCalledWith(TEST_API_ENDPOINT, {
      method: "PATCH",
      body: JSON.stringify(bodyObj),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer mysecret",
      },
    });
  });

  test("should receive a parsed json response", async () => {
    const { patch } = tice;

    const data = await patch();

    expect(data).toMatchObject(sampleFetchResponse);
  });

  test("should receive a parsed text response", async () => {
    const { patch } = tice;

    fetch.mockImplementation(() => {
      return Promise.resolve(
        new Response("<h2>TEst text</h2>", {
          headers: { "Content-Type": "text/plain" },
        })
      );
    });

    const data = await patch();

    expect(data).toBe("<h2>TEst text</h2>");
  });
});
