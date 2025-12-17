// src/App.tsx
import { useState, useEffect } from 'react';
import type { Todo, FilterValue } from './types/todo';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';
import FilterBar from './components/FilterBar';

function App() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const saved = localStorage.getItem('my-todo-tasks');
    return saved ? JSON.parse(saved) : [];
  });

  const [filter, setFilter] = useState<FilterValue>('all');

  useEffect(() => {
    localStorage.setItem('my-todo-tasks', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      text,
      completed: false,
      createdAt: Date.now(),
    };
    setTodos((prev) => [...prev, newTodo]);
  };

  const toggleTodo = (id: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const clearCompleted = () => {
    setTodos((prev) => prev.filter((t) => !t.completed));
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const completedCount = todos.filter(t => t.completed).length;

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
        
        <div className="bg-blue-600 p-8">
          <h1 className="text-3xl font-bold text-white">Task Master</h1>
          <p className="text-blue-100 mt-2">
            {todos.length > 0 
              ? `${completedCount} of ${todos.length} tasks completed`
              : "Your list is empty."}
          </p>
        </div>

        <div className="p-8">
          <TodoInput onAddTodo={addTodo} />
          
          <FilterBar currentFilter={filter} onFilterChange={setFilter} />

          <TodoList 
            todos={filteredTodos} 
            onToggle={toggleTodo} 
            onDelete={deleteTodo} 
          />

          {filteredTodos.length === 0 && (
            <div className="text-center py-12">
              <span className="text-4xl">
                {filter === 'completed' ? '⏳' : '✨'}
              </span>
              <p className="text-slate-400 mt-4">
                {filter === 'all' && "No tasks yet!"}
                {filter === 'active' && "No active tasks. You're all caught up!"}
                {filter === 'completed' && "No completed tasks yet. Keep going!"}
              </p>
            </div>
          )}

          {completedCount > 0 && (
            <button 
              onClick={clearCompleted}
              className="mt-6 text-sm text-red-500 hover:text-red-700 font-medium transition-colors"
            >
              Clear all completed tasks
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;