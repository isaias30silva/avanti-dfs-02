import { useEffect } from "react";

export const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const colors = {
    success: "bg-[#4BB002]",
    update: "bg-[#3976EC]",
    delete: "bg-[#FFD84F] text-[#2E2E2E]",
    error: "bg-[#F13232]",
  };

  return (
    <div
      className={`fixed top-5 right-5 text-white px-6 py-4 rounded shadow-lg font-semibold ${colors[type]} animate-slide z-50`}
    >
      {message}
    </div>
  );
};
