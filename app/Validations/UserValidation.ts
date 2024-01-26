import { schema, rules } from "@ioc:Adonis/Core/Validator";
import Hash from "@ioc:Adonis/Core/Hash";
import User from "App/Models/User";

export default class UserValidation {
  public async register(request: any) {
    let status, message, errorField;

    const validationSchema = schema.create({
      username: schema.string([rules.required(), rules.unique({ table: "users", column: "username", caseInsensitive: true })]),
      password: schema.string([rules.required(), rules.minLength(8)]),
    });

    const validationMessages = {
      "username.string": "Username is not a string !",
      "username.required": "Username cannot be empty !",
      "username.unique": "Username is not available already taken !",

      "password.string": "Password is not a string !",
      "password.required": "Password cannot be empty !",
      "password.minLength": "Password must be at least 8 characters !",
    };

    try {
      await request.validate({ schema: validationSchema, messages: validationMessages });

      status = true;
      message = "Validation success !";
    } catch (err) {
      status = false;
      message = err.messages.errors[0].message;
      errorField = err.messages.errors[0].field;
    }

    const result = {
      status: status,
      message: message,
      errorField: errorField,
    };

    return result;
  }

  public async login(request: any) {
    let status, message, errorField;

    const validationSchema = schema.create({
      username: schema.string([rules.required(), rules.exists({ table: "users", column: "username", caseInsensitive: true })]),
      password: schema.string([rules.required()]),
    });

    const validationMessages = {
      "username.string": "Username is not a string !",
      "username.required": "Username cannot be empty !",
      "username.exists": "Username is not registered !",

      "password.string": "Password is not a string !",
      "password.required": "Password cannot be empty !",
    };

    try {
      await request.validate({ schema: validationSchema, messages: validationMessages });

      status = true;
      message = "Validation success !";

      const req = request.all();

      const user = await User.findBy("username", req.username);

      if (!(await Hash.verify(user!.password, req.password))) {
        status = false;
        message = "Password is incorrect !";
        errorField = "password";
      }

      console.log(!(await Hash.verify(user!.password, req.password)), "password");
      
    } catch (err) {

      console.log(err, 'err');
      
      status = false;
      message = err.messages.errors[0].message;
      errorField = err.messages.errors[0].field;
    }

    const result = {
      status: status,
      message: message,
      errorField: errorField,
    };

    return result;
  }
}
