const mongoose = require("mongoose");
const Routing = new mongoose.Schema(
  {
    routingName: {
      type: String,
    },
    routingPath: {
      type: String,
    },
    routingComponent: {
      type: String,
    },

    status: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Routing", Routing);
