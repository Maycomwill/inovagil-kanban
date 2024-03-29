import jwt from "jsonwebtoken";
import prisma from "../lib/prisma";

interface JwtPayload {
  id: string;
  iat: number;
  exp: number;
}
export async function validateToken(token: string) {
  const decodedToken = jwt.verify(
    token,
    String(process.env.JWTSECRET)
  ) as JwtPayload;
  if (!decodedToken) {
    return { valid: false, data: null };
  }
  const user = await prisma.user.findUnique({
    where: {
      id: decodedToken.id,
    },
    select: {
      categories: true,
      createdAt: true,
      email: true,
      id: true,
      name: true,
    },
  });

  return { valid: true, data: user };
}
