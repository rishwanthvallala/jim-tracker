// /components/ExerciseListItem.tsx

import Link from "next/link";
import ProgressBar from "./ui/ProgressBar";

type ExerciseListItemProps = {
  name: string;
  step: number;
  progress: number;
  muscleGroup: string;
  isCurrent: boolean; // Is this the user's active exercise?
  isLocked: boolean; // Is this exercise not yet unlocked?
};

export default function ExerciseListItem({
  name,
  step,
  progress,
  muscleGroup,
  isCurrent,
  isLocked,
}: ExerciseListItemProps) {
  const itemClasses = `
    flex items-center justify-between p-4 rounded-lg transition-all
    ${isLocked 
      ? "bg-gray-800 opacity-50 cursor-not-allowed" 
      : "bg-gray-800 hover:bg-gray-700"
    }
    ${isCurrent ? "ring-2 ring-blue-500" : ""}
  `;

  const content = (
    <div className={itemClasses}>
      <div className="flex-1 pr-4">
        <div className="flex items-baseline">
          <p className="font-bold text-white">{name}</p>
          <span className="ml-2 text-xs text-gray-400">Step {step + 1}</span>
        </div>
        <p className="text-sm text-gray-300">Your Progress:</p>
      </div>
      <div className="w-1/3">
        <ProgressBar progress={progress} />
      </div>
    </div>
  );

  // If the item is locked, we render it as a simple div.
  // Otherwise, we wrap it in a Link to make it clickable.
  if (isLocked) {
    return content;
  }

  return (
    <Link href={`/workout/${muscleGroup}/${step}`}>
      {content}
    </Link>
  );
}