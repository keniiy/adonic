import Route from "@ioc:Adonis/Core/Route";

Route.group(() => {
  Route.post("/register", "UserController.register").as("register");
  Route.post("/login", "UserController.login").as("login");
}).prefix("/api");

export default Route;
