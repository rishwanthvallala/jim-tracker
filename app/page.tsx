// /app/page.tsx

"use client"; // This is now a client component to access user data

import { useRouter } from "next/navigation";
import { useUserData } from "@/lib/hooks";
import { WORKOUT_CYCLE, SPLIT_ROUTINES } from "@/lib/exerciseLibrary";

// A helper function to capitalize the first letter
const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export default function HomePage() {
  const router = useRouter();
  const { userData } = useUserData();

  // --- Loading State ---
  // Show a loading message until the user's data has been fetched from storage
  if (!userData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
        <p className="text-lg">Loading your plan...</p>
      </div>
    );
  }

  // --- Calculate Today's Session ---
  const nextWorkoutIndex = (userData.cycleIndex + 1) % WORKOUT_CYCLE.length;
  const todayWorkoutType = WORKOUT_CYCLE[nextWorkoutIndex];
  const isRestDay = todayWorkoutType === "Rest";
  
  // Get the list of muscle groups for today's workout
  const muscleGroupsForToday = SPLIT_ROUTINES[todayWorkoutType as keyof typeof SPLIT_ROUTINES] || [];

  // --- Button Click Handler ---
 const handleStartWorkout = () => {
  // --- [NEW] GUARD CLAUSE ---
  // If todayWorkoutType is not a valid string for any reason,
  // or if it's a rest day, do nothing. This prevents the crash.
  if (!todayWorkoutType || isRestDay) {
    console.error("Start workout clicked with invalid state:", todayWorkoutType);
    return;
  }
  
  router.push(`/live-workout/${todayWorkoutType.toLowerCase()}`);
};


  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4 text-center">
      
      <div className="w-full max-w-md bg-gray-800 rounded-xl shadow-lg p-8">
        <h1 className="text-2xl font-semibold text-gray-400 mb-2">
          Today&apos;s Session
        </h1>
        
        <p className={`text-5xl font-bold mb-6 ${isRestDay ? 'text-green-400' : 'text-blue-400'}`}>
          {todayWorkoutType} Day
        </p>

        {/* Display the muscle groups for the day */}
        {!isRestDay && (
          <div className="mb-8">
            <p className="text-gray-300">You will be training:</p>
            <div className="flex justify-center space-x-4 mt-2">
              {muscleGroupsForToday.map(group => (
                <span key={group} className="text-lg font-semibold text-white">
                  {capitalize(group)}
                </span>
              ))}
            </div>
          </div>
        )}

        {isRestDay && (
            <p className="text-gray-300 mb-8">
                Focus on recovery. Your muscles grow when you rest.
            </p>
        )}
        
        <button
          onClick={handleStartWorkout}
          disabled={isRestDay}
          className={`
            w-full py-4 px-6 rounded-lg text-xl font-bold transition-all
            ${isRestDay 
              ? "bg-gray-600 cursor-not-allowed" 
              : "bg-blue-600 hover:bg-blue-500 transform hover:scale-105"
            }
          `}
        >
          {isRestDay ? "Enjoy Your Rest" : "Start Workout"}
        </button>

      </div>

      <button 
        onClick={() => router.push('/chest')} // Link to the progress overview pages
        className="mt-8 text-gray-400 hover:text-white"
      >
        View My Progress
      </button>

    </div>
  );
}