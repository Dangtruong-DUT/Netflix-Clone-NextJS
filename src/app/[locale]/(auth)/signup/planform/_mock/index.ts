import { SubscriptionPlanType } from '@/types/subscription.type'

const mobilePlan: SubscriptionPlanType = {
    id: 'mobile',
    name: 'Mobile',
    resolution: '480p',
    price: 74000,
    currency: '₫',
    quality: 'Khá',
    supportedDevices: ['Điện thoại di động', 'Máy tính bảng'],
    simultaneousScreens: 1,
    downloads: 1
}

export const mockSubscriptionPlans: SubscriptionPlanType[] = Array(4)
    .fill(mobilePlan)
    .map((plan, index) => ({
        ...plan,
        id: plan.id + index,
        name: index === 0 ? 'Mobile' : index === 1 ? 'Basic' : index === 2 ? 'Standard' : 'Premium',
        resolution: index === 0 ? '480p' : index === 1 ? '480p' : index === 2 ? '1080p' : '4K+HDR',
        price: index === 0 ? 74000 : index === 1 ? 190000 : index === 2 ? 260000 : 320000,
        currency: '₫',
        quality: index === 0 ? 'Khá' : index === 1 ? 'Tốt' : index === 2 ? 'Rất Tốt' : 'Xuất Sắc',
        supportedDevices: index === 0 ? ['Điện thoại di động', 'Máy tính bảng'] : ['Tất cả thiết bị'],
        simultaneousScreens: index === 0 ? 1 : 2,
        downloads: index === 0 ? 1 : 2
    }))
