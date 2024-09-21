import bcrypt from "bcrypt";
import prisma from "../lib/prisma.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    //hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    //create a new user and save to db
    const newUser = await prisma.user.create({
      data: { username, email, password: hashedPassword },
    });
    res
      .status(201)
      .send({ message: "User created successfully! Please Login" });
  } catch (error) {
    console.error("Error in registering", error);
    res.status(500).send({ message: "Failed to create User!" });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    //Check if user exists
    const user = await prisma.user.findUnique({
      where: { username },
    });
    // console.log(user);
    if (!user) return res.status(401).send({ message: "Invalid Credentials!" });
    //verify the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.status(401).send({ message: "Invalid Credentials!" });

    //generate cookie and send it to user

    const token = jwt.sign(
      {
        id: user.id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1d" }
    );
    const { password: userPassword, ...userInfo } = user;

    res.cookie("real_token", token, {
      maxAge: 2 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "Strict",
    });
    res.status(200).send({ message: "Login Successful", userInfo });
  } catch (error) {
    console.error("Error in log in: ", error);
    res.status(500).send({ message: "Failed to login!" });
  }
};

export const logout = (req, res) => {
  res
    .clearCookie("real_token")
    .status(200)
    .send({ message: "Logout successful" });
};
