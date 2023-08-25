let mongoose = require("mongoose");

module.exports = {
  connect: function () {
    let db = mongoose
      .connect("mongodb://localhost:27017/Service_provider", {})
      .then((res) => console.log("connected"));
    mongoose.Promise = global.Promise;
  },
  initModels: function () {
    require("../model/index.model");
  },
};
