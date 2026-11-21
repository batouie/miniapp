import { pgTable, text, timestamp, uuid, jsonb } from 'drizzle-orm/pg-core';
import { users } from './auth';

export const brandProfiles = pgTable('brand_profiles', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: text('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' })
    .unique(),
  brandName: text('brand_name').notNull().default('Parham Batouie'),
  ownerName: text('owner_name').notNull().default('Parham Batouie'),
  shortBio: text('short_bio'),
  fullBio: text('full_bio'),
  industry: text('industry'),
  services: jsonb('services').$type<string[]>().default([]),
  targetAudience: text('target_audience'),
  targetMarket: text('target_market'),
  valueProposition: text('value_proposition'),
  competitiveAdvantage: text('competitive_advantage'),
  brandVoice: text('brand_voice'),
  brandColors: jsonb('brand_colors').$type<string[]>().default([]),
  brandFonts: jsonb('brand_fonts').$type<string[]>().default([]),
  websiteUrl: text('website_url'),
  instagramUrl: text('instagram_url'),
  whatsappUrl: text('whatsapp_url'),
  telegramUrl: text('telegram_url'),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});

export const userSettings = pgTable('user_settings', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: text('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' })
    .unique(),
  theme: text('theme').notNull().default('light'),
  language: text('language').notNull().default('fa'),
  defaultCurrency: text('default_currency').notNull().default('IRT'),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});