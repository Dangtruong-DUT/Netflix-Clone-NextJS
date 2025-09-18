import { Dialog, DialogContent } from '@/components/ui/dialog'
import { TrendingItem } from '@/types/film.type'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { X, Play, ChevronRight } from 'lucide-react'
import { toast } from 'sonner'
import { Badge } from '@/components/ui/badge'

interface MoviePreviewModalProps {
    movie: TrendingItem | null
    onClose: () => void
}

export default function MoviePreviewModal({ movie, onClose }: MoviePreviewModalProps) {
    if (!movie) return null
    const handleGetStartedClick = () => {
        toast.info('Feature Coming Soon!')
    }
    return (
        <Dialog open={!!movie} onOpenChange={onClose}>
            <DialogContent
                className='max-w-4xl! w-full! p-0 bg-black border-none overflow-hidden border!'
                showCloseButton={false}
            >
                <Button
                    variant='outline'
                    size='icon'
                    className='absolute top-4 right-4 z-50 hover:bg-black/70 text-white rounded-full'
                    onClick={onClose}
                >
                    <X className='size-6' />
                </Button>

                <div>
                    <div className='relative aspect-video  w-full'>
                        <Image src={movie.horizontal_poster} alt={movie.title} fill className='object-cover' />
                        <div className='absolute inset-0  bg-[linear-gradient(40deg,rgb(22,22,22)_24.16%,rgba(6,10,23,0)_56.61%),linear-gradient(0deg,rgb(22,22,22)_3.91%,rgba(6,10,23,0)_69.26%)]' />
                    </div>

                    <div className='w-full bg-[rgb(22,22,22)] p-8'>
                        <div className='flex items-center gap-3 mb-4'>
                            <Badge>{movie.release_year}</Badge>
                            <Badge> {movie.maturity_rating}</Badge>
                            <Badge> {movie.maturity_rating}</Badge>
                            <>
                                {movie.genres.map((genre, index) => (
                                    <Badge key={`genre-${index}`}> {genre}</Badge>
                                ))}
                            </>
                        </div>

                        <p className='text-white text-lg mb-6 max-w-2xl leading-relaxed drop-shadow-md'>
                            {movie.description}
                        </p>

                        <Button
                            className='bg-red-600 hover:bg-red-700 text-white px-8 py-3 text-lg font-semibold rounded-md flex items-center gap-2'
                            onClick={handleGetStartedClick}
                        >
                            Get started <ChevronRight className='size-7' />
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
