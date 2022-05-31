const express = require("express");
const cors = require("cors");
const port = process.env.PORT || 5000;
const app = express();
const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();

// Middle were
app.use(express.json());
app.use(cors());

// Getting connected with MONGODB

// URI
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.offlr.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

// client.connect((err) => {
//   const collection = client.db("test").collection("devices");
//   console.log("COndected");
//   // perform actions on the collection object
//   client.close();
// });

async function run() {
  try {
    await client.connect();
    console.log("DB CONNECTED");
  } finally {
    //   await client.close()
  }
}

run().catch(console.dirxml);

app.get("/", (req, res) => {
  res.send("Hello There");
});

app.listen(port, () => {
  console.log("Responding to", port);
});
