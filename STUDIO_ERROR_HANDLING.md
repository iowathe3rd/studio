# 🛡️ Studio Error Handling System

Централизованная типизированная система обработки ошибок для AI Studio с автоматическим контекстом и user-friendly сообщениями.

## 🚀 Quick Start

### 1. Server Action (Backend)

```typescript
import { ChatSDKError } from "@/lib/errors";

export async function createProjectAction(title: string) {
  // Валидация
  if (!title?.trim()) {
    throw new ChatSDKError("bad_request:studio_project", "Title required");
  }

  try {
    return await createProject({ title });
  } catch (error) {
    throw new ChatSDKError("rate_limit:studio_project");
  }
}
```

### 2. Client Component (Frontend)

```typescript
import { showStudioError, showStudioSuccess } from "@/lib/studio/error-handler";

const handleCreate = async () => {
  try {
    const project = await createProjectAction(title);
    showStudioSuccess("Project created!", project.title);
  } catch (error) {
    showStudioError(error, "project");
  }
};
```

## 📖 Documentation

- **[Full Guide](./docs/STUDIO_ERROR_HANDLING.md)** - Complete documentation with examples
- **[Quick Reference](./docs/STUDIO_ERROR_HANDLING_QUICK_REF.md)** - Common patterns
- **[Flow Diagrams](./docs/STUDIO_ERROR_HANDLING_FLOW.md)** - Visual flows

## 🎯 Features

✨ **54+ Error Codes** - Comprehensive coverage  
🎨 **Context-Aware** - Smart message adaptation  
🔒 **Type-Safe** - Full TypeScript support  
📊 **Auto-Logging** - Automatic error tracking  
🌍 **User-Friendly** - Clear, actionable messages  

## 📦 What's Included

### Core Files
- `lib/errors.ts` - Base error system (extended)
- `lib/studio/error-handler.ts` - Studio utilities (new)
- `lib/studio/actions.ts` - Updated with typed errors

### Components (Updated)
- `components/studio/generation-panel-v2.tsx`
- `components/studio/generation-panel.tsx`
- `app/studio/new/page.tsx`

### Documentation (New)
- `docs/STUDIO_ERROR_HANDLING.md` - Complete guide
- `docs/STUDIO_ERROR_HANDLING_QUICK_REF.md` - Quick ref
- `docs/STUDIO_ERROR_HANDLING_FLOW.md` - Flow diagrams
- `STUDIO_ERROR_HANDLING_SUMMARY.md` - Implementation summary

## 🔑 Error Codes

### Format
```
${ErrorType}:${Surface}
```

### Examples
- `not_found:studio_project` - Project not found
- `rate_limit:studio_generation` - Generation quota exceeded
- `forbidden:studio_asset` - No permission to access asset
- `bad_request:fal_api` - Invalid AI service request

### All Surfaces
- `studio_project` - Projects
- `studio_asset` - Assets
- `studio_generation` - Generations
- `studio_template` - Templates
- `fal_api` - fal.ai API
- `file_upload` - File uploads

## 💡 Common Patterns

### Validation
```typescript
if (!input?.trim()) {
  throw new ChatSDKError("bad_request:studio_project", "Input required");
}
```

### Permission Check
```typescript
if (resource.userId !== user.id) {
  throw new ChatSDKError("forbidden:studio_project");
}
```

### Not Found
```typescript
if (!resource) {
  throw new ChatSDKError("not_found:studio_project");
}
```

### Client Handling
```typescript
try {
  await action();
  showStudioSuccess("Success!", "All done");
} catch (error) {
  showStudioError(error, "generation");
}
```

## ✅ Checklist

When adding new features:

- [ ] Define error scenarios
- [ ] Add validation in server action
- [ ] Use `ChatSDKError` with proper codes
- [ ] Handle errors on client with `showStudioError`
- [ ] Test all error paths
- [ ] Update docs if adding new codes

## 🧪 Testing

```typescript
// Trigger specific error
throw new ChatSDKError("rate_limit:studio_generation");

// Verify handling
expect(() => action()).toThrow(ChatSDKError);
expect(error.type).toBe("rate_limit");
expect(error.surface).toBe("studio_generation");
```

## 📊 Status

- ✅ **Production Ready**
- ✅ **Full TypeScript Support**
- ✅ **Comprehensive Documentation**
- ✅ **54+ Error Codes**
- ✅ **All Studio Features Covered**

## 🤝 Contributing

1. Follow existing error code patterns
2. Add descriptive cause messages
3. Update documentation
4. Test all error paths

## 📝 License

Same as parent project

---

**Version:** 1.0.0  
**Last Updated:** 2025-11-06  
**Status:** ✅ Production Ready
