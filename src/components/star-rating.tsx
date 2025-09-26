import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa'
import { cn } from '@/lib/utils'

interface StarRatingProps {
    rating: number
    max?: number
    className?: string
}

export default function StarRating({ rating, max = 5, className }: StarRatingProps) {
    return (
        <div className={cn('flex items-center gap-1', className)}>
            {Array.from({ length: max }, (_, i) => {
                const starValue = i + 1
                if (rating >= starValue) {
                    return <FaStar key={i} className='text-yellow-500 w-5 h-5' />
                } else if (rating >= starValue - 0.5) {
                    return <FaStarHalfAlt key={i} className='text-yellow-500 w-5 h-5' />
                } else {
                    return <FaRegStar key={i} className='text-yellow-500 w-5 h-5' />
                }
            })}
        </div>
    )
}
