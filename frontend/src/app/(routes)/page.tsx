'use client';

import { useState, useEffect } from 'react';
import { 
  fetchTodos, 
  addTodo, 
  updateTodo, 
  deleteTodo,
  Todo 
} from '../redux/slices/todoSlice';
import { useAppDispatch, useAppSelector } from '../redux/hooks';

export default function TodoPage() {
  const dispatch = useAppDispatch();
  const todos = useAppSelector((state) => state.todos.items);
  const todosStatus = useAppSelector((state) => state.todos.status);

  const [newTodo, setNewTodo] = useState<Partial<Todo>>({
    title: '',
    description: '',
    priority: 'medium'
  });

  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  useEffect(() => {
    if (todosStatus === 'idle') {
      dispatch(fetchTodos());
    }
  }, [todosStatus, dispatch]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewTodo((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingTodo) {
      // Update existing todo
      dispatch(updateTodo({
        id: editingTodo.id!, 
        todoData: {
          ...newTodo
        }
      }));
      setEditingTodo(null);
    } else {
      // Add new todo
      dispatch(addTodo({
        title: newTodo.title!,
        description: newTodo.description,
        priority: newTodo.priority
      }));
    }

    // Reset form
    setNewTodo({
      title: '',
      description: '',
      priority: 'medium'
    });
  };

  const handleEdit = (todo: Todo) => {
    setEditingTodo(todo);
    setNewTodo({
      title: todo.title,
      description: todo.description || '',
      priority: todo.priority
    });
  };

  const handleToggleComplete = (todo: Todo) => {
    dispatch(updateTodo({
      id: todo.id!,
      todoData: {
        completed: !todo.completed
      }
    }));
  };

  const handleDelete = (id: string) => {
    dispatch(deleteTodo(id));
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return { bg: 'bg-red-100', text: 'text-red-800', border: 'border-red-500' };
      case 'medium': return { bg: 'bg-yellow-100', text: 'text-yellow-800', border: 'border-yellow-500' };
      default: return { bg: 'bg-green-100', text: 'text-green-800', border: 'border-green-500' };
    }
  };

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case 'high': return 'Tinggi';
      case 'medium': return 'Sedang';
      default: return 'Rendah';
    }
  };

  const countCompletedTodos = todos.filter(todo => todo.completed).length;
  const totalTodos = todos.length;
  const completionPercentage = totalTodos ? Math.round((countCompletedTodos / totalTodos) * 100) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100 py-12">
      <div className="container mx-auto p-4 max-w-3xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold mb-2 text-indigo-800 tracking-tight">TodoNe!</h1>
          <p className="text-gray-600">Kelola tugas Anda dengan gaya</p>
        </div>
        
        {/* Progress Bar */}
        {totalTodos > 0 && (
          <div className="mb-8 bg-white rounded-xl shadow-md p-4">
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">
                Progress: {countCompletedTodos} dari {totalTodos} tugas selesai
              </span>
              <span className="text-sm font-medium text-indigo-600">{completionPercentage}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-indigo-600 h-2.5 rounded-full transition-all duration-500" 
                style={{ width: `${completionPercentage}%` }}
              ></div>
            </div>
          </div>
        )}
        
        {/* Form Todo */}
        <div className="bg-white shadow-lg rounded-xl p-6 mb-8 transition-all duration-300 hover:shadow-xl">
          <h2 className="text-lg font-semibold mb-4 text-gray-800 border-b pb-2">
            {editingTodo ? 'Edit Tugas' : 'Tambah Tugas Baru'}
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Judul</label>
              <input
                id="title"
                type="text"
                name="title"
                value={newTodo.title || ''}
                onChange={handleInputChange}
                placeholder="Apa yang perlu dilakukan?"
                required
                className="shadow-sm border border-gray-300 rounded-lg w-full py-2.5 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Deskripsi</label>
              <textarea
                id="description"
                name="description"
                value={newTodo.description || ''}
                onChange={handleInputChange}
                placeholder="Detail tambahan (opsional)"
                rows={3}
                className="shadow-sm border border-gray-300 rounded-lg w-full py-2.5 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
              />
            </div>
            <div className="mb-5">
              <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-1">Prioritas</label>
              <select
                id="priority"
                name="priority"
                value={newTodo.priority || 'medium'}
                onChange={handleInputChange}
                className="shadow-sm border border-gray-300 rounded-lg w-full py-2.5 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
              >
                <option value="low">Rendah</option>
                <option value="medium">Sedang</option>
                <option value="high">Tinggi</option>
              </select>
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                {editingTodo ? 'Perbarui Tugas' : 'Tambah Tugas'}
              </button>
              {editingTodo && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingTodo(null);
                    setNewTodo({
                      title: '',
                      description: '',
                      priority: 'medium'
                    });
                  }}
                  className="px-5 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium rounded-lg shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
                >
                  Batal
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Filters */}
        {todos.length > 0 && (
          <div className="flex mb-6 bg-white p-2 rounded-lg shadow-md">
            <button 
              onClick={() => setFilter('all')}
              className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${filter === 'all' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              Semua
            </button>
            <button 
              onClick={() => setFilter('active')}
              className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${filter === 'active' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              Aktif
            </button>
            <button 
              onClick={() => setFilter('completed')}
              className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${filter === 'completed' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              Selesai
            </button>
          </div>
        )}

        {/* Todo List */}
        <div>
          {todosStatus === 'loading' && (
            <div className="flex justify-center py-10">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
            </div>
          )}

          {todosStatus === 'failed' && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">Gagal memuat tugas. Silakan coba lagi nanti.</p>
                </div>
              </div>
            </div>
          )}

          {todosStatus === 'succeeded' && todos.length === 0 && (
            <div className="bg-white shadow-md rounded-xl p-8 text-center">
              <svg className="h-16 w-16 text-gray-300 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <p className="text-lg text-gray-600">Tidak ada tugas. Mulai tambahkan tugas baru!</p>
            </div>
          )}

          {todosStatus === 'succeeded' && filteredTodos.length > 0 && (
            <ul className="space-y-3">
              {filteredTodos.map((todo) => {
                const priorityStyle = getPriorityColor(todo.priority || 'medium');
                
                return (
                  <li 
                    key={todo.id} 
                    className={`
                      bg-white shadow-md rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg
                      ${todo.completed ? 'opacity-70' : ''}
                      border-l-4 ${priorityStyle.border}
                    `}
                  >
                    <div className="p-4">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 pt-1">
                          <input
                            type="checkbox"
                            checked={todo.completed || false}
                            onChange={() => handleToggleComplete(todo)}
                            className="h-5 w-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 transition-colors cursor-pointer"
                          />
                        </div>
                        <div className="ml-3 flex-grow">
                          <div className="flex items-center justify-between">
                            <h3 
                              className={`
                                text-lg font-medium 
                                ${todo.completed ? 'line-through text-gray-500' : 'text-gray-800'}
                                transition-all duration-300
                              `}
                            >
                              {todo.title}
                            </h3>
                            <div className="flex space-x-1">
                              <button
                                onClick={() => handleEdit(todo)}
                                className="p-1.5 text-indigo-600 hover:bg-indigo-50 rounded-full transition-colors focus:outline-none"
                                title="Edit"
                              >
                                <svg 
                                  xmlns="http://www.w3.org/2000/svg" 
                                  className="h-5 w-5" 
                                  viewBox="0 0 20 20" 
                                  fill="currentColor"
                                >
                                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                </svg>
                              </button>
                              <button
                                onClick={() => handleDelete(todo.id!)}
                                className="p-1.5 text-red-600 hover:bg-red-50 rounded-full transition-colors focus:outline-none"
                                title="Hapus"
                              >
                                <svg 
                                  xmlns="http://www.w3.org/2000/svg" 
                                  className="h-5 w-5" 
                                  viewBox="0 0 20 20" 
                                  fill="currentColor"
                                >
                                  <path 
                                    fillRule="evenodd" 
                                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" 
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </button>
                            </div>
                          </div>
                          {todo.description && (
                            <p className={`text-sm mt-1 ${todo.completed ? 'text-gray-400' : 'text-gray-600'}`}>
                              {todo.description}
                            </p>
                          )}
                          <div className="mt-2">
                            <span 
                              className={`
                                text-xs px-2.5 py-1 rounded-full font-medium
                                ${priorityStyle.bg} ${priorityStyle.text}
                              `}
                            >
                              {getPriorityLabel(todo.priority || 'medium')}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
          
          {todosStatus === 'succeeded' && todos.length > 0 && filteredTodos.length === 0 && (
            <div className="bg-white shadow-md rounded-xl p-6 text-center">
              <p className="text-gray-600">Tidak ada tugas yang cocok dengan filter saat ini</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}