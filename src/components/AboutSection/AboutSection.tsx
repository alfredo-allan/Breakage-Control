"use client";

import styles from "./AboutSection.module.css";

export default function AboutSection() {
    return (
        <section className={styles.container}>
            <h2 className={styles.title}>Sobre o Breakage Control</h2>
            <p className={styles.text}>
                O <strong>Breakage Control</strong> é um sistema desenvolvido para auxiliar equipes
                de controle de qualidade e gestão de estoque em supermercados e varejos.
                Seu principal objetivo é identificar e reportar quebras, perdas, avarias, notas de
                troca e datas críticas de forma simples e eficiente, melhorando o giro dos
                produtos e reduzindo prejuízos.
            </p>

            <h3 className={styles.subtitle}>Sobre a Leap Technology</h3>
            <p className={styles.text}>
                A <strong>Leap Technology</strong> é uma iniciativa voltada para criar soluções
                práticas e acessíveis para o mercado varejista. Com foco em agilidade e
                facilidade de uso, desenvolvemos sistemas inteligentes para equipes operacionais
                e gestores que precisam de dados confiáveis e ferramentas intuitivas.
            </p>

            <h3 className={styles.subtitle}>Ajuda e Finalidade do Sistema</h3>
            <p className={styles.text}>
                Ao utilizar o Breakage Control, sua equipe pode:
            </p>
            <ul className={styles.list}>
                <li>📅 Reportar datas críticas de validade;</li>
                <li>📦 Registrar quebras e produtos com avarias;</li>
                <li>📝 Gerar e consultar notas de troca de produtos danificados;</li>
                <li>📊 Visualizar gráficos de desempenho, perdas e ações por período;</li>
                <li>🔍 Obter dados em tempo real para decisões mais inteligentes.</li>
            </ul>

            <h3 className={styles.subtitle}>Conecte-se Conosco</h3>
            <div className={styles.links}>
                <a
                    href="https://www.linkedin.com/in/alfredo-allan-teixeira-ba2701149/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.link}
                >
                    🔗 LinkedIn
                </a>
                <a
                    href="https://github.com/alfredo-allan"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.link}
                >
                    🧠 GitHub
                </a>
            </div>
        </section>
    );
}
