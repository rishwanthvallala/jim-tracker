// /lib/storage.ts

import localforage from "localforage";
// We now need to import the actual array to create a type from it.
import { MUSCLE_GROUPS, WORKOUT_CYCLE } from "./exerciseLibrary";

// --- TYPE DEFINITIONS ---

export type WorkoutLog = {
  date: string;
  reps: number[];
};

export type MuscleProgress = {
  currentStep: number;
  progress: {
    [step: number]: WorkoutLog[];
  };
};

// This creates a precise union type: "chest" | "shoulders" | "back" | "legs" | "core"
type MuscleGroup = typeof MUSCLE_GROUPS[number];

// [THE DEFINITIVE FIX]
// This type now correctly says UserData has a cycleIndex, AND it has
// a specific set of keys (only those in the MuscleGroup union) which
// must be of type MuscleProgress. It no longer incorrectly applies the rule to cycleIndex.
export type UserData = {
  cycleIndex: number;
} & {
  [key in MuscleGroup]: MuscleProgress;
};


// --- STORAGE KEY ---
const USER_DATA_KEY = "userData";


// --- INITIAL STATE ---
function getInitialUserData(): UserData {
  const initialState = {
    cycleIndex: WORKOUT_CYCLE.length - 1,
  } as UserData;

  MUSCLE_GROUPS.forEach(group => {
    // We cast `group` to `MuscleGroup` to satisfy TypeScript
    initialState[group as MuscleGroup] = {
      currentStep: 0,
      progress: {},
    };
  });

  return initialState;
}


// --- CORE STORAGE FUNCTIONS ---
export async function getUserData(): Promise<UserData> {
  try {
    const data = await localforage.getItem<UserData>(USER_DATA_KEY);
    return data || getInitialUserData();
  } catch (error) {
    console.error("Failed to get user data:", error);
    return getInitialUserData();
  }
}

export async function saveUserData(data: UserData): Promise<void> {
  try {
    await localforage.setItem(USER_DATA_KEY, data);
  } catch (error) {
    console.error("Failed to save user data:", error);
  }
}


// --- ACTION FUNCTIONS ---
export async function logWorkout(
  muscleGroup: string,
  step: number,
  reps: number[]
): Promise<UserData> {
  const userData = await getUserData();
  const newLog: WorkoutLog = { date: new Date().toISOString(), reps };
  
  const groupKey = muscleGroup as MuscleGroup; // Cast for type safety
  const currentLogs = userData[groupKey].progress[step] || [];
  userData[groupKey].progress[step] = [newLog, ...currentLogs];

  await saveUserData(userData);
  return userData;
}

export async function completeWorkoutDay(): Promise<UserData> {
  const currentData = await getUserData();
  const newIndex = (currentData.cycleIndex + 1) % WORKOUT_CYCLE.length;

  const updatedData: UserData = {
    ...currentData,
    cycleIndex: newIndex,
  } as UserData;

  await saveUserData(updatedData);
  return updatedData;
}