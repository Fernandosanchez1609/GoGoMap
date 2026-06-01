import { X } from "lucide-react";
import { ODS_MAP } from "@/utils/odsMapping";

interface FilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  selectedOds: number[];
  onSelectOds: (ods: number[]) => void;
  radiusKm: number;
  onRadiusChange: (value: number) => void;
  visibleCount: number;
  hasUserPosition: boolean;
  showFavoritesOnly: boolean;
  onToggleFavorites: (val: boolean) => void;
  isAuthenticated: boolean;
}

export default function FilterDrawer({
  isOpen,
  onClose,
  selectedOds,
  onSelectOds,
  radiusKm,
  onRadiusChange,
  visibleCount,
  hasUserPosition,
  showFavoritesOnly,
  onToggleFavorites,
  isAuthenticated,
}: FilterDrawerProps) {
  const ods = Array.from({ length: 17 }, (_, i) => i + 1);

  const handleToggle = (n: number) => {
    if (selectedOds.includes(n)) {
      onSelectOds(selectedOds.filter((id) => id !== n));
    } else {
      onSelectOds([...selectedOds, n]);
    }
  };

  return (
    <>
      {/* Fondo oscuro */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-[1999]"
          onClick={onClose}
        />
      )}

      {/* Panel lateral */}
      <div
        className={`fixed inset-y-0 left-0 z-[2000] w-80 bg-white shadow-2xl transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Cabecera */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-900">Filtros del Mapa</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X size={20} className="text-gray-600" />
          </button>
        </div>

        {/* Contenido */}
        <div className="overflow-y-auto h-full pb-24">
          {/* Control de Radio */}
          {hasUserPosition && (
            <div className="p-4 border-b border-gray-100">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">
                Radio de búsqueda
              </h3>
              <div className="flex items-center gap-4 mb-2">
                <input
                  type="range"
                  min={0.5}
                  max={30}
                  step={0.5}
                  value={radiusKm}
                  onChange={(e) => onRadiusChange(Number(e.target.value))}
                  className="flex-1 accent-green-600"
                />
                <span className="text-gray-800 font-medium whitespace-nowrap w-14 text-right">
                  {radiusKm} km
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                {visibleCount} puntos visibles
              </p>
            </div>
          )}

          {/* Toggle de favoritos */}
          {isAuthenticated && (
            <>
              <div className="p-4 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">❤️</span>
                    <span className="text-sm font-semibold text-gray-700">
                      Solo mis favoritos
                    </span>
                  </div>
                  <button
                    onClick={() => onToggleFavorites(!showFavoritesOnly)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      showFavoritesOnly ? "bg-green-600" : "bg-gray-200"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        showFavoritesOnly ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
              </div>
              <hr className="border-gray-100" />
            </>
          )}

          {/* Lista de ODS con checkboxes */}
          <div className="p-4">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">
              Categorías ODS
            </h3>
            <div className="space-y-2">
              {ods.map((n) => {
                const odsInfo = ODS_MAP[n];
                const isSelected = selectedOds.includes(n);
                return (
                  <label
                    key={n}
                    className="flex items-center gap-3 p-3 rounded-2xl hover:bg-gray-50 cursor-pointer transition-colors"
                  >
                    <img
                      src={odsInfo.imagePath}
                      alt={`ODS ${n}`}
                      className="w-10 h-10 object-contain shrink-0"
                    />
                    <span className="flex-1 text-sm font-medium text-gray-700">
                      {odsInfo.localLabel}
                    </span>
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => handleToggle(n)}
                      className="w-5 h-5 rounded border-gray-300 text-green-600 focus:ring-green-500 cursor-pointer"
                    />
                  </label>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
