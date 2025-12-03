// Mock Slider (simplified for single range value, representing the MIN value)
export const PriceSlider: React.FC<{
      value: [number, number];
      onValueChange: (val: [number]) => void;
      min: number;
      max: number;
}> = ({ value, onValueChange, min, max }) => (
      <input
            type="range"
            min={min}
            max={max}
            value={value[0]}
            onChange={(e) => onValueChange([Number(e.target.value)])}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-black"
      />
);
