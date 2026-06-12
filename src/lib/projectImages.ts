// Server-side reader for project gallery folders (public/Projects/<Name>/).
// Used at build/dev time to provide the initial image list; at runtime in
// production the client refreshes the list from the nginx JSON directory
// listing, so newly uploaded screenshots appear WITHOUT a rebuild.
import fs from 'node:fs';
import path from 'node:path';

export const PROJECT_IMAGE_PATTERN = /\.(webp|png|jpe?g|avif)$/i;

/** Lists images in a public folder (e.g. '/Projects/Imtithal'), sorted by filename. */
export function GetProjectImages(imagesFolder: string): string[] {
    const dir = path.join(process.cwd(), 'public', ...imagesFolder.split('/').filter(Boolean));
    if (!fs.existsSync(dir)) return [];
    return fs
        .readdirSync(dir)
        .filter((file) => PROJECT_IMAGE_PATTERN.test(file))
        .sort()
        .map((file) => `${imagesFolder}/${file}`);
}
