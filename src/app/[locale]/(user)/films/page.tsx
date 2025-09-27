import { getMockFilms, getMockFilmsWithRank } from '@/_mock'
import HeaderFixed from '@/app/[locale]/(user)/films/_components/header-fixed'
import VideoCarousel from '@/app/[locale]/(user)/films/_components/video-carousel'
import FilmsPageProvider from '@/app/[locale]/(user)/films/context'
import FilmCarousel from '@/components/film-carousel'
import Footer from '@/components/footer'
import { MovieCardHoverInfoProvider, MovieCard } from '@/components/movie-card-hover-info'
import RankedMovieCard from '@/components/ranked-movie-card'
import { CarouselItem } from '@/components/ui/carousel'

const MockSliderMovies = getMockFilms(5)
const mockMovies = getMockFilms(20)

const mockTrendingMovies = getMockFilmsWithRank(9)

export default function AccountHomePage() {
    return (
        <FilmsPageProvider>
            <HeaderFixed />
            <main className='bg-[#141414] text-white'>
                <VideoCarousel movies={MockSliderMovies} />
                <div className='pt-6'>
                    <h2 className='px-6 md:px-8 lg:px-14 mb-4 text-base md:text-lg  lg:text-xl font-semibold t'>
                        Matched to You
                    </h2>
                    <FilmCarousel>
                        {mockMovies.map((item) => (
                            <CarouselItem key={item.id} className='max-w-fit! p-0!'>
                                <MovieCardHoverInfoProvider movie={item}>
                                    <MovieCard className='w-25 xs:w-3 md:w-45  lg:w-55' />
                                </MovieCardHoverInfoProvider>
                            </CarouselItem>
                        ))}
                    </FilmCarousel>
                </div>
                <div className='pt-6'>
                    <h2 className='px-6 md:px-8 lg:px-14 mb-4 text-base md:text-lg  lg:text-xl font-semibold'>
                        New on Netflix
                    </h2>
                    <FilmCarousel>
                        {mockMovies.map((item) => (
                            <CarouselItem key={item.id} className='max-w-fit! p-0!'>
                                <MovieCardHoverInfoProvider movie={item}>
                                    <MovieCard className='w-25 xs:w-3 md:w-45  lg:w-55' />
                                </MovieCardHoverInfoProvider>
                            </CarouselItem>
                        ))}
                    </FilmCarousel>
                </div>
                <div className='pt-6'>
                    <h2 className='px-6 md:px-8 lg:px-14 mb-4 text-base md:text-lg  lg:text-xl font-semibold'>
                        Top 10 movies Today
                    </h2>
                    <FilmCarousel>
                        {mockTrendingMovies.map((item) => (
                            <CarouselItem key={item.id} className='max-w-fit! p-0!'>
                                <MovieCardHoverInfoProvider movie={item}>
                                    <RankedMovieCard movie={item} className='w-fit' />
                                </MovieCardHoverInfoProvider>
                            </CarouselItem>
                        ))}
                    </FilmCarousel>
                </div>
                <div className='pt-6'>
                    <h2 className='px-6 md:px-8 lg:px-14 mb-4 text-base md:text-lg  lg:text-xl font-semibold'>
                        Continue Watching
                    </h2>
                    <FilmCarousel>
                        {mockMovies.map((item) => (
                            <CarouselItem key={item.id} className='max-w-fit! p-0!'>
                                <MovieCardHoverInfoProvider movie={item}>
                                    <MovieCard className='w-25 xs:w-3 md:w-45  lg:w-55' showProgress />
                                </MovieCardHoverInfoProvider>
                            </CarouselItem>
                        ))}
                    </FilmCarousel>
                </div>
                <div className='pt-6'>
                    <h2 className='px-6 md:px-8 lg:px-14 mb-4 text-base md:text-lg  lg:text-xl font-semibold'>
                        We Think You’ll Love These
                    </h2>
                    <FilmCarousel>
                        {mockMovies.map((item) => (
                            <CarouselItem key={item.id} className='max-w-fit! p-0!'>
                                <MovieCardHoverInfoProvider movie={item}>
                                    <MovieCard className='w-25 xs:w-3 md:w-45  lg:w-55' />
                                </MovieCardHoverInfoProvider>
                            </CarouselItem>
                        ))}
                    </FilmCarousel>
                </div>
            </main>
            <Footer className='px-6 md:px-8 lg:px-14 bg-[#141414]' />
        </FilmsPageProvider>
    )
}
