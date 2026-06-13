"use client";
// Live project gallery list: starts from the build-time list, then refreshes
// from the nginx JSON directory listing (autoindex_format json) so screenshots
// uploaded straight to the server appear without rebuilding the site.
import { useEffect, useState } from 'react';

const IMAGE_PATTERN = /\.(webp|png|jpe?g|avif)$/i;

type TDirectoryEntry = { name: string; type: string };

export function UseProjectImages(imagesFolder: string, initialImages: string[]): string[] {
    const [images, setImages] = useState(initialImages);

    useEffect(() => {
        // Reset to THIS folder's build-time list whenever the folder changes
        // (e.g. a carousel cycling through projects) — useState only captures
        // the first value, so without this the image stays stuck on slide 0.
        setImages(initialImages);

        // In dev the server reads the folder from disk on every reload — the JSON
        // listing only exists behind nginx in production. Skip the noise locally.
        if (process.env.NODE_ENV === 'development') return;
        let cancelled = false;
        fetch(`${imagesFolder}/`, {
            headers: { Accept: 'application/json' },
            cache: 'no-store',
        })
            .then((response) => {
                if (!response.ok) throw new Error(`listing unavailable (${response.status})`);
                const contentType = response.headers.get('content-type') ?? '';
                if (!contentType.includes('json')) throw new Error('listing is not JSON');
                return response.json() as Promise<TDirectoryEntry[]>;
            })
            .then((entries) => {
                if (cancelled || !Array.isArray(entries)) return;
                const files = entries
                    .filter((entry) => entry.type === 'file' && IMAGE_PATTERN.test(entry.name))
                    .map((entry) => `${imagesFolder}/${entry.name}`)
                    .sort();
                if (files.length > 0) setImages(files);
            })
            .catch(() => {
                // Dev server / listing disabled — the build-time list stays in place
            });
        return () => {
            cancelled = true;
        };
    }, [imagesFolder, initialImages]);

    return images;
}
