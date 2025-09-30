'use client'

import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '@/components/ui/dialog'
import { Card, CardContent } from '@/components/ui/card'
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
                className='w-fit min-w-[40%] max-w-[50vw] sm:min-w-0 sm:max-w-xs md:max-w-md max-h-[70vh] p-0.5 sm:p-2 md:p-4'
            >
                <DialogHeader className='hidden'>
                    <DialogTitle>Share this content</DialogTitle>
                </DialogHeader>
                <Carousel
                    opts={{
                        align: 'start'
                    }}
                    className='w-full max-w-[50vw] sm:max-w-xs mx-auto relative'
                >
                    <CarouselContent>
                        {shareItems.map((item, index) => (
                            <CarouselItem key={index} className='basis-1/2 sm:basis-1/3 md:basis-1/3 lg:basis-1/3'>
                                <div className='p-0.5'>
                                    <CardContent
                                        className='flex flex-col aspect-[1/0.7] items-center justify-center p-0.5 gap-0.5 cursor-pointer transition-colors text-[36px] sm:text-[36px] md:text-[48px] lg:text-[64px] h-fit hover:bg-accent/90 rounded-md'
                                        onClick={item.onClick}
                                    >
                                        {item.icon}
                                        <span className='text-[10px] sm:text-xs font-medium truncate'>{item.name}</span>
                                    </CardContent>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <div className='flex justify-between mt-2'>
                        <CarouselPrevious className='text-[18px] sm:text-[24px]' />
                        <CarouselNext className='text-[18px] sm:text-[24px]' />
                    </div>
                </Carousel>
            </DialogContent>
        </Dialog>
    )
}
