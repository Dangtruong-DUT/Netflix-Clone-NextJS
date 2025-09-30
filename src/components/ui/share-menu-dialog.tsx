'use client'

import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '@/components/ui/dialog'
import { CardContent } from '@/components/ui/card'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { toast } from 'sonner'
import { createShareItems } from '@/components/share-items'
import { useCallback, useMemo } from 'react'
import { DialogTitle } from '@radix-ui/react-dialog'

interface ShareMenuDialogProps {
    url: string
    children: React.ReactNode
}

export function ShareMenuDialog({ url, children }: ShareMenuDialogProps) {
    const handleCopyLink = useCallback(async () => {
        try {
            await navigator.clipboard.writeText(url)
            toast.success('Link copied to clipboard!', {
                position: 'top-center'
            })
        } catch (_) {
            /* empty */
        }
    }, [url])

    const shareItems = useMemo(() => createShareItems(url, handleCopyLink), [url, handleCopyLink])

    return (
        <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent
                showCloseButton={false}
                className='
          sm:w-fit min-w-lg!
          p-3
          min-h-[100px] 
          sm:min-h-[150px]
          md:min-h-[180px] 
          lg:min-h-[180px] 
          max-h-[70vh]        /* 📏 giới hạn chiều cao tối đa */
          overflow-y-auto     /* 📜 cho phép scroll nếu icon quá nhiều */
          transition-all
              w-[80%]            /* 📱 Mobile: chiếm 90% màn hình */
            max-w-[100px] 
        '
            >
                <DialogHeader className='hidden'>
                    <DialogTitle>Share this content</DialogTitle>
                </DialogHeader>

                <Carousel
                    opts={{
                        align: 'center'
                    }}
                    className='w-fit max-w-sm mx-auto'
                >
                    <CarouselContent>
                        {shareItems.map((item, index) => (
                            <CarouselItem
                                key={index}
                                className='
                  max-[350px]:basis-full
                  basis-1/4     /* 📱 Mobile: chỉ 2 icon/slide để không quá cao */
                  sm:basis-1/3   /* 📏 Tablet: 3 icon */
                  md:basis-1/3
                  lg:basis-1/3   /* 🖥️ Desktop: có thể 4 icon */
                '
                            >
                                <div className='p-1'>
                                    <CardContent
                                        className='
                      flex flex-col aspect-[3/4] items-center justify-center 
                      p-2 gap-2 cursor-pointer 
                      transition-colors text-[48px] sm:text-[56px] md:text-[64px] 
                      hover:bg-accent/90 rounded-md
                    '
                                        onClick={item.onClick}
                                    >
                                        {item.icon}
                                        <span className='text-xs font-medium text-center'>{item.name}</span>
                                    </CardContent>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>

                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            </DialogContent>
        </Dialog>
    )
}
