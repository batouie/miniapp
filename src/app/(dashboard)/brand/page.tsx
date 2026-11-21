import type { Metadata } from 'next';
import { eq } from 'drizzle-orm';
import { auth } from '@/auth';
import { getDb } from '@/db';
import { brandProfiles } from '@/db/schema/brand';
import { BrandForm } from '@/features/brand/brand-form';

export const metadata: Metadata = { title: 'مدیریت برند' };

export default async function BrandPage() {
  const session = await auth();
  if (!session?.user?.id) return null;

  const db = getDb();
  const [profile] = await db
    .select()
    .from(brandProfiles)
    .where(eq(brandProfiles.userId, session.user.id))
    .limit(1);

  return (
    <section className="mx-auto max-w-3xl">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold text-[#111111]">مدیریت برند</h1>
        <p className="mt-1 text-sm text-[#858585]">
          اطلاعات پایه برند شخصی خود را مدیریت کنید.
        </p>
      </header>

      <div className="rounded-2xl border border-[#E8E8E8] bg-white p-6">
        <BrandForm
          initial={{
            brandName: profile?.brandName ?? 'Parham Batouie',
            ownerName: profile?.ownerName ?? 'Parham Batouie',
            shortBio: profile?.shortBio,
            fullBio: profile?.fullBio,
            industry: profile?.industry,
            targetAudience: profile?.targetAudience,
            targetMarket: profile?.targetMarket,
            valueProposition: profile?.valueProposition,
            competitiveAdvantage: profile?.competitiveAdvantage,
            brandVoice: profile?.brandVoice,
            websiteUrl: profile?.websiteUrl,
            instagramUrl: profile?.instagramUrl,
            whatsappUrl: profile?.whatsappUrl,
            telegramUrl: profile?.telegramUrl,
          }}
        />
      </div>
    </section>
  );
}