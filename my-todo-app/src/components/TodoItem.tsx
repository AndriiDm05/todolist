import type { Todo, AppMode, ThemeColor } from '../types/todo';
import { themeAccentClasses } from '../types/ThemeClasses';

type TodoItemProps = {
    todo: Todo;
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
    appMode: AppMode;
    themeColor: ThemeColor;
}

const TodoItem = (props: TodoItemProps) => {
    const { todo, onToggle, onDelete, appMode, themeColor } = props;

    return (
        <div className={`group flex items-center justify-between p-4 border-b transition-all duration-300 ${
            appMode === 'navy' 
                ? 'border-slate-800 hover:bg-slate-800/50' 
                : 'border-slate-100 hover:bg-slate-50'
        }`}>
            <div className="flex items-center gap-3">
                <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => onToggle(todo.id)}
                className={`w-5 h-5 cursor-pointer transition-all duration-500 ${themeAccentClasses[themeColor]}`}
                />
                <span className={`transition-all ${
                todo.completed 
                    ? "line-through opacity-40" 
                    : appMode === 'navy' ? 'text-slate-200' : 'text-slate-700'
                }`}>
                {todo.text}
                </span>
            </div>

            <button
                onClick={() => onDelete(todo.id)}
                className="text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
                Delete
            </button>
        </div>
    );
};

export default TodoItem;