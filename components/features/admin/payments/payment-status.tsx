"use client";

import {
      DropdownMenu,
      DropdownMenuItem,
      DropdownMenuContent,
      DropdownMenuTrigger,
      DropdownMenuSeparator,
      DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import {
      Dialog,
      DialogClose,
      DialogContent,
      DialogDescription,
      DialogFooter,
      DialogHeader,
      DialogTrigger,
      DialogTitle,
      DialogOverlay,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { FieldGroup, Field, FieldLabel } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { IconCaretDownFilled } from "@tabler/icons-react";
import { useState } from "react";

export const schema = z.object({
      id: z.string(),
      order: z.string(),
      createdAt: z.string(), //ZodISODateTime
      type: z.string(),
      amount: z.string(),
      status: z.string(),
      email: z.email(),
      method: z.string(),
});

const payments = ["paid", "unpaid", "pending"];

export function PaymentStatus({ item }: { item: z.infer<typeof schema> }) {
      const [showDialog, setShowDialog] = useState(false);
      const [selectedOption, setSelectedOption] = useState(item.status);
      const [newOption, setNewOption] = useState("");

      const handleShowDialog = (option: string) => {
            setNewOption(option);
            setShowDialog(true);
      };

      const handleOptions = (option: string) => {
            console.log(`Option set to ${option}`);
            setSelectedOption(option);
      };

      return (
            <div className="flex items-center gap-8">
                  <p>Payment status:</p>
                  {
                        <div>
                              <DropdownMenu modal={false}>
                                    <DropdownMenuTrigger className="flex items-center gap-2">
                                          <Badge variant={selectedOption} size="xl" className="rounded-md w-full">
                                                {selectedOption}
                                                <IconCaretDownFilled />
                                          </Badge>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                          <DropdownMenuLabel>Update status</DropdownMenuLabel>
                                          <DropdownMenuSeparator />
                                          {payments
                                                .filter((payment) => payment !== selectedOption)
                                                .map((option) => (
                                                      <DropdownMenuItem
                                                            key={option}
                                                            onSelect={() => handleShowDialog(option)}
                                                      >
                                                            {option}
                                                      </DropdownMenuItem>
                                                ))}
                                    </DropdownMenuContent>
                              </DropdownMenu>
                              <Dialog open={showDialog} onOpenChange={setShowDialog}>
                                    <DialogContent className="sm:max-w-[425px]">
                                          <DialogHeader>
                                                <DialogTitle>Confirm Status Change to {newOption}</DialogTitle>
                                                <DialogDescription>
                                                      This action will charge the payment gateway and send a &apos;
                                                      {newOption}&apos; notification email to the customer.
                                                </DialogDescription>
                                          </DialogHeader>
                                          <FieldGroup className="pb-3">
                                                <Field>
                                                      <FieldLabel htmlFor="log">
                                                            Reason for change(Optional):
                                                      </FieldLabel>
                                                      <Input
                                                            id="log"
                                                            name="log"
                                                            placeholder="Changes were made because ..."
                                                      />
                                                </Field>
                                          </FieldGroup>
                                          <DialogFooter>
                                                <DialogClose asChild>
                                                      <Button variant="outline">Cancel</Button>
                                                </DialogClose>
                                                <DialogClose asChild>
                                                      <Button type="submit" onClick={() => handleOptions(newOption)}>
                                                            Confirm and Proceed
                                                      </Button>
                                                </DialogClose>
                                          </DialogFooter>
                                    </DialogContent>
                              </Dialog>
                        </div>
                  }
            </div>
      );
}
