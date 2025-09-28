// /components/LogWorkoutModal.tsx

"use client";

import { useState } from 'react';

type LogWorkoutModalProps = {
  goalSets: number;
  exerciseName: string;
  onSave: (reps: number[]) => void;
  onClose: () => void;
};

export default function LogWorkoutModal({ 
  goalSets, 
  exerciseName, 
  onSave, 
  onClose 
}: LogWorkoutModalProps) {
  // Initialize state with an array of empty strings for the inputs
  const [reps, setReps] = useState<string[]>(Array(goalSets).fill(''));

  const handleRepChange = (index: number, value: string) => {
    // Only allow numbers
    if (/^\d*$/.test(value)) {
      const newReps = [...reps];
      newReps[index] = value;
      setReps(newReps);
    }
  };
  
  const handleAddSet = () => {
    setReps([...reps, '']);
  }

  const handleSave = () => {
    // Convert string reps to numbers and filter out any empty ones
    const repsAsNumbers = reps
      .map(r => parseInt(r, 10))
      .filter(r => !isNaN(r));
    
    if (repsAsNumbers.length > 0) {
      onSave(repsAsNumbers);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-sm mx-4">
        <h2 className="text-xl font-bold mb-2">Log Workout</h2>
        <p className="text-gray-300 mb-4">{exerciseName}</p>
        
        <div className="space-y-3 mb-6">
          {reps.map((rep, index) => (
            <div key={index} className="flex items-center space-x-3">
              <label className="text-gray-400 w-12">Set {index + 1}</label>
              <input
                type="tel" // Use 'tel' for a numeric keyboard on mobile
                className="w-full bg-gray-700 rounded p-2 text-center text-white"
                value={rep}
                onChange={(e) => handleRepChange(index, e.target.value)}
                placeholder="Reps"
              />
            </div>
          ))}
        </div>

        <button 
          onClick={handleAddSet}
          className="w-full text-center text-blue-400 mb-4"
        >
          + Add Set
        </button>

        <div className="flex justify-between space-x-3">
          <button 
            onClick={onClose}
            className="w-full bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded"
          >
            Cancel
          </button>
          <button 
            onClick={handleSave}
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}