import FilmCarousel from '@/components/film-carousel'
import MovieCard from '@/components/movie-card'
import { MovieCardHoverInfoProvider } from '@/components/movie-card-hover-info'
import { CarouselItem } from '@/components/ui/carousel'
import { getMockFilms } from '@/_mock'
import { useTranslations } from 'next-intl'

export default function SuggestForYou() {
    const mockMovies = getMockFilms(20)
    const t = useTranslations('FilmsPage.sections')
    return (
        <div className='pt-6'>
            <div className='px-6 md:px-8 lg:px-37'>
                <h2 className='px-6 md:px-8 lg:px-14 mb-4 text-base md:text-lg lg:text-xl font-semibold'>
                    {t('matchedToYou')}
                </h2>
            </div>
            <FilmCarousel>
                {mockMovies.map((item) => (
                    <CarouselItem key={item.id} className='max-w-fit! p-0!'>
                        <MovieCardHoverInfoProvider movie={item}>
                            <MovieCard movie={item} className='w-25 xs:w-3 md:w-45 lg:w-55' />
                        </MovieCardHoverInfoProvider>
                    </CarouselItem>
                ))}
            </FilmCarousel>
        </div>
    )
}
