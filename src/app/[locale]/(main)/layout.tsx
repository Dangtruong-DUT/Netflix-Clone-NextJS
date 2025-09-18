import Footer from '@/components/footer'
import Header from '@/components/header'

interface MainLayoutProps {
    children: React.ReactNode
}

export const metadata = {
    title: {
        template: '%s | Netflix',
        default: 'Netflix'
    },
    description: "Welcome to Netflix, the world's leading streaming entertainment service."
}

export default function MainLayout({ children }: MainLayoutProps) {
    return (
        <div>
            <main>{children}</main>
            <Footer />
        </div>
    )
}
