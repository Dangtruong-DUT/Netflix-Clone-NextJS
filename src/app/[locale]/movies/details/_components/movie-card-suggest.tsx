import Image from 'next/image'
import { FilmDetailType } from '@/types/film.type'
import { cn } from '@/lib/utils'

interface MovieCardSimpleProps {
    movie: FilmDetailType
    className?: string
}

export default function MovieCardSimple({ movie, className }: MovieCardSimpleProps) {
    const isInTop10 = movie.rank > 0 && movie.rank <= 10
    return (
        <div
            className={cn(
                'relative group bg-[#1a1a1a] overflow-hidden transition-transform hover:scale-[1.03] shadow-md',
                'w-[140px] sm:w-[150px] md:w-[165px] lg:w-[250px]',
                className
            )}
        >
            <div className='relative w-full aspect-video'>
                <Image
                    src={movie.horizontal_poster}
                    alt={movie.title}
                    fill
                    className='object-cover transition-transform group-hover:scale-[1.02]'
                />

                {movie.isVip && (
                    <div
                        className='
            absolute top-0 left-0 
            bg-gradient-to-r from-[#FFD700] to-[#FFC107] 
            text-black text-[11px] sm:text-xs font-extrabold 
            px-2 py-[2px] sm:py-[3px] 
            tracking-wider uppercase 
            rounded-br-md
            z-20
        '
                    >
                        VIP
                    </div>
                )}

                {isInTop10 && (
                    <div
                        className='absolute z-10 right-0 top-0 
                        bg-red-600 text-white font-bold 
                        flex items-center flex-col justify-center 
                        [clip-path:polygon(0_0,100%_0,100%_100%,0_80%)] 
                        overflow-hidden
                        text-[10px] 
                        p-[2px] sm:p-[3px]  
                        pb-[5px] sm:pb-[6px]  '
                    >
                        <span>TOP</span>
                        <span>10</span>
                    </div>
                )}
            </div>

            <div className='p-2.5'>
                <h3 className='text-sm font-semibold truncate text-white mb-1 hover:text-brand transition-colors cursor-pointer'>
                    {movie.title}
                </h3>

                <div className='flex flex-wrap gap-x-1.5 text-[11px] text-gray-300 mb-1.5'>
                    <span>{movie.year}</span>
                    <span>•</span>
                    <span>{movie.country}</span>
                    <span>•</span>
                    <span>{movie.quality}</span>
                </div>

                <p className='text-xs text-gray-400 line-clamp-2 leading-snug'>{movie.description}</p>
            </div>
        </div>
    )
}
