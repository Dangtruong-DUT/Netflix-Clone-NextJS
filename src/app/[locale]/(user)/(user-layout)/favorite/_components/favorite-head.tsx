'use client'

import DialogConfirm from '@/app/[locale]/(user)/(user-layout)/history/_components/confirm-dialog'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { ArrowLeft, Search, Edit, X, Trash2 } from 'lucide-react'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { useState } from 'react'
import { toast } from 'sonner'

interface FavoriteHeadProps {
    isEditing: boolean
    setIsEditing: (val: boolean) => void
    selectedMovies: string[]
    setSelectedMovies: (val: string[]) => void
    onSelectAll?: () => void
    allSelected?: boolean
}

export default function FavoriteHead({
    isEditing,
    setIsEditing,
    selectedMovies,
    setSelectedMovies,
    onSelectAll,
    allSelected
}: FavoriteHeadProps) {
    const t = useTranslations('FavoritePage')
    const [open, setOpen] = useState(false)
    const [searchValue, setSearchValue] = useState('')

    const handleDelete = () => {
        if (selectedMovies.length === 0) {
            toast.error(t('messages.noSelected'), { duration: 4000 })
            return
        }
        setOpen(true)
    }

    const handleConfirm = () => {
        toast.success(t('messages.deleteSuccess'), { duration: 4000 })
        setSelectedMovies([])
        setIsEditing(false)
        setOpen(false)
    }

    const toggleEditMode = () => {
        setIsEditing(!isEditing)
        setSelectedMovies([])
    }

    return (
        <div className='mx-auto w-full px-6 md:px-8 lg:px-14 py-10'>
            <div className='flex flex-row items-center justify-between gap-4 flex-wrap md:flex-nowrap'>
                <Link href={'/films'} className='flex items-center gap-2'>
                    <ArrowLeft className='w-5 h-5 hover:text-gray-300 transition' />
                    <h1 className='text-lg md:text-xl font-bold'>{t('title')}</h1>
                </Link>

                <div className='flex items-center gap-2 flex-1 max-w-[480px]'>
                    <div className='relative flex-1 group'>
                        <Search
                            className='
                                absolute left-1.5 md:left-2 top-1/2 -translate-y-1/2
                                w-4 h-4 md:w-5 md:h-5
                                text-gray-500 dark:text-gray-400 transition-all duration-300
                                group-hover:text-black dark:group-hover:text-white
                                group-focus-within:text-black dark:group-focus-within:text-white
                            '
                        />
                        <input
                            type='text'
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                            placeholder={t('searchFavorites')}
                            className='w-full bg-transparent border-b border-gray-400/30 text-sm text-gray-900 dark:text-white py-2 pl-9 pr-8 outline-none focus:border-transparent'
                        />
                        {searchValue && (
                            <button
                                onClick={() => setSearchValue('')}
                                className='absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black'
                                aria-label='Clear search'
                            >
                                <X className='w-5 h-5' />
                            </button>
                        )}
                        <span className='absolute left-1/2 bottom-0 h-[1.5px] bg-black dark:bg-white w-0 group-focus-within:w-full transition-all duration-300 ease-out origin-center transform -translate-x-1/2' />
                    </div>

                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant='destructive'
                                size='sm'
                                onClick={handleDelete}
                                className={`flex items-center gap-1 bg-brand transition-opacity duration-200 ${
                                    isEditing ? 'opacity-100 cursor-pointer' : 'opacity-0 pointer-events-none'
                                }`}
                            >
                                <Trash2 className='w-4 h-4' />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>{t('tooltip.removeFromList')}</p>
                        </TooltipContent>
                    </Tooltip>

                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant='outline'
                                size='icon'
                                onClick={toggleEditMode}
                                className='hover:bg-gray-200 dark:hover:bg-gray-700 transition cursor-pointer'
                            >
                                <Edit className='w-5 h-5' />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>{t('editFavorites')}</p>
                        </TooltipContent>
                    </Tooltip>
                </div>
            </div>
            <div className='mt-8'>
                {isEditing && onSelectAll && (
                    <label className='flex items-center gap-2 cursor-pointer'>
                        <input type='checkbox' checked={allSelected} onChange={onSelectAll} className='w-4 h-4' />
                        <span>{allSelected ? 'Bỏ chọn tất cả' : 'Chọn tất cả'}</span>
                        <span>({selectedMovies.length})</span>
                    </label>
                )}
            </div>

            <DialogConfirm
                open={open}
                title={t('messages.confirmDelete')}
                onClose={() => setOpen(false)}
                onConfirm={handleConfirm}
                cancelText={t('messages.cancel')}
                confirmText={t('messages.confirm')}
            />
        </div>
    )
}
