import { useState } from "react";
import { Wheel } from "react-custom-roulette";
import { X } from "lucide-react";
import Confetti from "react-confetti";
import userService from "@/api/services/userService";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";

type Multiplier = "X1" | "X2" | "X5" | "X10";

interface Prize {
  option: string;
  multiplier: Multiplier;
  style: { backgroundColor: string; textColor: string };
}

const getCssVar = (name: string) =>
  getComputedStyle(document.documentElement).getPropertyValue(name).trim();

const data: Prize[] = [
  { option: "X1",  multiplier: "X1",  style: { backgroundColor: getCssVar("--weal-x1-bg"),  textColor: getCssVar("--weal-x1-text") } },
  { option: "X1",  multiplier: "X1",  style: { backgroundColor: getCssVar("--weal-x1-bg"),  textColor: getCssVar("--weal-x1-text") } },
  { option: "X2",  multiplier: "X2",  style: { backgroundColor: getCssVar("--weal-x2-bg"),  textColor: getCssVar("--weal-x2-text") } },
  { option: "X2",  multiplier: "X2",  style: { backgroundColor: getCssVar("--weal-x2-bg"),  textColor: getCssVar("--weal-x2-text") } },
  { option: "X1",  multiplier: "X1",  style: { backgroundColor: getCssVar("--weal-x1-bg"),  textColor: getCssVar("--weal-x1-text") } },
  { option: "X5",  multiplier: "X5",  style: { backgroundColor: getCssVar("--weal-x5-bg"),  textColor: getCssVar("--weal-x5-text") } },
  { option: "X1",  multiplier: "X1",  style: { backgroundColor: getCssVar("--weal-x1-bg"),  textColor: getCssVar("--weal-x1-text") } },
  { option: "X2",  multiplier: "X2",  style: { backgroundColor: getCssVar("--weal-x2-bg"),  textColor: getCssVar("--weal-x2-text") } },
  { option: "X1",  multiplier: "X1",  style: { backgroundColor: getCssVar("--weal-x1-bg"),  textColor: getCssVar("--weal-x1-text") } },
  { option: "X5",  multiplier: "X5",  style: { backgroundColor: getCssVar("--weal-x5-bg"),  textColor: getCssVar("--weal-x5-text") } },
  { option: "X1",  multiplier: "X1",  style: { backgroundColor: getCssVar("--weal-x1-bg"),  textColor: getCssVar("--weal-x1-text") } },
  { option: "X2",  multiplier: "X2",  style: { backgroundColor: getCssVar("--weal-x2-bg"),  textColor: getCssVar("--weal-x2-text") } },
  { option: "X1",  multiplier: "X1",  style: { backgroundColor: getCssVar("--weal-x1-bg"),  textColor: getCssVar("--weal-x1-text") } },
  { option: "X5",  multiplier: "X5",  style: { backgroundColor: getCssVar("--weal-x5-bg"),  textColor: getCssVar("--weal-x5-text") } },
  { option: "X1",  multiplier: "X1",  style: { backgroundColor: getCssVar("--weal-x1-bg"),  textColor: getCssVar("--weal-x1-text") } },
  { option: "X10", multiplier: "X10", style: { backgroundColor: getCssVar("--weal-x10-bg"), textColor: getCssVar("--weal-x10-text") } },
];

const multiplierStyles: Record<Multiplier, { label: string; color: string }> = {
  X1:  { label: "Sin multiplicador",  color: getCssVar("--weal-x1-text")  },
  X2:  { label: "¡Doble puntuación!", color: getCssVar("--weal-x2-text")  },
  X5:  { label: "¡Cinco veces!",      color: getCssVar("--weal-x5-text")  },
  X10: { label: "¡JACKPOT!",          color: getCssVar("--weal-x10-text") },
};

interface WealProps {
  onClose: () => void;
}

export default function Weal({ onClose }: WealProps) {
  const { hasSpunWheelToday, markWheelSpinDone, refreshProfile } = useAuth();
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [prizeResult, setPrizeResult] = useState<Multiplier | null>(null);
  const [loading, setLoading] = useState(false);
  const [spinMessage, setSpinMessage] = useState<string | null>(null);
  const [queuedSpinMessage, setQueuedSpinMessage] = useState<string | null>(null);

  const fetchPrizeFromBackend = async (): Promise<{ slotIndex: number; message: string }> => {
    const response = await userService.spinDailyWheel();
    const slotIndex = Math.max(0, Math.min(data.length - 1, response.data.slotIndex));
    setQueuedSpinMessage(response.data.message);
    return { slotIndex, message: response.data.message };
  };

  const handleSpin = async () => {
    if (mustSpin || loading || hasSpunWheelToday) return;
    setPrizeResult(null);
    setSpinMessage(null);
    setQueuedSpinMessage(null);
    setLoading(true);

    try {
      const prize = await fetchPrizeFromBackend();
      setPrizeNumber(prize.slotIndex);
      setMustSpin(true);
      markWheelSpinDone();
    } catch (error) {
      const status = axios.isAxiosError(error) ? error.response?.status : undefined;

      if (status === 429) {
        setSpinMessage("Ya has girado hoy. Vuelve mañana a las 0:00.");
        markWheelSpinDone();
      } else {
        setSpinMessage("No se pudo girar la ruleta. Intenta de nuevo más tarde.");
        console.error(error);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (mustSpin) return;
    onClose();
  };

  const result = prizeResult ? multiplierStyles[prizeResult] : null;
  const canSpin = !hasSpunWheelToday && !mustSpin && !loading;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-4 sm:items-center"
      onClick={handleClose}
    >
      {prizeResult && <Confetti recycle={false} numberOfPieces={400} />}
      
      <div
        className="w-full max-w-md max-h-[92vh] overflow-y-auto bg-app-surface-2 rounded-t-3xl px-6 pt-5 pb-10 flex flex-col items-center gap-5"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-full flex items-center justify-between">
          <div className="w-10 h-1 rounded-full bg-gray-300 mx-auto absolute left-1/2 -translate-x-1/2" />
          <div className="flex-1" />
          <button
            onClick={handleClose}
            disabled={mustSpin}
            className="p-2 rounded-full hover:bg-gray-200 transition-colors disabled:opacity-30"
          >
            <X size={20} className="text-app-text-dark" />
          </button>
        </div>

        <h2 className="text-2xl font-bold text-app-text-dark tracking-tight">
          {prizeResult ? "¡Felicidades!" : "Gira la ruleta"}
        </h2>

        {!prizeResult ? (
          <>
            <div className="w-full flex justify-center">
              <Wheel
                mustStartSpinning={mustSpin}
                prizeNumber={prizeNumber}
                data={data}
                outerBorderColor="#e5e7eb"
                outerBorderWidth={5}
                innerBorderColor="#ffffff"
                innerBorderWidth={10}
                radiusLineColor="#ffffff"
                radiusLineWidth={2}
                fontSize={20}
                textDistance={60}
                onStopSpinning={() => {
                  setMustSpin(false);
                  setPrizeResult(data[prizeNumber].multiplier);
                  if (queuedSpinMessage) {
                    setSpinMessage(queuedSpinMessage);
                    setQueuedSpinMessage(null);
                  }
                  void refreshProfile();
                }}
              />
            </div>

            <button
              onClick={handleSpin}
              disabled={mustSpin || loading || hasSpunWheelToday}
              className={`w-full py-4 rounded-full bg-app-green text-white font-semibold text-base shadow-lg shadow-green-900/25 disabled:opacity-50 disabled:cursor-not-allowed transition-transform duration-200 hover:scale-105 active:scale-95 ${
                canSpin ? "animate-pulse" : ""
              }`}
            >
              {loading
                ? "Consultando..."
                : mustSpin
                ? "Girando..."
                : hasSpunWheelToday
                ? "Ya giraste hoy"
                : "¡Girar!"}
            </button>

            {spinMessage && !prizeResult && (
              <div className="w-full bg-white rounded-2xl px-6 py-4 shadow-sm text-center">
                <p className="text-sm font-medium text-app-text-dark">{spinMessage}</p>
              </div>
            )}
          </>
        ) : (
          <div className="w-full bg-white rounded-3xl px-8 py-10 shadow-2xl text-center animate-in zoom-in duration-500">
            <p className="text-xs font-semibold text-app-muted uppercase tracking-widest mb-3">
              Premio obtenido
            </p>
            <p className="text-6xl font-black mb-4" style={{ color: result?.color }}>
              {prizeResult}
            </p>
            <p className="text-xl font-bold text-app-text-dark mb-6">{result?.label}</p>
            {spinMessage && (
              <div className="border-t border-gray-200 pt-4 mt-4">
                <p className="text-sm font-medium text-app-muted">{spinMessage}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}