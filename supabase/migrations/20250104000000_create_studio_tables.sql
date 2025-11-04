-- ============================================================================
-- AI STUDIO - Media Generation System with fal.ai
-- ============================================================================

-- Studio Projects - Основные проекты пользователей
CREATE TABLE IF NOT EXISTS "StudioProject" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "userId" UUID NOT NULL REFERENCES "User"("id") ON DELETE CASCADE,
  "title" TEXT NOT NULL,
  "description" TEXT,
  "thumbnail" TEXT, -- URL к превью проекта
  "settings" JSONB DEFAULT '{}', -- Настройки проекта (разрешение, fps, и т.д.)
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
  "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Studio Assets - Медиа файлы (изображения, видео, аудио)
CREATE TABLE IF NOT EXISTS "StudioAsset" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "projectId" UUID REFERENCES "StudioProject"("id") ON DELETE SET NULL,
  "userId" UUID NOT NULL REFERENCES "User"("id") ON DELETE CASCADE,
  "type" TEXT NOT NULL CHECK ("type" IN ('image', 'video', 'audio')),
  "name" TEXT NOT NULL,
  "url" TEXT NOT NULL, -- URL к файлу (Supabase Storage или CDN)
  "thumbnailUrl" TEXT, -- URL к превью
  "metadata" JSONB DEFAULT '{}', -- { width, height, duration, format, size, etc }
  "sourceType" TEXT CHECK ("sourceType" IN ('upload', 'generated', 'imported')),
  "sourceGenerationId" UUID, -- Ссылка на StudioGeneration если сгенерировано
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Studio Generations - История генераций AI
CREATE TABLE IF NOT EXISTS "StudioGeneration" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "projectId" UUID REFERENCES "StudioProject"("id") ON DELETE SET NULL,
  "userId" UUID NOT NULL REFERENCES "User"("id") ON DELETE CASCADE,
  "modelId" TEXT NOT NULL, -- fal.ai model ID (e.g., 'fal-ai/flux/dev', 'veo3.1')
  "generationType" TEXT NOT NULL CHECK ("generationType" IN (
    'text-to-image',
    'text-to-video',
    'image-to-image',
    'image-to-video',
    'video-to-video',
    'inpaint',
    'lipsync'
  )),
  "status" TEXT NOT NULL DEFAULT 'pending' CHECK ("status" IN (
    'pending',
    'processing',
    'completed',
    'failed',
    'cancelled'
  )),
  "prompt" TEXT, -- Текстовый промпт
  "negativePrompt" TEXT,
  "referenceImageUrl" TEXT, -- Reference image URL
  "firstFrameUrl" TEXT, -- First frame для keyframe генерации
  "lastFrameUrl" TEXT, -- Last frame для keyframe генерации
  "referenceVideoUrl" TEXT, -- Reference video URL для video-to-video
  "inputAssetId" UUID REFERENCES "StudioAsset"("id") ON DELETE SET NULL,
  "outputAssetId" UUID REFERENCES "StudioAsset"("id") ON DELETE SET NULL,
  "parameters" JSONB NOT NULL DEFAULT '{}', -- Параметры генерации (resolution, fps, duration, etc)
  "falRequestId" TEXT, -- ID запроса в fal.ai для polling статуса
  "falResponse" JSONB, -- Полный ответ от fal.ai
  "error" TEXT,
  "cost" NUMERIC(10, 4), -- Стоимость генерации в кредитах
  "processingTime" INTEGER, -- Время обработки в секундах
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
  "completedAt" TIMESTAMP
);

-- Studio Templates - Шаблоны и пресеты
CREATE TABLE IF NOT EXISTS "StudioTemplate" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "userId" UUID REFERENCES "User"("id") ON DELETE SET NULL,
  "type" TEXT NOT NULL CHECK ("type" IN ('project', 'prompt', 'style')),
  "name" TEXT NOT NULL,
  "description" TEXT,
  "thumbnail" TEXT,
  "modelId" TEXT, -- Связанная модель fal.ai
  "config" JSONB NOT NULL DEFAULT '{}',
  "isPublic" BOOLEAN DEFAULT false,
  "usageCount" INTEGER DEFAULT 0,
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Индексы для производительности
CREATE INDEX IF NOT EXISTS "idx_studio_project_user" ON "StudioProject"("userId");
CREATE INDEX IF NOT EXISTS "idx_studio_project_updated" ON "StudioProject"("updatedAt" DESC);

CREATE INDEX IF NOT EXISTS "idx_studio_asset_project" ON "StudioAsset"("projectId");
CREATE INDEX IF NOT EXISTS "idx_studio_asset_user" ON "StudioAsset"("userId");
CREATE INDEX IF NOT EXISTS "idx_studio_asset_type" ON "StudioAsset"("type");
CREATE INDEX IF NOT EXISTS "idx_studio_asset_created" ON "StudioAsset"("createdAt" DESC);

CREATE INDEX IF NOT EXISTS "idx_studio_generation_user" ON "StudioGeneration"("userId");
CREATE INDEX IF NOT EXISTS "idx_studio_generation_project" ON "StudioGeneration"("projectId");
CREATE INDEX IF NOT EXISTS "idx_studio_generation_status" ON "StudioGeneration"("status");
CREATE INDEX IF NOT EXISTS "idx_studio_generation_model" ON "StudioGeneration"("modelId");
CREATE INDEX IF NOT EXISTS "idx_studio_generation_created" ON "StudioGeneration"("createdAt" DESC);

CREATE INDEX IF NOT EXISTS "idx_studio_template_public" ON "StudioTemplate"("isPublic") WHERE "isPublic" = true;
CREATE INDEX IF NOT EXISTS "idx_studio_template_user" ON "StudioTemplate"("userId");

-- RLS Policies
ALTER TABLE "StudioProject" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "StudioAsset" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "StudioGeneration" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "StudioTemplate" ENABLE ROW LEVEL SECURITY;

-- StudioProject policies
CREATE POLICY "Users can view their own projects"
  ON "StudioProject" FOR SELECT
  USING (auth.uid() = "userId");

CREATE POLICY "Users can create their own projects"
  ON "StudioProject" FOR INSERT
  WITH CHECK (auth.uid() = "userId");

CREATE POLICY "Users can update their own projects"
  ON "StudioProject" FOR UPDATE
  USING (auth.uid() = "userId");

CREATE POLICY "Users can delete their own projects"
  ON "StudioProject" FOR DELETE
  USING (auth.uid() = "userId");

-- StudioAsset policies
CREATE POLICY "Users can view their own assets"
  ON "StudioAsset" FOR SELECT
  USING (auth.uid() = "userId");

CREATE POLICY "Users can create their own assets"
  ON "StudioAsset" FOR INSERT
  WITH CHECK (auth.uid() = "userId");

CREATE POLICY "Users can update their own assets"
  ON "StudioAsset" FOR UPDATE
  USING (auth.uid() = "userId");

CREATE POLICY "Users can delete their own assets"
  ON "StudioAsset" FOR DELETE
  USING (auth.uid() = "userId");

-- StudioGeneration policies
CREATE POLICY "Users can view their own generations"
  ON "StudioGeneration" FOR SELECT
  USING (auth.uid() = "userId");

CREATE POLICY "Users can create their own generations"
  ON "StudioGeneration" FOR INSERT
  WITH CHECK (auth.uid() = "userId");

CREATE POLICY "Users can update their own generations"
  ON "StudioGeneration" FOR UPDATE
  USING (auth.uid() = "userId");

-- StudioTemplate policies
CREATE POLICY "Anyone can view public templates"
  ON "StudioTemplate" FOR SELECT
  USING ("isPublic" = true OR auth.uid() = "userId");

CREATE POLICY "Users can create their own templates"
  ON "StudioTemplate" FOR INSERT
  WITH CHECK (auth.uid() = "userId");

CREATE POLICY "Users can update their own templates"
  ON "StudioTemplate" FOR UPDATE
  USING (auth.uid() = "userId");

CREATE POLICY "Users can delete their own templates"
  ON "StudioTemplate" FOR DELETE
  USING (auth.uid() = "userId");
