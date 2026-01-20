import {
      AlertDialog,
      AlertDialogAction,
      AlertDialogCancel,
      AlertDialogContent,
      AlertDialogDescription,
      AlertDialogFooter,
      AlertDialogHeader,
      AlertDialogTitle,
      AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export const AddressConfirmationDialog = ({
      addressConfirmOpen,
      setAddressConfirmOpen,
      setDefaultAddress,
      fullAddress,
}: {
      addressConfirmOpen: boolean;
      setAddressConfirmOpen: (value: boolean) => void;
      setDefaultAddress: (value: boolean) => void;
      fullAddress: string;
}) => {
      return (
            <AlertDialog open={addressConfirmOpen} onOpenChange={setAddressConfirmOpen}>
                  <AlertDialogContent>
                        <AlertDialogHeader>
                              <AlertDialogTitle>Use your saved address?</AlertDialogTitle>
                              <AlertDialogDescription>{fullAddress}</AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                              <AlertDialogCancel>Change</AlertDialogCancel>
                              <AlertDialogAction onClick={() => setDefaultAddress(true)}>Continue</AlertDialogAction>
                        </AlertDialogFooter>
                  </AlertDialogContent>
            </AlertDialog>
      );
};
