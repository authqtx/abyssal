"use client";

import React, { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";

interface AuthPopupProps {
  initialType: "login" | "signup";
  onClose: () => void;
}

const AuthPopup: React.FC<AuthPopupProps> = ({ initialType, onClose }) => {
  const [type, setType] = useState<"login" | "signup">(initialType);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [userpfp, setuserpfp] = useState("/media/default-avatar.png");
  const popupRef = useRef<HTMLDivElement>(null);
  const supabase = createClientComponentClient();

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (error) {
        console.error("Error fetching session:", error.message);
        return;
      }

      if (session?.user) {
        console.log("User already logged in:", session.user);
        localStorage.setItem(
          "user_pfp",
          session?.user?.user_metadata?.avatar_url,
        );
        onClose();
      }
    };

    checkSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        console.log("User logged in:", session.user);
        onClose();
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [onClose, supabase.auth]);

  const toggleType = () => {
    setType((prevType) => (prevType === "signup" ? "login" : "signup"));
    setError(null);
  };

  const signInWithGithub = async () => {
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "github",
    });

    if (error) {
      console.error("GitHub sign-in error:", error.message);
      setError("Failed to sign in with GitHub. Please try again.");
    }

    setLoading(false);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const name = formData.get("name") as string;

    try {
      if (type === "signup") {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              name,
            },
          },
        });

        if (error) {
          throw error;
        }

        // Optional: You can store additional user details in a separate table
        const { error: profileError } = await supabase.from("profiles").insert({
          id: data.user?.id, // Reference to the user's auth ID
          name,
        });

        if (profileError) {
          throw profileError;
        }

        alert(
          "Signup successful! Please check your email to confirm your account.",
        );
        onClose();
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          throw error;
        }

        onClose();
      }
    } catch (error: any) {
      console.error(
        `${type === "signup" ? "Signup" : "Login"} error:`,
        error.message,
      );
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50 p-4">
      <Card className="w-full max-w-md mx-auto" ref={popupRef}>
        <CardHeader className="relative">
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-2"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
          <CardTitle className="text-xl text-center">
            {type === "signup" ? "Sign Up" : "Log In"}
          </CardTitle>
          <CardDescription className="text-center">
            {type === "signup"
              ? "Create a new account"
              : "Sign in to your account"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="text-red-500 text-sm mb-4 text-center">{error}</div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            {type === "signup" && (
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Your name"
                  required={type === "signup"}
                />
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Your password"
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading
                ? "Processing..."
                : type === "signup"
                  ? "Sign Up"
                  : "Log In"}
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={signInWithGithub}
              disabled={loading}
            >
              {loading ? "Processing..." : "Continue with GitHub"}
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            {type === "signup" ? (
              <>
                Already have an account?{" "}
                <button
                  type="button"
                  className="underline text-blue-600"
                  onClick={toggleType}
                >
                  Log in
                </button>
              </>
            ) : (
              <>
                Don't have an account?{" "}
                <button
                  type="button"
                  className="underline text-blue-600"
                  onClick={toggleType}
                >
                  Sign up
                </button>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthPopup;
