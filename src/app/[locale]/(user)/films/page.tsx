import { getMockFilms } from '@/_mock'
import HeaderFixed from '@/app/[locale]/(user)/films/_components/header-fixed'
import VideoCarousel from '@/app/[locale]/(user)/films/_components/video-carousel'
import FilmsPageProvider from '@/app/[locale]/(user)/films/context'
import Footer from '@/components/footer'

const mockVideos = getMockFilms(5)

export default function AccountHomePage() {
    return (
        <>
            <HeaderFixed />
            <main>
                <FilmsPageProvider>
                    <VideoCarousel videos={mockVideos} />
                </FilmsPageProvider>
            </main>
            <Footer className='px-6 md:px-8 lg:px-14' />
        </>
    )
}
