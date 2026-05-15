type ProgressBarProps = {
  current: number;
  total: number;
};

export function ProgressBar({ current, total }: ProgressBarProps) {
  const progress = Math.round((current / total) * 100);

  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-sm text-white/70">
        <span>Progression</span>
        <span>{progress}%</span>
      </div>
      <div className="h-2.5 rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-neon transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
