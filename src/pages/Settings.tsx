import { useNavigate } from 'react-router';
import { useSettingsStore } from '../store';
import {
    ArrowLeft,
    Sun,
    Moon,
    Monitor,
    Columns,
    Rows,
    RotateCcw,
    Type,
    History,
} from 'lucide-react';

// SettingCard component - moved outside to prevent recreation
const SettingCard = ({
    title,
    icon: Icon,
    children,
}: {
    title: string;
    icon: React.ElementType;
    children: React.ReactNode;
}) => (
    <div className='bg-(--bg-panel) border border-(--border-color) rounded-xl overflow-hidden'>
        <div className='flex items-center gap-3 px-4 py-3 border-b border-(--border-color) bg-(--bg-activity-bar)'>
            <Icon size={16} className='text-(--accent-color)' />
            <h3 className='font-medium text-sm text-(--text-primary)'>
                {title}
            </h3>
        </div>
        <div className='p-4 space-y-3'>{children}</div>
    </div>
);

// OptionButton component - moved outside to prevent recreation
const OptionButton = ({
    selected,
    onClick,
    icon: Icon,
    label,
}: {
    selected: boolean;
    onClick: () => void;
    icon: React.ElementType;
    label: string;
}) => (
    <button
        onClick={onClick}
        className={`flex flex-col items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-2 sm:py-2.5 rounded-lg border transition-all flex-1 min-w-0 ${
            selected
                ? 'bg-(--accent-color) border-(--accent-color) text-white'
                : 'bg-(--bg-main) border-(--border-color) text-(--text-secondary) hover:border-(--accent-color)'
        }`}
    >
        <Icon size={16} className='sm:w-4.5 sm:h-4.5 shrink-0' />
        <span className='text-[10px] sm:text-xs font-medium truncate w-full'>
            {label}
        </span>
    </button>
);

// Toggle component - moved outside to prevent recreation
const Toggle = ({
    checked,
    onChange,
    label,
}: {
    checked: boolean;
    onChange: () => void;
    label: string;
}) => (
    <div className='flex items-center justify-between py-2'>
        <span className='text-(--text-primary) text-sm'>{label}</span>
        <button
            onClick={onChange}
            className={`relative w-10 h-5 rounded-full transition-all ${
                checked ? 'bg-(--accent-color)' : 'bg-(--text-secondary)/30'
            }`}
        >
            <span
                className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all ${
                    checked ? 'left-5' : 'left-0.5'
                }`}
            />
        </button>
    </div>
);

// Slider component - moved outside to prevent recreation
const Slider = ({
    value,
    onChange,
    min,
    max,
    label,
    unit,
}: {
    value: number;
    onChange: (v: number) => void;
    min: number;
    max: number;
    label: string;
    unit: string;
}) => (
    <div className='space-y-2'>
        <div className='flex justify-between items-center'>
            <span className='text-(--text-primary) text-sm'>{label}</span>
            <span className='text-xs font-mono bg-(--accent-color)/15 text-(--accent-color) px-2 py-0.5 rounded'>
                {value}
                {unit}
            </span>
        </div>
        <input
            type='range'
            min={min}
            max={max}
            value={value}
            onChange={(e) => onChange(parseInt(e.target.value))}
            className='w-full h-1 bg-(--border-color) rounded-lg appearance-none cursor-pointer'
            style={{ accentColor: 'var(--accent-color)' }}
        />
    </div>
);

function Settings() {
    const navigate = useNavigate();
    const {
        themeMode,
        fontSize,
        showLineNumbers,
        autoSaveHistory,
        isVertical,
        setThemeMode,
        setFontSize,
        setShowLineNumbers,
        setAutoSaveHistory,
        setIsVertical,
        resetSettings,
    } = useSettingsStore();

    return (
        <div className='h-full overflow-auto bg-(--bg-main)'>
            <div className='max-w-225 mx-auto p-3 sm:p-5 space-y-3 sm:space-y-4'>
                <div className='flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4'>
                    <button
                        onClick={() => navigate(-1)}
                        className='p-1.5 sm:p-2 rounded-lg bg-(--bg-panel) border border-(--border-color) hover:bg-(--bg-activity-bar) transition-colors shrink-0'
                    >
                        <ArrowLeft size={16} className='sm:w-4 sm:h-4' />
                    </button>
                    <h1 className='text-base sm:text-lg font-semibold text-(--text-primary) flex-1 truncate'>
                        Settings
                    </h1>
                    <button
                        onClick={resetSettings}
                        className='flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-xs rounded-lg bg-(--bg-panel) border border-(--border-color) hover:bg-(--bg-activity-bar) text-(--text-secondary) transition-colors shrink-0'
                    >
                        <RotateCcw size={12} className='sm:w-3 sm:h-3' />
                        <span className='hidden xs:inline'>Reset</span>
                    </button>
                </div>

                <SettingCard title='Theme' icon={Sun}>
                    <div className='flex gap-2'>
                        <OptionButton
                            selected={themeMode === 'dark'}
                            onClick={() => setThemeMode('dark')}
                            icon={Moon}
                            label='Dark'
                        />
                        <OptionButton
                            selected={themeMode === 'light'}
                            onClick={() => setThemeMode('light')}
                            icon={Sun}
                            label='Light'
                        />
                        <OptionButton
                            selected={themeMode === 'auto'}
                            onClick={() => setThemeMode('auto')}
                            icon={Monitor}
                            label='Auto'
                        />
                    </div>
                </SettingCard>

                <SettingCard title='Editor' icon={Type}>
                    <Slider
                        value={fontSize}
                        onChange={setFontSize}
                        min={12}
                        max={20}
                        label='Font Size'
                        unit='px'
                    />
                    <div className='border-t border-(--border-color) pt-3 mt-3'>
                        <Toggle
                            checked={showLineNumbers}
                            onChange={() =>
                                setShowLineNumbers(!showLineNumbers)
                            }
                            label='Line Numbers'
                        />
                    </div>
                </SettingCard>

                <SettingCard title='Layout' icon={Columns}>
                    <div className='flex gap-2'>
                        <OptionButton
                            selected={isVertical}
                            onClick={() => setIsVertical(true)}
                            icon={Rows}
                            label='Vertical'
                        />
                        <OptionButton
                            selected={!isVertical}
                            onClick={() => setIsVertical(false)}
                            icon={Columns}
                            label='Horizontal'
                        />
                    </div>
                </SettingCard>

                <SettingCard title='History' icon={History}>
                    <Toggle
                        checked={autoSaveHistory}
                        onChange={() => setAutoSaveHistory(!autoSaveHistory)}
                        label='Auto-save queries'
                    />
                </SettingCard>

                <p className='text-center text-xs text-(--text-secondary) pt-2'>
                    SQLio v1.0
                </p>
            </div>
        </div>
    );
}

export default Settings;
