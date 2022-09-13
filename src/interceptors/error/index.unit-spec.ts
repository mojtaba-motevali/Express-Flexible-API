import { transformErrorResponse } from ".";
import { IInterceptorArgs } from "../../interfaces";
describe("Testing error Interceptor", () => {
  let response: IInterceptorArgs<{ reason: string }>;
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
    expect(result.errorDetails).toBeDefined();
    expect(result.errorDetails.reason).toBeDefined();
  });
});
