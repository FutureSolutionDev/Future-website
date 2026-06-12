// Contact form delivery via Web3Forms (https://web3forms.com).
// Kept separate from the UI component on purpose.

import { SiteKeys } from '@/lib/constants';

const ENDPOINT = 'https://api.web3forms.com/submit';
const ACCESS_KEY = SiteKeys.Web3FormsKey;

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

/**
 * Product waitlist signup ("notify me at launch"). Arrives in the same inbox
 * with a [Waitlist] subject per product, so launch lists are easy to collect.
 */
export async function SubmitWaitlistSignup(product: string, email: string): Promise<boolean> {
    try {
        const response = await fetch(ENDPOINT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
            body: JSON.stringify({
                access_key: ACCESS_KEY,
                email,
                subject: `[Waitlist] ${product}`,
                message: `New waitlist signup for ${product}: ${email}`,
                from_name: 'Future Solutions Website',
            }),
        });
        return response.ok;
    } catch {
        return false;
    }
}
