import React, { useState } from 'react';

type TodoInputProps = {
    onAddTodo: (text: string) => void;
    appMode: 'light' | 'navy';
    themeColor: 'blue' | 'purple' | 'green' | 'rose';
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

    const themeClasses = {
        blue: 'bg-blue-600',
        purple: 'bg-purple-600',
        green: 'bg-green-600',
        rose: 'bg-rose-600'
    };

    const themeBorderClasses = {
        blue: 'focus:ring-blue-500',
        purple: 'focus:ring-purple-500',
        green: 'focus:ring-green-500',
        rose: 'focus:ring-rose-500'
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