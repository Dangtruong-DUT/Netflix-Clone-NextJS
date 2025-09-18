'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import { Check } from 'lucide-react'
import { mockSubscriptionPlans } from '@/_mock/subscription-plans'
import { cn } from '@/lib/utils'

export default function PlanFormPage() {
    const t = useTranslations('PlanformPage')
    const [selectedPlan, setSelectedPlan] = useState('premium')
    const currentStep = 1

    const handlePlanSelect = (planId: string) => {
        setSelectedPlan(planId)
    }

    const handleContinue = () => {
        console.log('Selected plan:', selectedPlan)
    }

    return (
        <div className='min-h-screen '>
            <div className='max-w-[1200px] mx-auto px-6 py-12'>
                <div className='text-xs text-gray-600 mb-2 uppercase tracking-wider'>
                    {t('stepIndicator', { current: currentStep, total: 3 })}
                </div>

                <h1 className='text-3xl font-semibold text-gray-900 mb-12'>{t('title')}</h1>

                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12'>
                    {mockSubscriptionPlans.map((plan) => (
                        <div
                            key={plan.id}
                            className={cn('relative rounded-2xl  cursor-pointer transition-all duration-300 border-2', {
                                'border-gray-300 shadow-xl': selectedPlan === plan.id,
                                'border-gray-200': selectedPlan !== plan.id,
                                'rounded-tl-none rounded-tr-none': plan.isPopular
                            })}
                            onClick={() => handlePlanSelect(plan.id)}
                        >
                            {plan.isPopular && (
                                <div className='absolute -top-7 left-1/2  w-[101%]   border-brand transform -translate-x-1/2 bg-brand text-white text-xs px-5 py-2  font-medium shadow-lg z-10 rounded-tl-xl rounded-tr-xl text-center'>
                                    {t('mostPopular')}
                                </div>
                            )}

                            <div
                                className='relative flex flex-col cursor-pointer'
                                style={{
                                    borderRadius: '12px',
                                    boxShadow: 'rgba(0, 0, 0, 0) 0px 0px 0px 0px',
                                    boxSizing: 'border-box',
                                    color: 'white',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    margin: '8px',
                                    minHeight: '83px',
                                    padding: '10px 16px',
                                    background:
                                        'radial-gradient(140.76% 131.96% at 100% 100%, rgb(109, 59, 227) 0%, rgba(74, 42, 150, 0.5) 73.57%, rgba(74, 42, 150, 0) 100%), rgb(29, 82, 157)'
                                }}
                            >
                                <div className='flex items-start justify-between h-full'>
                                    <div>
                                        <h3 className='font-semibold text-lg mb-1'>{plan.name}</h3>
                                        <p className='text-base opacity-90'>{plan.quality}</p>
                                    </div>
                                </div>
                                {selectedPlan === plan.id && (
                                    <div className='absolute bottom-2 right-2 bg-white  rounded-full p-1'>
                                        <Check className='w-3 h-3 text-blue-600' />
                                    </div>
                                )}
                            </div>

                            <div className=' p-6 pt-4'>
                                <div className='pb-3 mb-3 border-b border-gray-100'>
                                    <p className='text-sm text-gray-600 mb-1'>{t('features.monthlyPrice')}</p>
                                    <p className='font-semibold text-lg text-gray-900'>{plan.price}</p>
                                </div>

                                <div className='space-y-3'>
                                    <div className='pb-3 border-b border-gray-100'>
                                        <p className='text-sm text-gray-600 mb-1'>{t('features.videoAudioQuality')}</p>
                                        <p className='text-gray-900'>{plan.features.videoQuality}</p>
                                    </div>

                                    <div className='pb-3 border-b border-gray-100'>
                                        <p className='text-sm text-gray-600 mb-1'>{t('features.resolution')}</p>
                                        <p className='text-gray-900'>{plan.features.resolution}</p>
                                    </div>

                                    <div className='pb-3 border-b border-gray-100'>
                                        <p className='text-sm text-gray-600 mb-1'>{t('features.supportedDevices')}</p>
                                        <p className='text-gray-900 text-sm leading-relaxed'>
                                            {plan.features.supportedDevices}
                                        </p>
                                    </div>

                                    <div className='pb-3 border-b border-gray-100'>
                                        <p className='text-sm text-gray-600 mb-1'>{t('features.householdDevices')}</p>
                                        <p className='text-gray-900 font-medium'>{plan.features.householdDevices}</p>
                                    </div>

                                    <div
                                        className={`${plan.features.spatialAudio ? 'pb-3 border-b border-gray-100' : ''}`}
                                    >
                                        <p className='text-sm text-gray-600 mb-1'>{t('features.downloads')}</p>
                                        <p className='text-gray-900 font-medium'>{plan.features.downloads}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className='max-w-4xl mb-4 text-left space-y-2 text-gray-600 text-sm leading-relaxed'>
                    <p>{t('disclaimer.hdAvailability')}</p>
                    <p>{t('disclaimer.deviceLimits')}</p>
                    <p>{t('disclaimer.liveEvents')}</p>
                </div>

                <div className='flex justify-center mb-8 '>
                    <Button
                        onClick={handleContinue}
                        className='bg-red-600 hover:bg-red-700 text-white px-30 py-6 text-lg font-medium rounded-sm min-w-[200px]'
                    >
                        {t('continueButton')}
                    </Button>
                </div>
            </div>
        </div>
    )
}
