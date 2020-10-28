import handleResponse from "../../src/utils/handleResponse";
import fetch from "isomorphic-fetch";
const { Response } = jest.requireActual("node-fetch");

const testResponse = new Response(JSON.stringify({ success: true }), {
  headers: { "Content-Type": "application/json" },
});

const sampleJsonResponse = {
  success: true,
  message: "hi there",
};
const sampleJsonResponseObject = new Response(
  JSON.stringify(sampleJsonResponse),
  {
    headers: { "Content-Type": "application/json" },
  }
);

const sampleTextResponse = "<h1>hi there</h1>";
const sampleTextResponseObject = new Response(sampleTextResponse, {
  headers: { "Content-Type": "text/plain" },
});

describe("handleResponse util function", () => {
  test("Should throw when passed in the wrong argument (not a response object)", () => {
    expect(() => handleResponse()).toThrow();
    expect(() => handleResponse("")).toThrow();
    expect(() => handleResponse(false)).toThrow();
    expect(() => handleResponse(99393)).toThrow();
  });

  test("Should work with a normal response object", () => {
    expect(() => handleResponse(testResponse)).not.toThrow();
  });

  test("Should parse json response", async () => {
    const data = await handleResponse(sampleJsonResponseObject);

    expect(data).toMatchObject(sampleJsonResponse);
  });

  test("Should parse text response", async () => {
    const data = await handleResponse(sampleTextResponseObject);

    expect(data).toBe(sampleTextResponse);
  });
});
