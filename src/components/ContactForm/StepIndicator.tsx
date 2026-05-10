// 上部ステップ表示
interface StepIndicatorProps {
    step: 1 | 2 | 3;
}

export const StepIndicator = ({ step }: StepIndicatorProps) => (
    <div className="flex items-center justify-center gap-4" style={{ marginBottom: '80px' }}>
        <div className={`text-sm tracking-widest ${step >= 1 ? 'text-[#050A14] font-bold' : 'text-gray-300'}`}>
            01<span className="hidden md:inline"> Input</span>
        </div>
        <div className="w-8 h-[1px] bg-gray-300"></div>
        <div className={`text-sm tracking-widest ${step >= 2 ? 'text-[#050A14] font-bold' : 'text-gray-300'}`}>
            02<span className="hidden md:inline"> Confirm</span>
        </div>
        <div className="w-8 h-[1px] bg-gray-300"></div>
        <div className={`text-sm tracking-widest ${step >= 3 ? 'text-[#C5A065] font-bold' : 'text-gray-300'}`}>
            03<span className="hidden md:inline"> Complete</span>
        </div>
    </div>
);
