export interface FavoritePlace {
    id: number
    name: string
    address: string
    status: "Abierto" | "Cerrado" | "Averiado"
    distance: string
    ods: number
    odsName: string
}

export const FAVORITES_MOCK: FavoritePlace[] = [
    {
    id: 1,
    name: "Punto Limpio Centro",
    address: "Calle Larios, 5",
    status: "Abierto",
    distance: "300m",
    ods: 12,
    odsName: "Producción y consumo responsables",
  },
  {
    id: 2,
    name: "Fuente Plaza Mayor",
    address: "Plaza Mayor, 1",
    status: "Averiado",
    distance: "1.2km",
    ods: 6,
    odsName: "Agua limpia y saneamiento",
  },
  {
    id: 3,
    name: "Huerto Comunitario San José",
    address: "Av. San José, s/n",
    status: "Abierto",
    distance: "2.5km",
    ods: 15,
    odsName: "Vida de ecosistemas terrestres",
  },
  {
    id: 4,
    name: "BioMercado Alameda",
    address: "Paseo de la Alameda, 12",
    status: "Cerrado",
    distance: "4.1km",
    ods: 2,
    odsName: "Hambre cero",
  },
]