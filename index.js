import express from "express";
import mongoose from "mongoose";
import { loginValidation } from "./validations.js";
import checkAuth from "./utils/checkAuth.js";
import { register, login, getMe } from "./controllers/userController.js";

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

app.listen(4444, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log("Server started");
});
