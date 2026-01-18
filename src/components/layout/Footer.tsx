export function Footer() {
    return (
        <footer className="bg-surface-dark py-12 border-t border-white/10 mt-auto">
            <div className="container mx-auto px-4 text-center">
                <p className="text-text-muted text-sm">
                    © {new Date().getFullYear()} Future Solutions Dev. All rights reserved.
                </p>
            </div>
        </footer>
    );
}
