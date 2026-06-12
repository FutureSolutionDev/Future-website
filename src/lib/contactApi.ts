// Contact form delivery via Web3Forms (https://web3forms.com).
// Kept separate from the UI component on purpose.

const ENDPOINT = 'https://api.web3forms.com/submit';
const ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? '';

export type TContactMessage = {
    name: string;
    email: string;
    topic: string;
    message: string;
};

/** Sends the message to Web3Forms; resolves true on success. */
export async function SubmitContactMessage(data: TContactMessage): Promise<boolean> {
    try {
        const response = await fetch(ENDPOINT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
            body: JSON.stringify({
                access_key: ACCESS_KEY,
                name: data.name,
                email: data.email,
                subject: `[futuresolutionsdev.com] ${data.topic || 'Contact form message'}`,
                message: data.message,
                from_name: 'Future Solutions Website',
            }),
        });
        return response.ok;
    } catch {
        return false;
    }
}
