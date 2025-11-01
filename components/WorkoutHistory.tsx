// /components/WorkoutHistory.tsx

import { WorkoutLog } from "@/lib/storage";

type WorkoutHistoryProps = {
  logs: WorkoutLog[];
};

export default function WorkoutHistory({ logs }: WorkoutHistoryProps) {
  if (!logs || logs.length === 0) {
    return (
      <div className="text-center py-8 px-4 bg-gray-800 rounded-lg">
        <p className="text-gray-400">No workout history yet.</p>
        <p className="text-gray-300">Log your first workout to get started!</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold text-white mb-2">Recent History</h3>
      {logs.map((log, index) => (
        <div key={index} className="bg-gray-800 p-3 rounded-lg flex justify-between items-center">
          <p className="text-sm text-gray-400">
            {new Date(log.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
          </p>
          <p className="font-mono text-lg text-white">
            {log.reps.join(' - ')}
          </p>
        </div>
      ))}
    </div>
  );
}