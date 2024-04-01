import express from "express";
import { json } from "body-parser";
import z from "zod";
import prisma from "../lib/prisma";
import { compareSync } from "bcrypt";
import jwt from "jsonwebtoken";
import { validateToken } from "../services/validadeToken";
const router = express.Router();

router.post("/", json(), async (req, res) => {
  const bodySchema = z.object({
    email: z.string().email(),
    password: z.string(),
  });

  const { email, password } = bodySchema.parse(req.body);

  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
      include: {
        categories: true,
      },
    });

    if (!user) {
      return res
        .status(400)
        .send({ message: "Usuário não encontrado", data: null });
    }

    const comparePassword = compareSync(password, user.password);

    if (!comparePassword) {
      if (!user) {
        return res
          .status(400)
          .send({ message: "Email ou senha errados", data: null });
      }
    }

    const token = jwt.sign(
      {
        id: user.id,
      },
      String(process.env.JWTSECRET),
      { expiresIn: "24h" }
    );

    return res.status(200).send({
      message: "Login autorizado",
      data: {
        token,
        user: {
          categories: user.categories,
          createdAt: user.createdAt,
          email: user.email,
          id: user.id,
          name: user.name,
        },
      },
    });
  } catch (error) {
    if (error instanceof Error && error.message) {
      return res.status(500).send({ message: error.message, data: error });
    }
  }
});

router.post("/verify", json(), async (req, res) => {
  const bodySchema = z.object({
    token: z.string(),
  });

  const { token } = bodySchema.parse(req.body);

  const verify = await validateToken(token);

  if (verify.valid === false) {
    return res
      .status(401)
      .send({ message: "Token inválido", data: verify.data, status: false });
  }

  return res.status(200).send({ message: "Token válido", data: verify.data, status: true });
});

export const AuthRouter = router;
