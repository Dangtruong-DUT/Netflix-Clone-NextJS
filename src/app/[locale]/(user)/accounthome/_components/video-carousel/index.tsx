import * as React from 'react'

import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import { FilmDetailType } from '@/types/film.type'
import { cn } from '@/lib/utils'
import CarouselItemContent from '@/app/[locale]/(user)/accounthome/_components/video-carousel/carouse-iItem-content'
import Indicator from '@/app/[locale]/(user)/accounthome/_components/video-carousel/indicator'

interface VideoCarouselProps {
    className?: string
    videos: Array<FilmDetailType>
}

export default function VideoCarousel({ className, videos }: VideoCarouselProps) {
    return (
        <Carousel
            className={cn('w-full relative @container', className)}
            opts={{ duration: 30, loop: true }}
            orientation='horizontal'
        >
            <CarouselContent className='-ml-2 md:-ml-4 pointer-events-none '>
                {videos.map((video) => (
                    <CarouselItem key={video.id} className='pl-2 md:pl-4 basis-full'>
                        <CarouselItemContent video={video} />
                    </CarouselItem>
                ))}
            </CarouselContent>
            <Indicator
                autoPlayInterval={30000}
                wrapperClassName='absolute bottom-[10%] right-6  md:right-8 lg:right-14 hidden @lg:flex'
                CarouselArrowsClassName='bg-black/30 hover:bg-black/50 size-10 [&_svg]:size-6 hover:text-brand hover:border-brand'
                dotClassName='bg-white/30 w-[12px] h-[6px]'
                activeDotClassName='bg-white w-9 h-[6px]'
            />
        </Carousel>
    )
}
