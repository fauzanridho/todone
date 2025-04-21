// backend/src/routes/todoRoutes.ts
import express from 'express';
import * as todoController from '../controllers/todoControlers';

const router = express.Router();

// GET semua todos
router.get('/', todoController.getAllTodos);

// POST todo baru
router.post('/', todoController.createTodo);

// PUT (update) todo
router.put('/:id', todoController.updateTodo);

// DELETE todo
router.delete('/:id', todoController.deleteTodo);

export default router;