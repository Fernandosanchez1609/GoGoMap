// Weal.tsx
import { useState } from "react";
import { Wheel } from "react-custom-roulette";
import { X } from "lucide-react";

type Multiplier = "X1" | "X2" | "X5" | "X10";

interface Prize {
  option: string;
  multiplier: Multiplier;
  style: { backgroundColor: string; textColor: string };
}

const data: Prize[] = [
  { option: "X1",  multiplier: "X1",  style: { backgroundColor: "#a8d5a2", textColor: "#1a2e1c" } },
  { option: "X1",  multiplier: "X1",  style: { backgroundColor: "#a8d5a2", textColor: "#1a2e1c" } },
  { option: "X2",  multiplier: "X2",  style: { backgroundColor: "#2d6a35", textColor: "#ffffff" } },
  { option: "X2",  multiplier: "X2",  style: { backgroundColor: "#2d6a35", textColor: "#ffffff" } },
  { option: "X1",  multiplier: "X1",  style: { backgroundColor: "#a8d5a2", textColor: "#1a2e1c" } },
  { option: "X5",  multiplier: "X5",  style: { backgroundColor: "#f5a623", textColor: "#ffffff" } },
  { option: "X1",  multiplier: "X1",  style: { backgroundColor: "#a8d5a2", textColor: "#1a2e1c" } },
  { option: "X2",  multiplier: "X2",  style: { backgroundColor: "#2d6a35", textColor: "#ffffff" } },
  { option: "X1",  multiplier: "X1",  style: { backgroundColor: "#a8d5a2", textColor: "#1a2e1c" } },
  { option: "X5",  multiplier: "X5",  style: { backgroundColor: "#f5a623", textColor: "#ffffff" } },
  { option: "X1",  multiplier: "X1",  style: { backgroundColor: "#a8d5a2", textColor: "#1a2e1c" } },
  { option: "X2",  multiplier: "X2",  style: { backgroundColor: "#2d6a35", textColor: "#ffffff" } },
  { option: "X1",  multiplier: "X1",  style: { backgroundColor: "#a8d5a2", textColor: "#1a2e1c" } },
  { option: "X5",  multiplier: "X5",  style: { backgroundColor: "#f5a623", textColor: "#ffffff" } },
  { option: "X1",  multiplier: "X1",  style: { backgroundColor: "#a8d5a2", textColor: "#1a2e1c" } },
  { option: "X10", multiplier: "X10", style: { backgroundColor: "#d64040", textColor: "#ffffff" } },
];

const fetchPrizeFromBackend = async (): Promise<number> => {
  await new Promise((r) => setTimeout(r, 500));
  const weights = data.map((p) =>
    p.multiplier === "X1" ? 8 : p.multiplier === "X2" ? 4 : p.multiplier === "X5" ? 3 : 1
  );
  const total = weights.reduce((a, b) => a + b, 0);
  let random = Math.random() * total;
  for (let i = 0; i < weights.length; i++) {
    random -= weights[i];
    if (random <= 0) return i;
  }
  return 0;
};

const multiplierStyles: Record<Multiplier, { label: string; color: string }> = {
  X1:  { label: "Sin multiplicador", color: "#1a2e1c" },
  X2:  { label: "¡Doble puntuación!", color: "#2d6a35" },
  X5:  { label: "¡Cinco veces!",      color: "#f5a623" },
  X10: { label: "¡JACKPOT!",          color: "#d64040" },
};

interface WealProps {
  onClose: () => void;
}

export default function Weal({ onClose }: WealProps) {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [prizeResult, setPrizeResult] = useState<Multiplier | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSpin = async () => {
    if (mustSpin || loading) return;
    setPrizeResult(null);
    setLoading(true);
    const prize = await fetchPrizeFromBackend();
    setPrizeNumber(prize);
    setMustSpin(true);
    setLoading(false);
  };

  const handleClose = () => {
    if (mustSpin) return; // no cerrar mientras gira
    onClose();
  };

  const result = prizeResult ? multiplierStyles[prizeResult] : null;

  return (
    // Backdrop
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/50"
      onClick={handleClose}
    >
      {/* Modal — bottom sheet */}
      <div
        className="w-full max-w-md bg-[#f0f4ec] rounded-t-3xl px-6 pt-5 pb-10 flex flex-col items-center gap-5"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Handle + close */}
        <div className="w-full flex items-center justify-between">
          <div className="w-10 h-1 rounded-full bg-gray-300 mx-auto absolute left-1/2 -translate-x-1/2" />
          <div className="flex-1" />
          <button
            onClick={handleClose}
            disabled={mustSpin}
            className="p-2 rounded-full hover:bg-gray-200 transition-colors disabled:opacity-30"
          >
            <X size={20} className="text-[#1a2e1c]" />
          </button>
        </div>

        <h2 className="text-2xl font-bold text-[#1a2e1c] tracking-tight">
          Gira la ruleta
        </h2>

        <Wheel
          mustStartSpinning={mustSpin}
          prizeNumber={prizeNumber}
          data={data}
          onStopSpinning={() => {
            setMustSpin(false);
            setPrizeResult(data[prizeNumber].multiplier);
          }}
        />

        <button
          onClick={handleSpin}
          disabled={mustSpin || loading}
          className="w-full py-4 rounded-full bg-[#2d6a35] text-white font-semibold text-base shadow-lg shadow-green-900/25 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:bg-[#245a2b] active:scale-95"
        >
          {loading ? "Consultando..." : mustSpin ? "Girando..." : "¡Girar!"}
        </button>

        {result && (
          <div className="w-full bg-white rounded-2xl px-6 py-4 shadow-sm text-center">
            <p className="text-xs font-semibold text-[#7a9a7e] uppercase tracking-widest mb-1">
              Premio obtenido
            </p>
            <p className="text-3xl font-bold" style={{ color: result.color }}>
              {prizeResult}
            </p>
            <p className="text-sm font-medium text-[#7a9a7e] mt-1">{result.label}</p>
          </div>
        )}
      </div>
    </div>
  );
}