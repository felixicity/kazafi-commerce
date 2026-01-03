import Link from "next/link";
import { Button } from "@/components/ui/button";

const orderThankyouPage = () => {
      return (
            <div className="grid place-items-center mt-38">
                  <h1 className="font-semibold leading-tight text-2xl mb-4">Thank you for patronising us!</h1>

                  <p className="text-gray-500 text-pretty mb-16">
                        We make efforts to ensure that you get the right quality.
                  </p>

                  <div className="flex items-center gap-8">
                        <Button asChild variant="outline">
                              <Link href="/shop">Continue shopping</Link>
                        </Button>
                        <Button asChild>
                              <Link href="/">Return back to homepage</Link>
                        </Button>
                  </div>
            </div>
      );
};

export default orderThankyouPage;
