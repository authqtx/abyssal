import React from "react";
import Link from "next/link";

interface IconLinkProps {
  href: string;
  Icon: React.FC<{ size: number; color: string; stroke: string }>;
  label: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
}

const IconLink: React.FC<IconLinkProps> = ({ href, Icon, label, onClick }) => (
  <Link href={href} className="block" onClick={onClick} aria-label={label}>
    <div className="flex items-center cursor-pointer hover:bg-[#252525] p-2 rounded transition-all duration-300 ease-in-out">
      <Icon size={20} color="#ffffff" stroke="#ffffff" />
      <span className="ml-4 text-white text-sm">{label}</span>
    </div>
  </Link>
);

export default IconLink;
