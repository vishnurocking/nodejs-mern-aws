import express from "express";
import bodyParser from "body-parser";
import { ObjectId } from "mongodb";
import db from "./mongoC.js";

const port = 4000;
const app = express();

app.use((_req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World, from express");
});

app.post("/addUser", async (req, res) => {
  let collection = await db.collection("users");
  let newDocument = req.body;
  newDocument.date = new Date();
  let result = await collection.insertOne(newDocument);
  res.send(result).status(204);
});

app.get("/getUsers", async (req, res) => {
  let collection = await db.collection("users");
  let results = await collection.find({}).toArray();
  res.send(results).status(200);
});

app.put("/editUser/:id", async (req, res) => {
  const userId = req.params.id;
  const updates = req.body;
  let collection = await db.collection("users");
  let result = await collection.updateOne(
    { _id: new ObjectId(userId) },
    { $set: updates }
  );
  res.send(result).status(200);
});

app.delete("/deleteUser/:id", async (req, res) => {
  const userId = req.params.id;
  let collection = await db.collection("users");
  let result = await collection.deleteOne({ _id: new ObjectId(userId) });
  res.send(result).status(200);
});

app.listen(port, function () {
  console.log("Server is listening at port:" + port);
});
