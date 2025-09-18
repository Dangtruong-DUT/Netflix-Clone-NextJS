'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import { Check } from 'lucide-react'

// Mock subscription plans data based on the attachment
const mockSubscriptionPlans = [
    {
        id: 'mobile',
        name: 'Mobile',
        quality: '480p',
        price: '74,000 ₫',
        color: 'from-blue-600 to-blue-800',
        features: {
            videoQuality: 'Khá',
            resolution: '480p',
            supportedDevices: 'Điện thoại di động, máy tính bảng',
            householdDevices: '1',
            downloads: '1'
        }
    },
    {
        id: 'basic',
        name: 'Basic',
        quality: '720p',
        price: '114,000 ₫',
        color: 'from-blue-700 to-purple-700',
        features: {
            videoQuality: 'Tốt',
            resolution: '720p (HD)',
            supportedDevices: 'TV, máy tính, điện thoại di động, máy tính bảng',
            householdDevices: '1',
            downloads: '1'
        }
    },
    {
        id: 'standard',
        name: 'Standard',
        quality: '1080p',
        price: '231,000 ₫',
        color: 'from-purple-600 to-purple-800',
        features: {
            videoQuality: 'Tuyệt vời',
            resolution: '1080p (Full HD)',
            supportedDevices: 'TV, máy tính, điện thoại di động, máy tính bảng',
            householdDevices: '2',
            downloads: '2'
        }
    },
    {
        id: 'premium',
        name: 'Premium',
        quality: '4K + HDR',
        price: '273,000 ₫',
        color: 'from-purple-700 to-red-600',
        isPopular: true,
        features: {
            videoQuality: 'Tốt nhất',
            resolution: '4K (Ultra HD) + HDR',
            supportedDevices: 'TV, máy tính, điện thoại di động, máy tính bảng',
            householdDevices: '4',
            downloads: '6',
            spatialAudio: 'Âm thanh không gian (âm thanh đa chiều)'
        }
    }
]

export default function PlanFormPage() {
    const t = useTranslations('PlanformPage')
    const [selectedPlan, setSelectedPlan] = useState('premium')
    const currentStep = 1

    const handlePlanSelect = (planId: string) => {
        setSelectedPlan(planId)
    }

    const handleContinue = () => {
        console.log('Selected plan:', selectedPlan)
        // Navigate to next step
    }

    return (
        <div className='min-h-screen bg-white'>
            {/* Header */}
            <div className='border-b border-gray-200 px-4 py-3'>
                <div className='flex items-center justify-between max-w-[1200px] mx-auto'>
                    <div className='flex items-center'>
                        <svg viewBox='0 0 111 30' className='h-6 fill-red-600'>
                            <path d='M105.06233,14.2343033 L110.999156,30 C109.249227,29.7497422 107.500234,29.4366857 105.718437,29.1554972 L102.374168,20.4686475 L98.9371075,28.4375293 C97.2499766,28.1563408 95.5928391,28.061674 93.9057081,27.8432843 L99.9372012,14.0931671 L94.4680851,-5.68434189e-14 L99.5313525,-5.68434189e-14 L102.593495,7.87421502 L105.874965,-5.68434189e-14 L110.999156,-5.68434189e-14 L105.06233,14.2343033 Z M90.4686475,-5.68434189e-14 L85.8749649,-5.68434189e-14 L85.8749649,27.2499766 C87.3746368,27.3437061 88.9371075,27.4055675 90.4686475,27.5930265 L90.4686475,-5.68434189e-14 Z M81.9055207,26.93692 C77.7186241,26.6557316 73.5307901,26.4064111 69.250164,26.3117443 L69.250164,-5.68434189e-14 L73.9366389,-5.68434189e-14 L73.9366389,21.8745899 C76.6248008,21.9373887 79.3120255,22.1557784 81.9055207,22.2804387 L81.9055207,26.93692 Z M64.2496954,10.6561065 L64.2496954,15.3435186 L57.8442216,15.3435186 L57.8442216,25.9996251 L53.2186709,25.9996251 L53.2186709,-5.68434189e-14 L66.3436123,-5.68434189e-14 L66.3436123,4.68741213 L57.8442216,4.68741213 L57.8442216,10.6561065 L64.2496954,10.6561065 Z M45.3435186,4.68741213 L45.3435186,26.2498828 C43.7810479,26.2498828 42.1876465,26.2498828 40.6561065,26.3117443 L40.6561065,4.68741213 L35.8121661,4.68741213 L35.8121661,-5.68434189e-14 L50.2183897,-5.68434189e-14 L50.2183897,4.68741213 L45.3435186,4.68741213 Z M30.749836,15.5928391 C28.687787,15.5928391 26.2498828,15.5928391 24.4999531,15.6875059 L24.4999531,22.6562939 C27.2499766,22.4678976 30,22.2495079 32.7809542,22.1557784 L32.7809542,26.6557316 L19.812541,27.6876933 L19.812541,-5.68434189e-14 L32.7809542,-5.68434189e-14 L32.7809542,4.68741213 L24.4999531,4.68741213 L24.4999531,10.9991564 C26.3126816,10.9991564 29.0936358,10.9054269 30.749836,10.9054269 L30.749836,15.5928391 Z M4.78114163,12.9684132 L4.78114163,29.3429562 C3.09401069,29.5313525 1.59340144,29.7497422 0,30 L0,-5.68434189e-14 L4.4690224,-5.68434189e-14 L10.562377,17.0315868 L10.562377,-5.68434189e-14 L15.2497891,-5.68434189e-14 L15.2497891,28.061674 C13.5935889,28.3437998 11.906458,28.4375293 10.1246602,28.6868498 L4.78114163,12.9684132 Z' />
                        </svg>
                    </div>
                    <div className='text-gray-600 text-sm'>{t('signOut')}</div>
                </div>
            </div>

            <div className='max-w-[1200px] mx-auto px-6 py-12'>
                {/* Step indicator */}
                <div className='text-xs text-gray-600 mb-2 uppercase tracking-wider'>
                    {t('stepIndicator', { current: currentStep, total: 3 })}
                </div>

                <h1 className='text-3xl font-normal text-gray-900 mb-12'>{t('title')}</h1>

                {/* Plans Grid */}
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8'>
                    {mockSubscriptionPlans.map((plan) => (
                        <div
                            key={plan.id}
                            className={`relative border-2 rounded-lg overflow-hidden cursor-pointer transition-all ${
                                selectedPlan === plan.id
                                    ? 'border-red-600 shadow-lg'
                                    : 'border-gray-200 hover:border-gray-300'
                            }`}
                            onClick={() => handlePlanSelect(plan.id)}
                        >
                            {/* Popular Badge */}
                            {plan.isPopular && (
                                <div className='absolute top-0 right-0 bg-red-600 text-white text-xs px-3 py-1 rounded-bl-lg font-medium'>
                                    {t('mostPopular')}
                                </div>
                            )}

                            {/* Plan Header */}
                            <div className={`bg-gradient-to-r ${plan.color} text-white p-4`}>
                                <div className='flex items-center justify-between'>
                                    <div>
                                        <h3 className='font-semibold text-lg'>{plan.name}</h3>
                                        <p className='text-sm opacity-90'>{plan.quality}</p>
                                    </div>
                                    {selectedPlan === plan.id && (
                                        <div className='bg-white rounded-full p-1'>
                                            <Check className='w-4 h-4 text-green-600' />
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Plan Content */}
                            <div className='p-4 space-y-4'>
                                <div>
                                    <p className='text-sm text-gray-600'>{t('features.monthlyPrice')}</p>
                                    <p className='font-semibold text-gray-900'>{plan.price}</p>
                                </div>

                                <div>
                                    <p className='text-sm text-gray-600'>{t('features.videoAudioQuality')}</p>
                                    <p className='text-gray-900'>{plan.features.videoQuality}</p>
                                </div>

                                <div>
                                    <p className='text-sm text-gray-600'>{t('features.resolution')}</p>
                                    <p className='text-gray-900'>{plan.features.resolution}</p>
                                </div>

                                <div>
                                    <p className='text-sm text-gray-600'>{t('features.supportedDevices')}</p>
                                    <p className='text-gray-900'>{plan.features.supportedDevices}</p>
                                </div>

                                <div>
                                    <p className='text-sm text-gray-600'>{t('features.householdDevices')}</p>
                                    <p className='text-gray-900'>{plan.features.householdDevices}</p>
                                </div>

                                <div>
                                    <p className='text-sm text-gray-600'>{t('features.downloads')}</p>
                                    <p className='text-gray-900'>{plan.features.downloads}</p>
                                </div>

                                {plan.features.spatialAudio && (
                                    <div>
                                        <p className='text-gray-900 text-sm'>{plan.features.spatialAudio}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Continue Button */}
                <div className='flex justify-center'>
                    <Button
                        onClick={handleContinue}
                        className='bg-red-600 hover:bg-red-700 text-white px-12 py-3 text-base font-normal rounded-sm'
                    >
                        {t('continueButton')}
                    </Button>
                </div>
            </div>
        </div>
    )
}
