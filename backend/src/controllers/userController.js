import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Cart } from "../models/cartModel.js";

export const userSignup = async (req, res) => {
  // console.log(req.body);
  const { fullName, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .json({ message: "User with this email id already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      fullName: fullName,
      email: email,
      password: hashedPassword,
    });

    const result = await newUser.save();
    // // Create an empty cart for the new user
    // const newCart = new Cart({
    //   user: result._id, // Associate the cart with the newly created user
    //   products: [],
    // });

    const tokenPayload = {
      userId: result._id,
      email: result.email,
      role: result.role,
    };

    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, {
      expiresIn: "365d",
    });
    console.log("signed in");

    res.status(200).json({ token: token });
  } catch (error) {
    console.error("Error during user registration:", error);
    res.status(500).send("Error during user registration");
  }
};

export const userLogin = async (req, res) => {
  const { email, password } = req.body;
  // console.log(email, password);
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .send("User not found. Please check your email and try again.");
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res
        .status(401)
        .send({ message: "Invalid password. Please try again." });
    }

    const tokenPayload = {
      userId: user._id,
      email: user.email,
      role: user.role,
    };

    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, {
      expiresIn: "365d",
    });
    console.log("Logged In");

    res.status(200).json({ token });
  } catch (error) {
    console.error("Error during user login:", error.message);
  }
};

export const getUserInfo = async (req, res) => {
  const userId = req.user.userId;
  try {
    const user = await User.findById(userId).select("-password");

    // console.log(user);
    res.status(200).json({ user });
  } catch (error) {
    res.status(404).json({ message: "User not found!" });
  }
};
