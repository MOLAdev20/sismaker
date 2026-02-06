import { jwtVerify } from "jose";
import { prisma } from "../../db/prisma.js";

const secretKey = new TextEncoder().encode(process.env.JWT_SECRET);

export default async function requireAuth(req, res, next) {
  try {
    const header = req.headers.authorization || "";
    const [type, token] = header.split(" ");

    if (type !== "Bearer" || !token) {
      return res.status(401).json({ message: "Missing token" });
    }

    const { payload } = await jwtVerify(token, secretKey);

    const validateAdmin = await prisma.user.findFirst({
      where: { username: payload.username },
    });

    if (!validateAdmin) {
      return res.status(401).json({ message: "Invalid user" });
    }

    next();
  } catch (e) {
    return res.status(401).json({ message: "Invalid/expired token" });
  }
}
