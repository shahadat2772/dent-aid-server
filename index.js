const express = require("express");
const cors = require("cors");
const port = process.env.PORT || 5000;
const app = express();

// Middle were
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello There");
});

app.listen(port, () => {
  console.log("Responding to", port);
});
