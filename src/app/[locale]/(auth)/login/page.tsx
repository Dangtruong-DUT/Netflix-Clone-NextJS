import Header from '@/components/header'
import Footer from '@/components/footer'
import LoginForm from './_components/loginForm'

export default function LoginPage() {
    return (
        <div
            className='relative min-h-screen flex flex-col justify-between bg-center'
            style={{
                backgroundImage: "url('/images/home/hero-background.jpg')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '100vh',
                width: '100%'
            }}
        >
            <div className='absolute inset-0 bg-black opacity-75'></div>

            <div className='relative z-10 flex flex-col min-h-screen'>
                <Header />

                <main className='flex-grow flex items-center justify-center p-4'>
                    <div className='p-8 rounded-[5px] shadow-lg w-full max-w-md bg-black/65 corner'>
                        <LoginForm />
                    </div>
                </main>

                <Footer />
            </div>
        </div>
    )
}
