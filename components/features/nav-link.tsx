import React from "react";

// NavLink Component
const NavLink: React.FC<{ icon: React.ReactNode; label: string; active: boolean; onClick: () => void }> = ({
      icon,
      label,
      active,
      onClick,
}) => (
      <button
            onClick={onClick}
            className={`flex items-center w-full px-4 py-3 rounded-xl transition-colors duration-200 ${
                  active ? "bg-black text-white shadow-md" : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
            }`}
      >
            {React.cloneElement(icon as React.ReactElement, { size: 20, className: "mr-3" })}
            <span className="text-sm">{label}</span>
      </button>
);

export default NavLink;
