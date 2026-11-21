'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { eq } from 'drizzle-orm';
import { auth } from '@/auth';
import { getDb } from '@/db';
import { brandProfiles } from '@/db/schema/brand';

const brandSchema = z.object({
  brandName: z.string().min(1, 'نام برند الزامی است'),
  ownerName: z.string().min(1, 'نام صاحب برند الزامی است'),
  shortBio: z.string().max(300).optional(),
  fullBio: z.string().max(3000).optional(),
  industry: z.string().max(100).optional(),
  targetAudience: z.string().max(500).optional(),
  targetMarket: z.string().max(200).optional(),
  valueProposition: z.string().max(500).optional(),
  competitiveAdvantage: z.string().max(500).optional(),
  brandVoice: z.string().max(200).optional(),
  websiteUrl: z.string().url('آدرس معتبر نیست').or(z.literal('')).optional(),
  instagramUrl: z.string().url('آدرس معتبر نیست').or(z.literal('')).optional(),
  whatsappUrl: z.string().url('آدرس معتبر نیست').or(z.literal('')).optional(),
  telegramUrl: z.string().url('آدرس معتبر نیست').or(z.literal('')).optional(),
});

export type BrandActionState = { ok: boolean; message: string } | undefined;

export async function updateBrandAction(
  _prev: BrandActionState,
  formData: FormData
): Promise<BrandActionState> {
  const session = await auth();
  if (!session?.user?.id) {
    return { ok: false, message: 'دسترسی غیرمجاز' };
  }

  const raw = Object.fromEntries(formData.entries());
  const parsed = brandSchema.safeParse(raw);
  if (!parsed.success) {
    return { ok: false, message: parsed.error.issues[0]?.message ?? 'اطلاعات نامعتبر' };
  }

  try {
    const db = getDb();
    const existing = await db
      .select()
      .from(brandProfiles)
      .where(eq(brandProfiles.userId, session.user.id))
      .limit(1);

    if (existing.length > 0) {
      await db
        .update(brandProfiles)
        .set({ ...parsed.data, updatedAt: new Date() })
        .where(eq(brandProfiles.userId, session.user.id));
    } else {
      await db.insert(brandProfiles).values({
        userId: session.user.id,
        ...parsed.data,
      });
    }

    revalidatePath('/brand');
    return { ok: true, message: 'اطلاعات برند ذخیره شد' };
  } catch {
    return { ok: false, message: 'خطا در ذخیره‌سازی' };
  }
}