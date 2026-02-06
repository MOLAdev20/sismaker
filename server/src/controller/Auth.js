import { prisma } from "../../db/prisma.js";
import bcrypt from "bcrypt";
import signToken from "../helper/jwt.js";

const authController = {
  auth: async (req, res) => {
    const { username, password } = req.body;

    try {
      if (!username || !password) {
        return res
          .status(400)
          .json({ message: "Username and password are required" });
      }

      const user = await prisma.user.findFirst({
        where: { username },
      });
      if (user) {
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
          return res.status(401).json({ message: "Invalid password" });
        }
        const token = await signToken({ username, password });
        res.status(200).json({ message: "Login successful", token: token });
      } else {
        res.status(401).json({ message: "Username not found" });
      }
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error during login", error: error.message });
    }
  },
};

export default authController;
