export type Todo = {
    id: string;
    text: string;
    completed: boolean;
    createdAt: number;
};

export type FilterValue = 'all' | 'active' | 'completed';
export type ThemeColor = 'blue' | 'purple' | 'green' | 'rose';
export type AppMode = 'light' | 'navy';