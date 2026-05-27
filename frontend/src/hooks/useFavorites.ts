import { useState, useEffect } from 'react'
import { getFavorites } from '../services/favorites'
import type { FavoritePlaceAPI } from '../services/favorites'

export function useFavorites() {
  const [favorites, setFavorites] = useState<FavoritePlaceAPI[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    getFavorites()
      .then(setFavorites)
      .catch(() => setError('No se pudieron cargar los favoritos'))
      .finally(() => setLoading(false))
  }, [])

  return { favorites, loading, error }
}