import Footer from '@/components/footer'
import Header from '@/components/header'

interface SignupLayoutProps {
    children: React.ReactNode
}
export default function SignupLayout({ children }: SignupLayoutProps) {
    return (
        <div>
            <Header className='border-b' />
            <main className='px-6 md:px-8 lg:px-37'>{children}</main>
            <Footer className='border-t' />
        </div>
    )
}
