alter table public.store_settings
  add column meta_pixel_enabled boolean not null default false,
  add column meta_pixel_id text,
  add column tiktok_pixel_enabled boolean not null default false,
  add column tiktok_pixel_id text,
  add column google_tag_manager_enabled boolean not null default false,
  add column google_tag_manager_id text,
  add constraint store_settings_meta_pixel_id_format_check
    check (
      meta_pixel_id is null
      or btrim(meta_pixel_id) = ''
      or meta_pixel_id ~ '^[0-9]{5,40}$'
    ),
  add constraint store_settings_meta_pixel_id_enabled_check
    check (
      not meta_pixel_enabled
      or nullif(btrim(coalesce(meta_pixel_id, '')), '') is not null
    ),
  add constraint store_settings_tiktok_pixel_id_format_check
    check (
      tiktok_pixel_id is null
      or btrim(tiktok_pixel_id) = ''
      or tiktok_pixel_id ~ '^[A-Za-z0-9_-]{4,80}$'
    ),
  add constraint store_settings_tiktok_pixel_id_enabled_check
    check (
      not tiktok_pixel_enabled
      or nullif(btrim(coalesce(tiktok_pixel_id, '')), '') is not null
    ),
  add constraint store_settings_google_tag_manager_id_format_check
    check (
      google_tag_manager_id is null
      or btrim(google_tag_manager_id) = ''
      or google_tag_manager_id ~ '^GTM-[A-Za-z0-9]+$'
    ),
  add constraint store_settings_google_tag_manager_id_enabled_check
    check (
      not google_tag_manager_enabled
      or nullif(btrim(coalesce(google_tag_manager_id, '')), '') is not null
    );

comment on column public.store_settings.meta_pixel_enabled is
  'Enables Meta/Facebook Pixel base code on public storefront pages.';

comment on column public.store_settings.meta_pixel_id is
  'Meta/Facebook Pixel ID from Events Manager. Store only the ID, not raw script code.';

comment on column public.store_settings.tiktok_pixel_enabled is
  'Enables TikTok Pixel base code on public storefront pages.';

comment on column public.store_settings.tiktok_pixel_id is
  'TikTok Pixel ID from Events Manager. Store only the ID, not raw script code.';

comment on column public.store_settings.google_tag_manager_enabled is
  'Enables Google Tag Manager container code on public storefront pages for other tracking tags.';

comment on column public.store_settings.google_tag_manager_id is
  'Google Tag Manager container ID, for example GTM-XXXXXXX. Store only the ID, not raw script code.';
