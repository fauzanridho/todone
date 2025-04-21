
// backend/src/utils/validation.ts
import { z } from 'zod';

// Skema validasi untuk Todo
export const TodoSchema = z.object({
  title: z.string().min(1, "Judul harus diisi").max(255, "Judul maksimal 255 karakter"),
  description: z.string().optional(),
  completed: z.boolean().optional().default(false),
  priority: z.enum(['low', 'medium', 'high']).optional().default('medium')
});