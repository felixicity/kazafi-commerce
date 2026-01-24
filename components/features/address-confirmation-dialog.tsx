// components/features/address-confirmation-dialog.tsx
import {
      Dialog,
      DialogContent,
      DialogHeader,
      DialogTitle,
      DialogDescription,
      DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface Props {
      isOpen: boolean;
      address: string;
      onConfirm: () => void;
      onDismiss: () => void;
}

export function AddressConfirmationDialog({ isOpen, address, onConfirm, onDismiss }: Props) {
      return (
            <Dialog open={isOpen} onOpenChange={(open) => !open && onDismiss()}>
                  <DialogContent>
                        <DialogHeader className="py-4">
                              <DialogTitle>Deliver to your default address?</DialogTitle>
                              <DialogDescription className="pt-4">
                                    <span className="font-semibold text-black">{address}</span>
                              </DialogDescription>
                        </DialogHeader>
                        <DialogFooter className="flex-col sm:flex-row gap-2">
                              <Button variant="outline" onClick={onDismiss} className="flex-1">
                                    Change Address
                              </Button>
                              <Button onClick={onConfirm} className="flex-1 bg-black text-white">
                                    Use this address
                              </Button>
                        </DialogFooter>
                  </DialogContent>
            </Dialog>
      );
}
