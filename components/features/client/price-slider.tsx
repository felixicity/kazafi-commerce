import { Field, FieldDescription, FieldTitle } from "@/components/ui/field";
import { Slider } from "@/components/ui/slider";

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
