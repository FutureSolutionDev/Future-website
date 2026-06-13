// Server-side resolver for team member photos. Looks for any supported image
// named after the member's photoSlug under public/Team/. Returns the public
// path, or null when no photo exists (the UI then renders an initial avatar).
import fs from 'node:fs';
import path from 'node:path';

const TEAM_DIR = path.join(process.cwd(), 'public', 'Team');
const EXTENSIONS = ['webp', 'png', 'jpg', 'jpeg', 'avif'];

export function GetTeamPhoto(photoSlug: string): string | null {
    for (const ext of EXTENSIONS) {
        const file = path.join(TEAM_DIR, `${photoSlug}.${ext}`);
        if (fs.existsSync(file)) return `/Team/${photoSlug}.${ext}`;
    }
    return null;
}
