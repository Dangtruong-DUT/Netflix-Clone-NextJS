import StickyHeaderWrapper from './_components/sticky-header-wrapper'
import DetailFilm from './_components/information-film'
import { filmDetail } from '@/_mock/index'
import CommentBlock from '@/app/[locale]/movies/details/_components/comment-block'
import Footer from '@/components/footer'
import VideoPlay from '@/app/[locale]/movies/details/_components/video-play'
import SuggestForYou from '@/app/[locale]/movies/details/_components/suggest-for-you'

export default function MovieDetailPage() {
    return (
        <div className='bg-[#141414] text-white min-h-screen flex flex-col'>
            <StickyHeaderWrapper buttonClassName='text-white bg-transparent hover:bg-transparent hover:text-white' />
            <main className='flex-1 w-full pt-14'>
                <section className='w-full py-6'>
                    <VideoPlay />
                </section>
                <section className='w-full py-2'>
                    <DetailFilm informationFilm={filmDetail} />
                </section>
                <section className='w-full py-2'>
                    <SuggestForYou />
                </section>
                <section id='comment-block' className='w-full'>
                    <CommentBlock informationFilm={filmDetail} />
                </section>
            </main>
            <Footer className='px-6 md:px-8 lg:px-15' />
        </div>
    )
}
