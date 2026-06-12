"use client";
import dynamic from 'next/dynamic';
import { ActiveSeasonName } from '@/lib/constants';

// Lazy chunks — see SeasonalGreetings.tsx for the rationale.
const RamadanDecoration = dynamic(() => import('./RamadanDecoration'), { ssr: false });
const EidAlFitrDecoration = dynamic(() => import('./EidAlFitrDecoration'), { ssr: false });
const EidAlAdhaDecoration = dynamic(() => import('./EidAlAdhaDecoration'), { ssr: false });

export default function SeasonalDecorations({ Mode = "Desktop" }: { Mode?: "Desktop" | "Mobile" }) {
    switch (ActiveSeasonName) {
        case 'Ramadan':
            return <RamadanDecoration Mode={Mode} />;
        case 'EidAlFitr':
            return <EidAlFitrDecoration Mode={Mode} />;
        case 'EidAlAdha':
            return <EidAlAdhaDecoration Mode={Mode} />;
        default:
            return null;
    }
}
