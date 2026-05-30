import { useState, useEffect } from 'react';
import type { PointDetail } from '../../api/types/index.ts';
import { ODS_COLORS } from '@/utils/OdsColors';
import userService from '@/api/services/userService';
import pointService from '@/api/services/pointService';
import { isWithinMeters } from '@/utils/Distance';


interface Props {
  point: PointDetail;
  latitude: number;
  longitude: number;
  onRequestRoute: (lat: number, lng: number) => void;
  canRoute: boolean;
  userPosition?: [number, number] | null;
}

export default function PointModel({ point, latitude, longitude, onRequestRoute, canRoute, userPosition }: Props) {
  const odsColor = point.odsNumber ? ODS_COLORS[point.odsNumber] ?? 'var(--app-green)' : 'var(--app-green)';

  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoadingFav, setIsLoadingFav] = useState(false);
  const [isInteracting, setIsInteracting] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [actionMessage, setActionMessage] = useState<string | null>(null);
  const [actionIsError, setActionIsError] = useState(false);

  useEffect(() => {
    const checkFavoriteStatus = async () => {
      if (!point.id) return;
      try {
        const response = await userService.getFavorites();
        const favorites = response.data;
        const isFav = favorites.some((fav: PointDetail) => fav.id === point.id);
        setIsFavorite(isFav);
      } catch (error) {
        console.error("Error al comprobar favoritos:", error);
      }
    };

    checkFavoriteStatus();
  }, [point.id]);

  // Check if user already performed the VISIT action for this point
  useEffect(() => {
    let mounted = true;
    const checkAction = async () => {
      if (!point.id) return;
      try {
        const resp = await pointService.getActionStatus(String(point.id), 'VISIT');
        if (!mounted) return;
        if (resp.data?.hasPerformed) {
          setHasInteracted(true);
        }
      } catch (err) {
        // ignore errors here; failing to check means button stays available
        console.warn('Could not fetch action status', err);
      }
    };
    void checkAction();
    return () => { mounted = false; };
  }, [point.id]);

  const handleToggleFavorite = async () => {
    if (!point.id) return;
    
    setIsLoadingFav(true);
    try {
      if (isFavorite) {
        await userService.removeFavorite(point.id);
        setIsFavorite(false);
      } else {
        await userService.addFavorite(point.id);
        setIsFavorite(true);
      }
    } catch (error) {
      console.error("Error al modificar favoritos:", error);
    } finally {
      setIsLoadingFav(false);
    }
  };

  const computeWithinRange = (userPos?: [number, number] | null) => {
    if (!userPos) return false;
    return isWithinMeters(userPos[0], userPos[1], latitude, longitude, 50);
  };

  const withinRange = computeWithinRange(userPosition);

  const handleInteract = async () => {
    if (!point.id) return;
    try {
      setIsInteracting(true);
      const resp = await pointService.performAction(String(point.id), 'VISIT');
      setActionMessage(resp.data?.message ?? 'Interacción realizada');
      setActionIsError(false);
      setHasInteracted(true);
    } catch (err: any) {
      const msg = err?.response?.data?.message || err?.message || 'Error realizando la interacción';
      setActionMessage(msg);
      setActionIsError(true);
    } finally {
      setIsInteracting(false);
    }
  };

  // Clear action messages after a short delay
  useEffect(() => {
    if (!actionMessage) return;
    const id = setTimeout(() => setActionMessage(null), 5000);
    return () => clearTimeout(id);
  }, [actionMessage]);

  return (
    <div className="flex flex-col gap-4">
      {/* Header: badge ODS + título */}
      <div className="flex items-center gap-3 pb-3 border-b border-gray-100">
        {point.odsNumber && (
          <span
            className="flex items-center justify-center w-9 h-9 rounded-md text-white font-bold text-sm shrink-0"
            style={{ backgroundColor: odsColor }}
          >
            {point.odsNumber}
          </span>
        )}
        <span className="text-base font-semibold text-gray-700 tracking-wide uppercase">
         {point.ods}
        </span>
      </div>

      {/* Título y dirección */}
      <div className="flex justify-between items-start gap-4">
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl font-bold text-gray-900">{point.title}</h2>
          {point.address && (
            <p className="flex items-center gap-1 text-gray-500 text-sm">
              <svg
                className="w-4 h-4 shrink-0"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 21c-4-4.5-6-8-6-11a6 6 0 1 1 12 0c0 3-2 6.5-6 11z"
                />
                <circle cx="12" cy="10" r="2" fill="currentColor" stroke="none" />
              </svg>
              {point.address}
            </p>
          )}
        </div>

        <button
          onClick={handleToggleFavorite}
          disabled={isLoadingFav}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors disabled:opacity-50 shrink-0"
          title={isFavorite ? "Quitar de favoritos" : "Añadir a favoritos"}
        >
          <svg
            className={`w-7 h-7 transition-colors duration-300 ${
              isFavorite ? 'fill-red-500 text-red-500' : 'fill-none text-gray-400 hover:text-red-400'
            }`}
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </button>
      </div>

      {/* Tabla estado + descripción */}
      <div className="rounded-xl bg-gray-50 border border-gray-100 overflow-hidden text-sm">
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
          <span className="text-gray-400 font-semibold uppercase tracking-widest text-xs">
            Estado
          </span>
          <span
            className={`flex items-center gap-1.5 font-semibold ${
              point.status === "active" ? "text-green-600" : "text-gray-400"
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full ${
                point.status === "active" ? "bg-green-500" : "bg-gray-300"
              }`}
            />
            {point.status === "active" ? "Funcionando" : point.status}
          </span>
        </div>

        {point.description && (
          <div className="flex items-start justify-between px-4 py-3 gap-4">
            <span className="text-gray-400 font-semibold uppercase tracking-widest text-xs shrink-0 pt-0.5">
              Descripción
            </span>
            <span className="text-gray-700 text-right max-h-24 sm:max-h-32 md:max-h-40 overflow-y-auto leading-relaxed">
              {point.description}
            </span>
          </div>
        )}
      </div>

      {/* Botón Ruta */}
      <button
        onClick={() => onRequestRoute(latitude, longitude)}
        disabled={!canRoute}
        className="flex items-center justify-center gap-2 w-full py-3 rounded-full text-white font-semibold text-base transition-opacity hover:opacity-90 active:opacity-75 disabled:opacity-40 disabled:cursor-not-allowed"
        style={{ backgroundColor: odsColor }}
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 20l-5.447-2.724A1 1 0 0 1 3 16.382V5.618a1 1 0 0 1 1.447-.894L9 7m0 13V7m0 13 6-3m-6-10 6-3m0 0 5.447 2.724A1 1 0 0 1 21 7.618v10.764a1 1 0 0 1-1.447.894L15 17m0-13v13"
          />
        </svg>
        {canRoute ? "Ruta" : "Activa ubicación para la ruta"}
      </button>
      {/* Interact button: enabled only if userPosition within 50m. */}
      {actionMessage && (
        <div className={`px-3 py-2 rounded text-sm ${actionIsError ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'}`}>
          {actionMessage}
        </div>
      )}

      {!hasInteracted && (
        <div className="mt-2">
          <button
            onClick={handleInteract}
            disabled={isInteracting || !withinRange}
            className="flex items-center justify-center gap-2 w-full py-3 rounded-full text-white font-semibold text-base transition-opacity hover:opacity-90 active:opacity-75 disabled:opacity-40 disabled:cursor-not-allowed"
            style={{ backgroundColor: 'var(--app-green)' }}
          >
            {isInteracting ? 'Interactuando...' : 'Interactuar'}
          </button>
        </div>
      )}
    </div>
  );
}
