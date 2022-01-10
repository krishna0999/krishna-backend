import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import postRoutes from "./routes/posts.js";
import dotenv from "dotenv";

const app = express();
dotenv.config();
console.log("databse url >>>", process.env.CONNECTION_URL);

app.use(cors());
app.use(bodyParser.json({ limit: "30mb", extended: "true" }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: "true" }));
app.use(express.json());

const PORT = process.env.PORT || 9000;

mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to database"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Welcome to to-riti api");
});
app.use("/posts", postRoutes);

app.listen(PORT, () => console.log(`Listening at localhost:${PORT}`));

// GcQ-eC9GKFaNAvt -> password
