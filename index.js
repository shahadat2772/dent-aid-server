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

async function run() {
  try {
    await client.connect();

    const servicesCollection = client.db("dent-aid").collection("services");

    app.get("/services", async (req, res) => {
      const services = await servicesCollection.find({}).toArray();
      res.send(services);
    });
  } finally {
    // await client.close();
  }
}

run().catch(console.dirxml);

app.get("/", (req, res) => {
  res.send("Hello There");
});

app.listen(port, () => {
  console.log("Responding to", port);
});
