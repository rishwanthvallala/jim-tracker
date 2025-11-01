// /app/(tabs)/[muscleGroup]/page.tsx

"use client";

import { useParams } from "next/navigation";
import { EXERCISE_LIBRARY } from "@/lib/exerciseLibrary";
import { useUserData } from "@/lib/hooks";
import ExerciseListItem from "@/components/ExerciseListItem";
import { WorkoutLog } from "@/lib/storage"; // <-- IMPORT THE TYPE

// The 'any' type has been replaced with the specific 'WorkoutLog' type
function calculateProgress(userLogs: WorkoutLog[], goal: { sets: number; reps: number }): number {
  if (!userLogs || userLogs.length === 0) return 0;

  const latestLog = userLogs[0];
  const totalRepsAchieved = latestLog.reps.reduce((sum: number, r: number) => sum + r, 0);
  const totalRepsGoal = goal.sets * goal.reps;
  
  const progress = Math.min((totalRepsAchieved / totalRepsGoal) * 100, 100);
  return Math.round(progress);
}

export default function MuscleGroupPage() {
  const params = useParams();
  const { userData } = useUserData();

  const muscleGroup = params.muscleGroup as string;
  const exercises = EXERCISE_LIBRARY[muscleGroup as keyof typeof EXERCISE_LIBRARY];

  if (!userData) {
    return (
      <div className="flex justify-center items-center h-64">
        <p>Loading your progress...</p>
      </div>
    );
  }

  const userProgressForGroup = userData[muscleGroup as keyof typeof userData];

  return (
    <div className="space-y-4">
      {exercises?.map((exercise) => {
        const userLogs = userProgressForGroup?.progress?.[exercise.step] || [];
        const progress = calculateProgress(userLogs, exercise.goal);

        return (
          <ExerciseListItem
            key={exercise.step}
            name={exercise.name}
            step={exercise.step}
            progress={progress}
            muscleGroup={muscleGroup}
            isCurrent={userProgressForGroup?.currentStep === exercise.step}
            isLocked={exercise.step > userProgressForGroup?.currentStep}
          />
        );
      })}
    </div>
  );
}