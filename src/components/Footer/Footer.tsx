export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-[var(--footer-bg)]  text-[var(--primary)]  py-4 text-center px-4 sm:px-8 md:px-16 lg:px-32">
            <p className="text-sm sm:text-base md:text-lg">
                © {currentYear} Leap In Technology
            </p>
        </footer>
    );
}
