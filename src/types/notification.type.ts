export const NotificationsConfig = {
    email: 'email',
    push: 'push',
    text: 'text'
} as const

export type NotificationType = (typeof NotificationsConfig)[keyof typeof NotificationsConfig]
