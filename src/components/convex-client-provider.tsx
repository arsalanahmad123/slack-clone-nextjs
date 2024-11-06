'use client';

import { ConvexProvider, ConvexReactClient } from 'convex/react';
import { ConvexAuthNextjsProvider } from '@convex-dev/auth/nextjs';
import { ReactNode } from 'react';

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export function ConvexClientProvider({ children }: { children: ReactNode }) {
    return (
        <ConvexProvider client={convex}>
            <ConvexAuthNextjsProvider client={convex}>
                {children}
            </ConvexAuthNextjsProvider>
        </ConvexProvider>
    );
}
