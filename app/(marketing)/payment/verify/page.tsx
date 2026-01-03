"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { checkPaymentStatus } from "@/lib/mutations/payment";
import { Spinner } from "@/components/ui/spinner";

export default function VerifyPayment() {
      const searchParams = useSearchParams();
      const router = useRouter();
      const reference = searchParams.get("reference");

      const { data } = useQuery({
            queryKey: ["paymentStatus", reference],
            queryFn: () => checkPaymentStatus(reference),

            // Poll every 2 seconds until the status in your DB is "successful"
            refetchInterval: (query) => (query.state.data?.status === "successful" ? false : 2000),
            enabled: !!reference,
      });
      // If the webhook updated the DB to 'completed', move to Thank You page
      console.log("Payment verification data:", data);

      if (data?.status === "successful") {
            router.push("/checkout/thank-you");
      }

      return (
            <div className="flex flex-col items-center justify-center h-screen">
                  <h1 className="text-2xl font-bold">Verifying Payment...</h1>
                  <p>We are processing your payment.</p>
                  <Spinner className="mt-4" />
            </div>
      );
}
