import PointModel from "@/components/Map/PointModel";
import type { PointDetail } from "@/api/types/index";

interface PointDetailModalProps {
  selectedPoint: PointDetail | null;
  selectedPointCoords: [number, number] | null;
  loadingDetail: boolean;
  userPosition: [number, number] | null;
  onRequestRoute: (lat: number, lng: number) => void;
  onClose: () => void;
}

export default function PointDetailModal({
  selectedPoint,
  selectedPointCoords,
  loadingDetail,
  userPosition,
  onRequestRoute,
  onClose,
}: PointDetailModalProps) {
  if (!selectedPoint && !loadingDetail) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/40 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-xl p-6 w-[90%] max-h-[85vh] overflow-y-auto md:max-w-lg md:w-[28rem] relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-xl leading-none z-10"
        >
          ×
        </button>

              {loadingDetail ? (
                <p className="text-sm text-gray-500">Cargando...</p>
              ) : selectedPoint && selectedPointCoords ? (
                <PointModel
                  point={selectedPoint}
                  latitude={selectedPointCoords[0]}
                  longitude={selectedPointCoords[1]}
                  onRequestRoute={onRequestRoute}
                  canRoute={!!userPosition}
                  userPosition={userPosition}
                />
              ) : null}
      </div>
    </div>
  );
}
