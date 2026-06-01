import { useState, useEffect } from "react";
import { X, Lock, MapPin, Compass, Heart, Trophy } from "lucide-react";
import userService from "@/api/services/userService";
import type { Achievement } from "@/api/types/index";

interface AchievementsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  MapPin,
  Compass,
  Heart,
  Trophy,
};

export default function AchievementsModal({ isOpen, onClose }: AchievementsModalProps) {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      const loadAchievements = async () => {
        try {
          const response = await userService.getAchievements();
          setAchievements(response.data);
        } catch (error) {
          console.error("Error al cargar logros:", error);
        } finally {
          setIsLoading(false);
        }
      };

      void loadAchievements();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const IconComponent = (iconName: string) => iconMap[iconName] || MapPin;

  return (
    <div
      className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-50 p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">🏆 Vitrina de Logros</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X size={20} className="text-gray-600" />
          </button>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="animate-pulse bg-gray-200 rounded-2xl h-32" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {achievements.map((achievement) => {
              const Icon = IconComponent(achievement.iconName);
              return (
                <div
                  key={achievement.id}
                  className={`p-4 rounded-2xl border-2 transition-all ${
                    achievement.unlocked
                      ? "border-green-500 bg-green-50"
                      : "border-gray-200 bg-white opacity-60 grayscale"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`p-2 rounded-xl ${
                        achievement.unlocked ? "bg-green-100" : "bg-gray-100"
                      }`}
                    >
                      <Icon
                        size={24}
                        className={achievement.unlocked ? "text-green-600" : "text-gray-400"}
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold text-gray-900">{achievement.title}</h3>
                        {!achievement.unlocked && <Lock size={14} className="text-gray-400" />}
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{achievement.description}</p>
                      <p className="text-xs text-gray-500 font-medium">
                        {achievement.requiredKarma} pts Karma
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
