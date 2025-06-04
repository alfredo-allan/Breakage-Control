"use client";

import { useState } from "react";
import Image from "next/image";
import ListingIterationWithStock from "./ListingIterationWithStock";
// import { HomeTextContainer } from "./HomeTextContainer";
import SideMenu from "./SideMenu"; // <- IMPORTADO AQUI
import StartAnimation from "./StartAnimation";


export default function Header() {
    const [activeComponent, setActiveComponent] = useState<string>("inicio");
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false); // <- CONTROLE DO MENU

    const handleMenuClick = () => {
        setMobileMenuOpen(true); // <- ABRE MENU
    };

    const renderActiveComponent = () => {
        switch (activeComponent) {
            case "inicio":
                return (
                    <>
                        {/* <HomeTextContainer /> */}
                        <StartAnimation />
                    </>
                );
            case "estoque":
                return <ListingIterationWithStock />;
            default:
                return null;
        }
    };

    return (
        <>
            <header className="bg-[var(--header-bg)] shadow-md py-6 px-4 sm:px-8 md:px-16 lg:px-32 flex items-center justify-between">
                <h1 className="text-2xl sm:text-3xl md:text-3xl font-bold text-[var(--primary)]">
                    Breakage Control
                </h1>

                {/* Menu Desktop */}
                <nav className="hidden sm:block">
                    <ul className="flex gap-6">
                        <li>
                            <a
                                href="#"
                                className="text-[var(--primary)] menu-hover"
                                onClick={() => setActiveComponent("inicio")}
                            >
                                Início
                            </a>
                        </li>
                        <li>
                            <a href="#" className="text-[var(--primary)] menu-hover">
                                Datas críticas
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="text-[var(--primary)] menu-hover"
                                onClick={() => setActiveComponent("estoque")}
                            >
                                Estoque
                            </a>
                        </li>
                        <li>
                            <a href="#" className="text-[var(--primary)] menu-hover">
                                Relatórios
                            </a>
                        </li>
                        <li>
                            <a href="#" className="text-[var(--primary)] menu-hover">
                                Sobre
                            </a>
                        </li>
                        <li>
                            <a href="#" className="text-[var(--primary)] menu-hover">
                                Contato
                            </a>
                        </li>
                    </ul>
                </nav>

                {/* Ícone do menu - Mobile */}
                <div className="block sm:hidden cursor-pointer" onClick={handleMenuClick}>
                    <Image src="/icons/menu.png" alt="Menu" width={32} height={32} priority />
                </div>
            </header>

            {/* Renderiza componente ativo */}
            {renderActiveComponent()}

            {/* SideMenu Mobile */}
            {isMobileMenuOpen && (
                <SideMenu
                    onClose={() => setMobileMenuOpen(false)}
                    onSelect={(view) => {
                        if (view) setActiveComponent(view);
                    }}
                />
            )}
        </>
    );
}
