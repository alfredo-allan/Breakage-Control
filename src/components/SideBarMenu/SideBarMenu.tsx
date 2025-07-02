"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
    RxHome,
    RxBox,
    RxBarChart,
    RxPerson,
    RxQuestionMarkCircled,
    RxEnvelopeClosed,
    RxCalendar,
} from "react-icons/rx";

const menuItems = [
    { key: "inicio", label: "Início", icon: RxHome },
    {
        key: "datas-criticas",
        label: "Datas Críticas",
        icon: RxCalendar,
        submenu: [
            { key: "cadastrar-vencimento", label: "Cadastrar Vencimento" },
            { key: "reportar-avarias", label: "Registrar Avaria" },
            { key: "reportar-trocas", label: "Reportar Trocas" },
            { key: "relatorio-a1", label: "Relatório" },
        ],
    },
    { key: "estoque", label: "Rotinas do Estoque", icon: RxBox },
    { key: "relatorios", label: "Relatórios", icon: RxBarChart },
    { key: "cadastrar-se", label: "Cadastrar", icon: RxPerson },
    { key: "login", label: "Login", icon: RxPerson },
    { key: "sobre", label: "Sobre", icon: RxQuestionMarkCircled },
    { key: "contato", label: "Contato", icon: RxEnvelopeClosed },
];

export default function SidebarMenu({
    activeComponent,
    onSelect,
}: {
    activeComponent: string;
    onSelect: (key: string) => void;
}) {
    const [mounted, setMounted] = useState(false);
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    const toggleDropdown = (key: string) => {
        setOpenDropdown(prev => (prev === key ? null : key));
    };

    return (
        <aside className="hidden md:flex fixed top-0 left-0 h-screen w-[240px] bg-[var(--header-bg)] border-r border-white/10 flex-col py-8 px-4 z-40 overflow-y-auto">
            <h1 className="text-2xl font-bold text-[var(--primary)] mb-10 px-2">
                Breakage Control
            </h1>

            <ul className="flex flex-col gap-4">
                {menuItems.map(({ key, label, icon: Icon, submenu }) => {
                    const isActive = activeComponent === key;
                    const isOpen = openDropdown === key;

                    return (
                        <li key={key} className="flex flex-col">
                            <motion.div
                                onClick={() =>
                                    submenu ? toggleDropdown(key) : onSelect(key)
                                }
                                initial={{ scale: 1 }}
                                whileHover={{ scale: 1.03 }}
                                className={`flex items-center gap-2 px-3 py-2 rounded-md cursor-pointer transition-all duration-300 ${isActive
                                    ? "bg-accent text-white"
                                    : "text-[var(--primary)] hover:bg-white/10"
                                    }`}
                            >
                                <Icon className="text-xl" />
                                <span className="text-sm font-medium">{label}</span>
                            </motion.div>

                            {/* SUBMENU */}
                            {submenu && (
                                <ul
                                    className={`ml-6 mt-2 flex flex-col gap-2 transition-all duration-300 ${isOpen ? "max-h-[500px]" : "max-h-0 overflow-hidden"
                                        }`}
                                >
                                    {submenu.map(({ key: subKey, label: subLabel }) => (
                                        <li
                                            key={subKey}
                                            onClick={() => onSelect(subKey)}
                                            className={`text-sm text-[var(--primary)] hover:text-white cursor-pointer px-2 py-1 rounded transition-all ${activeComponent === subKey
                                                ? "text-white bg-accent/50"
                                                : ""
                                                }`}
                                        >
                                            {subLabel}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    );
                })}
            </ul>
        </aside>
    );
}
