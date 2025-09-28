'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { toast } from 'sonner'
import StarRating from '@/components/star-rating'
import Quit from '@/components/icons/quit'

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
            className={`mb-6 transition-all duration-100 ${isExpanded ? 'bg-[#e5e5e5]/50 dark:bg-white/5 rounded-lg p-4 md:p-5 backdrop-blur-sm border-l-4 border-brand' : ''}`}
        >
            {!isExpanded ? (
                <button
                    onClick={() => setIsExpanded(true)}
                    className='w-full border-l-5 border-1 dark:border-0 dark:border-l-5 border-l-brand py-3 px-4 border-gray-500/35 hover:bg-[#e5e5e5]/50 dark:bg-[#ffffff]/15  dark:hover:bg-[#ffffff]/30 cursor-pointer rounded-lg text-left transition-all duration-200 group'
                >
                    <span className='text-gray-600 dark:text-gray-100 text-base'>{t('addRating')}</span>
                </button>
            ) : (
                <form onSubmit={handleSubmit} className='space-y-4 md:space-y-5'>
                    <div className='flex items-center justify-between'>
                        <h3 className='text-base font-bold dark:text-white text-black'>{t('yourRating')}</h3>
                        <Quit onClick={handleCancel} className='cursor-pointer' />
                    </div>

                    <div className='flex items-start gap-4 md:gap-6'>
                        <div className='flex-1'>
                            <div className='flex flex-col items-start mb-3 md:mb-4'>
                                <div className='relative flex items-center gap-3 md:gap-4'>
                                    <StarRating
                                        rating={rating}
                                        className='cursor-pointer transition-transform hover:scale-105'
                                        onChange={handleStarClick}
                                        onStarHover={(value: number) => setHoverRating(value)}
                                    />
                                    {(hoverRating > 0 || rating > 0) && (
                                        <div className='absolute left-full ml-3 md:ml-4'>
                                            <div className='px-1 py-1 rounded text-sm font-medium whitespace-nowrap border border-gray-300 dark:border-gray-600 shadow-sm'>
                                                {hoverRating > 0
                                                    ? ratingLabels[hoverRating as keyof typeof ratingLabels]
                                                    : ratingLabels[rating as keyof typeof ratingLabels]}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='space-y-2 md:space-y-3'>
                        <textarea
                            value={comment}
                            onChange={(e) => setComment(e.target.value.slice(0, maxChars))}
                            rows={3}
                            placeholder={t('writeComment')}
                            className='w-full p-3 md:p-4 rounded-lg border-1 border-black/50 dark:border-gray-600 dark:bg-[#ffffff]/5 bg-[#e5e5e5]/50 text-black/90 dark:text-gray-100 text-sm'
                        />
                        <div className='flex justify-between items-center text-xs md:text-sm text-black/80 dark:text-gray-400'>
                            <span>
                                {comment.length}/{maxChars} {t('characters')}
                            </span>
                            {comment.length > maxChars * 0.8 && (
                                <span className='text-brand'>
                                    {maxChars - comment.length} {t('characters')}
                                </span>
                            )}
                        </div>
                    </div>

                    <div className='flex flex-col sm:flex-row gap-2 md:gap-3 pt-2 justify-center items-center max-w-xs mx-auto'>
                        <button
                            type='button'
                            onClick={handleCancel}
                            className='w-[70px] h-[32px] sm:w-[80px] md:w-[90px] py-1 px-2 md:py-1.5 md:px-3 rounded-[4px] font-medium bg-[#6d6d6e]/70 hover:bg-[#6d6d6e]/40 transition-all duration-200 backdrop-blur-sm text-sm cursor-pointer'
                        >
                            {t('cancel')}
                        </button>
                        <button
                            type='submit'
                            disabled={rating === 0}
                            className={`w-fit-content h-[32px] sm:w-[80px] md:w-[90px] py-1 px-2 md:py-1.5 md:px-3 rounded-[4px] font-medium transition-all duration-200 text-sm ${
                                rating === 0
                                    ? 'bg-[#6d6d6e]/40 cursor-not-allowed text-white/40 '
                                    : 'bg-brand hover:bg-brand/90 text-white cursor-pointer'
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
