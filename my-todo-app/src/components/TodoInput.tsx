import React, { useState } from 'react';

type TodoInputProps = {
    onAddTodo: (text: string) => void;
}

const TodoInput = (props: TodoInputProps) => {
    const { onAddTodo } = props;
    const [task, setTask] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!task.trim()) return;
        onAddTodo(task);
        setTask('');
    };

    return (
        <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
            <input
                type="text"
                value={task}
                onChange={(e) => setTask(e.target.value)}
                placeholder='Add a new task'
                className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800" />
            <button
                type='submit'
                className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
                Add
            </button>
        </form >
    );
};

export default TodoInput;