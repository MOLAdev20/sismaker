import { SignJWT } from "jose";

const secretKey = new TextEncoder().encode(process.env.JWT_SECRET);
const alg = "HS256";

const signToken = async ({ username, password }) => {
  return new SignJWT({ username })
    .setProtectedHeader({ alg })
    .setIssuedAt()
    .setExpirationTime("1d")
    .sign(secretKey);
};

export default signToken;
