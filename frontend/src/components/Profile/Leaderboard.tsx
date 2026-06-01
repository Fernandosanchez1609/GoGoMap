import { useState, useEffect } from "react";
import { Trophy } from "lucide-react";
import userService from "@/api/services/userService";
import type { UserRanking } from "@/api/types/index";

export default function Leaderboard() {
  const [ranking, setRanking] = useState<UserRanking[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadRanking = async () => {
      try {
        const response = await userService.getLeaderboard();
        setRanking(response.data);
      } catch (error) {
        console.error("Error al cargar el ranking:", error);
      } finally {
        setIsLoading(false);
      }
    };

    void loadRanking();
  }, []);

  const getMedalEmoji = (position: number) => {
    if (position === 0) return "🥇";
    if (position === 1) return "🥈";
    if (position === 2) return "🥉";
    return null;
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-gray-50 p-6">
        <div className="animate-pulse space-y-3">
          <div className="h-6 bg-gray-200 rounded w-1/2" />
          <div className="h-4 bg-gray-200 rounded w-full" />
          <div className="h-4 bg-gray-200 rounded w-full" />
          <div className="h-4 bg-gray-200 rounded w-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-gray-50 p-6">
      <div className="flex items-center gap-2 mb-4">
        <Trophy size={24} className="text-yellow-500" />
        <h2 className="text-xl font-bold text-gray-900">Clasificación Karma</h2>
      </div>

      <div className="space-y-2">
        {ranking.map((user, index) => {
          const medal = getMedalEmoji(index);
          const isTopThree = index < 3;
          
          return (
            <div
              key={index}
              className={`flex items-center justify-between p-3 rounded-2xl transition-colors ${
                isTopThree ? "bg-gradient-to-r from-yellow-50 to-orange-50" : "bg-gray-50"
              }`}
            >
              <div className="flex items-center gap-3">
                <span
                  className={`w-8 h-8 flex items-center justify-center rounded-full font-bold ${
                    isTopThree ? "text-xl" : "text-sm text-gray-500 bg-white"
                  }`}
                >
                  {medal || `${index + 1}`}
                </span>
                <span className={`font-medium ${isTopThree ? "text-gray-900 font-bold" : "text-gray-700"}`}>
                  {user.username}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className={`font-bold ${isTopThree ? "text-green-600 text-lg" : "text-gray-600"}`}>
                  {user.karmaPoints}
                </span>
                <span className="text-xs text-gray-500">pts</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
