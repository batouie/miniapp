'use client';

import { useActionState } from 'react';
import { updateBrandAction, type BrandActionState } from './actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type BrandData = {
  brandName: string;
  ownerName: string;
  shortBio?: string | null;
  fullBio?: string | null;
  industry?: string | null;
  targetAudience?: string | null;
  targetMarket?: string | null;
  valueProposition?: string | null;
  competitiveAdvantage?: string | null;
  brandVoice?: string | null;
  websiteUrl?: string | null;
  instagramUrl?: string | null;
  whatsappUrl?: string | null;
  telegramUrl?: string | null;
};

export function BrandForm({ initial }: { initial: BrandData }) {
  const [state, formAction, isPending] = useActionState<BrandActionState, FormData>(
    updateBrandAction,
    undefined
  );

  return (
    <form action={formAction} className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="نام برند" name="brandName" defaultValue={initial.brandName} required />
        <Field label="نام صاحب برند" name="ownerName" defaultValue={initial.ownerName} required />
      </div>

      <Field label="بیوگرافی کوتاه" name="shortBio" defaultValue={initial.shortBio ?? ''} />
      <Field label="معرفی کامل" name="fullBio" defaultValue={initial.fullBio ?? ''} textarea />
      <Field label="حوزه فعالیت" name="industry" defaultValue={initial.industry ?? ''} />
      <Field label="مخاطبان هدف" name="targetAudience" defaultValue={initial.targetAudience ?? ''} textarea />
      <Field label="بازار هدف" name="targetMarket" defaultValue={initial.targetMarket ?? ''} />
      <Field label="ارزش پیشنهادی" name="valueProposition" defaultValue={initial.valueProposition ?? ''} textarea />
      <Field label="مزیت رقابتی" name="competitiveAdvantage" defaultValue={initial.competitiveAdvantage ?? ''} textarea />
      <Field label="لحن ارتباطی" name="brandVoice" defaultValue={initial.brandVoice ?? ''} />

      <div className="grid gap-4 md:grid-cols-2">
        <Field label="وب‌سایت" name="websiteUrl" defaultValue={initial.websiteUrl ?? ''} dir="ltr" />
        <Field label="اینستاگرام" name="instagramUrl" defaultValue={initial.instagramUrl ?? ''} dir="ltr" />
        <Field label="واتساپ" name="whatsappUrl" defaultValue={initial.whatsappUrl ?? ''} dir="ltr" />
        <Field label="تلگرام" name="telegramUrl" defaultValue={initial.telegramUrl ?? ''} dir="ltr" />
      </div>

      {state?.message && (
        <p
          role="alert"
          className={state.ok ? 'text-sm text-green-600' : 'text-sm text-red-600'}
        >
          {state.message}
        </p>
      )}

      <Button type="submit" disabled={isPending}>
        {isPending ? 'در حال ذخیره...' : 'ذخیره اطلاعات'}
      </Button>
    </form>
  );
}

function Field({
  label,
  name,
  defaultValue,
  textarea,
  required,
  dir,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  textarea?: boolean;
  required?: boolean;
  dir?: 'ltr' | 'rtl';
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={name}>{label}</Label>
      {textarea ? (
        <textarea
          id={name}
          name={name}
          defaultValue={defaultValue}
          required={required}
          dir={dir}
          rows={3}
          className="w-full rounded-md border border-[#E8E8E8] bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF7438]"
        />
      ) : (
        <Input id={name} name={name} defaultValue={defaultValue} required={required} dir={dir} />
      )}
    </div>
  );
}