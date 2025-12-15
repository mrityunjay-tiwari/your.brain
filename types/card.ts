import z from "zod";

export const cardSchema = z.object({
    title: z.string().min(0).max(100)
})