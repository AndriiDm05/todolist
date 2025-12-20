import { useState, useEffect } from 'react';
import { ClipboardList, CheckCircle2, History } from 'lucide-react';
import type { Todo, FilterValue, ThemeColor, AppMode } from './types/todo';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';
import FilterBar from './components/FilterBar';
import ThemeSettings from './components/ThemeSettings';
import { themeClasses } from './components/ThemeClasses';

function App() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const saved = localStorage.getItem('my-todo-tasks');
    return saved ? JSON.parse(saved) : [];
  });

  const [filter, setFilter] = useState<FilterValue>('all');

  const [themeColor, setThemeColor] = useState<ThemeColor>(() => {
    const saved = localStorage.getItem('my-todo-theme');
    return saved ? JSON.parse(saved) : 'blue';
  });

  const [appMode, setAppMode] = useState<AppMode>(() => {
    const saved = localStorage.getItem('my-todo-mode');
    return saved ? JSON.parse(saved) : 'light';
  });

  useEffect(() => {
    localStorage.setItem('my-todo-tasks', JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    localStorage.setItem('my-todo-theme', JSON.stringify(themeColor));
  }, [themeColor]);

  useEffect(() => {
    localStorage.setItem('my-todo-mode', JSON.stringify(appMode));
  }, [appMode]);

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
    <div className={`min-h-screen py-12 px-4 transition-all duration-500 ${
      appMode === 'navy' ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'
    }`}>
      <div className={`max-w-2xl mx-auto rounded-2xl shadow-2xl overflow-hidden border transition-all duration-500 ${
        appMode === 'navy' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'
      }`}>
        
        <div className={`p-8 transition-colors duration-500 ${themeClasses[themeColor]}`}>
          <h1 className="text-3xl font-bold text-white">To-Do List</h1>
          <p className="text-white/80 mt-2 font-medium">
            {todos.length > 0 
              ? `${completedCount} of ${todos.length} tasks completed`
              : "Welcome! Add your first task below."}
          </p>
        </div>

        <div className="p-6 sm:p-8">
          <ThemeSettings 
            themeColor={themeColor} 
            setThemeColor={setThemeColor} 
            appMode={appMode} 
            setAppMode={setAppMode} 
          />

          <TodoInput onAddTodo={addTodo} appMode={appMode} themeColor={themeColor} />
          
          <FilterBar currentFilter={filter} onFilterChange={setFilter} themeColor={themeColor} />

          <TodoList 
            todos={filteredTodos} 
            onToggle={toggleTodo} 
            onDelete={deleteTodo} 
            appMode={appMode}
            themeColor={themeColor}
          />

          {/*filteredTodos.length === 0 && (
            <div className="text-center py-12">
              <span className="text-5xl block mb-4 opacity-50">
                {filter === 'completed' ? '⏳' : '🎯'}
              </span>
              <p className="text-slate-400 font-medium">
                {filter === 'all' && "No tasks found."}
                {filter === 'active' && "Everything is done! Enjoy your day."}
                {filter === 'completed' && "No completed tasks yet."}
              </p>
            </div>
          )*/}
          {filteredTodos.length === 0 && (
            <div className="text-center py-12 flex flex-col items-center">
              <div className="opacity-20 mb-4">
                {filter === 'all' && <ClipboardList size={48} />}
                {filter === 'active' && <CheckCircle2 size={48} />}
                {filter === 'completed' && <History size={48} />}
              </div>
              <p className="text-slate-400 font-medium">
                {filter === 'all' && "No tasks found."}
                {filter === 'active' && "Everything is done!"}
                {filter === 'completed' && "No history yet."}
              </p>
            </div>
          )}

          {completedCount > 0 && (
            <div className="mt-8 pt-6 border-t border-slate-100/10 text-right">
              <button 
                onClick={clearCompleted}
                className="text-sm font-semibold text-red-500 hover:text-red-400 transition-colors"
              >
                Clear all completed tasks
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;