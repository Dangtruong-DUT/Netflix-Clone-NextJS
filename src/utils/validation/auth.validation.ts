import z from "zod";

export const RegisterBody = z
    .object({
        email: z.string().min(1, { message: "emailRequired" }).email({ message: "emailInvalid" }),
    })
    .strict();
export type RegisterBodyType = z.infer<typeof RegisterBody>;
