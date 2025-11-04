# 🎬 AI Studio Feature

Полнофункциональная студия генерации изображений и видео в стиле RunwayML, использующая fal.ai API.

## ✨ Возможности

### Генерация контента
- **Text-to-Image**: Создание изображений из текстовых описаний
- **Text-to-Video**: Генерация видео из промптов
- **Image-to-Video**: Анимация статичных изображений
- **Image-to-Image**: Трансформация изображений
- **Video-to-Video**: Ремикс и редактирование видео
- **Inpainting**: Заполнение областей изображения
- **Lip Sync**: Синхронизация губ с аудио

### Модели (40+)
- **FLUX** (Black Forest Labs) - Высокое качество изображений
- **Veo 3.1** (Google) - Cinematic video до 1080p
- **Sora 2** (OpenAI) - Продвинутая генерация видео
- **Runway Gen-3** - Быстрая генерация видео
- **Kling**, **Mochi**, **MiniMax** и многие другие

### UI/UX в стиле RunwayML
- Split-screen интерфейс с панелью генерации слева
- Выбор модели с поиском и фильтрацией
- Real-time история генераций
- Галерея ассетов с grid/list режимами
- Продвинутые параметры генерации

## 🚀 Быстрый старт

### 1. Настройка API ключа

Получите ключ на [fal.ai](https://fal.ai) и добавьте в `.env.local`:

```bash
FAL_API_KEY=your_fal_api_key_here
```

### 2. Создание проекта

```bash
# Перейдите в Studio
http://localhost:3000/studio

# Нажмите "New project"
# Введите название и описание
# Готово!
```

### 3. Первая генерация

1. Откройте проект
2. Выберите тип: "Text to Image"
3. Нажмите на выбор модели → выберите "FLUX.1 Ultra"
4. Введите промпт: "A futuristic city at sunset, cinematic, 8k"
5. Нажмите "Generate"
6. Наблюдайте за процессом в панели History

## 📁 Структура файлов

```
app/studio/
├── [id]/page.tsx          # Проект с интегрированным интерфейсом
├── new/page.tsx           # Создание проекта
├── generations/page.tsx   # Все генерации
├── assets/page.tsx        # Библиотека ассетов
├── templates/page.tsx     # Шаблоны
└── layout.tsx             # Layout с sidebar

components/studio/
├── generation-panel.tsx          # Форма генерации
├── model-selector-dialog.tsx     # Выбор модели
├── generation-history.tsx        # История с auto-refresh
├── asset-gallery.tsx             # Галерея файлов
├── project-studio.tsx            # Главный интерфейс
├── studio-header.tsx             # Шапка страниц
├── studio-sidebar.tsx            # Навигация
└── project/
    ├── project-grid.tsx          # Grid проектов
    └── project-card.tsx          # Карточка проекта

lib/studio/
├── actions.ts              # Server actions
├── fal-client.ts           # fal.ai интеграция
├── model-mapping.ts        # Маппинг моделей
├── queries.ts              # Database queries
└── types.ts                # TypeScript типы

components/ui/
├── dialog.tsx              # Modal компонент
├── slider.tsx              # Range slider
└── switch.tsx              # Toggle switch
```

## 🎨 Компоненты

### GenerationPanel
Главная форма для создания генераций:
- Выбор типа генерации (buttons с иконками)
- Выбор модели (clickable card)
- Textarea для промпта
- Upload референсных изображений
- Advanced settings (collapsible)

**Props:**
```typescript
{
  projectId?: string;
  onGenerationStart?: (generationId: string) => void;
  onGenerationComplete?: () => void;
}
```

### ModelSelectorDialog
Модальное окно с выбором модели:
- Поиск по названию/описанию
- Группировка по провайдерам
- Badges для качества
- Responsive grid

**Props:**
```typescript
{
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelectModel: (model: FalStudioModel) => void;
  currentModel: FalStudioModel | null;
  generationType: StudioGenerationType;
}
```

### GenerationHistory
История генераций с live updates:
- Status badges (Pending, Processing, Completed, Failed)
- Auto-refresh для активных генераций
- Thumbnails
- Actions (View, Download)

**Props:**
```typescript
{
  generations: StudioGeneration[];
  onRefresh?: () => void;
}
```

### AssetGallery
Галерея сгенерированных файлов:
- Grid/List view modes
- Type filter (Image/Video/Audio)
- Search
- Metadata display

**Props:**
```typescript
{
  assets: StudioAsset[];
  onAssetClick?: (asset: StudioAsset) => void;
  onUpload?: () => void;
}
```

## 🔧 API

### Server Actions

```typescript
// Проекты
getProjectsAction()
getProjectAction(id: string)
createProjectAction(title: string, description?: string)
updateProjectAction(id: string, updates: {...})
deleteProjectAction(id: string)

// Ассеты
getProjectAssetsAction(projectId: string)
getUserAssetsAction()
deleteAssetAction(id: string)

// Генерации
getUserGenerationsAction()
getProjectGenerationsAction(projectId: string)
generateAction(request: GenerationRequest)
```

### fal.ai Client

```typescript
const client = getFalClient();

// Submit to queue
const queued = await client.submit(modelId, input);

// Check status
const status = await client.getStatus(requestId);

// Synchronous generation (with polling)
const result = await client.run(modelId, input, {
  onProgress: (status) => console.log(status),
  pollInterval: 2000,
  timeout: 600000,
});

// Upload file
const url = await client.uploadFile(file);
```

## 🗄️ Database Schema

### studio_projects
```sql
id: uuid PRIMARY KEY
user_id: uuid REFERENCES auth.users
title: text
description: text
thumbnail: text
settings: jsonb
created_at: timestamptz
updated_at: timestamptz
```

### studio_generations
```sql
id: uuid PRIMARY KEY
project_id: uuid REFERENCES studio_projects
user_id: uuid REFERENCES auth.users
model_id: text
generation_type: text
status: text (pending/processing/completed/failed)
prompt: text
negative_prompt: text
reference_image_url: text
output_asset_id: uuid REFERENCES studio_assets
parameters: jsonb
fal_request_id: text
fal_response: jsonb
error: text
cost: numeric
processing_time: integer
created_at: timestamptz
completed_at: timestamptz
```

### studio_assets
```sql
id: uuid PRIMARY KEY
project_id: uuid REFERENCES studio_projects
user_id: uuid REFERENCES auth.users
type: text (image/video/audio)
name: text
url: text
thumbnail_url: text
metadata: jsonb
source_type: text (upload/generated/imported)
source_generation_id: uuid REFERENCES studio_generations
created_at: timestamptz
```

## 🎯 Типы генераций

### text-to-image
```typescript
{
  modelId: "fal-ai/flux/ultra",
  generationType: "text-to-image",
  prompt: "A beautiful landscape",
  parameters: {
    imageSize: "landscape_16_9",
    numInferenceSteps: 28,
    guidanceScale: 7.5,
  }
}
```

### text-to-video
```typescript
{
  modelId: "veo3.1",
  generationType: "text-to-video",
  prompt: "A cat walking in the street",
  parameters: {
    duration: 5,
    fps: 24,
  }
}
```

### image-to-video
```typescript
{
  modelId: "veo3.1/image-to-video",
  generationType: "image-to-video",
  referenceImageUrl: "https://...",
  prompt: "Pan camera left",
  parameters: {
    duration: 3,
  }
}
```

## 🎨 Customization

### Добавление новой модели

1. Добавьте в `lib/ai/studio-models.ts`:
```typescript
{
  id: "my-new-model",
  name: "My Model",
  description: "Description",
  type: "image" | "video",
  provider: "fal",
  creator: "Company",
  quality: "Ultra",
}
```

2. Модель автоматически появится в model-mapping

### Добавление нового типа генерации

1. Добавьте тип в `lib/studio/types.ts`:
```typescript
export type StudioGenerationType =
  | ...existing types...
  | "my-new-type";
```

2. Добавьте в `GENERATION_TYPES` массив в `generation-panel.tsx`

3. Обновите `inferGenerationType` в `model-mapping.ts`

## 🚧 Roadmap

- [ ] Real-time WebSocket updates
- [ ] Batch generations
- [ ] Video editing timeline
- [ ] Custom model fine-tuning
- [ ] Template marketplace
- [ ] Team collaboration
- [ ] API webhooks
- [ ] Export presets

## 📚 Документация

- [Полное руководство](./STUDIO_GUIDE.md)
- [fal.ai Docs](https://fal.ai/docs)
- [Model List](https://fal.ai/models)

## 🐛 Troubleshooting

### "FAL_API_KEY is required"
Добавьте ключ в `.env.local`

### Генерация зависает в "Processing"
- Проверьте fal.ai dashboard на статус
- Увеличьте timeout в `fal-client.ts`
- Проверьте логи: `pnpm dev` и смотрите console

### UI не обновляется
- Убедитесь что auto-refresh включен
- Проверьте что `onRefresh` передан в GenerationHistory

## 🤝 Contributing

При добавлении новых фич:
1. Следуйте существующей структуре компонентов
2. Добавляйте TypeScript типы
3. Обновляйте документацию
4. Тестируйте с реальными API ключами

## 📄 License

Same as parent project
