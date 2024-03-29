import express from "express";
import prisma from "../lib/prisma";
import z from "zod";
import { hashSync } from "bcrypt";
import { json } from "body-parser";

const router = express.Router();
const salt = 10;

//Get users
router.get("/", async (req, res) => {
  const users = await prisma.user.findMany();
  return res.status(200).send(users);
});

//Get unique user
router.get("/:id", async (req, res) => {
  const paramsSchema = z.object({
    id: z.string().cuid(),
  });

  const { id } = paramsSchema.parse(req.params);

  if (!id) {
    return res.status(400).send({ message: "Id inválido", data: null });
  }
  try {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        email: true,
        name: true,
        categories: true,
        id: true,
        createdAt: true,
      },
    });

    if (!user) {
      return res
        .status(400)
        .send({ message: "Usuário não encontrado", data: null });
    }

    return res.status(200).send({ message: "Usuário encontrado", data: user });
  } catch (error) {
    if (error instanceof Error && error.message) {
      return res.status(500).send({ message: error.message, data: error });
    }
  }
});

router.post("/", json(), async (req, res) => {
  const bodySchema = z.object({
    name: z.string().min(1, "É necessário definir um nome para usuário"),
    email: z.string().email().min(1, "É necessário definir um email"),
    password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
  });

  const { name, email, password } = bodySchema.parse(req.body);
  if (!name || !email || !password) {
    return res
      .status(400)
      .send({ message: "Campos obrigatórios não enviados", data: null });
  }
  const encryptedPassword = hashSync(password, salt);
  try {
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: encryptedPassword,
      },
    });
    const categories = await prisma.categories.createMany({
      data: [
        {
          name: "A fazer",
          ownerId: newUser.id,
        },
        {
          name: "Em andamento",
          ownerId: newUser.id,
        },
        {
          name: "Concluído",
          ownerId: newUser.id,
        },
      ],
    });

    if (!newUser) {
      return res
        .status(400)
        .send({ message: "Cadastro não sucedido", data: null });
    }
    return res.status(201).send({
      message: "Cadastro concluído com sucesso",
      data: { name: newUser.name, id: newUser.id, email: newUser.email },
    });
  } catch (error) {
    if (error instanceof Error && error.message) {
      return res.status(500).send({ message: error.message, data: error });
    }
  }
});

router.delete("/:id", async (req, res) => {
  const paramsSchema = z.object({
    id: z.string().cuid(),
  });

  const { id } = paramsSchema.parse(req.params);

  try {
    const categories = await prisma.categories.findMany({
      where: { ownerId: id },
    });
    if (categories) {
      const tasks = categories.map(async (category) => {
        const tasks = await prisma.tasks.findMany({
          where: {
            categoryId: category.id,
          },
        });
        if (tasks) {
          await prisma.tasks.deleteMany({
            where: {
              categoryId: category.id,
            },
          });
        }
      });

      categories.map(async (category) => {
        await prisma.categories.delete({
          where: {
            id: category.id,
          },
        });
      });
    }

    await prisma.user.delete({
      where: {
        id,
      },
    });

    return res
      .status(200)
      .send({ message: "Usuário deletado com sucesso", data: null });
  } catch (error) {
    if (error instanceof Error && error.message) {
      return res.status(500).send({ message: error.message, data: error });
    }
  }
});

export const UserRouter = router;
