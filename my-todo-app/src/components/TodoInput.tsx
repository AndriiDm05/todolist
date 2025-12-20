import React, { useState } from 'react';
import type { AppMode, ThemeColor } from '../types/todo';
import { themeClasses, themeBorderClasses } from '../types/ThemeClasses';

type TodoInputProps = {
    onAddTodo: (text: string) => void;
    appMode: AppMode;
    themeColor: ThemeColor;
}

const TodoInput = (props: TodoInputProps) => {
    const { onAddTodo, appMode, themeColor } = props;
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
                className={`
                    flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${themeBorderClasses[themeColor]} transition-all duration-500
                    ${appMode === 'navy' ? 'bg-slate-900 border-slate-700 text-slate-200' : 'bg-white border-slate-300 text-slate-800'}`} />
            <button
                type='submit'
                className={`px-6 py-2 ${themeClasses[themeColor]} text-white font-semibold rounded-lg hover:brightness-110 transition-all duration-500`}>
                Add
            </button>
        </form >
    );
};

export default TodoInput;