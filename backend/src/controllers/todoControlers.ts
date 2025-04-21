// backend/src/controllers/todoController.ts
import { Request, Response, NextFunction } from 'express';
import Todo from '../models/Todo';
import { TodoSchema } from '../utils/validations';
import { NotFoundError, ValidationError } from '../middlewares/errorHandler';

export const createTodo = async (
  req: Request, 
  res: Response, 
  next: NextFunction
) => {
  try {
    // Validasi input
    const validatedData = TodoSchema.parse(req.body);

    // Buat todo baru
    const todo = await Todo.create(validatedData);

    res.status(201).json(todo);
  } catch (error) {
    next(error);
  }
};

export const getAllTodos = async (
  req: Request, 
  res: Response, 
  next: NextFunction
) => {
  try {
    // Ambil semua todos, urutkan dari yang terbaru
    const todos = await Todo.findAll({
      order: [['createdAt', 'DESC']]
    });

    res.status(200).json(todos);
  } catch (error) {
    next(error);
  }
};

export const updateTodo = async (
  req: Request, 
  res: Response, 
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    // Cari todo
    const todo = await Todo.findByPk(id);
    if (!todo) {
      throw new NotFoundError('Todo tidak ditemukan');
    }

    // Validasi input
    const validatedData = TodoSchema.partial().parse(req.body);

    // Update todo
    const updatedTodo = await todo.update(validatedData);

    res.status(200).json(updatedTodo);
  } catch (error) {
    next(error);
  }
};

export const deleteTodo = async (
  req: Request, 
  res: Response, 
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    // Cari todo
    const todo = await Todo.findByPk(id);
    if (!todo) {
      throw new NotFoundError('Todo tidak ditemukan');
    }

    // Hapus todo
    await todo.destroy();

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};