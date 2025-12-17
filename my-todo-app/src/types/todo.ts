export type Todo = {
    id: string;
    text: string;
    completed: boolean;
    createdAt: number;
};

export type FilterValue = 'all' | 'active' | 'completed';