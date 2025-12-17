import type { Todo } from '../types/todo';

type TodoItemProps = {
    todo: Todo;
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
}

const TodoItem = (props: TodoItemProps) => {
    const { todo, onToggle, onDelete } = props;

    return (
        <div className="flex items-center justify-between p-3 border-b border-slate-100 hover:bg-slate-50 transition-colors group">
        <div className="flex items-center gap-3">
            <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => onToggle(todo.id)}
            className="w-5 h-5 cursor-pointer accent-blue-600"
            />
            <span className={`${todo.completed ? 'line-through text-slate-400' : 'text-slate-700'}`}>
            {todo.text}
            </span>
        </div>
        <button
            onClick={() => onDelete(todo.id)}
            className="text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
            Delete
        </button>
        </div>
    );
}

export default TodoItem;