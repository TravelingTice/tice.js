const Tice = require("../../src/Tice");
const fetch = require("isomorphic-fetch");
const { Response } = jest.requireActual("node-fetch");

const TEST_API_ENDPOINT = "https://myexampleapp.com/v1";

const tice = new Tice({ baseEndpoint: TEST_API_ENDPOINT });

const sampleFetchResponse = {
  success: true,
  message: "hi there",
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
});

describe("Get feature in Tice.js", () => {
  test("is a function", () => {
    expect(typeof tice.get).toBe("function");
  });

  test("returns a thenable object/promise", async () => {
    expect(typeof tice.get().then == "function").toBeTruthy();
  });

  test("will call fetch without any arguments and will fetch our base endpoint", async () => {
    tice.get();

    expect(fetch.mock.calls.length).toBe(1);

    // second param is options, which by default is an empty object
    expect(fetch).toHaveBeenCalledWith("https://myexampleapp.com/v1/", {});
  });

  test("Will fetch the home point when having no base endpoint", () => {
    const tice2 = new Tice({});

    tice2.get();

    expect(fetch.mock.calls.length).toBe(1);

    expect(fetch).toHaveBeenCalledWith("/", {});
  });

  test("Will fetch a generic endpoint without trailing slash in the base endpoint", () => {
    const { get } = tice;

    get("/");
    expect(fetch.mock.calls.length).toBe(1);
    expect(fetch).toHaveBeenCalledWith("https://myexampleapp.com/v1/", {});

    get("/customers/1");
    expect(fetch.mock.calls.length).toBe(2);
    expect(fetch).toHaveBeenCalledWith(
      "https://myexampleapp.com/v1/customers/1",
      {}
    );

    get("/customers/1?embed=true");
    expect(fetch.mock.calls.length).toBe(3);
    expect(fetch).toHaveBeenCalledWith(
      "https://myexampleapp.com/v1/customers/1?embed=true",
      {}
    );
  });

  test("Will fetch a generic endpoint with a trailing slash in the base endpoint", () => {
    const base = "https://exampleapi.com/v1/";
    const tice2 = new Tice({ baseEndpoint: base });
    const { get } = tice2;

    get("/");
    expect(fetch.mock.calls.length).toBe(1);
    expect(fetch).toHaveBeenCalledWith("https://exampleapi.com/v1/", {});

    get("/customers/1");
    expect(fetch.mock.calls.length).toBe(2);
    expect(fetch).toHaveBeenCalledWith(
      "https://exampleapi.com/v1/customers/1",
      {}
    );

    get("/customers/1?embed=true");
    expect(fetch.mock.calls.length).toBe(3);
    expect(fetch).toHaveBeenCalledWith(
      "https://exampleapi.com/v1/customers/1?embed=true",
      {}
    );
  });

  test("Will fetch an example json response already parsed", async () => {
    const { get } = tice;

    const data = await get();

    expect(data).toMatchObject(sampleFetchResponse);
  });

  test("Will fetch an example text response already parsed", async () => {
    const { get } = tice;

    fetch.mockImplementation(() => {
      return Promise.resolve(
        new Response("<h2>TEst text</h2>", {
          headers: { "Content-Type": "text/plain" },
        })
      );
    });

    const data = await get();

    expect(data).toBe("<h2>TEst text</h2>");
  });

  test("Will work when the passed in url is a new url, then it will not use the base endpoint", () => {
    const { get } = tice;

    get("https://api.kanye.rest");

    expect(fetch).toHaveBeenCalledWith("https://api.kanye.rest", {});
  });
});
