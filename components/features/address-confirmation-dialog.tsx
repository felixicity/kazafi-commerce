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
      savedFullAddress,
      handleConfirmSavedAddress,
}: {
      addressConfirmOpen: boolean;
      setAddressConfirmOpen: (value: boolean) => void;
      savedFullAddress: string;
      handleConfirmSavedAddress: () => void;
}) => {
      return (
            <AlertDialog open={addressConfirmOpen} onOpenChange={setAddressConfirmOpen}>
                  <AlertDialogContent>
                        <AlertDialogHeader>
                              <AlertDialogTitle>Use your saved address?</AlertDialogTitle>
                              <AlertDialogDescription>{savedFullAddress}</AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                              <AlertDialogCancel>Change</AlertDialogCancel>
                              <AlertDialogAction onClick={handleConfirmSavedAddress}>Continue</AlertDialogAction>
                        </AlertDialogFooter>
                  </AlertDialogContent>
            </AlertDialog>
      );
};
