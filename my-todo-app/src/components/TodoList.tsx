import type { Todo } from "../types/todo";
import TodoItem from "./TodoItem";

type TodoListProps = {
    todos: Todo[];
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
}

const TodoList = (props: TodoListProps) => {
    const { todos, onToggle, onDelete } = props;

    if (todos.length === 0) return null;

    return (
        <div className="mt-6 border rounded-lg overflow-hidden">
            {todos.map((todo) => (
                <TodoItem
                    key={todo.id}
                    todo={todo}
                    onToggle={onToggle}
                    onDelete={onDelete} />
            ))}
        </div>
    );
};

export default TodoList;