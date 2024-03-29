import express from "express";
import { config } from "dotenv";
import cors from "cors";

const app = express();

config();

app.use(
  cors({
    origin: ["*"],
  })
);

const port = Number(process.env.PORT);

app.get("/", (req, res) => {
  res.status(200).send("Welcome to the Inovagil | Kanban Server");
});

app.listen(port, () => {
  console.log("Server is running 🔥");
});
