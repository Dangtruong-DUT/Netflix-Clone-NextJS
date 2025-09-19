import { Link } from '@/i18n/navigation'
import { ChevronLeft } from 'lucide-react'
import PasswordChangeForm from './_components/password-change-form'
import { getTranslations } from 'next-intl/server'

export default async function ChangePasswordPage() {
    const t = await getTranslations('PasswordPage')

    return (
        <div className='min-h-screen px-6 py-8 bg-background'>
            <div className='max-w-2xl mx-auto'>
                <div className='flex items-center mb-6'>
                    <Link href='/account' className='mr-4 p-2 hover:bg-accent rounded-full transition-colors'>
                        <ChevronLeft className='w-6 h-6' />
                    </Link>
                    <div>
                        <h1 className='text-4xl font-bold mb-2'>{t('title')}</h1>
                        <p className='text-muted-foreground text-base leading-relaxed'>{t('subtitle')}</p>
                    </div>
                </div>

                <PasswordChangeForm />
            </div>
        </div>
    )
}
