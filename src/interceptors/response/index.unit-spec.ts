import { IInterceptorArgs } from "interfaces";
import { transformResponse } from ".";
describe("Testing response Interceptor", () => {
  let response: IInterceptorArgs<{ _id: string; first_name: string }>;
  const objectBody = {
    _id: "aawd",
    first_name: "Smith",
  };
  beforeEach(() => {
    response = {
      statusCode: 200,
      body: objectBody,
    };
  });
  it("It should have main error-body.", () => {
    const result = transformResponse(response);
    expect(result).toBeDefined();
    expect(result.error).toBeDefined();
    expect(result.code).toBeDefined();
    expect(result.code).toEqual(response.statusCode);
    expect(result.data).toBeDefined();
  });
  it("It should support object body.", () => {
    const result = transformResponse(response);
    expect(result.data).toBeDefined();
    expect(result.data._id).toBeDefined();
    expect(result.data.first_name).toBeDefined();
  });

  it("It should support array of objects body.", () => {
    const arrayOfObjects = [objectBody, objectBody];
    const result = transformResponse({ ...response, body: arrayOfObjects });
    expect(result.data.length).toEqual(arrayOfObjects.length);
    expect(result.data[0]._id).toBeDefined();
    expect(result.data[0].first_name).toBeDefined();
    expect(result.data[1]._id).toBeDefined();
    expect(result.data[1].first_name).toBeDefined();
  });
});
