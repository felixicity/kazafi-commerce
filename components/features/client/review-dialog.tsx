"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogOverlay, DialogPortal } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { IconCamera, IconStar } from "@tabler/icons-react";
import { addProductReview } from "@/lib/mutations/review";
// import { CustomerOrder, OrderItem, ReviewData } from "@/lib/types";

// Schema for validation
const formSchema = z.object({
      rating: z.number().min(1, "Please select a rating").max(5),
      comment: z.string().min(10, "Comment must be at least 10 characters.").optional(),
      image: z.any().optional(),
});

export function ReviewDialog({
      showReviewDialog,
      setShowReviewDialog,
      productId,
      orderId,
}: {
      showReviewDialog: boolean;
      setShowReviewDialog: (value: boolean) => void;
      productId: string;
      orderId: string | undefined;
}) {
      const [preview, setPreview] = useState<string | null>(null);

      const { mutate, isSuccess } = useMutation({
            mutationKey: ["reviews"],
            mutationFn: addProductReview,
      });

      const form = useForm<z.infer<typeof formSchema>>({
            resolver: zodResolver(formSchema),
            defaultValues: { rating: 0, comment: "" },
      });

      if (isSuccess) {
            toast.success("Review collected successfully. Thank you!!");
      }

      const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const file = e.target.files?.[0];
            if (file) {
                  const reader = new FileReader();
                  reader.onloadend = () => setPreview(reader.result as string);
                  reader.readAsDataURL(file);
                  form.setValue("image", file);
            }
      };

      async function onSubmit(values: z.infer<typeof formSchema>) {
            const formData = new FormData();

            // Append text fields
            formData.append("rating", values.rating.toString());
            formData.append("comment", values.comment || "");

            // Append the file
            if (values.image) {
                  formData.append("image", values.image);
            }

            // Now pass this formData to your mutation
            mutate({ formData, orderId, productId });

            setShowReviewDialog(false);
            form.reset();
            setPreview(null);
      }

      return (
            <Dialog open={showReviewDialog} onOpenChange={setShowReviewDialog}>
                  <DialogPortal>
                        <DialogOverlay className="bg-transparent backdrop-blur-none" />
                        <DialogContent className="sm:max-w-[425px]">
                              <DialogHeader>
                                    <DialogTitle>Share your experience with this product</DialogTitle>
                              </DialogHeader>

                              <Form {...form}>
                                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                          {/* Star Rating Field */}
                                          <FormField
                                                control={form.control}
                                                name="rating"
                                                render={({ field }) => (
                                                      <FormItem>
                                                            <FormLabel>Rating</FormLabel>
                                                            <FormControl>
                                                                  <div className="flex gap-1">
                                                                        {[1, 2, 3, 4, 5].map((star) => (
                                                                              <IconStar
                                                                                    key={star}
                                                                                    className={`w-8 h-8 cursor-pointer transition-colors ${
                                                                                          star <= field.value
                                                                                                ? "fill-yellow-400 text-yellow-400"
                                                                                                : "text-gray-300"
                                                                                    }`}
                                                                                    onClick={() => field.onChange(star)}
                                                                              />
                                                                        ))}
                                                                  </div>
                                                            </FormControl>
                                                            <FormMessage />
                                                      </FormItem>
                                                )}
                                          />

                                          {/* Comment Field */}
                                          <FormField
                                                control={form.control}
                                                name="comment"
                                                render={({ field }) => (
                                                      <FormItem>
                                                            <FormLabel>Your Review</FormLabel>
                                                            <FormControl>
                                                                  <Textarea
                                                                        placeholder="What did you like or dislike?"
                                                                        {...field}
                                                                  />
                                                            </FormControl>
                                                            <FormMessage />
                                                      </FormItem>
                                                )}
                                          />

                                          {/* Photo Upload Field */}
                                          <div className="space-y-2">
                                                <FormLabel>Add a Photo</FormLabel>
                                                <div className="flex items-center gap-4">
                                                      {!preview ? (
                                                            <label className="flex flex-col items-center justify-center w-24 h-24 border-2 border-dashed rounded-lg cursor-pointer hover:bg-accent">
                                                                  <IconCamera className="w-6 h-6 text-muted-foreground" />
                                                                  <Input
                                                                        type="file"
                                                                        className="hidden"
                                                                        accept="image/*"
                                                                        onChange={handleImageChange}
                                                                  />
                                                            </label>
                                                      ) : (
                                                            <div className="relative w-24 h-24">
                                                                  <img
                                                                        src={preview}
                                                                        alt="Preview"
                                                                        className="object-cover w-full h-full rounded-lg"
                                                                  />
                                                                  <button
                                                                        onClick={() => setPreview(null)}
                                                                        className="absolute -top-2 -right-2 bg-destructive text-white rounded-full p-1"
                                                                  >
                                                                        <X className="w-3 h-3" />
                                                                  </button>
                                                            </div>
                                                      )}
                                                </div>
                                          </div>

                                          <Button type="submit" className="w-full">
                                                Submit Review
                                          </Button>
                                    </form>
                              </Form>
                        </DialogContent>
                  </DialogPortal>
            </Dialog>
      );
}
