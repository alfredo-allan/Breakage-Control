"use client";

import { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { AuthContext } from "../../auth/AuthProvider";
import style from './Header.module.css'
import SideMenu from "../SideMenu/SideMenu";
import SidebarMenu from "../SideBarMenu/SideBarMenu";
import AuthCheckModal from "../AuthCheckModal/AuthCheckModal";

import StartAnimation from "../StartAnimation/StartAnimation";
import ListingIterationWithStock from "../ListingIterationWithStock/ListingIterationWithStock";
import ListingIterationWithDate from "../ListingIterationWithDate/ListingIterationWithDate";
import AboutSection from "../AboutSection/AboutSection";
import ContactForm from "../ContactForm/ContactForm";
import ListingIterationWithReport from "../ListingIterationWithReport/ListingIterationWithReport";
import RegisterForm from "../RegisterForm/RegisterForm";
import LoginForm from "../LoginForm/LoginForm";
import CriticalDate from "../CriticalDate/CriticalDate";
import ReportFaults from "../ReportFaults/ReportFaults";
import ReportExchanges from "../ReportExchanges/ReportExchanges";
import ReportsCriticalDates from "../ReportsCriticalDates/ReportsCriticalDates";

export default function Header() {
    const [activeComponent, setActiveComponent] = useState<string>("inicio");
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { user, loading } = useContext(AuthContext) || {};
    const [showAuthModal, setShowAuthModal] = useState(false);
    const [hasCheckedAuth, setHasCheckedAuth] = useState(false);

    useEffect(() => {
        if (!loading && !hasCheckedAuth) {
            setShowAuthModal(!user);
            setHasCheckedAuth(true);
        }
    }, [loading, user, hasCheckedAuth]);

    useEffect(() => {
        if (user) setHasCheckedAuth(false);
    }, [user]);

    const handleNavigate = (target: "login" | "cadastrar-se") => {
        setActiveComponent(target);
        setShowAuthModal(false);
    };

    const renderActiveComponent = () => {
        switch (activeComponent) {
            case "inicio":
                return <StartAnimation />;
            case "estoque":
                return <ListingIterationWithStock />;
            case "datas-criticas":
                return <ListingIterationWithDate />;
            case "cadastrar-vencimento":
                return <CriticalDate />;
            case "reportar-trocas":
                return <ReportExchanges />;
            case "relatorio-a1":
                return <ReportsCriticalDates />;
            case "reportar-avarias":
                return <ReportFaults />;
            case "sobre":
                return <AboutSection />;
            case "contato":
                return <ContactForm />;
            case "relatorios":
                return <ListingIterationWithReport />;
            case "cadastrar-se":
                return <RegisterForm onSuccess={() => setActiveComponent("login")} />;
            case "login":
                return <LoginForm onLoginSuccess={() => setActiveComponent("inicio")} />;
            default:
                return null;
        }
    };

    return (
        <div className="flex min-h-screen">
            {/* Sidebar em desktop/tablet */}
            <aside className="hidden sm:block w-[260px] h-screen bg-[var(--header-bg)] fixed top-0 left-0 z-20">
                <SidebarMenu activeComponent={activeComponent} onSelect={setActiveComponent} />
            </aside>

            {/* Header mobile */}
            <header className="sm:hidden fixed top-0 left-0 right-0 z-30 bg-[var(--header-bg)] shadow-md py-4 px-4 flex justify-between items-center w-full">
                <h1 className="text-xl font-bold text-[var(--primary)]">Breakage Control</h1>
                <div onClick={() => setMobileMenuOpen(true)} className="cursor-pointer">
                    <Image src="/icons/menu.png" alt="Menu" width={28} height={28} />
                </div>
            </header>

            {/* Conteúdo principal */}
            <main
                className={`flex-1 w-full ml-0 sm:ml-[260px] pt-[72px] sm:pt-0 ${activeComponent === "inicio" ? "flex items-center justify-center" : ""
                    }`}
            >
                {renderActiveComponent()}
                {/* Boas-vindas apenas no mobile, abaixo do header e só na tela inicial */}
                {user && activeComponent === "inicio" && (
                    <div className={style["content-welcome-text"]}>
                        Seja bem-vindo, {user.name}!
                    </div>
                )}
            </main>

            {/* Menu lateral mobile */}
            {isMobileMenuOpen && (
                <SideMenu
                    onClose={() => setMobileMenuOpen(false)}
                    onSelect={(view) => {
                        if (view) setActiveComponent(view);
                    }}
                />
            )}

            {/* Modal de verificação de login */}
            <AuthCheckModal
                isOpen={showAuthModal}
                onClose={() => setShowAuthModal(false)}
                onNavigate={handleNavigate}
            />
        </div>
    );
}
