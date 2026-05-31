import Filter from "@/components/Map/Filter";

interface MapControlsProps {
  selectedOds: number[];
  onSelect: (ods: number[]) => void;
  radiusKm: number;
  onRadiusChange: (value: number) => void;
  visibleCount: number;
  onCenterClick: () => void;
  hasUserPosition: boolean;
}

export default function MapControls({
  selectedOds,
  onSelect,
  radiusKm,
  onRadiusChange,
  visibleCount,
  onCenterClick,
  hasUserPosition,
}: MapControlsProps) {
  return (
    <>
      <Filter selected={selectedOds} onSelect={onSelect} />

      {hasUserPosition && (
        <div className="flex flex-col gap-3 px-4 pt-3 pb-4 bg-white border-b border-gray-200 text-sm">
          <div className="flex items-center gap-4">
            <span className="text-gray-600 whitespace-nowrap">Radio:</span>
            <input
              type="range"
              min={0.5}
              max={30}
              step={0.5}
              value={radiusKm}
              onChange={(e) => onRadiusChange(Number(e.target.value))}
              className="flex-1 accent-blue-500"
            />
            <span className="text-gray-800 font-medium whitespace-nowrap w-14 text-right">
              {radiusKm} km
            </span>
          </div>

          <div className="flex items-center justify-between gap-3">
            <span className="font-semibold text-gray-800 whitespace-nowrap">
              {visibleCount} puntos
            </span>
            <button
              onClick={onCenterClick}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm transition-colors hover:bg-gray-50"
              title="Centrar en mi ubicación"
            >
              📍
            </button>
          </div>
        </div>
      )}
    </>
  );
}
