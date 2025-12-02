import MultiStepSignup from "@/components/features/signup-form-multi";

export default function SignUp() {
      return (
            <div className="flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
                  <div className="flex w-full max-w-sm flex-col gap-6">
                        <MultiStepSignup />
                  </div>
            </div>
      );
}
