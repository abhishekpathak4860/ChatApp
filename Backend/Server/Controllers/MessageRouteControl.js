import Conversation from "../Models/ConversationModel.js";
import Message from "../Models/MessageModel.js";
import { io } from "../Socket/socket.js";
import { getReciverSocketId } from "../Socket/socket.js";

export const sendmessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user.id;

    let chats = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });
    if (!chats) {
      chats = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }
    const newMessages = new Message({
      senderId,
      receiverId,
      message: message,
      conversationId: chats.id,
    });
    if (newMessages) {
      chats.message.push(newMessages.id);
    }
    // socket io function
    // const receiverSocketId = getReciverSocketId(receiverId);

    // if (receiverSocketId) {
    //   io.to(receiverSocketId).emit("newMessages", newMessages);
    // }
    const receiverSocketId = getReciverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessages);
    }

    // chats.updatedAt = new Date();
    await Promise.all([chats.save(), newMessages.save()]);

    res.status(200).send(newMessages);
  } catch (error) {
    res.status(500).send({ success: false, message: error });
    console.log(error);
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: receiverId } = req.params;
    const senderId = req.user.id;
    const chats = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    }).populate("message");
    if (!chats) return res.status(200).send([]);
    const message = chats.message;
    res.status(200).send(message);
  } catch (error) {
    res.status(500).send({ success: false, message: error });
    console.log(error);
  }
};
