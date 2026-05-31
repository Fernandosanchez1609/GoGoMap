import { ODS_MAP } from '@/utils/odsMapping';

interface FilterProps {
  selected: number[];
  onSelect: (ods: number[]) => void;
}

export default function Filter({ selected, onSelect }: FilterProps) {
  const ods = Array.from({ length: 17 }, (_, i) => i + 1);

  const handleToggle = (n: number) => {
  
    const safeSelected = selected || []; 
    
    if (safeSelected.includes(n)) {
      onSelect(safeSelected.filter((id) => id !== n));
    } else {
      onSelect([...safeSelected, n]);
    }
  };
  return (
    <section className="bg-app-bg px-4 pt-4 pb-6 shadow-lg z-10">
      <div className="max-w-screen-md mx-auto">
        <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory overflow-y-visible pb-2 pt-2 px-1 scrollbar-hide touch-pan-x">
          {ods.map((n) => {
            const odsInfo = ODS_MAP[n as keyof typeof ODS_MAP];
            const isSelected = (selected || []).includes(n);
            
            return (
              <button
                key={n}
                onClick={() => handleToggle(n)}
                className={`shrink-0 snap-center flex items-center gap-2 px-3 py-2 rounded-full transition-all duration-200 border-2
                  ${isSelected
                    ? "bg-green-500 border-green-600 shadow-lg scale-105 text-white"
                    : "bg-white border-gray-200 hover:border-green-300 hover:bg-gray-50 text-gray-700"
                  }`}
              >
                <img
                  src={odsInfo.imagePath}
                  alt={`ODS ${n}`}
                  className="w-6 h-6 object-contain shrink-0"
                />
                <span className="text-sm font-semibold whitespace-nowrap">
                  {odsInfo.localLabel}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}