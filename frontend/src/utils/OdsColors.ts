import L from "leaflet";

export const ODS_COLORS: Record<number, string> = {
  1:  "#E5243B",
  2:  "#DDA63A",
  3:  "#4C9F38",
  4:  "#C5192D",
  5:  "#FF3A21",
  6:  "#26BDE2",
  7:  "#FCC30B",
  8:  "#A21942",
  9:  "#FD6925",
  10: "#DD1367",
  11: "#FD9D24",
  12: "#BF8B2E",
  13: "#3F7E44",
  14: "#0A97D9",
  15: "#56C02B",
  16: "#00689D",
  17: "#19486A",
};

export  function createOdsIcon(ods: number): L.DivIcon {
  const color = ODS_COLORS[ods] ?? "#888888";

  return L.divIcon({
    className: "",
    html: `
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="40" viewBox="0 0 28 40">
        <path
          d="M14 0C6.27 0 0 6.27 0 14c0 9.625 14 26 14 26S28 23.625 28 14C28 6.27 21.73 0 14 0z"
          fill="${color}"
          stroke="white"
          stroke-width="1.5"
        />
        <circle cx="14" cy="14" r="5" fill="white" />
      </svg>
    `,
    iconSize: [28, 40],
    iconAnchor: [14, 40],
    popupAnchor: [0, -40],
  });
}