// src/components/FilterBar.tsx
import type { FilterValue } from '../types/todo';

type FilterBarProps = {
    currentFilter: FilterValue;
    onFilterChange: (filter: FilterValue) => void;
};

const FilterBar = ({ currentFilter, onFilterChange }: FilterBarProps) => {
  const filters: FilterValue[] = ['all', 'active', 'completed'];

  return (
    <div className="flex justify-center gap-2 mb-6">
      {filters.map((f) => (
        <button
            key={f}
            onClick={() => onFilterChange(f)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium capitalize transition-all
                ${currentFilter === f 
                    ? 'bg-blue-600 text-white shadow-md' 
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }
            `}
        >
          {f}
        </button>
      ))}
    </div>
  );
};

export default FilterBar;