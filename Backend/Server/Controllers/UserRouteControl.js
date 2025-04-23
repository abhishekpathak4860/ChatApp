import User from "../Models/UserModels.js";
import bcryptjs from "bcryptjs";
import jwtToken from "../Utils/JwtwebToken.js";

// Register
export const UserRegister = async (req, res) => {
  try {
    const { fullname, username, email, gender, password, profilepic } =
      req.body;
    const user = await User.findOne({ username, email });
    if (user) {
      return res
        .status(500)
        .send({ success: false, message: "Username or Email Already Exist" });
    }

    const hashPassword = await bcryptjs.hash(password, 10);
    const profilePicBoy =
      profilepic ||
      `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const profilePicGirl =
      profilepic ||
      `https://avatar.iran.liara.run/public/girl?username=${username}`;

    const newUser = new User({
      fullname,
      username,
      email,
      gender,
      password: hashPassword,
      profilepic: gender === "male" ? profilePicBoy : profilePicGirl,
    });

    if (newUser) {
      await newUser.save(); // save to the database
      jwtToken(newUser._id, res); // create jwt token when register
    } else {
      return res
        .status(500)
        .send({ success: false, message: "Invalid User Data" });
    }

    res.status(201).send({
      // send to the frontend
      id: newUser._id,
      fullname: newUser.fullname,
      username: newUser.username,
      profilepic: newUser.profilepic,
      email: newUser.email,
      message: "Successfully Register",
    });
  } catch (error) {
    res.status(500).send({ success: false, message: error });
    console.log(error);
  }
};

// Login
export const UserLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    console.log(user);
    if (!user)
      return res.status(500).send({
        success: false,
        message: "Email Doesn't Exist Please Register First!",
      });
    const ComparePass = await bcryptjs.compare(password, user.password || "");
    if (!ComparePass)
      return res
        .status(500)
        .send({ success: false, message: "Please Enter Correct Password" });

    jwtToken(user._id, res); // create jwt token when login

    res.status(200).send({
      id: user._id,
      fullname: user.fullname,
      username: user.username,
      profilepic: user.profilepic,
      email: user.email,
      message: "Successfully Login",
    });
  } catch (error) {
    res.status(500).send({ success: false, message: error });
    console.log(error);
  }
};
// Logout
export const UserLogout = async (req, res) => {
  try {
    res.cookie("jwt", "", {
      maxAge: 0,
    });

    res.status(200).send({ message: "User Logout" });
  } catch (error) {
    res.status(500).send({ success: false, message: error });
    console.log(error);
  }
};
