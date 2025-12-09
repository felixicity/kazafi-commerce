// emails/VerificationEmail.jsx
import * as React from "react";
import { Html, Button, Text, Container, Tailwind } from "@react-email/components";

// Define the expected properties for your template
interface VerificationEmailProps {
      userName: string;
      verificationLink: string;
}

export const VerificationEmail = ({ userName, verificationLink }: VerificationEmailProps) => {
      return (
            <Tailwind>
                  <Html lang="en">
                        <Container className="font-sans p-20">
                              <Text className="text-lg font-semibold">Hello, {userName}!</Text>
                              <Text className=" leading-6 ">
                                    Thanks for signing up. Please click the button below to verify your email address.
                              </Text>

                              {/* The Button component handles the complex, cross-client HTML for links */}
                              <Button
                                    href={verificationLink}
                                    className="bg-[#5a31f4] text-white py-3 px-5 decoration-0 inline-block"
                              >
                                    Verify My Account
                              </Button>
                              <Text className="mt-5 font-sm text-[#666]">This link expires in 24 hours.</Text>
                        </Container>
                  </Html>
            </Tailwind>
      );
};

export default VerificationEmail;
