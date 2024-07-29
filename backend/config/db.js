import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://mdnabeelahemad539:Foodkart539@cluster0.nypkgdg.mongodb.net/foodkart"
    );
    console.log("DB Connected");
  } catch (error) {
    console.log(error);
  }
};
