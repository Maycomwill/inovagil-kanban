import express from "express";
import { json } from "body-parser";
import prisma from "../lib/prisma";
import z from "zod";

const router = express.Router();

router.get("/:id", async (req, res) => {
  const paramsSchema = z.object({
    id: z.string().cuid(),
  });

  const { id } = paramsSchema.parse(req.params);

  try {
    const task = await prisma.tasks.findUnique({
      where: {
        id,
      },
      include: { Categories: true },
    });

    return res.status(200).send({ message: "Tarefa encontrada", data: task });
  } catch (error) {
    if (error instanceof Error && error.message) {
      return res.status(500).send({ message: error.message, data: error });
    }
  }
});

router.get("/category/:categoryId", async (req, res) => {
  const paramsSchema = z.object({
    categoryId: z.string().cuid(),
  });

  const { categoryId } = paramsSchema.parse(req.params);

  try {
    const tasks = await prisma.tasks.findMany({
      where: {
        categoryId,
      },
      include: {
        Categories: true,
      },
    });

    if (tasks.length === 0) {
      return res.status(500).send({
        message: "Não há tarefas registradas nessa categoria",
        data: null,
      });
    }

    return res
      .status(200)
      .send({ message: "Tarefas encontradas", data: tasks });
  } catch (error) {
    if (error instanceof Error && error.message) {
      return res.status(500).send({ message: error.message, data: error });
    }
  }
});

router.post("/", json(), async (req, res) => {
  const bodySchema = z.object({
    name: z.string().min(1, "A tarefa precisa ter um nome"),
    categoryId: z.string().cuid(),
  });

  const { name, categoryId } = bodySchema.parse(req.body);

  try {
    const task = await prisma.tasks.create({
      data: {
        name,
        categoryId,
      },
    });

    return res
      .status(201)
      .send({ message: "Tarefa criada com sucesso", data: task });
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
    await prisma.tasks.delete({
      where: {
        id,
      },
    });
    return res
      .status(200)
      .send({ message: "Tarefa deletada com sucesso", data: null });
  } catch (error) {
    if (error instanceof Error && error.message) {
      return res.status(500).send({ message: error.message, data: error });
    }
  }
});

router.patch("/", json(), async (req, res) => {
  const bodySchema = z.object({
    id: z.string().cuid(),
    categoryId: z.string().cuid(),
  });

  const { id, categoryId } = bodySchema.parse(req.body);

  try {
    const task = await prisma.tasks.findUnique({
      where: { id },
    });
    if (!task) {
      return res
        .status(400)
        .send({ message: "Tarefa não encontrada", data: null });
    }

    const newTask = await prisma.tasks.update({
      where: {
        id,
      },
      data: {
        updatedAt: new Date().toISOString(),
        categoryId,
      },
    });

    return res
      .status(200)
      .send({ message: "Alteração realizada com sucesso", data: newTask });
  } catch (error) {
    if (error instanceof Error && error.message) {
      return res.status(500).send({ message: error.message, data: error });
    }
  }
});

router.delete("/id", async (req, res) => {
  const paramsSchema = z.object({
    id: z.string().cuid(),
  });

  const { id } = paramsSchema.parse(req.params);

  try {
    await prisma.tasks.delete({
      where: {
        id,
      },
    });

    return res
      .status(200)
      .send({ message: "Tarefa deletada com sucesso", data: null });
  } catch (error) {
    if (error instanceof Error && error.message) {
      return res.status(500).send({ message: error.message, data: error });
    }
  }
});

export const TasksRouter = router;
