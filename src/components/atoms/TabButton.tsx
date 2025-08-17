import React from "react";

interface ButtonProps {
  active?: boolean;
  type?: "button" | "submit" | "reset";
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  children: React.ReactNode;
}

export default function Button({
  active = false,
  type = "button",
  onClick,
  children,
}: ButtonProps) {
  const baseStyles = "text-xs sm:text-lg py-2 sm:px-4 px-2 rounded-t-md transition w-auto";

  const styles = {
    active: "bg-primary border border-primary text-white",
    inactive: "bg-[#F2F2F2] text-[#666] hover:bg-[#EFF6FF]",
  };

  return (
    <button
      type={type}
      className={`${baseStyles} ${active ? styles.active : styles.inactive}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
