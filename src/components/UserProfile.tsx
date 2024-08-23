"use client";

import { useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const UserProfile = () => {
  const { data: session } = useSession();

  if (!session || !session.user) {
    return <div>No user data</div>;
  }

  return (
    <div className="absolute right-5 top-5">
      <Avatar>
        <AvatarImage src={session.user.image || "/default-avatar.png"} />
        <AvatarFallback>{session.user.name?.charAt(0) || "?"}</AvatarFallback>
      </Avatar>
    </div>
  );
};

export default UserProfile;
