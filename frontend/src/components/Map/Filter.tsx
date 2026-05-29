interface FilterProps {
  selected: number | null;
  onSelect: (ods: number | null) => void;
}

export default function Filter({ selected, onSelect }: FilterProps) {
  const ods = Array.from({ length: 17 }, (_, i) => i + 1);

  return (
    <section className="bg-white px-4 pt-4 pb-6 shadow-lg z-10">
      
      <div className="flex gap-4 overflow-x-auto overflow-y-visible pb-2 pt-2 px-1">
        {ods.map((n) => (
          <button
            key={n}
            onClick={() => onSelect(selected === n ? null : n)}
            className={`shrink-0 rounded-xl transition-all duration-200 p-1
              ${selected === n
                ? "bg-green-500 shadow-lg scale-110"
                : "bg-gray-100 hover:bg-gray-200 hover:scale-105 opacity-80 hover:opacity-100"
              }`}
          >
            <img
              src={`/assets/ods/S-WEB-Goal-${String(n).padStart(2, "0")}.png`}
              alt={`ODS ${n}`}
              className="h-14 w-14 rounded-lg object-cover"
            />
          </button>
        ))}
      </div>
    </section>
  );
}