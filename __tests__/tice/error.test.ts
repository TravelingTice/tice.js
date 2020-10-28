import Tice from "../../src/Tice";
import fetch from "isomorphic-fetch";

jest.mock("isomorphic-fetch");
// mock implementation with failing promise
(fetch as jest.Mock).mockImplementation(() => {
  return Promise.reject(new Error("Something went wrong!"));
});

describe("Fetch error catching in Tice", () => {
  test("should be able to add a callback function to the defaultOnError prop on init", () => {
    const errorHandler = (err: any) => console.log(err);
    const tice = new Tice({ defaultOnError: errorHandler });

    expect(tice.defaultOnError).toBe(errorHandler);
  });

  test("should call the error handler when an error has been returned", async () => {
    const errorHandler = jest.fn(() =>
      console.log("Whoops something went wrong!")
    );
    const tice = new Tice({ defaultOnError: errorHandler });

    await tice.get();

    expect(fetch).toHaveBeenCalled();

    expect(errorHandler).toHaveBeenCalled();
  });
});
