"use client";
import dynamic from 'next/dynamic';
import { ActiveSeasonName } from '@/lib/constants';

// Each greeting is a separate lazy chunk: visitors only download the one
// that is actually active (none, most of the year).
const RamadanGreeting = dynamic(() => import('./RamadanGreeting'), { ssr: false });
const EidAlFitrGreeting = dynamic(() => import('./EidAlFitrGreeting'), { ssr: false });
const EidAlAdhaGreeting = dynamic(() => import('./EidAlAdhaGreeting'), { ssr: false });

export default function SeasonalGreetings() {
    switch (ActiveSeasonName) {
        case 'Ramadan':
            return <RamadanGreeting />;
        case 'EidAlFitr':
            return <EidAlFitrGreeting />;
        case 'EidAlAdha':
            return <EidAlAdhaGreeting />;
        default:
            return null;
    }
}
