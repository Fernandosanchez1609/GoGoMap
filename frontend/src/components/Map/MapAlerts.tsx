interface MapAlertsProps {
  geoError: string | null;
  error: string | null;
  loading: boolean;
  loadingRoute: boolean;
}

export default function MapAlerts({
  geoError,
  error,
  loading,
  loadingRoute,
}: MapAlertsProps) {
  return (
    <div className="absolute inset-x-0 top-0 z-[1000] flex flex-col items-center gap-2 px-4 pt-3 pointer-events-none">
      {geoError && (
        <div className="w-full max-w-3xl bg-red-50 border border-red-200 text-red-700 text-sm px-3 py-2 rounded-lg pointer-events-auto">
          ⚠️ {geoError}
        </div>
      )}
      {error && (
        <div className="w-full max-w-3xl bg-red-50 border border-red-200 text-red-700 text-sm px-3 py-2 rounded-lg pointer-events-auto">
          ⚠️ {error}
        </div>
      )}
      {loading && (
        <div className="w-full max-w-3xl bg-white px-4 py-2 rounded-lg shadow text-sm pointer-events-auto">
          Cargando puntos...
        </div>
      )}
      {loadingRoute && (
        <div className="w-full max-w-3xl bg-white px-4 py-2 rounded-lg shadow text-sm pointer-events-auto">
          Calculando ruta...
        </div>
      )}
    </div>
  );
}
