import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { userRouter } from "./src/routes/users.js";
import { recipesRouter } from './src/routes/recipes.js'


const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

app.use("/auth", userRouter);
app.use("/recipes", recipesRouter);

mongoose
  .connect(
    "mongodb+srv://vijaypardhu:vijayrecipe@recipeapp.kszo8fp.mongodb.net/"
  )
  .then(() => console.log("Connect to MongoDB"))
  .catch((err) => console.error("Mongo DB connection error",err));

app.listen(port, () => console.log(`Server running on ${port}`));
