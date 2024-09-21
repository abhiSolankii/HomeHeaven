import jwt from "jsonwebtoken";
import prisma from "../lib/prisma.js";
import bcrypt from "bcrypt";

export const getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).send({ users });
  } catch (error) {
    console.error("Error in getting users", error);
    res.status(500).send({ message: "Failed to get Users!" });
  }
};

export const getUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await prisma.user.findUnique({
      where: { id },
    });
    res.status(200).send({ user });
  } catch (error) {
    console.error("Error in getting user", error);
    res.status(500).send({ message: "Failed to get User!" });
  }
};

export const updateUser = async (req, res) => {
  const id = req.params.id;
  const tokenUserId = req.userId;
  const { password, avatar, ...inputs } = req.body;
  if (id !== tokenUserId) {
    return res.status(403).send({ message: "Not Authorized!" });
  }
  let updatedPassword = null;
  try {
    if (password) {
      updatedPassword = await bcrypt.hash(password, 10);
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        ...inputs,
        ...(updatedPassword && { password: updatedPassword }),
        ...(avatar && { avatar }),
      },
    });
    res.status(200).send({ message: "Profile updated", updatedUser });
  } catch (error) {
    console.error("Error in updating user", error);
    res.status(500).send({ message: "Failed to update User!" });
  }
};
export const deleteUser = async (req, res) => {
  const id = req.params.id;
  const tokenUserId = req.userId;
  if (id !== tokenUserId) {
    return res.status(403).send({ message: "Not Authorized!" });
  }
  try {
    await prisma.delete({ where: { id } });
    res.status(200).send({ message: "User deleted" });
  } catch (error) {
    console.error("Error in deleting user", error);
    res.status(500).send({ message: "Failed to delete User!" });
  }
};

export const savePost = async (req, res) => {
  const postId = req.body.postId;
  const tokenUserId = req.userId;
  try {
    const savedPost = await prisma.savedPost.findUnique({
      where: {
        userId_postId: {
          userId: tokenUserId,
          postId,
        },
      },
    });
    if (savedPost) {
      await prisma.savedPost.delete({
        where: {
          id: savedPost.id,
        },
      });
      res.status(200).send({ message: "Post removed from saved posts list" });
    } else {
      await prisma.savedPost.create({
        data: {
          userId: tokenUserId,
          postId,
        },
      });
      res.status(200).send({ message: "Post saved" });
    }
  } catch (error) {
    console.error("Error in saving post", error);
    res.status(500).send({ message: "Error is saving post!" });
  }
};

export const profilePosts = async (req, res) => {
  const tokenUserId = req.userId;
  try {
    const userPosts = await prisma.post.findMany({
      where: { userId: tokenUserId },
    });
    const saved = await prisma.savedPost.findMany({
      where: { userId: tokenUserId },
      include: {
        post: true,
      },
    });

    const savedPosts = saved.map((item) => item.post);
    setTimeout(() => {
      res.status(200).send({ userPosts, savedPosts });
    }, 300);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get profile posts!" });
  }
};
