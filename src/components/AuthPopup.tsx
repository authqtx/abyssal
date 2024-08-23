import React, { useRef, useEffect, useCallback, useState } from "react";
import Link from "next/link";
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
import { X } from "lucide-react"; // Import X icon from lucide-react

interface AuthPopupProps {
  initialType: "login" | "signup";
  onClose: () => void;
}

const AuthPopup: React.FC<AuthPopupProps> = ({ initialType, onClose }) => {
  const [type, setType] = useState(initialType);
  const popupRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    },
    [onClose],
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  const toggleType = () => {
    setType(type === "signup" ? "login" : "signup");
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50 p-4">
      <Card className="w-full max-w-lg mx-auto" ref={popupRef}>
        <CardHeader className="relative -ml-16">
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-2"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
          <CardTitle className="text-xl">
            {type === "signup" ? "Sign Up" : "Log In"}
          </CardTitle>
          <CardDescription className="w-max-[20rem] w-min-auto">
            {type === "signup"
              ? "Enter your information to register"
              : "Enter your infomation to log in"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {type === "signup" && (
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="first-name">First name</Label>
                  <Input id="first-name" placeholder="Max" required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="last-name">Last name</Label>
                  <Input id="last-name" placeholder="Robinson" required />
                </div>
              </div>
            )}
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" />
            </div>
            <Button type="submit" className="w-full">
              {type === "signup" ? "Create an account" : "Log In"}
            </Button>
            <Button variant="outline" className="w-full">
              Continue with GitHub
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            {type === "signup" ? (
              <>
                Already have an account?{" "}
                <Link href="#" className="underline" onClick={toggleType}>
                  Log in
                </Link>
              </>
            ) : (
              <>
                Don't have an account?{" "}
                <Link href="#" className="underline" onClick={toggleType}>
                  Sign up
                </Link>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthPopup;
