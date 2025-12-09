import { IconBrandGmail } from "@tabler/icons-react";

export default function VerifyUserMessage() {
      return (
            <div className="h-screen grid place-content-content my-auto p-8">
                  <div className="flex flex-col gap-4 items-center justify-center">
                        <h1 className="text-lg font-semibold">
                              Registration successful! Please check your email to verify your account.
                        </h1>
                        <IconBrandGmail size="48" className="text-orange-600" />
                  </div>
            </div>
      );
}
