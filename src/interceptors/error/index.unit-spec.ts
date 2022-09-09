import { IInterceptorArgs } from "interfaces";
import { transformErrorResponse } from ".";
describe("Testing error Interceptor", () => {
  let response: IInterceptorArgs;
  beforeEach(() => {
    response = {
      statusCode: 400,
      body: {
        reason: "Something",
      },
    };
  });
  it("It should have main error-body.", () => {
    const result = transformErrorResponse(response);
    expect(result).toBeDefined();
    expect(result.error).toBeDefined();
    expect(result.code).toBeDefined();
    expect(result.code).toEqual(response.statusCode);
    expect(result.errorDetails).toBeDefined();
  });
  it("It should support object body.", () => {
    const result = transformErrorResponse(response);
    expect(result.errorDetails.reason).toBeDefined();
  });

  it("It should support string body.", () => {
    const bodyString = "Errrorrr";
    response.body = bodyString;
    const result = transformErrorResponse(response);
    expect(result.errorDetails.message).toBeDefined();
    expect(result.errorDetails.message).toEqual(bodyString);
  });
});
