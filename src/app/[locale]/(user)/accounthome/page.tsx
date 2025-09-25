import { getMockFilms } from '@/_mock'
import VideoCarousel from '@/app/[locale]/(user)/accounthome/_components/video-carousel'
import Header from '@/components/header'

const mockVideos = getMockFilms(5)

export default function AccountHomePage() {
    return (
        <div>
            <Header className='fixed w-full top-0 z-10 bg-transparent  px-6 md:px-8 lg:px-14' />
            <VideoCarousel videos={mockVideos} />
        </div>
    )
}
