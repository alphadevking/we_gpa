"use client"
import React from 'react'
import { ThemeProvider } from './Theme/ThemeContext'
import { SessionProvider } from 'next-auth/react'

export default function Providers({ children }: any) {
    /**
     * Wraps the `ThemeProvider` and `SessionProvider` components around the `children` components.
     * 
     * @param children - The components that will be wrapped by the `ThemeProvider` and `SessionProvider`.
     * @returns The `children` components wrapped by the `ThemeProvider` and `SessionProvider` components.
     * 
     * @example
     * ```typescript-react
     * import Providers from './Providers';
     * 
     * function App() {
     *   return (
     *     <Providers>
     *       <ChildComponent />
     *     </Providers>
     *   );
     * }
     * ```
     */
    return (
        <ThemeProvider>
            <SessionProvider>
                {children}
            </SessionProvider>
        </ThemeProvider>
    )
}
