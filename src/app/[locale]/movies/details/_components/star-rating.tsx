'use client'

import FiveStar from '@/components/ui/five-star'
import React from 'react'

type StarRatingProps = {
    value: number
    size?: number
    gap?: number
    className?: string
    onChange?: (value: number) => void
    onStarHover?: (value: number) => void
}

export default function StarRating({
    value,
    size = 16,
    gap = 0.5,
    className = '',
    onChange,
    onStarHover
}: StarRatingProps) {
    const stars = [1, 2, 3, 4, 5]

    return (
        <div
            className={`inline-flex items-center ${className}`}
            aria-label={`Rating ${value} out of 5`}
            style={{ gap: `${gap}px` }}
        >
            {stars.map((star) => (
                <button
                    key={star}
                    type='button'
                    onClick={() => onChange?.(star)}
                    onMouseEnter={() => onStarHover?.(star)}
                    onMouseLeave={() => onStarHover?.(0)}
                    className='focus:outline-none'
                >
                    <FiveStar
                        key={star}
                        size={size}
                        fillType={value >= star ? 'full' : value > star - 1 && value < star ? 'half' : 'empty'}
                        starId={star}
                    />
                </button>
            ))}
        </div>
    )
}
