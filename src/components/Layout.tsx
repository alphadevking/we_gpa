import { useContext } from "react"
import Footer from "./Footer"
import Navbar from "./Navbar"
import { ThemeContext } from "./Theme/ThemeContext"

export const Layout = ({ children, className, navbar, footer }: { children?: React.ReactNode, className?: string, navbar?: boolean, footer?: boolean }) => {

    const { isDark } = useContext(ThemeContext);

    return (
        <div className={`${isDark ? 'bg-gradient-to-r from-teal-900 to-teal-950 text-slate-50' : 'bg-gradient-to-br from-slate-100 to-neutral-200 text-gray-800'} scroll-smooth min-h-screen grid`}>

            {
                navbar && (
                    <div className="mb-16 md:mb-20 xl:mb-24">
                        <Navbar />
                    </div>
                )
            }

            <div className={`${className}`}>
                {children}
            </div>

            {
                footer && (
                    <div>
                        <Footer />
                    </div>
                )
            }
        </div>
    )
}
