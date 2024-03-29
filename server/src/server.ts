import express from "express";
import { config } from "dotenv";
import cors from "cors";
import { UserRouter } from "./routes/user";
import { CategoryRouter } from "./routes/category";
import { TasksRouter } from "./routes/tasks";
import { AuthRouter } from "./routes/auth";

const app = express();

config();

app.use(
  cors({
    origin: "*",
  })
);
app.use("/user", UserRouter);
app.use("/categories", CategoryRouter);
app.use("/tasks", TasksRouter);
app.use("/auth", AuthRouter);

const port = Number(process.env.PORT);

app.get("/", (req, res) => {
  res.status(200).send("Welcome to the Inovagil | Kanban Server");
});

app.listen(port, () => {
  console.log("Server is running 🔥");
});
