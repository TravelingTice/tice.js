import Tice from "../../src/Tice";
import fetch from "isomorphic-fetch";
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
      status: 201,
    })
  );
});

// Clear all mocks before each test
beforeEach(() => {
  jest.clearAllMocks();
});

describe("Post feature in Tice.js", () => {
  test("is a function", () => {
    expect(typeof tice.post).toBe("function");
  });

  test("returns a thenable object/promise", async () => {
    expect(typeof tice.post().then).toBe("function");
  });

  test("should call fetch with method POST", () => {
    const { post } = tice;

    post();

    expect(fetch).toHaveBeenCalledWith(TEST_API_ENDPOINT + "/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
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
      headers: {
        "Content-Type": "application/json",
      },
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
      body: JSON.stringify(bodyObj),
      headers: {
        "Content-Type": "application/json",
        Authorization: "bearer mysecret",
      },
    });
  });

  test("should receive a parsed json response", async () => {
    const { post } = tice;

    const data = await post();

    expect(data).toMatchObject(sampleFetchResponse);
  });

  test("should receive a parsed text response", async () => {
    const { post } = tice;

    fetch.mockImplementation(() => {
      return Promise.resolve(
        new Response("<h2>TEst text</h2>", {
          headers: { "Content-Type": "text/plain" },
        })
      );
    });

    const data = await post();

    expect(data).toBe("<h2>TEst text</h2>");
  });
});
