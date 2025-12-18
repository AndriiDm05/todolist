import type { ThemeColor, AppMode } from "../types/todo";

type ThemeSettingsProps = {
    themeColor: ThemeColor;
    setThemeColor: (color: ThemeColor) => void;

    appMode: AppMode;
    setAppMode: (mode: AppMode) => void;
};

const ThemeSettings = (props: ThemeSettingsProps) => {
    const { themeColor, setThemeColor, appMode, setAppMode } = props;

    const colors: ThemeColor[] = ['blue', 'purple', 'green', 'rose'];

    return (
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-100/10">
            <div className="flex gap-3">
                {colors.map((color) => (
                <button
                    key={color}
                    onClick={() => setThemeColor(color)}
                    className={`w-6 h-6 rounded-full border-2 transition-transform hover:scale-110 ${
                    themeColor === color ? 'border-slate-400 scale-125' : 'border-transparent'
                    } ${
                    color === 'blue' ? 'bg-blue-600' :
                    color === 'purple' ? 'bg-purple-600' :
                    color === 'green' ? 'bg-green-600' : 'bg-rose-600'
                    }`}
                    title={`Switch to ${color}`}
                    />
                ))}
            </div>

            <button
                onClick={() => setAppMode(appMode === 'light' ? 'navy' : 'light')}
                className={`px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider transition-colors ${
                appMode === 'navy' 
                    ? 'bg-slate-800 text-yellow-400 border border-slate-700' 
                    : 'bg-slate-200 text-slate-600'
                }`}
            >
                {appMode === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
            </button>
        </div>
    );
};

export default ThemeSettings;
