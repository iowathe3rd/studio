# 🎯 Подробная Структура Системных Промптов

## 📍 Локация файлов

```
Project Root/
├── lib/ai/
│   ├── prompts.ts              ⭐ ОСНОВНОЙ ФАЙЛ
│   └── tools/
│       └── request-suggestions.ts    (содержит промпт для suggestions)
└── app/(chat)/
    ├── api/
    │   └── chat/
    │       └── route.ts             (использует systemPrompt)
    └── actions.ts                   (использует titlePrompt)
```

---

## 1️⃣ lib/ai/prompts.ts - Детальный разбор

### Импорты и типы
```typescript
import type { Geo } from "@vercel/functions";
import type { ArtifactKind } from "@/components/artifact";
```

### 🎭 Промпт #1: artifactsPrompt (41 строка)
```
Строки: 4-39
Экспорт: export const artifactsPrompt = `...`

Содержит:
- Объяснение что такое artifacts
- Когда использовать createDocument (>10 строк, переиспользуемый контент)
- Когда НЕ использовать createDocument
- Инструкции для updateDocument
- ВАЖНОЕ: Policy для вызовов tools (вызывай ОДИН tool один раз!)
```

### 🌍 Промпт #2: regularPrompt (2 строки)
```
Строки: 41-42
Экспорт: export const regularPrompt = "You are a friendly assistant!..."

Значение: Базовый тон для всех разговоров
Используется: Везде, как основание для systemPrompt
```

### 🔍 Тип: RequestHints (4 линии)
```
Строки: 44-49
Определяет:
- latitude: число
- longitude: число
- city: строка
- country: строка

Используется: В getRequestPromptFromHints функции
```

### 📍 Функция: getRequestPromptFromHints (7 строк)
```
Строки: 51-57
Входные параметры: RequestHints
Выходные данные: Строка с информацией о геолокации

Пример вывода:
"About the origin of user's request:
- lat: 37.7749
- lon: -122.4194
- city: San Francisco
- country: United States"
```

### 🎪 Главная функция: systemPrompt (14 строк)
```
Строки: 59-73
Входные параметры:
  - selectedChatModel: 'chat-model-reasoning' | другие
  - requestHints: RequestHints

Логика ветвления:
  if (selectedChatModel === "chat-model-reasoning") {
    return regularPrompt + requestPrompt
  } else {
    return regularPrompt + requestPrompt + artifactsPrompt
  }

Назначение: Комбинирует промпты в зависимости от модели
```

### 🐍 Промпт #3: codePrompt (25 строк)
```
Строки: 75-99
Экспорт: export const codePrompt = `...`

Правила Python кода:
1. Self-contained snippets
2. Используй print() для вывода
3. Добавляй комментарии
4. <15 строк
5. Только стандартная библиотека
6. Graceful error handling
7. Meaningful output
8. Нет input()
9. Нет file/network access
10. Нет бесконечных циклов

Примеры в промпте:
- Факториал
```

### 📊 Промпт #4: sheetPrompt (3 строки)
```
Строки: 101-103
Экспорт: export const sheetPrompt = `...`

Используется: Для генерации CSV таблиц
Содержит: Инструкции для создания таблиц с заголовками
```

### ✏️ Функция: updateDocumentPrompt (12 строк)
```
Строки: 105-120
Входные параметры:
  - currentContent: string | null
  - type: 'code' | 'sheet' | 'text'

Логика:
  if (type === 'code') mediaType = 'code snippet'
  else if (type === 'sheet') mediaType = 'spreadsheet'
  else mediaType = 'document'

Выход: "Improve the following contents of the ${mediaType}..."

Назначение: Динамический промпт для обновления документов
```

### 🎯 Промпт #5: titlePrompt (6 строк)
```
Строки: 122-126
Экспорт: export const titlePrompt = `...`

Правила:
- Генерируй короткий заголовок
- Макс 80 символов
- На основе первого сообщения
- Без кавычек и двоеточий

Используется: Для генерации названий чатов
```

---

## 2️⃣ app/(chat)/api/chat/route.ts - Использование

### Где используется systemPrompt

```typescript
// Строка ~217
const result = streamText({
  model,
  system: systemPrompt({ selectedChatModel, requestHints }),
  messages: convertToModelMessages(sanitizedMessages),
  stopWhen: stepCountIs(5),
  activeTools: [/* ... */],
  tools: {/* ... */},
});
```

### Как получаются requestHints

```typescript
// Примерно строка 150-170 (получается из req.geo)
const requestHints: RequestHints = {
  latitude: req.geo?.latitude || 0,
  longitude: req.geo?.longitude || 0,
  city: req.geo?.city || "",
  country: req.geo?.country || "",
};
```

### Какая модель выбирается

```typescript
const selectedChatModel = (parsedBody.model as ChatModelId) || "chat-model-fast";
```

---

## 3️⃣ app/(chat)/actions.ts - Заголовки

```typescript
import { titlePrompt } from "@/lib/ai/prompts";

export async function generateTitleFromUserMessage({
  message,
}: {
  message: UIMessage;
}) {
  const model = myProvider.languageModel("title-model") as LanguageModel;

  const { text: title } = await generateText({
    model,
    system: titlePrompt,  // ⭐ Используется titlePrompt
    prompt: getTextFromMessage(message),
  });

  return title;
}
```

**Процесс:**
1. Берет первое сообщение пользователя
2. Использует title-model
3. Применяет titlePrompt как system промпт
4. Генерирует заголовок (<80 символов)

---

## 4️⃣ lib/ai/tools/request-suggestions.ts - Предложения

```typescript
// Строки 54-55
const { elementStream } = streamObject({
  model,
  system: "You are a help writing assistant. Given a piece of writing, please offer suggestions to improve the piece of writing and describe the change. It is very important for the edits to contain full sentences instead of just words. Max 5 suggestions.",
  prompt: document.content,
  output: "array",
  schema: z.object({
    originalSentence: z.string().describe("The original sentence"),
    suggestedSentence: z.string().describe("The suggested sentence"),
    // ...
  }),
});
```

**Процесс:**
1. Берет документ
2. Применяет промпт об улучшении писательства
3. Генерирует массив предложений
4. Каждое предложение имеет оригинальное и предложенное текст

---

## 📌 Все промпты в одной таблице

| # | Имя | Файл | Строки | Тип | Применение |
|---|-----|------|--------|-----|-----------|
| 1 | artifactsPrompt | prompts.ts | 4-39 | string | systemPrompt (не reasoning) |
| 2 | regularPrompt | prompts.ts | 41-42 | string | Везде |
| 3 | getRequestPromptFromHints | prompts.ts | 51-57 | func | systemPrompt |
| 4 | systemPrompt | prompts.ts | 59-73 | func | route.ts |
| 5 | codePrompt | prompts.ts | 75-99 | string | Reference |
| 6 | sheetPrompt | prompts.ts | 101-103 | string | Reference |
| 7 | updateDocumentPrompt | prompts.ts | 105-120 | func | Reference |
| 8 | titlePrompt | prompts.ts | 122-126 | string | actions.ts |
| 9 | suggestionsPrompt | request-suggestions.ts | 54-55 | string | Tool suggestions |

---

## 🔗 Граф использования

```
systemPrompt (главная функция)
├── regularPrompt (всегда)
├── getRequestPromptFromHints (всегда)
│   └── RequestHints (геоданные)
└── artifactsPrompt (если не reasoning model)

titlePrompt
└── app/(chat)/actions.ts

suggestionsPrompt
└── lib/ai/tools/request-suggestions.ts
```

---

## 🎓 Наследование промптов

```
ROOT SYSTEM PROMPTS:
├── regularPrompt (базовый тон)
│   └── systemPrompt (комбинирует всё)
│       ├── + requestHints (геолокация)
│       └── + artifacts (если нужно)
│
ДРУГИЕ ПРОМПТЫ:
├── titlePrompt (заголовки)
├── codePrompt (код - reference)
├── sheetPrompt (таблицы - reference)
└── suggestionsPrompt (редактирование)
```

---

## 🔍 Как найти и отредактировать промпты

### Найти все промпты:
```bash
cd /Users/bbeglerov/Development/rts/ai-chatbot

# Основные промпты
cat lib/ai/prompts.ts

# Дополнительные
grep -n "system:" lib/ai/tools/request-suggestions.ts
grep -n "system:" app/(chat)/api/chat/route.ts
grep -n "system:" app/(chat)/actions.ts
```

### Отредактировать:
1. Открыть `lib/ai/prompts.ts`
2. Найти нужный промпт
3. Отредактировать текст
4. Сохранить
5. Изменение применится везде (в местах использования)

---

## 💡 Советы

✅ **Все главные промпты в одном файле** (`lib/ai/prompts.ts`)  
✅ **Легко найти и отредактировать**  
✅ **Переиспользуются во всем проекте**  
❌ **Не дублируй промпты** - используй export  
✅ **Функции для динамических промптов** - лучше чем строки  

---

**Документация актуальна на:** 2024-11-06
