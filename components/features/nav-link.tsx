import React from "react";

// 1. Change React.ReactNode to React.ReactElement
interface NavLinkProps {
      icon: React.ReactElement;
      label: string;
      active: boolean;
      onClick: () => void;
}

const NavLink: React.FC<NavLinkProps> = ({ icon, label, active, onClick }) => (
      <button
            onClick={onClick}
            className={`flex items-center w-full px-4 py-3 rounded-xl transition-colors duration-200 ${
                  active ? "bg-black text-white shadow-md" : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
            }`}
      >
            {/* 2. TypeScript now knows it's safe to clone and add props */}
            {React.cloneElement(icon, {
                  size: 20,
                  className: "mr-3",
            } as React.Attributes & { size: number; className: string })}

            <span className="text-sm font-medium">{label}</span>
      </button>
);

export default NavLink;
