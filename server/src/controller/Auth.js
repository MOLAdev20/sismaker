import { prisma } from "../../db/prisma.js";
import bcrypt from "bcrypt";
import signToken from "../helper/jwt.js";

const authController = {
  auth: async (req, res) => {
    const { username, password } = req.body;

    try {
      if (!username || !password) {
        return res.status(400).json({
          status: "required-field",
          message: "Username and password are required",
        });
      }

      const user = await prisma.user.findFirst({
        where: { username },
      });

      // samakan respons biar gak gampang enumerasi
      if (!user) {
        return res.status(401).json({
          status: "invalid-credentials",
          message: "Invalid username or password",
        });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({
          status: "invalid-credentials",
          message: "Invalid username or password",
        });
      }

      const token = await signToken({
        sub: user.id,
        username: user.username,
      });

      return res.status(200).json({
        message: "Login successful",
        token,
      });
    } catch (error) {
      return res.status(500).json({
        status: "internal-server-error",
        message: "Error during login",
        error: error.message,
      });
    }
  },

  checkOldPassword: async (req, res) => {
    const { password } = req.body;

    try {
      const user = await prisma.user.findFirst({
        where: { id: req.user.id },
      });

      if (!user) {
        return res.status(404).json({
          status: "error",
          message: "User not found",
        });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      return res.status(200).json({
        status: isPasswordValid ? "ok" : "invalid-credentials",
        message: isPasswordValid ? "Password valid" : "Password invalid",
      });
    } catch (error) {
      return res.status(500).json({
        status: "error",
        message: "Server error",
        error: error.message,
      });
    }
  },

  changePassword: async (req, res) => {},
};

export default authController;
