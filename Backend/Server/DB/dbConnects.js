import mongoose from "mongoose";

const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CONNECT);
    console.log("DB Connected");
  } catch (error) {
    console.log(error);
  }
};
export default dbConnect;
