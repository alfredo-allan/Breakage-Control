"use client";

import { useContext, useEffect, useState } from "react";
import Image from "next/image";
import ListingIterationWithStock from "../ListingIterationWithStock/ListingIterationWithStock";
import { AuthContext } from "../../auth/AuthProvider";
import AuthCheckModal from "../AuthCheckModal/AuthCheckModal";
import styles from "./Header.module.css"
// import { HomeTextContainer } from "./HomeTextContainer";
import SideMenu from "../SideMenu/SideMenu"; // <- IMPORTADO AQUI
import StartAnimation from "../StartAnimation/StartAnimation";
import ListingIterationWithDate from "../ListingIterationWithDate/ListingIterationWithDate";
import AboutSection from "../AboutSection/AboutSection";
import ContactForm from "../ContactForm/ContactForm";
import ListingIterationWithReport from "../ListingIterationWithReport/ListingIterationWithReport";
import RegisterForm from "../RegisterForm/RegisterForm";
import LoginForm from "../LoginForm/LoginForm";

export default function Header() {
    const [activeComponent, setActiveComponent] = useState<string>("inicio");
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false); // <- CONTROLE DO MENU
    const { user, loading } = useContext(AuthContext) || {};
    const [showAuthModal, setShowAuthModal] = useState(false);
    const [hasCheckedAuth, setHasCheckedAuth] = useState(false);

    useEffect(() => {
        if (!loading) {
            if (user) {
                setShowAuthModal(false); // fecha modal se estiver logado
            } else if (!hasCheckedAuth) {
                setShowAuthModal(true);
                setHasCheckedAuth(true);
            }
        }
    }, [loading, user, hasCheckedAuth]);

    // Resetar verificação ao mudar usuário
    useEffect(() => {
        if (user) {
            setHasCheckedAuth(false);
        }
    }, [user]);
    const handleNavigate = (target: "login" | "cadastrar-se") => {
        setActiveComponent(target);
        setShowAuthModal(false);
    };
    console.log("user", user);
    console.log("loading", loading);
    console.log("hasCheckedAuth", hasCheckedAuth);
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
            case "datas-criticas":
                return (
                    <>
                        {/* <HomeTextContainer /> */}
                        <ListingIterationWithDate />
                    </>
                );
            case "sobre":
                return <AboutSection />;
            case "contato":
                return <ContactForm />;
            case "relatorios":
                return < ListingIterationWithReport />;
            case "cadastrar-se":
                return <RegisterForm onSuccess={() => setActiveComponent("login")} />; case "login":
                return <LoginForm onLoginSuccess={() => setActiveComponent("inicio")} />

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
                            <a href="#" className="text-[var(--primary)] menu-hover"
                                onClick={() => setActiveComponent("datas-criticas")}
                            >
                                Datas e Avarias
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="text-[var(--primary)] menu-hover"
                                onClick={() => setActiveComponent("estoque")}
                            >
                                Rotinas do Estoque
                            </a>
                        </li>
                        <li>
                            <a href="#" className="text-[var(--primary)] menu-hover"
                                onClick={() => setActiveComponent("relatorios")}
                            >
                                Relatórios
                            </a>
                        </li>
                        <li>
                            <a href="#" className="text-[var(--primary)] menu-hover"
                                onClick={() => setActiveComponent("cadastrar-se")}

                            >
                                Cadastrar-se
                            </a>
                        </li>
                        <li>
                            <a href="#" className="text-[var(--primary)] menu-hover"
                                onClick={() => setActiveComponent("login")}

                            >
                                Login
                            </a>
                        </li>
                        <li>
                            <a href="#" className="text-[var(--primary)] menu-hover"
                                onClick={() => setActiveComponent("sobre")}
                            >
                                Sobre
                            </a>
                        </li>
                        <li>
                            <a href="#" className="text-[var(--primary)] menu-hover"
                                onClick={() => setActiveComponent("contato")}
                            >
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
            {user && activeComponent === "inicio" && (
                <div className={styles["content-welcome-text"]}>
                    <span className={styles["welcome-text"]}>
                        Seja bem-vindo, {user.name}!
                    </span>
                </div>
            )}

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
            <AuthCheckModal
                isOpen={showAuthModal}
                onClose={() => setShowAuthModal(false)}
                onNavigate={handleNavigate}
            />

        </>
    );
}
