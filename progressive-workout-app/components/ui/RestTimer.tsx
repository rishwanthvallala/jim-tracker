// /components/ui/RestTimer.tsx

"use client";

import { useState, useEffect } from 'react';

type RestTimerProps = {
  duration: number; // Duration in seconds
  onComplete: () => void;
};

export default function RestTimer({ duration, onComplete }: RestTimerProps) {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    if (timeLeft <= 0) {
      onComplete();
      return;
    }

    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    // Clear interval on component unmount
    return () => clearInterval(intervalId);
  }, [timeLeft, onComplete]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex flex-col justify-center items-center z-50">
      <p className="text-2xl text-gray-400 mb-4">Take a Rest</p>
      <p className="text-8xl font-mono font-bold text-white">{timeLeft}</p>
      <button 
        onClick={onComplete}
        className="mt-8 bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-6 rounded-lg"
      >
        Skip
      </button>
    </div>
  );
}