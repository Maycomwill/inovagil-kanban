import jwt from "jsonwebtoken";
import prisma from "../lib/prisma";

interface JwtPayload {
  id: string;
  email: string;
  iat: number;
  exp: number;
}
export async function validateToken(token: string) {
  const decodedToken = jwt.verify(
    token,
    String(process.env.JWTSECRET)
  ) as JwtPayload;
  const user = await prisma.user.findUnique({
    where: {
      email: decodedToken.email,
    },
  });

  return user;
}