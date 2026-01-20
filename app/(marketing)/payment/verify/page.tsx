"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { checkPaymentStatus } from "@/lib/mutations/payment";
import { Spinner } from "@/components/ui/spinner";
import { Suspense } from "react"; // 1. Import Suspense

// 2. Move your logic into a separate internal component
function VerifyPaymentContent() {
      const searchParams = useSearchParams();
      const router = useRouter();
      const reference = searchParams.get("reference");

      const { data } = useQuery({
            queryKey: ["paymentStatus", reference],
            queryFn: () => checkPaymentStatus(reference as string),
            refetchInterval: (query) => (query.state.data?.status === "successful" ? false : 2000),
            enabled: !!reference,
      });

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

// 3. Export the page wrapped in Suspense
export default function VerifyPayment() {
      return (
            <Suspense
                  fallback={
                        <div className="flex h-screen items-center justify-center">
                              <Spinner />
                        </div>
                  }
            >
                  <VerifyPaymentContent />
            </Suspense>
      );
}
