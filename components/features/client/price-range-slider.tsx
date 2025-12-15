
import {
  Field,
  FieldDescription,
  FieldTitle,
} from "@/registry/new-york-v4/ui/field"
import { Slider } from "@/registry/new-york-v4/ui/slider"

export function FieldSlider({priceRange}: {priceRange: [number, number]}, onValueChange) {
  
  return (
    <div className="w-full max-w-md">
      <Field>
        <FieldTitle>Price Range</FieldTitle>
        <FieldDescription>
          Set your budget range (
          <span className="font-medium tabular-nums">{priceRange[0]}</span> -{" "}
          <span className="font-medium tabular-nums">{priceRange[1]}</span>).
        </FieldDescription>
        <Slider
          value={priceRange}
          onValueChange={onValueChange}
          max={1000}
          min={0}
          step={10}
          className="mt-2 w-full"
          aria-label="Price Range"
        />
      </Field>
    </div>
  )
}