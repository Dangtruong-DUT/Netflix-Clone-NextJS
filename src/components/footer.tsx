import SelectLanguage from '@/components/locale-switcher-select'
import { Link } from '@/i18n/navigation'
import { cn } from '@/lib/utils'
import React from 'react'

const footerLinks = [
    [
        { label: 'FAQ', href: '#' },
        { label: 'Investor Relations', href: '#' },
        { label: 'Privacy', href: '#' },
        { label: 'Speed Test', href: '#' }
    ],
    [
        { label: 'Help Centre', href: '#' },
        { label: 'Jobs', href: '#' },
        { label: 'Cookie Preferences', href: '#' },
        { label: 'Legal Notices', href: '#' }
    ],
    [
        { label: 'Account', href: '#' },
        { label: 'Ways to Watch', href: '#' },
        { label: 'Corporate Information', href: '#' },
        { label: 'Only on Netflix', href: '#' }
    ],
    [
        { label: 'Media Centre', href: '#' },
        { label: 'Terms of Use', href: '#' },
        { label: 'Contact Us', href: '#' }
    ]
]
interface FooterProps {
    className?: string
}
export default function Footer({ className }: FooterProps) {
    return (
        <footer className={cn('w-full text-muted-foreground p-4 md:py-18 px-6 md:px-8 lg:px-37 text-sm', className)}>
            <Link href='#' className='block mb-6 text-base underline '>
                Questions? Contact us.
            </Link>
            <div className='grid grid-cols-2 md:grid-cols-4 gap-4 mb-8'>
                {footerLinks.map((col, i) => (
                    <ul key={i} className='space-y-3'>
                        {col.map((link) => (
                            <li key={link.label}>
                                <Link href={link.href} className='hover:underline text-sm'>
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                ))}
            </div>
            <div className='mb-6'>
                <SelectLanguage />
            </div>
            <div>Netflix Vietnam</div>
        </footer>
    )
}
