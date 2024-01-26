import isset from "App/Helpers/Isset";

const formatResponse = (request: any, response: any) => {
  let statusCode = 200;

  if (!request.status) {
    statusCode = 422;
  }

  let result: any = {
    status: request.status,
    message: request.message,
  };

  if (isset(request.accessToken)) {
    result.access_token = request.accessToken;
  }

  if (isset(request.data)) {
    if (isset(request.pagination) && request.pagination) {
      result.data = request.data.toJSON().data;
      result.pagination = request.data.toJSON().meta;
    } else {
      result.data = request.data;
    }
  }

  if (isset(request.errorField)) {
    result.error_field = request.errorField;
  }

  return response.status(statusCode).send(result);
};

export default formatResponse;
