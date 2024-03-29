import z from "zod";
import prisma from "../lib/prisma";
import express from "express";
import { json } from "body-parser";

const router = express.Router();

router.get("/user/:id", async (req, res) => {
  const paramsSchema = z.object({
    id: z.string().cuid(),
  });

  const { id } = paramsSchema.parse(req.params);
  try {
    const categories = await prisma.categories.findMany({
      where: {
        ownerId: id,
      },
      include: {
        tasks: true,
      },
    });

    if (!categories || categories.length === 0) {
      res.status(500).send({
        message: "Usuário não possui nenhuma categoria cadastrada",
        data: null,
      });
    }

    res
      .status(200)
      .send({ message: "Categorias encontradas", data: categories });
  } catch (error) {
    if (error instanceof Error && error.message) {
      res.status(500).send({ message: error.message, data: error });
    }
  }
});

router.post("/", json(), async (req, res) => {
  const bodySchema = z.object({
    name: z.string().min(1, "A categoria precisa ter um nome"),
    ownerId: z.string().cuid(),
  });

  const { ownerId, name } = bodySchema.parse(req.body);

  try {
    const newCategory = await prisma.categories.create({
      data: {
        name,
        ownerId,
      },
    });

    if (!newCategory) {
      res.status(400).send({
        message: "Não foi possível criar a nova categoria",
        data: null,
      });
    }

    res
      .status(200)
      .send({ message: "Categoria criada com sucesso", data: newCategory });
  } catch (error) {
    if (error instanceof Error && error.message) {
      res.status(500).send({ message: error.message, data: error });
    }
  }
});

router.delete("/:id", async (req, res) => {
  const paramsSchema = z.object({
    id: z.string().cuid(),
  });
  const { id } = paramsSchema.parse(req.params);

  try {
    const tasks = await prisma.tasks.findMany({
      where: {
        categoryId: id,
      },
    });

    if (tasks) {
      await prisma.tasks.deleteMany({
        where: {
          categoryId: id,
        },
      });
    }
    await prisma.categories.delete({
      where: {
        id,
      },
    });

    res.status(200).send({
      message: "Categoria e tarefas associadas deletadas com sucesso",
      data: null,
    });
  } catch (error) {
    if (error instanceof Error && error.message) {
      res.status(500).send({ message: error.message, data: error });
    }
  }
});

export const CategoryRouter = router;
