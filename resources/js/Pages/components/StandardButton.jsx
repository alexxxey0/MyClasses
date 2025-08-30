import React from "react";

const colorMap = {
    violet: {
        base: "bg-violet-200 text-violet-800",
        hover: "hover:bg-violet-300",
        active: "active:bg-violet-400 active:scale-95",
    },
    blue: {
        base: "bg-blue-200 text-blue-800",
        hover: "hover:bg-blue-300",
        active: "active:bg-blue-400 active:scale-95",
    },
    green: {
        base: "bg-green-200 text-green-800",
        hover: "hover:bg-green-300",
        active: "active:bg-green-400 active:scale-95",
    },
    // add more colors as needed
};

export default function StandardButton({ color = "violet", children, onClick, className = "" }) {
    const selected = colorMap[color] || colorMap.violet;

    return (
        <button
            type="button"
            onClick={onClick}
            className={`inline-flex items-center justify-center gap-2 px-4 py-2 font-medium rounded-lg shadow-sm transition transform 
                  ${selected.base} ${selected.hover} ${selected.active} ${className}`}
        >
            {children}
        </button>
    );
}
