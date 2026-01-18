'use client';

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <html lang="en">
            <body style={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#050B14',
                color: '#E6F1FF',
                fontFamily: 'system-ui, sans-serif',
            }}>
                <div style={{ textAlign: 'center', padding: '2rem' }}>
                    <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>
                        Something went wrong!
                    </h1>
                    <p style={{ color: 'rgba(230, 241, 255, 0.75)', marginBottom: '2rem' }}>
                        An unexpected error occurred.
                    </p>
                    <button
                        onClick={() => reset()}
                        style={{
                            padding: '0.75rem 1.5rem',
                            backgroundColor: '#1DA1F2',
                            color: 'white',
                            border: 'none',
                            borderRadius: '0.5rem',
                            cursor: 'pointer',
                            fontSize: '1rem',
                        }}
                    >
                        Try again
                    </button>
                </div>
            </body>
        </html>
    );
}
