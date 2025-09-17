import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { TrendingItem } from "@/types/film.type";
import Image from "next/image";

interface TrendingSectionProps {
    trendingItems: TrendingItem[];
}

export default function TrendingSection({ trendingItems }: TrendingSectionProps) {
    return (
        <Carousel className="w-full">
            <CarouselContent className="gap-2 pl-2">
                <div className="flex">
                    {trendingItems.slice(0, 5).map((item) => (
                        <CarouselItem key={item.id} className=" basis-1/2 md:basis-1/3 lg:basis-1/5">
                            <TrendingCard item={item} />
                        </CarouselItem>
                    ))}
                </div>
                <div className="flex">
                    {trendingItems.slice(5, 10).map((item) => (
                        <CarouselItem key={item.id} className=" basis-1/2 md:basis-1/3 lg:basis-1/5">
                            <TrendingCard item={item} />
                        </CarouselItem>
                    ))}
                </div>
            </CarouselContent>
            <CarouselPrevious className="  h-[120px] w-[24px]  [&_svg]:size-6! bg-muted! border-none" />
            <CarouselNext className="  h-[120px] w-[24px] [&_svg]:size-6! bg-muted! border-none" />
        </Carousel>
    );
}

function TrendingCard({ item }: { item: TrendingItem }) {
    return (
        <article className="relative cursor-pointer py-2 px-[22px] w-[224px] h-[268px]">
            <div
                className="w-full h-full rounded-md overflow-hidden bg-cover bg-center"
                style={{ backgroundImage: `url(${item.vertical_poster})` }}
            />
            <div className="absolute bottom-5 -left-2   text-6xl md:text-8xl font-black leading-none z-10 mr-2 select-none">
                <div
                    className="absolute bottom-5 -left-2 text-6xl md:text-8xl font-black leading-none select-none
             text-white dark:text-black
             before:content-[attr(data-content)] before:absolute before:inset-0
             before:[-webkit-text-fill-color:black] before:[-webkit-text-stroke:4px_black] 
             dark:before:[-webkit-text-fill-color:white] dark:before:[-webkit-text-stroke:4px_white]
             before:z-[-1]"
                    data-content={item.rank}
                >
                    {item.rank}
                </div>
            </div>
        </article>
    );
}
