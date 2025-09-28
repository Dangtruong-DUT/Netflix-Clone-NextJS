'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { toast } from 'sonner'
import StarRating from '@/app/[locale]/movies/details/_components/star-rating'

type Props = {
    onSubmit?: (rating: number, comment: string) => void
}

export default function RatingForm({ onSubmit }: Props) {
    const t = useTranslations('RatingForm')
    const [rating, setRating] = useState(0)
    const [hoverRating, setHoverRating] = useState(0)
    const [comment, setComment] = useState('')
    const [isExpanded, setIsExpanded] = useState(false)
    const maxChars = 400

    const ratingLabels: { [key in 1 | 2 | 3 | 4 | 5]: string } = {
        1: t('rating.terrible'),
        2: t('rating.bad'),
        3: t('rating.ok'),
        4: t('rating.good'),
        5: t('rating.excellent')
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        if (rating === 0) {
            toast.error(t('pleaseSelectRating'))
            return
        }

        if (typeof onSubmit === 'function') {
            onSubmit(rating, comment)
        } else {
            console.warn('onSubmit is not a function')
        }
        toast.success(t('ratingSuccess', { rating }))
        setRating(0)
        setComment('')
        setIsExpanded(false)
    }

    const handleStarClick = (value: number) => {
        setRating(value)
        if (!isExpanded) {
            setIsExpanded(true)
        }
    }

    const handleCancel = () => {
        setRating(0)
        setComment('')
        setIsExpanded(false)
    }

    return (
        <div
            className={`mb-6 transition-all duration-100 ${isExpanded ? 'bg-black/20 dark:bg-white/5 rounded-lg p-4 md:p-5 backdrop-blur-sm border-l-4 border-brand' : ''}`}
        >
            {!isExpanded ? (
                <button
                    onClick={() => setIsExpanded(true)}
                    className='w-full border-l-5 border-0 border-l-brand py-3 px-4 border-gray-500 hover:bg-yellow-100 dark:bg-[#ffffff]/15  dark:hover:bg-[#ffffff]/30 cursor-pointer rounded-lg text-left transition-all duration-200 group'
                >
                    <span className='text-gray-600 dark:text-gray-100 text-base md:text-lg'>{t('addRating')}</span>
                </button>
            ) : (
                <form onSubmit={handleSubmit} className='space-y-4 md:space-y-5'>
                    <div className='flex items-center justify-between'>
                        <h3 className='text-lg md:text-xl font-bold text-white dark:text-gray-100'>
                            {t('yourRating')}
                        </h3>
                        <button
                            type='button'
                            onClick={handleCancel}
                            className='text-white/60 dark:text-gray-400 hover:text-white dark:hover:text-gray-100 transition-colors p-1 rounded-full hover:bg-white/10 dark:hover:bg-gray-600'
                        >
                            <svg
                                className='w-5 h-5 md:w-6 md:h-6'
                                fill='none'
                                stroke='currentColor'
                                viewBox='0 0 24 24'
                            >
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth={2}
                                    d='M6 18L18 6M6 6l12 12'
                                />
                            </svg>
                        </button>
                    </div>

                    {/* Star Rating Section */}
                    <div className='flex items-start gap-4 md:gap-6'>
                        <div className='flex-1'>
                            <div className='flex flex-col items-start mb-3 md:mb-4'>
                                <div className='relative flex items-center gap-3 md:gap-4'>
                                    <StarRating
                                        value={rating}
                                        size={28}
                                        gap={2}
                                        className='cursor-pointer transition-transform hover:scale-105'
                                        onChange={handleStarClick}
                                        onStarHover={(value: number) => setHoverRating(value)}
                                    />
                                    {/* Tooltip hiển thị bên phải */}
                                    {(hoverRating > 0 || rating > 0) && (
                                        <div className='absolute left-full ml-3 md:ml-4'>
                                            <div className='bg-black/80 dark:bg-gray-800 text-white dark:text-gray-100 px-2 py-1 md:px-3 md:py-2 rounded text-xs md:text-sm font-medium whitespace-nowrap backdrop-blur-sm border border-white/10 dark:border-gray-600'>
                                                {hoverRating > 0
                                                    ? ratingLabels[hoverRating as keyof typeof ratingLabels]
                                                    : ratingLabels[rating as keyof typeof ratingLabels]}
                                            </div>
                                            {/* Arrow pointer */}
                                            <div className='absolute right-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-r-black/80 dark:border-r-gray-800'></div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Comment Section */}
                    <div className='space-y-2 md:space-y-3'>
                        <textarea
                            value={comment}
                            onChange={(e) => setComment(e.target.value.slice(0, maxChars))}
                            rows={3}
                            placeholder={t('writeComment')}
                            className='w-full p-3 md:p-4 rounded-lg border border-white/10 dark:border-gray-600 bg-black/40 dark:bg-gray-700/50 text-white dark:text-gray-100 placeholder-white/40 dark:placeholder-gray-400 focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand resize-none transition-all duration-200 backdrop-blur-sm text-sm md:text-base'
                        />
                        <div className='flex justify-between items-center text-xs md:text-sm text-white/60 dark:text-gray-400'>
                            <span>
                                {comment.length}/{maxChars} {t('characters')}
                            </span>
                            {comment.length > maxChars * 0.8 && (
                                <span className='text-red-400 dark:text-red-300'>
                                    {maxChars - comment.length} {t('characters')}
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Submit Button - Gom nhỏ và căn giữa */}
                    <div className='flex flex-col sm:flex-row gap-2 md:gap-3 pt-2 justify-center items-center max-w-xs mx-auto'>
                        <button
                            type='button'
                            onClick={handleCancel}
                            className='w-full sm:flex-1 py-2 px-4 md:py-2.5 md:px-5 rounded-lg border border-white/10 dark:border-gray-600 text-white dark:text-gray-100 font-medium hover:bg-white/10 dark:hover:bg-gray-600 transition-all duration-200 backdrop-blur-sm text-sm md:text-base'
                        >
                            {t('cancel')}
                        </button>
                        <button
                            type='submit'
                            disabled={rating === 0}
                            className={`w-full sm:flex-1 py-2 px-4 md:py-2.5 md:px-5 rounded-lg font-medium transition-all duration-200 text-sm md:text-base ${
                                rating === 0
                                    ? 'bg-white/10 dark:bg-gray-600 cursor-not-allowed text-white/40 dark:text-gray-500 border border-white/5 dark:border-gray-600'
                                    : 'bg-brand hover:bg-brand/90 text-white cursor-pointer border border-brand'
                            }`}
                        >
                            {t('submitRating')}
                        </button>
                    </div>
                </form>
            )}
        </div>
    )
}
