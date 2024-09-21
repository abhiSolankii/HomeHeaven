import jwt from "jsonwebtoken";
import prisma from "../lib/prisma.js";
import bcrypt from "bcrypt";

export const addMessage = async (req, res) => {
  const tokenUserId = req.userId;
  const chatId = req.params.chatId;
  const text = req.body.text;
  try {
    const chat = await prisma.chat.findUnique({
      where: {
        id: chatId,
        userIDs: {
          hasSome: [tokenUserId],
        },
      },
    });
    if (!chat) return res.status(404).send({ message: "Chat not found!" });

    const message = await prisma.message.create({
      data: {
        text,
        chatId,
        userId: tokenUserId,
      },
    });

    await prisma.chat.update({
      where: {
        id: chatId,
      },
      data: {
        seenBy: [tokenUserId],
        lastMessage: text,
      },
    });
    res.status(200).send(message);
  } catch (error) {
    console.error("Error in adding Message: ", error);
    res.status(500).send({ message: "Failed to add Message!" });
  }
};
