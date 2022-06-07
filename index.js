const express = require("express");
const cors = require("cors");
const port = process.env.PORT || 5000;
const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();

// Middle were
app.use(express.json());
app.use(
  cors({
    origin: "https://dentaid-bc9ec.web.app/",
  })
);

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

    // GET ALL SERVICES
    app.get("/services", async (req, res) => {
      const services = await servicesCollection.find({}).toArray();
      res.send(services);
    });

    // GET A SERVICE BY ID
    app.get("/service/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: ObjectId(id) };
      const service = await servicesCollection.findOne(filter);
      res.send(service);
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
