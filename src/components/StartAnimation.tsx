"use client";

import { useEffect, useState } from "react";
import Lottie from "lottie-react";
import styles from "./StartAnimation.module.css";

// Importações dos JSONs
import financial from "@/../public/animations/financial.json";
import system from "@/../public/animations/system.json";
import systemDate from "@/../public/animations/systemDate.json";

const animations = [financial, system, systemDate];

export default function StartAnimation() {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % animations.length);
        }, 5000); // troca a cada 5s

        return () => clearInterval(interval);
    }, []);

    return (
        <div className={styles.container}>
            {animations.map((animation, index) => (
                <div
                    key={index}
                    className={`${styles.animationWrapper} ${index === currentIndex ? styles.visible : styles.hidden}`}
                >
                    <Lottie animationData={animation} loop={true} />
                </div>
            ))}
        </div>
    );
}
