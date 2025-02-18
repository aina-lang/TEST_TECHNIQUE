"use client";

import { ButtonProps } from "@/lib/types";

function PrimaryButton({
  title,
  onClicked,
  className,
  disabled,
  type,
}: ButtonProps) {
  const createRipple = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const button = e.currentTarget;
    const circle = document.createElement("span");
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;
    circle.style.width = circle.style.height = `${diameter / 2}px`;
    circle.style.left = `${e.clientX - button.offsetLeft - radius}px`;
    circle.classList.add("ripple");
    const ripple = button.getElementsByClassName("ripple")[0];

    if (ripple) ripple.remove();
    button.appendChild(circle);
  };

  return (
    <button
      type={type}
      onClick={(e) => {
        createRipple(e);
        if (onClicked) onClicked();
      }}
      disabled={disabled}
      className={`text-sm relative overflow-hidden bg-blue-500 ${
        disabled ? "bg-gray-300 text-gray-500" : " shadow-blue-200 text-white"
      } shadow  p-4 py-2 rounded  ${className}`}
    >
      {title || "primary button"}
    </button>
  );
}

export default PrimaryButton;
