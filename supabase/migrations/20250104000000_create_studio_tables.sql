-- ============================================================================
-- AI STUDIO - Media Generation System with fal.ai
-- ============================================================================
-- Following Supabase Auth best practices:
-- 1. Reference auth.users(id) primary key
-- 2. Always use ON DELETE CASCADE for auth.users foreign keys
-- 3. Enable RLS on all tables
-- ============================================================================

-- Studio Projects - Основные проекты пользователей
create table if not exists public."StudioProject" (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  title text not null,
  description text,
  thumbnail text,
  settings jsonb default '{}'::jsonb,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now()
);

-- Studio Assets - Медиа файлы (изображения, видео, аудио)
create table if not exists public."StudioAsset" (
  id uuid primary key default gen_random_uuid(),
  project_id uuid references public."StudioProject" (id) on delete set null,
  user_id uuid not null references auth.users (id) on delete cascade,
  type text not null check (type in ('image', 'video', 'audio')),
  name text not null,
  url text not null,
  thumbnail_url text,
  metadata jsonb default '{}'::jsonb,
  source_type text check (source_type in ('upload', 'generated', 'imported')),
  source_generation_id uuid,
  created_at timestamp with time zone not null default now()
);

-- Studio Generations - История генераций AI
create table if not exists public."StudioGeneration" (
  id uuid primary key default gen_random_uuid(),
  project_id uuid references public."StudioProject" (id) on delete set null,
  user_id uuid not null references auth.users (id) on delete cascade,
  model_id text not null,
  generation_type text not null check (generation_type in (
    'text-to-image',
    'text-to-video',
    'image-to-image',
    'image-to-video',
    'video-to-video',
    'inpaint',
    'lipsync'
  )),
  status text not null default 'pending' check (status in (
    'pending',
    'processing',
    'completed',
    'failed',
    'cancelled'
  )),
  prompt text,
  negative_prompt text,
  reference_image_url text,
  first_frame_url text,
  last_frame_url text,
  reference_video_url text,
  input_asset_id uuid references public."StudioAsset" (id) on delete set null,
  output_asset_id uuid references public."StudioAsset" (id) on delete set null,
  parameters jsonb not null default '{}'::jsonb,
  fal_request_id text,
  fal_response jsonb,
  error text,
  cost numeric(10, 4),
  processing_time integer,
  created_at timestamp with time zone not null default now(),
  completed_at timestamp with time zone
);

-- Добавляем foreign key для source_generation_id после создания StudioGeneration
alter table public."StudioAsset"
  add constraint fk_asset_source_generation
  foreign key (source_generation_id)
  references public."StudioGeneration" (id)
  on delete set null;

-- Studio Templates - Шаблоны и пресеты
create table if not exists public."StudioTemplate" (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users (id) on delete set null,
  type text not null check (type in ('project', 'prompt', 'style')),
  name text not null,
  description text,
  thumbnail text,
  model_id text,
  config jsonb not null default '{}'::jsonb,
  is_public boolean default false,
  usage_count integer default 0,
  created_at timestamp with time zone not null default now()
);

-- Индексы для производительности
create index if not exists idx_studio_project_user on public."StudioProject" (user_id);
create index if not exists idx_studio_project_updated on public."StudioProject" (updated_at desc);

create index if not exists idx_studio_asset_project on public."StudioAsset" (project_id);
create index if not exists idx_studio_asset_user on public."StudioAsset" (user_id);
create index if not exists idx_studio_asset_type on public."StudioAsset" (type);
create index if not exists idx_studio_asset_created on public."StudioAsset" (created_at desc);

create index if not exists idx_studio_generation_user on public."StudioGeneration" (user_id);
create index if not exists idx_studio_generation_project on public."StudioGeneration" (project_id);
create index if not exists idx_studio_generation_status on public."StudioGeneration" (status);
create index if not exists idx_studio_generation_model on public."StudioGeneration" (model_id);
create index if not exists idx_studio_generation_created on public."StudioGeneration" (created_at desc);

create index if not exists idx_studio_template_public on public."StudioTemplate" (is_public) where is_public = true;
create index if not exists idx_studio_template_user on public."StudioTemplate" (user_id);

-- Enable Row Level Security
alter table public."StudioProject" enable row level security;
alter table public."StudioAsset" enable row level security;
alter table public."StudioGeneration" enable row level security;
alter table public."StudioTemplate" enable row level security;

-- StudioProject RLS Policies
create policy "Users can view their own projects"
  on public."StudioProject" for select
  to authenticated
  using (auth.uid() = user_id);

create policy "Users can create their own projects"
  on public."StudioProject" for insert
  to authenticated
  with check (auth.uid() = user_id);

create policy "Users can update their own projects"
  on public."StudioProject" for update
  to authenticated
  using (auth.uid() = user_id);

create policy "Users can delete their own projects"
  on public."StudioProject" for delete
  to authenticated
  using (auth.uid() = user_id);

-- StudioAsset RLS Policies
create policy "Users can view their own assets"
  on public."StudioAsset" for select
  to authenticated
  using (auth.uid() = user_id);

create policy "Users can create their own assets"
  on public."StudioAsset" for insert
  to authenticated
  with check (auth.uid() = user_id);

create policy "Users can update their own assets"
  on public."StudioAsset" for update
  to authenticated
  using (auth.uid() = user_id);

create policy "Users can delete their own assets"
  on public."StudioAsset" for delete
  to authenticated
  using (auth.uid() = user_id);

-- StudioGeneration RLS Policies
create policy "Users can view their own generations"
  on public."StudioGeneration" for select
  to authenticated
  using (auth.uid() = user_id);

create policy "Users can create their own generations"
  on public."StudioGeneration" for insert
  to authenticated
  with check (auth.uid() = user_id);

create policy "Users can update their own generations"
  on public."StudioGeneration" for update
  to authenticated
  using (auth.uid() = user_id);

-- StudioTemplate RLS Policies
create policy "Anyone can view public templates"
  on public."StudioTemplate" for select
  to authenticated
  using (is_public = true or auth.uid() = user_id);

create policy "Users can create their own templates"
  on public."StudioTemplate" for insert
  to authenticated
  with check (auth.uid() = user_id);

create policy "Users can update their own templates"
  on public."StudioTemplate" for update
  to authenticated
  using (auth.uid() = user_id);

create policy "Users can delete their own templates"
  on public."StudioTemplate" for delete
  to authenticated
  using (auth.uid() = user_id);

-- Comments for documentation
comment on table public."StudioProject" is 'AI Studio projects for organizing media generation work';
comment on table public."StudioAsset" is 'Generated and uploaded media assets (images, videos, audio)';
comment on table public."StudioGeneration" is 'History of AI generation requests and their results';
comment on table public."StudioTemplate" is 'Reusable templates and presets for generation';
