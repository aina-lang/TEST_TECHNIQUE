import React, { useEffect, useState } from "react";

interface SweetAlertProps {
  message: string;
  type: "success" | "error" | null;
  duration?: number;
}

const SweetAlert: React.FC<SweetAlertProps> = ({
  message,
  type,
  duration = 3000,
}) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  if (!visible) return null;

  const bgColor =
    type === "success"
      ? "bg-green-100 border-green-400"
      : "bg-red-100 border-red-400";
  const textColor = type === "success" ? "text-green-700" : "text-red-700";

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div
        className={`border rounded-lg shadow-lg p-4 max-w-sm w-full text-center animate-fade-in ${bgColor}`}
      >
        <p className={`font-semibold ${textColor}`}>{message}</p>
      </div>
    </div>
  );
};

export default SweetAlert;
