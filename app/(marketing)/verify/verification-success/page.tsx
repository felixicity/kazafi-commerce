import Link from "next/link";
import { BadgeCheckIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function VerificationSuccess() {
      return (
            <div className="h-screen grid place-content-content my-auto p-8">
                  <div className="flex flex-col items-center justify-center gap-4">
                        <BadgeCheckIcon size="50" className="text-blue-600" />
                        <h1 className="text-lg font-semibold">Verification Successful! 🎉</h1>
                        <p className="text-sm text-gray-800"> Thank you for choosing us</p>
                        <Button asChild>
                              <Link href="/">Back to Homepage</Link>
                        </Button>
                  </div>
            </div>
      );
}
