import jwt from "jsonwebtoken";
import prisma from "../lib/prisma.js";
import bcrypt from "bcrypt";

export const getPosts = async (req, res) => {
  const query = req.query;
  try {
    const posts = await prisma.post.findMany({
      where: {
        city: query.city || undefined,
        type: query.type || undefined,
        property: query.property || undefined,
        bedroom: parseInt(query.bedroom) || undefined,
        price: {
          gte: parseInt(query.minPrice) || 0,
          lte: parseInt(query.maxPrice) || 1000000000,
        },
      },
    });
    setTimeout(() => {
      res.status(200).send({ posts });
    }, 500);
  } catch (error) {
    console.error("Error in getting posts", error);
    res.status(500).send({ message: "Failed to get posts!" });
  }
};

export const getPost = async (req, res) => {
  const id = req.params.id;
  try {
    const post = await prisma.post.findUnique({
      where: { id },
      include: {
        postDetail: true,
        user: true,
      },
    });
    if (!post) {
      return res.status(404).send({ message: "Post not found" });
    }

    const token = req.cookies?.token;

    if (token) {
      jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, payload) => {
        if (err) {
          return res.status(200).send({ ...post, isSaved: false });
        }

        const saved = await prisma.savedPost.findUnique({
          where: {
            userId_postId: {
              postId: id,
              userId: payload.id,
            },
          },
        });
        return res.status(200).send({ ...post, isSaved: saved ? true : false });
      });
    } else {
      return res.status(200).send({ ...post, isSaved: false });
    }
  } catch (error) {
    console.error("Error in getting post", error);
    res.status(500).send({ message: "Failed to get post!" });
  }
};
export const addPost = async (req, res) => {
  const body = req.body;
  const tokenUserId = req.userId;
  try {
    const newPost = await prisma.post.create({
      data: {
        ...body.postData,
        userId: tokenUserId,
        postDetail: {
          create: body.postDetail,
        },
      },
    });
    res.status(200).send({ message: "New post added", newPost });
  } catch (error) {
    console.error("Error in adding post", error);
    res.status(500).send({ message: "Failed to add post!" });
  }
};
export const updatePost = async (req, res) => {
  try {
    const post = await prisma.user.findMany();
    res.status(200).send({ post });
  } catch (error) {
    console.error("Error in updating post", error);
    res.status(500).send({ message: "Failed to update post!" });
  }
};
export const deletePost = async (req, res) => {
  const id = req.params.id;
  const tokenUserId = req.userId;
  try {
    const post = await prisma.post.findUnique({ where: { id } });
    if (post.userId !== tokenUserId)
      return res.status(403).send({ message: "Not Authorized!" });
    // Delete the related PostDetail first
    await prisma.postDetail.delete({
      where: { postId: id },
    });

    // Then delete the Post
    await prisma.post.delete({ where: { id } });

    res.status(200).send({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("Error in deleting post", error);
    res.status(500).send({ message: "Failed to delete post!" });
  }
};
