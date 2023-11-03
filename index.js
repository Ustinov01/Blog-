import express from "express";
import mongoose from "mongoose";
import multer from "multer";
import {
  loginValidation,
  postCreationValidation,
  registerValidation,
} from "./validations.js";
import checkAuth from "./utils/checkAuth.js";
import { register, login, getMe } from "./controllers/userController.js";
import {
  create,
  getAll,
  getOnePost,
  remove,
  update,
} from "./controllers/PostController.js";
import handelValidationErrors from "./utils/handelValidationErrors.js";

mongoose
  .connect(
    "mongodb+srv://admin:wwwwww@beauty0.s26uw8r.mongodb.net/blog?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("DB connect");
  })
  .catch((err) => console.log("DB error", err));

const app = express();

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, "uploads");
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.post("/auth/login", loginValidation, handelValidationErrors, login);
app.post(
  "/auth/register",
  registerValidation,
  handelValidationErrors,
  register
);
app.get("/auth/me", checkAuth, getMe);

app.post("/upload", checkAuth, upload.single("image"), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  });
});

app.get("/posts", getAll);
app.get("/posts/:id", getOnePost);
app.post(
  "/posts",
  checkAuth,
  postCreationValidation,
  handelValidationErrors,
  create
);
app.delete("/posts/:id", checkAuth, remove);
app.patch("/posts/:id", checkAuth, handelValidationErrors, update);

app.listen(4444, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log("Server started");
});
