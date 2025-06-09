"use client";

import React from "react";

interface SideMenuProps {
    onClose: () => void;
    onSelect: (view: string | null) => void;
}

export default function SideMenu({ onClose, onSelect }: SideMenuProps) {
    const handleSelect = (view: string | null) => {
        onSelect(view);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-70 flex items-center justify-end transition-opacity duration-300">
            <div className="w-3/4 sm:w-1/2 bg-white h-full p-6 shadow-lg transform translate-x-0 transition-transform duration-300">
                <button
                    className="text-right w-full text-gray-700 font-bold text-xl mb-6"
                    onClick={onClose}
                >
                    ✕
                </button>

                <ul className="space-y-5 text-lg font-medium text-gray-800">
                    <li>
                        <button
                            className="w-full text-left hover:text-[var(--primary)] transition"
                            onClick={() => handleSelect("inicio")}
                        >
                            Início
                        </button>
                    </li>
                    <li>
                        <button
                            className="w-full text-left hover:text-[var(--primary)] transition"
                            onClick={() => handleSelect("datas-criticas")}
                        >
                            Datas críticas
                        </button>
                    </li>
                    <li>
                        <button
                            className="w-full text-left hover:text-[var(--primary)] transition"
                            onClick={() => handleSelect("estoque")}
                        >
                            Estoque
                        </button>
                    </li>
                    <li>
                        <button
                            className="w-full text-left hover:text-[var(--primary)] transition"
                            onClick={() => handleSelect("relatorios")}
                        >
                            Relatórios
                        </button>
                    </li>
                    <li>
                        <button
                            className="w-full text-left hover:text-[var(--primary)] transition"
                            onClick={() => handleSelect("cadastrar-se")}
                        >
                            Cadastrar-se
                        </button>
                    </li>
                    <li>
                        <button
                            className="w-full text-left hover:text-[var(--primary)] transition"
                            onClick={() => handleSelect("login")}
                        >
                            Login
                        </button>
                    </li>
                    <li>
                        <button
                            className="w-full text-left hover:text-[var(--primary)] transition"
                            onClick={() => handleSelect("sobre")}
                        >
                            Sobre
                        </button>
                    </li>
                    <li>
                        <button
                            className="w-full text-left hover:text-[var(--primary)] transition"
                            onClick={() => handleSelect("contato")}
                        >
                            Contato
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    );
}
