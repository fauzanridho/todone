// frontend/src/app/redux/slices/todoSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

// Definisi tipe Todo yang lebih komprehensif
export interface Todo {
  id?: string;
  title: string;
  description?: string;
  completed?: boolean;
  priority?: 'low' | 'medium' | 'high';
  createdAt?: string;
  updatedAt?: string;
}

// Tipe state untuk slice
interface TodoState {
  items: Todo[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

// Initial state dengan tipe yang jelas
const initialState: TodoState = {
  items: [],
  status: 'idle',
  error: null
};

// Konfigurasi axios
const axiosInstance = axios.create({
  baseURL: '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Async Thunks dengan tipe yang lebih spesifik
export const fetchTodos = createAsyncThunk<
  Todo[], 
  void, 
  { rejectValue: string }
>(
  'todos/fetchTodos',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/todos');
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Gagal mengambil todos'
      );
    }
  }
);

export const addTodo = createAsyncThunk<
  Todo, 
  Partial<Todo>, 
  { rejectValue: string }
>(
  'todos/addTodo',
  async (todoData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/todos', todoData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Gagal menambah todo'
      );
    }
  }
);

export const updateTodo = createAsyncThunk<
  Todo, 
  { id: string; todoData: Partial<Todo> }, 
  { rejectValue: string }
>(
  'todos/updateTodo',
  async ({ id, todoData }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/todos/${id}`, todoData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Gagal memperbarui todo'
      );
    }
  }
);

export const deleteTodo = createAsyncThunk<
  string, 
  string, 
  { rejectValue: string }
>(
  'todos/deleteTodo',
  async (id, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/todos/${id}`);
      return id;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Gagal menghapus todo'
      );
    }
  }
);

// Slice dengan tipe yang lebih ketat
const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Gagal mengambil todos';
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        const index = state.items.findIndex(todo => todo.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.items = state.items.filter(todo => todo.id !== action.payload);
      });
  }
});

export default todoSlice.reducer;