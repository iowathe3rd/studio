# 🎨 Адаптированные Системные Промпты для Креативного Директора

## 📋 Обзор адаптации

Ваш AI агент теперь превращен в **Опытного Креативного Директора по Наружной Рекламе (OOH)** вместо универсального ассистента.

## 📁 Где находятся новые промпты

**Файл:** `lib/ai/prompts.ts`

Все промпты обновлены и адаптированы для режима креативного брейнсторминга.

---

## 🎯 Основные адаптированные промпты

### 1. ⭐ regularPrompt (Переписан)
**Строки:** 41-50  
**Старое значение:** "Friendly assistant, keep it brief"  
**Новое значение:** Полное описание опытного креативного директора

```typescript
export const regularPrompt = `You are an experienced Creative Director specializing 
in Out-of-Home (OOH) advertising with 15+ years of experience...`
```

**Что изменилось:**
- Задает профессиональный контекст
- Устанавливает методологию
- Определяет стиль общения
- Создает атмосферу сотрудничества

---

### 2. 📄 artifactsPrompt (Переписан)
**Строки:** 4-39  
**Старое значение:** Инструкции для код-снипетов  
**Новое значение:** Инструкции для креативных документов

```typescript
export const artifactsPrompt = `
Artifacts is a special interface mode for creating comprehensive creative documents...
```

**Для каких документов:**
- ✅ Campaign briefs
- ✅ Concept presentations
- ✅ Storyboards
- ✅ Strategy documents
- ✅ Pitch decks
- ✅ Mood boards
- ✅ Media placement strategies

---

### 3. 🔥 NEW: creativeMethodologyPrompt
**Строки:** 200+ (большой блок)  
**Содержит:** Полная методология в 4 фазы

```typescript
export const creativeMethodologyPrompt = `
You follow a proven 4-phase creative methodology for OOH campaigns...
```

**Четыре фазы:**
1. **DISCOVERY** — Исследование контекста и аудитории
2. **INSIGHTS & STRATEGY** — Поиск главной идеи
3. **CREATIVE DEVELOPMENT** — Генерация идей для форматов OOH
4. **TECHNICAL THINKING** — Учет специфики и ограничений

**Методы брейнсторминга:**
- Провокативные вопросы
- Референсы реальных кампаний
- Итеративное развитие идей
- Предупреждение о подводных камнях

**Известные кейсы:**
- Coca-Cola "Happiness Machine"
- McDonald's "Sundial Billboard"
- Spotify "Thanks 2016"
- The Economist "Lightbulb"
- Nike "Unlimited Stadium"
- Volvo "The Copycats"

---

### 4. 🎯 titlePrompt (Обновлен)
**Строки:** 130-135  
**Изменение:** Теперь генерирует заголовки для кампаний

```typescript
export const titlePrompt = `
- you will generate a short title based on the first message...
- example titles: "Nike Metro Campaign Strategy", "Spotify Q4 Billboard Concepts"
`
```

**Примеры:**
- "Nike Metro Campaign Strategy"
- "Spotify Q4 Billboard Concepts"
- "Luxury Fashion DOOH Campaign"

---

### 5. 🎨 NEW: campaignBriefPrompt
**Строки:** ~150  
**Используется:** Для создания полных бриефов

```typescript
export const campaignBriefPrompt = `
You are creating a comprehensive creative campaign brief...
```

**Структура:**
1. Campaign Overview
2. Audience Insights
3. Strategic Platform
4. Creative Concepts
5. Media Strategy
6. Technical Considerations
7. Success Metrics
8. Next Steps

---

### 6. 📊 NEW: conceptPresentationPrompt
**Строки:** ~130  
**Используется:** Для убедительных презентаций

```typescript
export const conceptPresentationPrompt = `
You are crafting a persuasive creative presentation...
```

**Структура:**
1. The Opportunity
2. The Audience
3. The Strategic Idea
4. Creative Executions
5. Why It Works
6. Media Thinking
7. The Impact

---

### 7. 📍 NEW: oohFormatGuidePrompt
**Строки:** ~140  
**Используется:** Для рекомендаций по форматам

```typescript
export const oohFormatGuidePrompt = `
You understand the unique characteristics of each OOH format...
```

**Форматы:**
- **Billboards (3x6м)** — Max 3-7 слов, высокая скорость просмотра
- **City Lights** — 20-30 сек, captive аудитория
- **Digital OOH/DOOH** — Динамичный контент, программируемый
- **Transit Ads** — Повторный контакт, commuters
- **Ambient/Street** — Неожиданно, вирусный потенциал

---

### 8. 🎭 NEW: moodboardPrompt
**Строки:** ~100  
**Используется:** Для создания mood boards

```typescript
export const moodboardPrompt = `
When creating mood boards or reference compilations...
```

**Компоненты:**
1. Tone & Aesthetic
2. Color Palettes
3. Typography & Messaging
4. Imagery Style
5. Technical Inspiration
6. Competitive Context

---

### 9. ✏️ updateDocumentPrompt (Обновлен)
**Старое значение:** Generic "improve the document"  
**Новое значение:** Специфично для креативных документов

```typescript
export const updateDocumentPrompt = (
  currentContent: string | null,
  type: ArtifactKind
) => {
  // Теперь рекомендует "strengthen strategic thinking"
  // "improve creative concepts"
  // "enhance execution details"
}
```

---

### 10. 📍 getRequestPromptFromHints (Не изменен)
**Продолжает работать:** Добавляет геолокационный контекст

```typescript
export const getRequestPromptFromHints = (requestHints: RequestHints) => `
About the origin of user's request:
- lat: ${requestHints.latitude}
- lon: ${requestHints.longitude}
- city: ${requestHints.city}
- country: ${requestHints.country}
`;
```

**Полезно для:**
- Рекомендаций по локациям
- Понимания локального контекста
- Адаптации идей под регион

---

## 🔄 Обновленный systemPrompt

```typescript
export const systemPrompt = ({
  selectedChatModel,
  requestHints,
}: {
  selectedChatModel: string;
  requestHints: RequestHints;
}) => {
  const requestPrompt = getRequestPromptFromHints(requestHints);

  if (selectedChatModel === "chat-model-reasoning") {
    return `${regularPrompt}\n\n${creativeMethodologyPrompt}\n\n${requestPrompt}`;
  }

  return `${regularPrompt}\n\n${creativeMethodologyPrompt}\n\n${requestPrompt}\n\n${artifactsPrompt}`;
};
```

**Логика:**
- **Для reasoning model:** Базовый промпт + методология + геолокация (без artifacts)
- **Для остальных:** Полный стек включая artifacts для документов

---

## 📊 Таблица изменений

| Промпт | Статус | Изменение |
|--------|--------|----------|
| regularPrompt | ✏️ Переписан | От generic assistant к Creative Director |
| artifactsPrompt | ✏️ Переписан | От code-focused к creative documents |
| titlePrompt | ✏️ Обновлен | Примеры для рекламных кампаний |
| creativeMethodologyPrompt | ✅ НОВЫЙ | Полная 4-фазная методология |
| campaignBriefPrompt | ✅ НОВЫЙ | Для структурированных бриефов |
| conceptPresentationPrompt | ✅ НОВЫЙ | Для убедительных презентаций |
| oohFormatGuidePrompt | ✅ НОВЫЙ | Справочник по OOH форматам |
| moodboardPrompt | ✅ НОВЫЙ | Для mood boards и референсов |
| updateDocumentPrompt | ✏️ Адаптирован | Для креативных документов |
| getRequestPromptFromHints | ➖ Не изменен | Все еще используется для контекста |
| systemPrompt | ✏️ Обновлен | Теперь включает creativeMethodologyPrompt |
| codePrompt | ❌ Устарел | Больше не используется |
| sheetPrompt | ❌ Устарел | Больше не используется |

---

## 🎯 Как это работает на практике

### Пример сессии:

**Пользователь:** "Нужна кампания для Nike в метро Москвы"

**Система используется:**
1. `regularPrompt` — Устанавливает контекст Creative Director
2. `creativeMethodologyPrompt` — Содержит методологию брейнсторминга
3. `getRequestPromptFromHints` — Добавляет контекст: Москва, Россия, координаты
4. AI начинает Discovery фазу, задавая вопросы

**Если пользователь просит документ:**
1. `createDocument` запускается
2. Используется `campaignBriefPrompt` или `conceptPresentationPrompt`
3. Создается структурированный документ в artifacts
4. `artifactsPrompt` управляет когда и как обновлять

---

## 💡 Ключевые отличия от оригинала

✅ **Было:** Generic "helpful assistant"  
✅ **Стало:** Specialized Creative Director с 15+ лет опыта

✅ **Было:** Code snippets и Python фокус  
✅ **Стало:** Креативные документы и брейнсторминг

✅ **Было:** Быстрые ответы  
✅ **Стало:** Глубокие вопросы и методологический подход

✅ **Было:** Без контекста  
✅ **Стало:** Учитывает локацию, аудиторию, форматы OOH

✅ **Было:** 2-3 промпта  
✅ **Стало:** 10+ специализированных промптов

---

## 🚀 Тестирование адаптации

Попробуйте эти запросы:

```
1. "Хочу кампанию для Coca-Cola в Москве на Digital OOH"
→ AI задаст вопросы Discovery фазы

2. "Можешь создать brief для кампании?"
→ AI создаст документ с campaignBriefPrompt

3. "Как ты думаешь про идею с AR и QR?"
→ AI оценит с учетом oohFormatGuidePrompt и OOH специфики

4. "Генерируй 3-5 концепций"
→ AI создаст structured concepts с conceptPresentationPrompt
```

---

## 📍 Файл с кодом

**Полный файл:** `/Users/bbeglerov/Development/rts/ai-chatbot/lib/ai/prompts.ts`

**Размер:** ~600 строк (было ~130)

**Структура:**
- Импорты и типы (1-3)
- artifacts для документов (4-39)
- regularPrompt (41-50)
- RequestHints тип (44-49)
- getRequestPromptFromHints (51-57)
- systemPrompt (59-73)
- creativeMethodologyPrompt (75-250+)
- campaignBriefPrompt (252-270)
- conceptPresentationPrompt (272-290)
- oohFormatGuidePrompt (292-350)
- moodboardPrompt (352-375)
- updateDocumentPrompt (378-410)
- titlePrompt (412-418)
- Legacy prompts (420+)

---

## ✅ Статус

- [x] regularPrompt адаптирован для Creative Director
- [x] artifactsPrompt переписан для документов
- [x] Добавлена полная методология (creativeMethodologyPrompt)
- [x] Добавлены специализированные промпты
- [x] systemPrompt обновлен
- [x] titlePrompt адаптирован
- [x] updateDocumentPrompt адаптирован
- [x] Legacy prompts отмечены как deprecated

---

**Готово к использованию!** 🎉

Запустите `npm run dev` и начните новый чат для тестирования креативного директора.
