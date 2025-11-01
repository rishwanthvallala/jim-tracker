// /components/ui/ProgressBar.tsx

type ProgressBarProps = {
  progress: number; // A number between 0 and 100
};

export default function ProgressBar({ progress }: ProgressBarProps) {
  // Ensure progress is within the 0-100 range
  const clampedProgress = Math.max(0, Math.min(100, progress));

  return (
    <div className="w-full bg-gray-700 rounded-full h-2.5">
      <div
        className="bg-blue-600 h-2.5 rounded-full transition-all duration-500"
        style={{ width: `${clampedProgress}%` }}
      ></div>
    </div>
  );
}