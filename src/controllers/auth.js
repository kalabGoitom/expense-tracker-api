import { prisma } from "../config/db.js";
import bcrypt from "bcryptjs";
import generateToken from "../utilties/generateToken.js";

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (userExists)
      return res.status(400).json({
        msg: `User with ${email} already exists.`,
      });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: hashedPassword,
      },
    });

    const token = generateToken(user.id, res);

    res.status(201).json({
      msg: {
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({
      msg: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user)
      return res.status(404).json({
        msg: `user with ${email} doesn't exist.`,
      });

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return res.status(401).json({
        msg: "Invalid credentials",
      });

    const token = generateToken(user.id, res);

    res.status(200).json({
      msg: {
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({
      msg: error.message,
    });
  }
};
const logout = async (req, res) => {
  try {
    res.clearCookie("jwt", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    res.status(200).json({
      msg: "Logged out successfully",
    });
  } catch (error) {
    res.status(500).json({
      msg: error.message,
    });
  }
};

const deleteAccount = async (req, res) => {
  try {
    const { id } = req.user;

    const userExists = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    if (!userExists)
      return res.status(404).json({
        msg: "User not found!",
      });

    const deleteAccount = await prisma.user.delete({
      where: {
        id: id,
      },
    });

    res.status(200).json({
      msg: "Account deleted!",
    });
  } catch (error) {
    res.status(500).json({
      msg: error.message,
    });
  }
};

export { signup, login, logout, deleteAccount };
