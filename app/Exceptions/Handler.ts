/*
|--------------------------------------------------------------------------
| Http Exception Handler
|--------------------------------------------------------------------------
|
| AdonisJs will forward all exceptions occurred during an HTTP request to
| the following class. You can learn more about exception handling by
| reading docs.
|
| The exception handler extends a base `HttpExceptionHandler` which is not
| mandatory, however it can do lot of heavy lifting to handle the errors
| properly.
|
*/

import Logger from "@ioc:Adonis/Core/Logger";
import HttpExceptionHandler from "@ioc:Adonis/Core/HttpExceptionHandler";
import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class ExceptionHandler extends HttpExceptionHandler {
  constructor() {
    super(Logger);
  }

  public async handle(error: any, ctx: HttpContextContract): Promise<any> {
    if (error.code === "E_VALIDATION_FAILURE") {
      const message = error.messages?.errors[0]?.message;
      const field = error.messages?.errors[0]?.field;

      ctx.response.unprocessableEntity({
        status: false,
        message: `field ${field} ${message}`,
      });
    }

    if (error.code === "E_ROW_NOT_FOUND") {
      return ctx.response.notFound({
        status: false,
        message: "Resource not found.",
      });
    }

    if (error.code === "E_UNAUTHORIZED_ACCESS") {
      return ctx.response.unauthorized({
        status: false,
        message: "Unauthenticated.",
      });
    }

    if (error.code === "E_INVALID_AUTH_PASSWORD") {
      return ctx.response.badRequest({
        status: false,
        message: "Password is invalid",
      });
    }

    if (error.code === "E_BAD_REQUEST_EXCEPTION") {
      return ctx.response.badRequest({
        status: false,
        message: error.message,
      });
    }

    if (error.code === "E_FORBIDDEN_EXCEPTION") {
      return ctx.response.forbidden({
        status: false,
        message: error.message,
      });
    }

    return super.handle(error, ctx);
  }
}
