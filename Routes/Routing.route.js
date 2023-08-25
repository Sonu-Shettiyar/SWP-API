const express = require("express");
const app = express();
const Routing = require("../model/Routing.model");

app.post("/addRoute", async (req, res) => {
  try {
    let addHelp = await Routing(req.body).save();
    res.send(addHelp);
  } catch (error) {
    res.send(error);
  }
});

app.get("/getAllRoute", async (req, res) => {
  try {
    let getData = await Routing.find({});
    res.send(getData);
  } catch (error) {
    res.send(error);
  }
});

app.get("/getRouteDataBy/:id", async (req, res) => {
  try {
    const routingData = await Routing.findById(req.params.id);
    res.send(routingData);
  } catch (error) {
    res.send(error);
  }
});

app.delete("/delete/RoutingBy/:id", async (req, res) => {
  try {
    const routingData = await Routing.findByIdAndDelete({ _id: req.params.id });
    res.send(routingData);
  } catch (error) {
    res.send(error);
  }
});

app.put("/updateRouteBy/:id", async (req, res) => {
  try {
    const routingData = await Routing.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    res.send(routingData);
  } catch (error) {
    res.send(error);
  }
});

module.exports = app;
