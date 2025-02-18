"use client";

import ButtonProps from "@/lib/types";

function SecondaryButton({ title, onClicked, className }: ButtonProps) {
  const createRipple = (e: MouseEvent) => {
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
      onClick={(e) => {
        createRipple(e);
        if (onClicked) onClicked();
      }}
      className={` text-sm border relative overflow-hidden border-blue-500 p-4 py-2 rounded text-blue-500  ${className}`}
    >
      {title || "Secondary Button"}
    </button>
  );
}

export default SecondaryButton;
