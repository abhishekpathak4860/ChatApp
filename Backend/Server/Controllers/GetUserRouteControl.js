import Conversation from "../Models/ConversationModel.js";
import User from "../Models/UserModels.js";

export const getUserBySearch = async (req, res) => {
  try {
    const search = req.query.search || "";
    const currentUserId = req.user.id;
    const user = await User.find({
      $and: [
        {
          $or: [
            {
              fullname: { $regex: ".*" + search + ".*", $options: "i" },
            },
            {
              username: { $regex: ".*" + search + ".*", $options: "i" },
            },
          ],
        },
        {
          _id: { $ne: currentUserId },
        },
      ],
    })
      .select("-password")
      .select("-email");
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send({ success: false, message: error });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const currentUserId = req.user.id;
    const currentUsers = await Conversation.find({
      participants: currentUserId,
    }).sort({ updatedAt: -1 });

    if (!currentUsers || currentUsers.length === 0) {
      const allUsers = await User.find({ _id: { $ne: currentUserId } })
        .select("-password")
        .select("-email")
        .select("-gender");

      return res.status(200).send(allUsers);
    }

    const participantsIDS = currentUsers.reduce((ids, conversation) => {
      const otherParticipants = conversation.participants.filter(
        (id) => id.toString() !== currentUserId.toString()
      );
      return [...ids, ...otherParticipants];
    }, []);

    const uniqueParticipantIDs = [
      ...new Set(participantsIDS.map((id) => id.toString())),
    ];

    const user = await User.find({ _id: { $in: uniqueParticipantIDs } })
      .select("-password")
      .select("-email")
      .select("-gender");

    res.status(200).send(user); // just send the found users directly
  } catch (error) {
    res.status(500).send({ success: false, message: error });
    console.log(error);
  }
};
