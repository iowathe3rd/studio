# AI Studio - Руководство по использованию

## Обзор

AI Studio теперь представляет собой полнофункциональную платформу для генерации изображений и видео с помощью различных AI моделей через fal.ai, в стиле RunwayML.

## Основные компоненты

### 1. **Generation Panel** (Панель генерации)
Левая панель в проекте, где вы:
- Выбираете тип генерации (Text-to-Image, Text-to-Video, Image-to-Video и др.)
- Выбираете модель из доступных (FLUX, Veo 3.1, Sora 2, Runway и др.)
- Вводите промпт и параметры
- Загружаете референсные изображения (если требуется)
- Настраиваете продвинутые параметры (inference steps, guidance scale, seed)

### 2. **Model Selector Dialog** (Диалог выбора модели)
Модальное окно с поиском и фильтрацией по моделям:
- Группировка по провайдерам (Black Forest Labs, Google, OpenAI и др.)
- Отображение качества модели (Ultra, High, Balanced)
- Описание возможностей каждой модели

### 3. **Generation History** (История генераций)
Правая панель показывает:
- Список всех генераций с превью
- Статус (Pending, Processing, Completed, Failed)
- Информацию о модели и времени обработки
- Действия (View, Download)
- Автообновление для активных генераций

### 4. **Asset Gallery** (Галерея ассетов)
Управление сгенерированными файлами:
- Режимы просмотра (Grid/List)
- Фильтрация по типу (Images, Videos, Audio)
- Поиск по названию
- Отображение метаданных (размер, разрешение, дата)

### 5. **Project Studio** (Рабочее пространство проекта)
Интегрированный интерфейс с разделением экрана:
- Левая часть: панель генерации
- Правая часть: вкладки с историей и ассетами

## Типы генераций

Поддерживаются следующие типы:

1. **Text-to-Image** - генерация изображений из текста
   - Модели: FLUX.1 Dev/Ultra/Realism, Fast SDXL

2. **Text-to-Video** - создание видео из текста
   - Модели: Veo 3.1, Sora 2, Runway Gen-3, Mochi

3. **Image-to-Video** - анимация изображений
   - Модели: Veo 3.1, Sora 2, Runway Gen-3, Kling

4. **Image-to-Image** - трансформация изображений
   - Модели: FLUX Kontext LoRA

5. **Video-to-Video** - ремикс существующего видео
   - Модели: Sora 2 Remix, Reve Edit

6. **Inpaint** - заполнение областей изображения
   - Модели: FLUX Kontext LoRA Inpaint

7. **Lip Sync** - синхронизация губ на видео
   - Модели: Creatify, MiniMax, PixVerse

## Workflow

### Создание проекта
1. Перейдите в `/studio`
2. Нажмите "New project"
3. Введите название и описание
4. Нажмите "Create project"

### Генерация контента
1. Откройте проект
2. Выберите тип генерации (например, Text-to-Image)
3. Нажмите на блок выбора модели
4. Выберите модель из списка (например, FLUX.1 Ultra)
5. Введите промпт с описанием желаемого результата
6. (Опционально) Настройте параметры:
   - Image Size (соотношение сторон)
   - Inference Steps (качество, но медленнее)
   - Guidance Scale (следование промпту)
   - Seed (для воспроизводимости)
7. Нажмите "Generate"
8. Следите за процессом в History

### Просмотр результатов
- В вкладке **History** видны все генерации
- Статус обновляется автоматически
- После завершения можно просмотреть и скачать
- Во вкладке **Assets** все сгенерированные файлы

## Интеграция с fal.ai

### Настройка
1. Получите API ключ на [fal.ai](https://fal.ai)
2. Добавьте в `.env.local`:
   ```
   FAL_API_KEY=your_api_key_here
   ```

### Поддерживаемые модели
Более 40 моделей от:
- **Black Forest Labs** - FLUX (text-to-image)
- **Google** - Veo 3.1 (text-to-video, image-to-video)
- **OpenAI** - Sora 2 (cinematic video)
- **Runway** - Gen-3 Turbo (video generation)
- **Kling** - v2.5 (image-to-video)
- **Mochi** - long-form video
- **MiniMax** - Hailuo 2.3 (video)
- И многие другие

## Архитектура

```
app/studio/
├── [id]/page.tsx          # Страница проекта с ProjectStudio
├── new/page.tsx           # Создание нового проекта
├── generations/page.tsx   # Все генерации пользователя
├── assets/page.tsx        # Все ассеты пользователя
└── templates/page.tsx     # Шаблоны (coming soon)

components/studio/
├── generation-panel.tsx       # Основная форма генерации
├── model-selector-dialog.tsx  # Выбор модели
├── generation-history.tsx     # История генераций
├── asset-gallery.tsx          # Галерея ассетов
├── project-studio.tsx         # Интегрированный интерфейс
├── studio-header.tsx          # Шапка
└── studio-sidebar.tsx         # Боковая панель навигации

lib/studio/
├── actions.ts            # Server actions для API
├── fal-client.ts         # Клиент fal.ai
├── model-mapping.ts      # Маппинг моделей на типы генерации
├── queries.ts            # Запросы к БД
└── types.ts              # TypeScript типы
```

## Database Schema

Используются следующие таблицы:

- `studio_projects` - проекты пользователя
- `studio_assets` - сгенерированные/загруженные файлы
- `studio_generations` - история генераций с параметрами
- `studio_templates` - шаблоны (будущее)

## Следующие шаги

- [ ] Real-time polling для статуса генерации
- [ ] Upload custom assets
- [ ] Image editing tools
- [ ] Video timeline editor
- [ ] Templates library
- [ ] Collaboration features
- [ ] Export presets

## Troubleshooting

### Генерация зависает
- Проверьте FAL_API_KEY
- Проверьте лимиты API на fal.ai
- Проверьте логи сервера

### Модели не загружаются
- Убедитесь что импортированы ALL_FAL_MODELS
- Проверьте model-mapping.ts

### UI не отображается корректно
- Убедитесь что все UI компоненты установлены
- Проверьте tailwind.config

## Поддержка

Для вопросов и багов создавайте issues в репозитории проекта.
