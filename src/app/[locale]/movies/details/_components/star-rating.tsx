'use client'

import FiveStar from '@/components/ui/five-star'
import React from 'react'

type StarRatingProps = {
    value: number
    size?: number
    gap?: number
    showValue?: boolean
    className?: string
}

export default function StarRating({ value, size = 16, gap = 0.5, showValue = true, className = '' }: StarRatingProps) {
    const stars = [1, 2, 3, 4, 5]

    return (
        <div
            className={`inline-flex items-center ${className}`}
            aria-label={`Rating ${value} out of 5`}
            style={{ gap: `${gap}px` }}
        >
            {stars.map((star) => (
                <FiveStar
                    key={star}
                    size={size}
                    fillType={value >= star ? 'full' : value > star - 1 && value < star ? 'half' : 'empty'}
                    starId={star}
                />
            ))}
            {showValue && <span className='ml-2 text-sm dark:text-white text-black'>{value.toFixed(1)}</span>}
        </div>
    )
}
