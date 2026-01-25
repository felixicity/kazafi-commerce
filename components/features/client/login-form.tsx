"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createLoginMutation } from "@/lib/mutations/users";
import { Spinner } from "@/components/ui/spinner";
import { Item, ItemContent, ItemMedia, ItemTitle } from "@/components/ui/item";
import { BadgeCheckIcon, TriangleAlertIcon, EyeIcon, EyeClosed } from "lucide-react";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";

export function LoginForm() {
      const queryClient = useQueryClient();
      const [password, setPassword] = useState("");
      const [email, setEmail] = useState("");
      const [successMessage, setSuccessMessage] = useState<string>("");
      const [showPassword, setShowPassword] = useState(false);

      const router = useRouter();

      const { mutate, isError, isSuccess, isPending, error } = useMutation({
            mutationFn: createLoginMutation,
            onSuccess: (data) => {
                  queryClient.invalidateQueries({ queryKey: ["user"] });

                  // Clear the form fields upon success
                  setPassword("");
                  setEmail("");
                  setSuccessMessage(data.message);
                  setTimeout(() => setSuccessMessage(""), 2000);
                  router.push("/");
            },
      });

      const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            const newLoginData = Object.fromEntries(formData.entries());

            mutate(newLoginData as { email: string; password: string });
      };
      return (
            <div className="flex flex-col gap-4">
                  <Card>
                        <CardHeader>
                              <CardTitle className="text-lg text-center">Login to your account</CardTitle>
                              <CardDescription className="text-sm text-center">
                                    Enter your email below to login to your account
                              </CardDescription>
                        </CardHeader>
                        <CardContent>
                              <form onSubmit={(e) => handleSubmit(e)}>
                                    <FieldGroup>
                                          <Field>
                                                <FieldLabel htmlFor="email">Email</FieldLabel>
                                                <Input
                                                      id="email"
                                                      name="email"
                                                      type="email"
                                                      value={email}
                                                      onChange={(e) => setEmail(e.currentTarget.value)}
                                                      placeholder="m@example.com"
                                                      required
                                                />
                                          </Field>
                                          <Field>
                                                <div className="flex items-center">
                                                      <FieldLabel htmlFor="password">Password</FieldLabel>
                                                      <a
                                                            href="#"
                                                            className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                                                      >
                                                            Forgot your password?
                                                      </a>
                                                </div>
                                                <InputGroup>
                                                      <InputGroupInput
                                                            id="password"
                                                            type={showPassword ? "text" : "password"}
                                                            name="password"
                                                            onChange={(e) => setPassword(e.currentTarget.value)}
                                                            value={password}
                                                            required
                                                      />
                                                      <InputGroupAddon
                                                            align="inline-end"
                                                            className="cursor-pointer"
                                                            onClick={() => setShowPassword(!showPassword)}
                                                      >
                                                            {showPassword ? <EyeIcon /> : <EyeClosed />}
                                                      </InputGroupAddon>
                                                </InputGroup>
                                          </Field>
                                          {isError && (
                                                <Item
                                                      variant="outline"
                                                      size="sm"
                                                      className="bg-red-200 text-red-700"
                                                      asChild
                                                >
                                                      <a href="#">
                                                            <ItemMedia>
                                                                  <TriangleAlertIcon className="size-5" />
                                                            </ItemMedia>
                                                            <ItemContent>
                                                                  <ItemTitle>{error.message}</ItemTitle>
                                                            </ItemContent>
                                                      </a>
                                                </Item>
                                          )}
                                          {isSuccess && (
                                                <Item
                                                      variant="outline"
                                                      size="sm"
                                                      className="bg-green-200 text-green-800 "
                                                      asChild
                                                >
                                                      <a href="#">
                                                            <ItemMedia>
                                                                  <BadgeCheckIcon className="size-5" />
                                                            </ItemMedia>
                                                            <ItemContent>
                                                                  <ItemTitle>{successMessage}</ItemTitle>
                                                            </ItemContent>
                                                      </a>
                                                </Item>
                                          )}
                                          <Field className="gap-7">
                                                <Button type="submit">
                                                      {isPending ? (
                                                            <>
                                                                  <Spinner /> Logging in...
                                                            </>
                                                      ) : (
                                                            "Login"
                                                      )}
                                                </Button>

                                                <Button
                                                      variant="outline"
                                                      type="button"
                                                      className="flex items-center justify-center gap-2"
                                                >
                                                      <Image
                                                            src="/google_logo.png"
                                                            height={20}
                                                            width={20}
                                                            alt="google logo"
                                                      />
                                                      <span>Login with Google</span>
                                                </Button>
                                                <div className="flex items-center justify-center gap-2 text-sm ">
                                                      <span>Don&apos;t have an account? </span>
                                                      <Link href="/signup" className="underline text-sm">
                                                            Create an account
                                                      </Link>
                                                </div>
                                          </Field>
                                    </FieldGroup>
                              </form>
                        </CardContent>
                  </Card>
            </div>
      );
}
