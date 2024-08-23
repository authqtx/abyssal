import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface UserProfileProps {
  src?: string; // URL for the avatar image
  fallbackText?: string; // Text to show if the image fails to load
  className?: string; // Additional classes for styling
}

const UserProfile: React.FC<UserProfileProps> = ({
  src = "/media/default-avatar.png",
  fallbackText = "Auth",
  className = "",
}) => {
  return (
    <div className={`absolute right-5 top-5 ${className}`}>
      <Avatar>
        <AvatarImage src={src} />
        <AvatarFallback>{fallbackText}</AvatarFallback>
      </Avatar>
    </div>
  );
};

export default UserProfile;
