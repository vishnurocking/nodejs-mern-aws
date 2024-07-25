import { MongoClient } from "mongodb";

const password = encodeURIComponent(process.env.MONGO_PASSWORD.trim());

const connectionString = `mongodb+srv://vishnu:${password}@devcluster.cc4c2kr.mongodb.net/?retryWrites=true&w=majority`; // cluster url
const client = new MongoClient(connectionString);
let conn;
try {
  conn = await client.connect();
  console.log("connection successful");
} catch (e) {
  console.error(e);
}
let db = conn.db("vishnu-mern-db");
export default db;
