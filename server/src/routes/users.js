import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import UserModel from "../models/Users.js";

const route = express.Router();

// REGISTER
route.post("/register", async (req, res) => {
  const { username, password } = req.body;

  const user = await UserModel.findOne({
    username: username,
  });

  if (user) {
    return res.status(400).send({
      msg: "User Already Exists :(",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  await new UserModel({ username, password: hashedPassword }).save();

  res.status(200).send({
    msg: "User Registered!! :)",
  });
});

// LOGIN
route.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await UserModel.findOne({
    username: username,
  });

  if (!user) {
    return res.json({
      msg: "User doesn't exist",
    });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.json({
      msg: "Username or Password are incorrect!!",
    });
  }

  const token = jwt.sign({ id: user._id }, "secret");
  res.json({ token, userID: user._id });
});

export { route as userRouter };

// export const verifyToken = (req, res, next) => {
//   const token = req.headers.authorization;
//   if(token){
//     jwt.verify(token, "secret", (err) => {
//       if(err) return res.status(403);
//       next();
//     })
//   }
//     else{
//       res.status(401);
//     }
//   }

