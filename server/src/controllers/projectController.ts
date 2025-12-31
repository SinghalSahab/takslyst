import { Request, Response } from "express";
import { prisma } from "../lib/prisma.js";


export const getProjects = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    console.log("⏳ Before Prisma");
    const projects = await prisma.project.findMany();
    console.log("✅ After Prisma");
    res.json(projects);
  } catch (error: any) {
    res.status(500).json({
      name: error.name,
      code: error.code,
      message: error.message,
      meta: error.meta,
    });
  }
};

export const createProject = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { name, description, startDate, endDate } = req.body;
  try {
    const newProject = await prisma.project.create({
      data: {
        name,
        description,
        startDate,
        endDate,
      },
    });
    res.status(201).json(newProject);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: `Error creating a project: ${error.message}` });
  }
};