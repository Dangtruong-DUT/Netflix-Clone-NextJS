import { cn } from '@/lib/utils'
import { FilmDetailType } from '@/types/film.type'

interface RankedMovieCardProps {
    movie: FilmDetailType
    className?: string
}

export default function RankedMovieCard({ movie, className }: RankedMovieCardProps) {
    return (
        <article
            className={cn(
                'relative cursor-pointer py-2 hover:scale-102 transition-transform duration-300 w-full flex items-center',
                className
            )}
        >
            <div
                className='

          flex-shrink-0 
          font-black leading-none select-none
          text-white dark:text-black
          relative
          left-1/2 -translate-x-1/2
          before:content-[attr(data-content)] before:absolute before:inset-0
          before:[-webkit-text-fill-color:black] before:[-webkit-text-stroke:4px_black] 
          dark:before:[-webkit-text-fill-color:transparent] dark:before:[-webkit-text-stroke:4px_rgba(255,255,255,0.3)]
          before:z-[-1] z-0
          flex items-center justify-center
        '
                style={{
                    fontSize: 'clamp(4rem, 15vw, 12rem)',
                    lineHeight: 1,
                    height: '100%'
                }}
                data-content={movie.rank}
            >
                {movie.rank}
            </div>

            <div
                className='relative z-1 w-1/2 aspect-[9/13] overflow-hidden bg-cover bg-center ml-2'
                style={{ backgroundImage: `url(${movie.vertical_poster})` }}
            />
        </article>
    )
}
