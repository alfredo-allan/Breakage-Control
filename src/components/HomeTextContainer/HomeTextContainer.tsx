// src/components/HomeTextContainer.tsx
"use client";
import { useEffect, useState } from "react";

const texts = [
    "Esse Software foi desenvolvido com a finalidade de ",
    "Reportar datas críticas de produtos perecíveis",
    "Salvar o giro dos produtos",
    "Reportar quebras",
    "Salvar as notas de troca de produtos ou avarias",
    "Consultar graficos de desenpenho, quebras, notas, e quantidades de produtos reportados"
];

export const HomeTextContainer = () => {
    const [textIndex, setTextIndex] = useState(0);
    const [displayedText, setDisplayedText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const fullText = texts[textIndex];
        let speed = 100;

        if (isDeleting) {
            speed = 40;
        }

        const timeout = setTimeout(() => {
            setDisplayedText((prev) =>
                isDeleting
                    ? fullText.substring(0, prev.length - 1)
                    : fullText.substring(0, prev.length + 1)
            );

            if (!isDeleting && displayedText === fullText) {
                setTimeout(() => setIsDeleting(true), 1000);
            } else if (isDeleting && displayedText === "") {
                setIsDeleting(false);
                setTextIndex((prev) => (prev + 1) % texts.length);
            }
        }, speed);

        return () => clearTimeout(timeout);
    }, [displayedText, isDeleting, textIndex]);

    return (
        <div className="text-center text-3xl font-lubrifont text-[var(--text-secondary)] min-h-[60px]">
            {displayedText}
            <span className="animate-blink">|</span>
        </div>
    );
};
