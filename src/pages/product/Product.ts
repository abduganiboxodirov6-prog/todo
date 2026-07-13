import { z } from "zod";

export const schema = z.object({
  kategoriya: z.string().min(1, "Kategoriyani tanlang"),
  nomi: z
    .string()
    .min(1, "Nomi kiritilishi shart")
    .refine((val) => /^[A-Z]/.test(val), {
      message: "Nomi bosh harf bilan boshlanishi kerak",
    }),
  narxi: z.preprocess(
    (val) => Number(val),
    z.number().gt(0, "Narx 0 dan katta bo'lishi kerak"),
  ),
  miqdor: z.preprocess(
    (val) => Number(val),
    z.number().int().gt(0, "Miqdor 0 dan katta bo'lishi kerak"),
  ),
  description: z
    .string()
    .min(5, "Tavsif kamida 5 ta belgidan iborat bo'lishi kerak"),
});

export type ProductFormValues = z.infer<typeof schema>;

