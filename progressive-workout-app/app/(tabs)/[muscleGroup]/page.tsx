// /app/(tabs)/[muscleGroup]/page.tsx

"use client"; // This is a client component

import { useParams } from "next/navigation";
import { EXERCISE_LIBRARY } from "@/lib/exerciseLibrary";
import { useUserData } from "@/lib/hooks";
import ExerciseListItem from "@/components/ExerciseListItem";

// A simple utility function to calculate progress percentage
function calculateProgress(userLogs: any[], goal: { sets: number; reps: number }): number {
  if (!userLogs || userLogs.length === 0) return 0;

  // Use the most recent workout log for the progress bar
  const latestLog = userLogs[0];
  const totalRepsAchieved = latestLog.reps.reduce((sum: number, r: number) => sum + r, 0);
  const totalRepsGoal = goal.sets * goal.reps;
  
  const progress = Math.min((totalRepsAchieved / totalRepsGoal) * 100, 100);
  return Math.round(progress);
}

export default function MuscleGroupPage() {
  const params = useParams();
  const { userData } = useUserData();

  // Get the muscle group from the URL, e.g., "chest"
  const muscleGroup = params.muscleGroup as string;

  // Find the list of exercises for this muscle group from our library
  const exercises = EXERCISE_LIBRARY[muscleGroup as keyof typeof EXERCISE_LIBRARY];

  // A loading state while user data is being fetched from localforage
  if (!userData) {
    return (
      <div className="flex justify-center items-center h-64">
        <p>Loading your progress...</p>
      </div>
    );
  }

  const userProgressForGroup = userData[muscleGroup];

  return (
    <div className="space-y-4">
      {exercises?.map((exercise) => {
        // Get the user's logs for this specific exercise
        const userLogs = userProgressForGroup?.progress?.[exercise.step] || [];
        
        // Calculate the progress percentage
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