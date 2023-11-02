import express from "express";
import mongoose from "mongoose";
import { loginValidation, postCreationValidation } from "./validations.js";
import checkAuth from "./utils/checkAuth.js";
import { register, login, getMe } from "./controllers/userController.js";
import {
  create,
  getAll,
  getOnePost,
  remove,
  update,
} from "./controllers/PostController.js";

mongoose
  .connect(
    "mongodb+srv://admin:wwwwww@beauty0.s26uw8r.mongodb.net/blog?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("DB connect");
  })
  .catch((err) => console.log("DB error", err));

const app = express();

app.use(express.json());

app.post("/auth/login", login);
app.post("/auth/register", loginValidation, register);
app.get("/auth/me", checkAuth, getMe);

app.get("/posts", getAll);
app.get("/posts/:id", getOnePost);
app.post("/posts", checkAuth, postCreationValidation, create);
app.delete("/posts/:id", checkAuth, remove);
app.patch("/posts/:id", checkAuth, update);

app.listen(4444, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log("Server started");
});
