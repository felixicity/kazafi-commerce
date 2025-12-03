"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList, CommandInput } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
      Field,
      FieldDescription,
      FieldGroup,
      FieldLabel,
      FieldLegend,
      FieldSet,
      FieldSeparator,
      FieldTitle,
} from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import { ChevronsUpDown } from "lucide-react";
import { IconCheck, IconFile, IconPlus, IconUpload } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
// import { useCreateProdu,ctMutation } from "../../../slices/productApiSlice";

function AddProducts() {
      const [product, setProduct] = useState({
            name: "",
            description: "",
            category: "",
            variations: [
                  {
                        color: "",
                        hexCode: "#000000",
                        price: "",
                        stock: "",
                        imageFiles: [],
                        imagePreviews: [],
                  },
            ],
      });

      const [openCategory, setOpenCategory] = useState(false);

      //   const [createProduct, { isLoading }] = useCreateProductMutation();

      const handleInputChange = (e) => {
            const { name, value } = e.target;
            setProduct((prev) => ({ ...prev, [name]: value }));
      };

      const handleVariationChange = (index, e) => {
            const { name, value, files } = e.target;

            const updatedVariations = [...product.variations];

            if (name === "images") {
                  const imageFiles = Array.from(files);
                  const previews = imageFiles.map((file) => URL.createObjectURL(file));
                  updatedVariations[index].imageFiles = imageFiles;
                  updatedVariations[index].imagePreviews = previews;
            } else {
                  updatedVariations[index][name] = value;
            }

            setProduct((prev) => ({ ...prev, variations: updatedVariations }));
      };

      const addVariation = () => {
            setProduct((prev) => ({
                  ...prev,
                  variations: [
                        ...prev.variations,
                        {
                              color: "",
                              hexCode: "#000000",
                              price: "",
                              stock: "",
                              imageFiles: [],
                              imagePreviews: [],
                        },
                  ],
            }));
      };

      const removeVariation = (index) => {
            if (product.variations.length === 1) return;
            const updated = product.variations.filter((_, i) => i !== index);
            setProduct((prev) => ({ ...prev, variations: updated }));
      };

      const handleSubmit = async (e) => {
            e.preventDefault();

            const formData = new FormData();

            // Append generic data
            formData.append("name", product.name);
            formData.append("category", product.category);
            formData.append("description", product.description);

            //Append variations data
            product.variations.forEach((variation, index) => {
                  formData.append(`variation-[${index + 1}]-[color]`, variation.color);
                  formData.append(`variation-[${index + 1}]-[hexCode]`, variation.hexCode);
                  formData.append(`variation-[${index + 1}]-[price]`, variation.price);
                  formData.append(`variation-[${index + 1}]-[stock]`, variation.stock);
                  variation.imageFiles.forEach((file) => {
                        formData.append(`variation-[${index + 1}]-[images]`, file);
                  });
            });

            // try {
            //       const res = await createProduct(formData).unwrap();
            //       console.log(res);
            // } catch (err) {
            //       console.log(err?.data?.message || err.error, err?.data?.specificError);
            // }
      };

      const availableCategories = [
            {
                  value: "furniture",
                  label: "Furniture",
            },
            {
                  value: "clothing",
                  label: "Clothing",
            },
            {
                  value: "electronics",
                  label: "Electronics",
            },
            {
                  value: "accessories",
                  label: "Accessories",
            },
      ];

      return (
            <div className="w-full mx-auto my-8">
                  <form onSubmit={handleSubmit} className="max-w-md ml-32">
                        <FieldGroup>
                              <FieldSet>
                                    <FieldLegend className="text-xl!">Create new Product</FieldLegend>

                                    <FieldDescription>
                                          Fill in your product details in the form and publish or save as draft
                                    </FieldDescription>
                                    <FieldGroup>
                                          <Field>
                                                <FieldLabel htmlFor="name">Product Name</FieldLabel>
                                                <Input
                                                      id="name"
                                                      placeholder="Oxford Plain Tee"
                                                      name="name"
                                                      onChange={handleInputChange}
                                                      value={product.name}
                                                      required
                                                />
                                          </Field>
                                          <Field>
                                                <FieldLabel htmlFor="category">Category</FieldLabel>
                                                <Popover>
                                                      <PopoverTrigger asChild>
                                                            <Button
                                                                  variant="outline"
                                                                  role="combobox"
                                                                  aria-expanded={openCategory}
                                                                  className="w-sm justify-between"
                                                            >
                                                                  {product.category
                                                                        ? availableCategories.find(
                                                                                (category) =>
                                                                                      category.value ===
                                                                                      product.category
                                                                          )?.label
                                                                        : "...select category"}
                                                                  <ChevronsUpDown className="opacity-50" />
                                                            </Button>
                                                      </PopoverTrigger>
                                                      <PopoverContent className="w-sm p-0">
                                                            <Command>
                                                                  <CommandInput
                                                                        placeholder="...select category"
                                                                        className="h-9"
                                                                  />
                                                                  <CommandList>
                                                                        <CommandEmpty asChild>
                                                                              <div className="flex flex-col gap-4">
                                                                                    <p>No category found ...</p>
                                                                                    <Button className="max-w-48 mx-auto">
                                                                                          Add this category
                                                                                    </Button>
                                                                              </div>
                                                                        </CommandEmpty>
                                                                        <CommandGroup>
                                                                              {availableCategories.map((category) => (
                                                                                    <CommandItem key={category.label}>
                                                                                          {category.label}
                                                                                          <IconCheck
                                                                                                className={cn(
                                                                                                      "ml-auto",
                                                                                                      category.value ===
                                                                                                            product.category
                                                                                                            ? "opacity-100"
                                                                                                            : "opacity-0"
                                                                                                )}
                                                                                          />
                                                                                    </CommandItem>
                                                                              ))}
                                                                        </CommandGroup>
                                                                  </CommandList>
                                                            </Command>
                                                      </PopoverContent>
                                                </Popover>
                                          </Field>
                                          <Field>
                                                <FieldLabel htmlFor="description">Description</FieldLabel>
                                                <Textarea
                                                      name="description"
                                                      id="description"
                                                      value={product.description}
                                                      onChange={handleInputChange}
                                                      required
                                                />
                                          </Field>
                                          <FieldSeparator />
                                          <FieldGroup>
                                                <FieldTitle className="text-lg">Product variations</FieldTitle>
                                                <FieldDescription>At least one varation is required </FieldDescription>
                                                {product.variations.map((variation, index) => (
                                                      <div key={index}>
                                                            <h3>{`Variation ${index + 1}`}</h3>

                                                            <Field className="mt-6">
                                                                  <FieldLabel htmlFor={`color-${index}`}>
                                                                        {" "}
                                                                        Product color
                                                                  </FieldLabel>
                                                                  <Input
                                                                        type="text"
                                                                        name="color"
                                                                        id={`color-${index}`}
                                                                        value={variation.color}
                                                                        onChange={(e) =>
                                                                              handleVariationChange(index, e)
                                                                        }
                                                                        required
                                                                  />
                                                            </Field>
                                                            <Field className="mt-6">
                                                                  <FieldLabel htmlFor={`hexCode-${index}`}>
                                                                        Color HexCode
                                                                  </FieldLabel>
                                                                  <Input
                                                                        type="color"
                                                                        name="hexCode"
                                                                        id={`hexCode-${index}`}
                                                                        value={variation.hexCode}
                                                                        onChange={(e) =>
                                                                              handleVariationChange(index, e)
                                                                        }
                                                                        className="max-w-16"
                                                                  />
                                                            </Field>
                                                            <Field className="mt-6">
                                                                  <FieldLabel htmlFor="price">Price</FieldLabel>
                                                                  <Input
                                                                        type="number"
                                                                        name="price"
                                                                        id="price"
                                                                        min="0"
                                                                        value={variation.price}
                                                                        onChange={(e) =>
                                                                              handleVariationChange(index, e)
                                                                        }
                                                                        required
                                                                  />
                                                            </Field>

                                                            <Field className="mt-6">
                                                                  <FieldLabel htmlFor={`stock-${index}`}>
                                                                        Stock
                                                                  </FieldLabel>
                                                                  <Input
                                                                        type="number"
                                                                        name="stock"
                                                                        id={`stock-${index}`}
                                                                        min="0"
                                                                        value={variation.stock}
                                                                        onChange={(e) =>
                                                                              handleVariationChange(index, e)
                                                                        }
                                                                        required
                                                                  />
                                                            </Field>

                                                            <Field className="mt-6">
                                                                  <FieldLabel htmlFor={`images-${index}`}>
                                                                        Upload Images
                                                                  </FieldLabel>

                                                                  <Input
                                                                        type="file"
                                                                        name="images"
                                                                        id={`images-${index}`}
                                                                        accept="image/*"
                                                                        multiple
                                                                        onChange={(e) =>
                                                                              handleVariationChange(index, e)
                                                                        }
                                                                  />
                                                                  <div className="max-w-sm">
                                                                        {variation.imagePreviews.map((img, i) => (
                                                                              <img
                                                                                    key={i}
                                                                                    src={img}
                                                                                    alt={`Preview ${i}`}
                                                                              />
                                                                        ))}
                                                                  </div>
                                                                  {product.variations.length > 1 && (
                                                                        <Button
                                                                              variant="destructive"
                                                                              type="button"
                                                                              className="my-4"
                                                                              onClick={() => removeVariation(index)}
                                                                        >
                                                                              Remove Variation
                                                                        </Button>
                                                                  )}
                                                            </Field>
                                                      </div>
                                                ))}
                                          </FieldGroup>
                                          <Button onClick={addVariation} className="my-4">
                                                {" "}
                                                <IconPlus /> Add variation
                                          </Button>

                                          <div className="my-6 flex justify-between items-center">
                                                <Button type="submit">
                                                      <IconFile /> Save as draft
                                                </Button>
                                                <Button type="submit" className="bg-green-700">
                                                      <IconUpload />
                                                      Publish
                                                </Button>
                                          </div>
                                    </FieldGroup>
                              </FieldSet>
                        </FieldGroup>
                  </form>
            </div>
      );
}

export default AddProducts;
