import { useState, useEffect } from 'react';
import type { Todo } from './types/todo';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';

function App() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const saved = localStorage.getItem('my-todo-tasks');
    return saved ? JSON.parse(saved) : [];
  });

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

  const completedCount = todos.filter(t => t.completed).length;

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl shadow-slate-200/60 overflow-hidden border border-slate-100">
        
        <div className="bg-blue-600 p-6">
          <h1 className="text-2xl font-bold text-white">Task Master</h1>
          <p className="text-blue-100 text-sm mt-1">
            {todos.length > 0 
              ? `${completedCount} of ${todos.length} tasks completed`
              : "Let's get some work done!"}
          </p>
        </div>

        <div className="p-6">
          <TodoInput onAddTodo={addTodo} />
          
          <div className="mt-4">
            <TodoList 
              todos={todos} 
              onToggle={toggleTodo} 
              onDelete={deleteTodo} 
            />
          </div>

          {todos.length === 0 && (
            <div className="text-center py-10">
              <div className="text-4xl mb-3">📝</div>
              <p className="text-slate-400 text-sm font-medium">Your list is clear!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;