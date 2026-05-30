export interface OdsInfo {
  id: number;
  title: string;
  localLabel: string;
  color: string;
  imagePath: string;
}

export const ODS_MAP: Record<number, OdsInfo> = {
  1: {
    id: 1,
    title: "Fin de la Pobreza",
    localLabel: "Centros Sociales",
    color: "bg-[#E5243B]",
    imagePath: "/assets/ods/S-WEB-Goal-01.png",
  },
  2: {
    id: 2,
    title: "Hambre Cero",
    localLabel: "Bancos de Alimentos",
    color: "bg-[#DDA63A]",
    imagePath: "/assets/ods/S-WEB-Goal-02.png",
  },
  3: {
    id: 3,
    title: "Salud y Bienestar",
    localLabel: "Centros de Salud",
    color: "bg-[#4C9F38]",
    imagePath: "/assets/ods/S-WEB-Goal-03.png",
  },
  4: {
    id: 4,
    title: "Educación de Calidad",
    localLabel: "Centros Educativos",
    color: "bg-[#C5192D]",
    imagePath: "/assets/ods/S-WEB-Goal-04.png",
  },
  5: {
    id: 5,
    title: "Igualdad de Género",
    localLabel: "Centros de Igualdad",
    color: "bg-[#FF3A21]",
    imagePath: "/assets/ods/S-WEB-Goal-05.png",
  },
  6: {
    id: 6,
    title: "Agua Limpia y Saneamiento",
    localLabel: "Fuentes Públicas",
    color: "bg-[#26BDE2]",
    imagePath: "/assets/ods/S-WEB-Goal-06.png",
  },
  7: {
    id: 7,
    title: "Energía Asequible y No Contaminante",
    localLabel: "Puntos de Recarga",
    color: "bg-[#FCC30B]",
    imagePath: "/assets/ods/S-WEB-Goal-07.png",
  },
  8: {
    id: 8,
    title: "Trabajo Decente y Crecimiento Económico",
    localLabel: "Centros de Empleo",
    color: "bg-[#A21942]",
    imagePath: "/assets/ods/S-WEB-Goal-08.png",
  },
  9: {
    id: 9,
    title: "Industria, Innovación e Infraestructura",
    localLabel: "Espacios de Innovación",
    color: "bg-[#FD6925]",
    imagePath: "/assets/ods/S-WEB-Goal-09.png",
  },
  10: {
    id: 10,
    title: "Reducción de las Desigualdades",
    localLabel: "Servicios Públicos",
    color: "bg-[#DD1367]",
    imagePath: "/assets/ods/S-WEB-Goal-10.png",
  },
  11: {
    id: 11,
    title: "Ciudades y Comunidades Sostenibles",
    localLabel: "Espacios Verdes",
    color: "bg-[#FD9D24]",
    imagePath: "/assets/ods/S-WEB-Goal-11.png",
  },
  12: {
    id: 12,
    title: "Producción y Consumo Responsables",
    localLabel: "Puntos de Reciclaje",
    color: "bg-[#BF8B2E]",
    imagePath: "/assets/ods/S-WEB-Goal-12.png",
  },
  13: {
    id: 13,
    title: "Acción por el Clima",
    localLabel: "Estaciones Climáticas",
    color: "bg-[#3F7E44]",
    imagePath: "/assets/ods/S-WEB-Goal-13.png",
  },
  14: {
    id: 14,
    title: "Vida Submarina",
    localLabel: "Zonas Costeras",
    color: "bg-[#0A97D9]",
    imagePath: "/assets/ods/S-WEB-Goal-14.png",
  },
  15: {
    id: 15,
    title: "Vida de Ecosistemas Terrestres",
    localLabel: "Parques Naturales",
    color: "bg-[#56C02B]",
    imagePath: "/assets/ods/S-WEB-Goal-15.png",
  },
  16: {
    id: 16,
    title: "Paz, Justicia e Instituciones Sólidas",
    localLabel: "Servicios de Emergencia",
    color: "bg-[#00689D]",
    imagePath: "/assets/ods/S-WEB-Goal-16.png",
  },
  17: {
    id: 17,
    title: "Alianzas para Lograr los Objetivos",
    localLabel: "Centros de Colaboración",
    color: "bg-[#19486A]",
    imagePath: "/assets/ods/S-WEB-Goal-17.png",
  },
};

export const getOdsInfo = (odsNumber: number): OdsInfo | undefined => {
  return ODS_MAP[odsNumber];
};
