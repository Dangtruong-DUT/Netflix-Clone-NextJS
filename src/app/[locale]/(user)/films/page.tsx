import { getMockFilms } from '@/_mock'
import VideoCarousel from '@/app/[locale]/(user)/films/_components/video-carousel'
import Footer from '@/components/footer'
import Header from '@/components/header'

const mockVideos = getMockFilms(5)

export default function AccountHomePage() {
    return (
        <>
            <Header
                className='fixed w-full top-0 z-10 bg-transparent  px-6 md:px-8 lg:px-14 '
                buttonClassName='text-white bg-transparent hover:bg-transparent hover:text-white '
            />
            <main>
                <VideoCarousel videos={mockVideos} />
            </main>
            <Footer />
        </>
    )
}
