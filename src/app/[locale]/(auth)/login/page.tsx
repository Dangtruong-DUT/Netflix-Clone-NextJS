import Footer from '@/components/footer'
import LoginForm from './_components/loginForm'
import Header from '@/components/header'
import Head from 'next/head'

export default function LoginPage() {
    return (
        <div
            className='relative min-h-screen flex flex-col justify-between bg-center'
            style={{
                backgroundImage: "url('/images/home/hero-background.jpg')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                width: '100%'
            }}
        >
            <div className='absolute inset-0 bg-black opacity-75'></div>

            <div className='relative z-10 flex flex-col min-h-screen'>
                <Head>
                    <title>Sign In | Netflix</title>
                    <meta name='description' content='Login to your Netflix account' />
                    <meta name='viewport' content='width=device-width, initial-scale=1' />
                    <link rel='icon' href='/favicon.ico' />
                </Head>
                <Header className='dark:text-white text-black' />

                <main className='flex-grow flex items-center justify-center p-2 sm:p-4 md:p-6 lg:p-6 xl:p-8 relative overflow-hidden w-full'>
                    <div className='p-4 sm:p-6 md:p-6 lg:p-6 xl:p-8 rounded-[5px] shadow-lg w-full max-w-full sm:max-w-sm md:max-w-md lg:max-w-md xl:max-w-lg corner'>
                        <LoginForm />
                    </div>
                </main>

                <Footer className='dark:bg-black bg-white' />
            </div>
        </div>
    )
}
