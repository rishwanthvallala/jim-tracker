// /app/workout/[muscleGroup]/[step]/page.tsx

"use client";

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { EXERCISE_LIBRARY } from '@/lib/exerciseLibrary';
import { useUserData } from '@/lib/hooks';
import { logWorkout } from '@/lib/storage';
import WorkoutHistory from '@/components/WorkoutHistory';
import LogWorkoutModal from '@/components/LogWorkoutModal';

export default function WorkoutPage() {
  const params = useParams();
  const router = useRouter();
  const { userData, refreshUserData } = useUserData();

  const [isLogging, setIsLogging] = useState(false);

  // Get parameters from the URL
  const muscleGroup = params.muscleGroup as string;
  const step = parseInt(params.step as string, 10);
  
  // Find the exercise details from our library
  const exercise = EXERCISE_LIBRARY[muscleGroup as keyof typeof EXERCISE_LIBRARY]?.[step];

  // This handles saving the workout
  const handleSaveWorkout = async (reps: number[]) => {
    // Call our storage function to save the data
    await logWorkout(muscleGroup, step, reps);
    // Refresh the data in our app's context
    await refreshUserData();
    // Close the modal
    setIsLogging(false);
    // Go back to the main list page
    router.push(`/${muscleGroup}`);
  };

  // Show loading state if data isn't ready
  if (!userData || !exercise) {
    return <div className="text-center p-8">Loading...</div>;
  }
  
  const userLogs = userData[muscleGroup]?.progress?.[step] || [];

  return (
    <div className="p-4 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">{exercise.name}</h1>
        <p className="text-gray-400">Step {exercise.step + 1}</p>
      </div>

      {/* We can add a GIF here later */}
      <div className="bg-gray-800 aspect-video rounded-lg flex items-center justify-center">
        <p className="text-gray-500">[Exercise GIF]</p>
      </div>

      <p className="text-gray-300">{exercise.description}</p>
      
      <button 
        onClick={() => setIsLogging(true)}
        className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-4 rounded-lg text-lg"
      >
        Log Today&apos;s Workout
      </button>

      <WorkoutHistory logs={userLogs} />

      {isLogging && (
        <LogWorkoutModal 
          exerciseName={exercise.name}
          goalSets={exercise.goal.sets}
          onSave={handleSaveWorkout}
          onClose={() => setIsLogging(false)}
        />
      )}
    </div>
  );
}