import { Field, FieldDescription, FieldTitle } from "@/components/ui/field";
import { Slider } from "@/components/ui/slider";
// Mock Slider (simplified for single range value, representing the MIN value)
// export const PriceSlider: React.FC<{
//       value: [number, number];
//       onValueChange: (val: [number]) => void;
//       min: number;
//       max: number;
// }> = ({ value, onValueChange, min, max }) => (
//       <input
//             type="range"
//             min={min}
//             max={max}
//             value={value[0]}
//             onChange={(e) => onValueChange([Number(e.target.value)])}
//             className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-black"
//       />
// );

export function PriceSlider({
      filters,
      value,
      onValueChange,
      min,
      max,
}: {
      filters: { priceRange: [number, number] };
      value: [number, number];
      onValueChange: (val: [number]) => void;
      min: number;
      max: number;
}) {
      return (
            <div className="w-full max-w-md">
                  <Field>
                        <FieldTitle>Price Range</FieldTitle>
                        <FieldDescription className="flex justify-between">
                              <span className="font-medium tabular-nums">
                                    {new Intl.NumberFormat("en-NG", {
                                          style: "currency",
                                          currency: "NGN",
                                    }).format(filters.priceRange[0])}
                              </span>
                              <span className="font-medium tabular-nums">
                                    {new Intl.NumberFormat("en-NG", {
                                          style: "currency",
                                          currency: "NGN",
                                    }).format(filters.priceRange[1])}
                              </span>
                        </FieldDescription>
                        <Slider
                              value={value}
                              onValueChange={onValueChange}
                              max={max}
                              min={min}
                              step={1000}
                              className="mt-2 w-full"
                              aria-label="Price Range"
                        />
                  </Field>
            </div>
      );
}
