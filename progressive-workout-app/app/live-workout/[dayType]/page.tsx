// /app/live-workout/[dayType]/page.tsx

"use client";

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useUserData } from '@/lib/hooks';
import { EXERCISE_LIBRARY, SPLIT_ROUTINES } from '@/lib/exerciseLibrary';
import { logWorkout, completeWorkoutDay } from '@/lib/storage';
import RestTimer from '@/components/ui/RestTimer';

// Define the shape of a single set
type SetLog = { reps: string };

export default function WorkoutSessionPage() {
  const router = useRouter();
  const params = useParams();
  const { userData, refreshUserData } = useUserData();
  
  const dayType = (params.dayType as string).charAt(0).toUpperCase() + (params.dayType as string).slice(1);
  const muscleGroupsForToday = SPLIT_ROUTINES[dayType as keyof typeof SPLIT_ROUTINES] || [];

  // --- STATE MANAGEMENT ---
  const [sessionExercises, setSessionExercises] = useState<any[]>([]);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [sets, setSets] = useState<SetLog[]>([]);
  const [isResting, setIsResting] = useState(false);
  
  // This effect runs once to set up the exercises for the session
  useEffect(() => {
    if (userData) {
      const exercises = muscleGroupsForToday.flatMap(group => {
        const currentStep = userData[group].currentStep;
        const exerciseData = EXERCISE_LIBRARY[group as keyof typeof EXERCISE_LIBRARY]?.[currentStep];
        return exerciseData ? { ...exerciseData, muscleGroup: group } : [];
      });
      setSessionExercises(exercises);
      if (exercises.length > 0) {
        setSets(Array(exercises[0].goal.sets).fill({ reps: '' }));
      }
    }
  }, [userData]);

  const handleRepChange = (setIndex: number, reps: string) => {
    if (/^\d*$/.test(reps)) {
      const newSets = [...sets];
      newSets[setIndex] = { reps };
      setSets(newSets);
    }
  };

  const handleLogSet = (setIndex: number) => {
    // This function will be expanded to log the set and start the timer
    console.log(`Logged set ${setIndex + 1} with ${sets[setIndex].reps} reps`);
    setIsResting(true); // Start the rest timer
  };
  
  const handleFinishWorkout = async () => {
    // Log the final exercise before finishing
    const currentExercise = sessionExercises[currentExerciseIndex];
    const repsAsNumbers = sets.map(s => parseInt(s.reps, 10)).filter(r => !isNaN(r));
    if (repsAsNumbers.length > 0) {
      await logWorkout(currentExercise.muscleGroup, currentExercise.step, repsAsNumbers);
    }

    // Advance the cycle and refresh data
    await completeWorkoutDay();
    await refreshUserData();
    router.push('/'); // Go back to the homepage
  };
  
  const goToNextExercise = async () => {
    const currentExercise = sessionExercises[currentExerciseIndex];
    const repsAsNumbers = sets.map(s => parseInt(s.reps, 10)).filter(r => !isNaN(r));

    if (repsAsNumbers.length > 0) {
      await logWorkout(currentExercise.muscleGroup, currentExercise.step, repsAsNumbers);
    }

    const nextIndex = currentExerciseIndex + 1;
    if (nextIndex < sessionExercises.length) {
      setCurrentExerciseIndex(nextIndex);
      const nextExercise = sessionExercises[nextIndex];
      setSets(Array(nextExercise.goal.sets).fill({ reps: '' }));
    }
  };

  if (sessionExercises.length === 0) {
    return <div className="text-center p-8 text-white">Loading your session...</div>;
  }

  const currentExercise = sessionExercises[currentExerciseIndex];
  const isLastExercise = currentExerciseIndex === sessionExercises.length - 1;

  return (
    <div className="bg-gray-900 text-white min-h-screen p-4 flex flex-col">
      {isResting && <RestTimer duration={60} onComplete={() => setIsResting(false)} />}
      
      <div className="flex-grow">
        <p className="text-gray-400">{dayType} Day - Exercise {currentExerciseIndex + 1} of {sessionExercises.length}</p>
        <h1 className="text-3xl font-bold mb-4">{currentExercise.name}</h1>
        
        <div className="space-y-3">
          {sets.map((set, index) => (
            <div key={index} className="flex items-center space-x-3 bg-gray-800 p-3 rounded-lg">
              <label className="text-gray-400 font-bold w-12">Set {index + 1}</label>
              <input
                type="tel"
                className="flex-grow bg-gray-700 rounded p-2 text-center text-white text-lg"
                value={set.reps}
                onChange={(e) => handleRepChange(index, e.target.value)}
                placeholder="0"
              />
              <button 
                onClick={() => handleLogSet(index)}
                className="bg-blue-600 text-white font-bold py-2 px-4 rounded"
              >
                Log
              </button>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mt-6">
        {isLastExercise ? (
          <button onClick={handleFinishWorkout} className="w-full bg-green-600 hover:bg-green-500 text-white font-bold py-4 rounded-lg text-lg">
            Finish Workout
          </button>
        ) : (
          <button onClick={goToNextExercise} className="w-full bg-gray-700 hover:bg-gray-600 text-white font-bold py-4 rounded-lg text-lg">
            Next Exercise
          </button>
        )}
      </div>
    </div>
  );
}