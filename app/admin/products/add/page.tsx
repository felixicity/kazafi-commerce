"use client";

import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
      Combobox,
      ComboboxTrigger,
      ComboboxContent,
      ComboboxList,
      ComboboxEmpty,
      ComboboxInput,
      ComboboxItem,
      ComboboxValue,
} from "@/components/ui/combobox";
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
import { IconFile, IconPlus, IconUpload } from "@tabler/icons-react";
import { createProduct } from "@/lib/mutations/product";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";

interface ProductVariation {
      color: string;
      hexCode: string;
      price: string | number;
      stock: string | number;
      imageFiles: File[]; // This prevents the 'never[]' error
      imagePreviews: string[];
}

interface ProductState {
      name: string;
      category: string;
      description: string;
      variations: ProductVariation[];
}

function AddProducts() {
      const initialProduct = {
            name: "",
            category: "",
            description: "",
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
      };
      const [product, setProduct] = useState<ProductState>(initialProduct);

      const {
            mutate: createProductMutation,
            isPending,
            isSuccess,
            isError,
      } = useMutation({
            mutationKey: ["products"],
            mutationFn: createProduct,
            onSuccess: () => {
                  setProduct(initialProduct);
            },
      });

      useEffect(() => {
            if (isPending) {
                  toast.loading("...creating product");
            }
            if (isSuccess) {
                  toast.success("product created successfully... yay!!! 🎉");
            }
            if (isError) {
                  toast.error("An error occurred while creating a product");
            }
      }, [isSuccess, isPending, isError]);

      // 1. Standard Input Event (Text, Select, etc.)
      const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
            const { name, value } = e.target;
            setProduct((prev) => ({ ...prev, [name]: value }));
      };

      // 2. Variation Change (Includes File handling)
      const handleVariationChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
            const { name, value, files } = e.target;
            const updatedVariations = [...product.variations];

            const fieldName = name as keyof ProductVariation;

            if (name === "images" && files) {
                  const imageFiles = Array.from(files);
                  const previews = imageFiles.map((file) => URL.createObjectURL(file));
                  updatedVariations[index].imageFiles = imageFiles;
                  updatedVariations[index].imagePreviews = previews;
            } else {
                  // Use 'as any' here only if your variation object is strictly typed
                  // but the 'name' string is dynamic.
                  if (fieldName !== "imageFiles" && fieldName !== "imagePreviews") {
                        updatedVariations[index][fieldName] = value;
                  }
            }

            setProduct((prev) => ({ ...prev, variations: updatedVariations }));
      };

      // 3. Form Submission Event
      const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            const formData = new FormData();

            formData.append("name", product.name);
            formData.append("category", product.category);
            formData.append("description", product.description);

            product.variations.forEach((variation, index) => {
                  formData.append(`variation-[${index + 1}]-[color]`, variation.color);
                  formData.append(`variation-[${index + 1}]-[hexCode]`, variation.hexCode);
                  formData.append(`variation-[${index + 1}]-[price]`, variation.price.toString());
                  formData.append(`variation-[${index + 1}]-[stock]`, variation.stock.toString());

                  variation.imageFiles.forEach((file) => {
                        formData.append(`variation-[${index + 1}]-[images]`, file);
                  });
            });

            createProductMutation(formData);
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

      const removeVariation = (index: number) => {
            if (product.variations.length === 1) return;
            const updated = product.variations.filter((_, i) => i !== index);
            setProduct((prev) => ({ ...prev, variations: updated }));
      };

      const availableCategories = ["sofas", "chairs", "tables", "wardrobes", "consoles"];

      return (
            <div className="flex px-8 lg:px-12 justify-center lg:justify-start my-8">
                  <form onSubmit={handleSubmit} className=" w-full max-w-md">
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
                                                <Combobox
                                                      items={availableCategories}
                                                      value={product.category} // 1. Bind the value to state
                                                      onValueChange={(val) => {
                                                            const newValue = val ?? "";

                                                            // Only update if the value actually changed
                                                            if (newValue !== product.category) {
                                                                  setProduct((prev) => ({
                                                                        ...prev,
                                                                        category: newValue,
                                                                  }));
                                                            }
                                                      }}
                                                >
                                                      <ComboboxTrigger
                                                            render={
                                                                  <Button
                                                                        variant="outline"
                                                                        className="w-64 justify-between font-normal"
                                                                  >
                                                                        <ComboboxValue />
                                                                  </Button>
                                                            }
                                                      />
                                                      <ComboboxContent>
                                                            <ComboboxInput showTrigger={false} placeholder="Search" />
                                                            <ComboboxEmpty>No items found.</ComboboxEmpty>
                                                            <ComboboxList>
                                                                  {(item) => (
                                                                        <ComboboxItem key={item} value={item}>
                                                                              {item}
                                                                        </ComboboxItem>
                                                                  )}
                                                            </ComboboxList>
                                                      </ComboboxContent>
                                                </Combobox>
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
                                                                              <Image
                                                                                    key={i}
                                                                                    src={img}
                                                                                    alt={`Preview ${i}`}
                                                                                    width={100}
                                                                                    height={100}
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
                                                <Button variant="outline" type="submit">
                                                      <IconFile /> Save as draft
                                                </Button>
                                                <Button type="submit" disabled={isPending} className="bg-green-700">
                                                      {isPending ? (
                                                            <>
                                                                  <Spinner /> Publishing...
                                                            </>
                                                      ) : (
                                                            <>
                                                                  <IconUpload />
                                                                  Publish
                                                            </>
                                                      )}
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
