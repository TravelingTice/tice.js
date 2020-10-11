import Tice from "../../src/Tice";
import fetch from "isomorphic-fetch";
const { Response } = jest.requireActual("node-fetch");

const TEST_API_ENDPOINT = "https://myexampleapp.com/v1";

let tice = new Tice({ baseEndpoint: TEST_API_ENDPOINT });

const sampleFetchResponse = {
  success: true,
  message: "the item has been deleted",
};

// Mock the fetch function for us
jest.mock("isomorphic-fetch");
fetch.mockImplementation(() => {
  return Promise.resolve(
    new Response(JSON.stringify(sampleFetchResponse), {
      headers: { "Content-Type": "application/json" },
    })
  );
});

// Clear all mocks before each test
beforeEach(() => {
  jest.clearAllMocks();

  tice = new Tice({ baseEndpoint: TEST_API_ENDPOINT });
});

describe("Delete feature in Tice.js", () => {
  test("is a function", () => {
    expect(typeof tice._delete).toBe("function");
  });

  test("returns a thenable object/promise", async () => {
    expect(typeof tice._delete().then == "function").toBeTruthy();
  });

  test("should call fetch with method delete", () => {
    const { _delete } = tice;

    _delete();

    expect(fetch).toHaveBeenCalledWith(TEST_API_ENDPOINT + "/", {
      method: "DELETE",
    });
  });

  test("should work with token", () => {
    const { _delete } = tice;

    tice.defaultBearerToken = "mysecret";
    tice.defaultSendToken = true;

    _delete("");

    expect(fetch).toHaveBeenCalledWith(TEST_API_ENDPOINT, {
      method: "DELETE",
      headers: {
        Authorization: "bearer mysecret",
      },
    });
  });

  test("should call fetch with body", () => {
    const { _delete } = tice;

    const bodyObj = {
      value1: "Hi",
      value2: "there",
    };

    _delete("", bodyObj);

    expect(fetch).toHaveBeenCalledWith(TEST_API_ENDPOINT, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyObj),
    });
  });

  test("should receive a parsed json response", async () => {
    const { _delete } = tice;

    const data = await _delete();

    expect(data).toMatchObject(sampleFetchResponse);
  });

  test("should receive a parsed text response", async () => {
    const { _delete } = tice;

    fetch.mockImplementation(() => {
      return Promise.resolve(
        new Response("<h2>TEst text</h2>", {
          headers: { "Content-Type": "text/plain" },
        })
      );
    });

    const data = await _delete();

    expect(data).toBe("<h2>TEst text</h2>");
  });
});
