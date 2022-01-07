import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import postRoutes from "./routes/posts.js";

const app = express();

app.use(express.json());
app.use(bodyParser.json({ limit: "30mb", extended: "true" }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: "true" }));
app.use(cors());

const PORT = process.env.PORT || 9000;

const connection_url =
  "mongodb+srv://krishna:GcQ-eC9GKFaNAvt@cluster0.xeqoq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

mongoose
  .connect(connection_url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to database"))
  .catch((err) => console.log(err));

app.use("/posts", postRoutes);

app.listen(PORT, () => console.log(`Listening at localhost:${PORT}`));

// GcQ-eC9GKFaNAvt -> password
