module.exports = (app) => {
  let Routing = require("./Routing.route");
  let UserRoute = require("./User.route");

  app.use("/api/v1", Routing);
  app.use("/api/v1", UserRoute);
};
