import { useEffect } from "react";

export default function Toast({ message, type, onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const colors = {
    success: "bg-green-500",
    update: "bg-blue-500",
    delete: "bg-yellow-500",
    error: "bg-red-500",
  };

  return (
    <div
      className={`fixed top-5 right-5 text-white px-6 py-4 rounded shadow-lg ${colors[type]} animate-slide`}
    >
      {message}
    </div>
  );
}