import Footer from "./Footer"
import Navbar from "./Navbar"

export const Layout = ({ children, className, navbar, footer }: { children?: React.ReactNode, className?: string, navbar?: boolean, footer?: boolean }) => {
    return (
        <div className='min-h-screen grid'>

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
