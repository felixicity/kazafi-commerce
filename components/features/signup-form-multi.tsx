"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function MultiStepSignup() {
      const [step, setStep] = useState(1);
      const [direction, setDirection] = useState(1); // Controls animation direction

      // Mock form state
      const [formData, setFormData] = useState({
            email: "",
            password: "",
            name: "",
      });

      const handleNext = () => {
            setDirection(1);
            setStep((prev) => prev + 1);
      };

      const handleBack = () => {
            setDirection(-1);
            setStep((prev) => prev - 1);
      };

      // Animation variants for sliding effect
      const variants = {
            enter: (direction: number) => ({
                  x: direction > 0 ? 50 : -50,
                  opacity: 0,
            }),
            center: {
                  x: 0,
                  opacity: 1,
            },
            exit: (direction: number) => ({
                  x: direction < 0 ? 50 : -50,
                  opacity: 0,
            }),
      };

      return (
            <div className="flex items-center justify-center min-h-[400px]">
                  <Card className="w-[380px] overflow-hidden">
                        <CardHeader>
                              <CardTitle>
                                    {step === 1 && "Create Account"}
                                    {step === 2 && "Personal Details"}
                                    {step === 3 && "Review & Finish"}
                              </CardTitle>
                              <CardDescription>Step {step} of 3</CardDescription>
                        </CardHeader>

                        <CardContent>
                              {/* AnimatePresence enables exit animations */}
                              <AnimatePresence mode="wait" custom={direction}>
                                    <motion.div
                                          key={step}
                                          custom={direction}
                                          variants={variants}
                                          initial="enter"
                                          animate="center"
                                          exit="exit"
                                          transition={{ duration: 0.2 }}
                                          className="space-y-4"
                                    >
                                          {/* STEP 1: CREDENTIALS */}
                                          {step === 1 && (
                                                <>
                                                      <div className="space-y-2">
                                                            <Label htmlFor="email" className="text-gray-700 text-sm">
                                                                  Email
                                                            </Label>
                                                            <Input
                                                                  id="email"
                                                                  placeholder="hello@example.com"
                                                                  value={formData.email}
                                                                  onChange={(e) =>
                                                                        setFormData({
                                                                              ...formData,
                                                                              email: e.target.value,
                                                                        })
                                                                  }
                                                            />
                                                      </div>
                                                </>
                                          )}

                                          {/* STEP 2: PROFILE */}
                                          {step === 2 && (
                                                <>
                                                      <div className="space-y-2">
                                                            <Label htmlFor="name" className="text-gray-700 text-sm">
                                                                  Full Name
                                                            </Label>
                                                            <Input
                                                                  id="name"
                                                                  placeholder="John Doe"
                                                                  value={formData.name}
                                                                  onChange={(e) =>
                                                                        setFormData({
                                                                              ...formData,
                                                                              name: e.target.value,
                                                                        })
                                                                  }
                                                            />
                                                      </div>
                                                      <div className="space-y-2">
                                                            <Label htmlFor="password" className="text-gray-700 text-sm">
                                                                  Password
                                                            </Label>
                                                            <Input
                                                                  id="password"
                                                                  type="password"
                                                                  value={formData.password}
                                                                  onChange={(e) =>
                                                                        setFormData({
                                                                              ...formData,
                                                                              password: e.target.value,
                                                                        })
                                                                  }
                                                            />
                                                      </div>
                                                </>
                                          )}

                                          {/* STEP 3: CONFIRMATION */}
                                          {step === 3 && (
                                                <div className="flex flex-col items-center justify-center space-y-4 py-4 text-center">
                                                      <div className="rounded-full bg-green-100 p-3">
                                                            <CheckCircle2 className="h-10 w-10 text-green-600" />
                                                      </div>
                                                      <div className="space-y-1">
                                                            <h3 className="font-semibold">All set!</h3>
                                                            <p className="text-sm text-muted-foreground">
                                                                  Click below to create your account for{" "}
                                                                  <span className="text-foreground font-medium">
                                                                        {formData.email}
                                                                  </span>
                                                                  .
                                                            </p>
                                                      </div>
                                                </div>
                                          )}
                                    </motion.div>
                              </AnimatePresence>
                        </CardContent>

                        <CardFooter className="flex flex-col mt-8">
                              <div className={step > 1 ? "flex justify-between w-full" : "flex justify-end w-full"}>
                                    {step > 1 && (
                                          <Button variant="ghost" onClick={handleBack}>
                                                <ArrowLeft className="mr-2 h-4 w-4" /> Back
                                          </Button>
                                    )}

                                    {step < 3 ? (
                                          <Button onClick={handleNext}>
                                                Continue <ArrowRight className="ml-2 h-4 w-4" />
                                          </Button>
                                    ) : (
                                          <Button className="bg-green-600 hover:bg-green-700">Complete Sign Up</Button>
                                    )}
                              </div>

                              {step === 1 && (
                                    <div className="mt-8 w-full">
                                          <div className="relative flex items-center py-2">
                                                <div className="grow border-t border-gray-200"></div>
                                                <span className="shrink-0 mx-4 text-xs text-gray-400">OR</span>
                                                <div className="grow border-t border-gray-200"></div>
                                          </div>
                                          <Button
                                                variant="outline"
                                                type="button"
                                                className="flex items-center justify-center gap-2 mt-4 w-full"
                                          >
                                                <Image
                                                      src="/google_logo.png"
                                                      height={20}
                                                      width={20}
                                                      alt="google logo"
                                                />
                                                <span>Signup with Google</span>
                                          </Button>
                                    </div>
                              )}
                        </CardFooter>
                  </Card>
            </div>
      );
}
