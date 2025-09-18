import z from 'zod'

export const RegisterEmailBody = z
    .object({
        email: z.string().min(1, { message: 'emailRequired' }).email({ message: 'emailInvalid' })
    })
    .strict()
export type RegisterEmailBodyType = z.infer<typeof RegisterEmailBody>

export const RegisterBody = z
    .object({
        email: z.string().min(1, { message: 'emailRequired' }).email({ message: 'emailInvalid' }),
        password: z.string().min(8, { message: 'passwordMinLength' })
    })
    .strict()
