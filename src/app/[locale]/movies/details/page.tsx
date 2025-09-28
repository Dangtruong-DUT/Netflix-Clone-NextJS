import Header from '@/components/header'
import DetailFilm from './_components/information-film'
import { filmDetail } from '@/_mock/index'
import CommentBlock from '@/app/[locale]/movies/details/_components/comment-block'
import Footer from '@/components/footer'
import VideoPlay from '@/app/[locale]/movies/details/_components/video-play'
import FilmCarousel from '@/components/film-carousel'
import SuggestForYou from '@/app/[locale]/movies/details/_components/suggest-for-you'

export default function MovieDetailPage() {
    return (
        <>
            <Header />
            <main className='flex-1 w-full'>
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
            <Footer />
        </>
    )
}
