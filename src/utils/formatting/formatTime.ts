import { localesType } from '@/i18n/i18n-config'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import vi from 'javascript-time-ago/locale/vi'

TimeAgo.addLocale(en)
TimeAgo.addDefaultLocale(vi)
TimeAgo.setDefaultLocale('en')

export function timeAgo({ locale, date }: { locale: localesType; date: string }) {
    try {
        const parsedDate = new Date(date)
        const timeAgo = new TimeAgo(locale)
        return timeAgo.format(parsedDate, 'twitter-minute-now')
    } catch (error) {
        console.error('Error in timeAgo function:', error)
        return ''
    }
}
