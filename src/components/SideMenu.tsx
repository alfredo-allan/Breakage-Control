"use client";

import React from "react";

interface SideMenuProps {
    onClose: () => void;
    onSelect: (view: string | null) => void;
}

export default function SideMenu({ onClose, onSelect }: SideMenuProps) {
    return (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-70 flex items-center justify-end transition-opacity duration-300">
            <div className="w-3/4 sm:w-1/2 bg-white h-full p-6 shadow-lg transform translate-x-0 transition-transform duration-300">
                <button
                    className="text-right w-full text-gray-700 font-bold text-xl mb-6"
                    onClick={onClose}
                >
                    ✕
                </button>

                <ul className="space-y-4 text-lg font-medium text-gray-800">
                    <li>
                        <button
                            className="w-full text-left hover:text-blue-600 transition"
                            onClick={() => {
                                onSelect(null);
                                onClose();
                            }}
                        >
                            Início
                        </button>
                    </li>
                    <li>
                        <button
                            className="w-full text-left hover:text-blue-600 transition"
                            onClick={() => {
                                onSelect("estoque");
                                onClose();
                            }}
                        >
                            Estoque
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    );
}
