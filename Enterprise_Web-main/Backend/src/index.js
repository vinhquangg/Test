const express = require("express");
const rootRouter = require("./routes/v1");
const db = require("./models");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/v1", rootRouter);

app.listen(8080, () => {
  console.log("Listening at port 8080");
});
