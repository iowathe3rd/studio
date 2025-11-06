# 🛡️ Studio Error Handling - Developer Cheat Sheet

## 📥 Imports

```typescript
// Server
import { ChatSDKError } from "@/lib/errors";

// Client
import { showStudioError, showStudioSuccess } from "@/lib/studio/error-handler";
import { toast } from "sonner";
```

## 🎯 Error Codes Reference

| Type | Code | HTTP | Use When |
|------|------|------|----------|
| `bad_request` | 400 | Invalid input/parameters |
| `unauthorized` | 401 | Not signed in |
| `forbidden` | 403 | No permission |
| `not_found` | 404 | Resource doesn't exist |
| `rate_limit` | 429 | Quota/limit exceeded |
| `offline` | 503 | Service unavailable |

## 🏷️ Surfaces

- `studio_project` - Projects
- `studio_asset` - Assets  
- `studio_generation` - AI generations
- `studio_template` - Templates
- `fal_api` - fal.ai API
- `file_upload` - File uploads

## 🔧 Server Patterns

### Basic Throw
```typescript
throw new ChatSDKError("not_found:studio_project");
```

### With Context
```typescript
throw new ChatSDKError("bad_request:studio_generation", "Prompt too long");
```

### Validation Chain
```typescript
if (!input) throw new ChatSDKError("bad_request:studio_project", "Required");
if (input.length > 200) throw new ChatSDKError("bad_request:studio_project", "Too long");
```

### Try-Catch Transform
```typescript
try {
  return await dbQuery();
} catch (error) {
  if (error.message?.includes("rate limit")) {
    throw new ChatSDKError("rate_limit:studio_project");
  }
  throw new ChatSDKError("bad_request:studio_project", error.message);
}
```

## 💻 Client Patterns

### Basic Handler
```typescript
try {
  await action();
  showStudioSuccess("Done!");
} catch (error) {
  showStudioError(error, "generation");
}
```

### With Description
```typescript
showStudioSuccess("Project created!", `${project.title} is ready`);
```

### Pre-Validation
```typescript
if (!input) {
  toast.error("Required", { description: "Please fill this field" });
  return;
}

try {
  await action();
} catch (error) {
  showStudioError(error, "project");
}
```

### Wrapper Pattern
```typescript
const result = await withErrorHandling(
  () => generateAction(request),
  "generation",
  { title: "Started!", description: "Generating..." }
);
```

## 🎨 Common Scenarios

### Create Resource
```typescript
// Server
export async function createProjectAction(title: string) {
  if (!title?.trim()) {
    throw new ChatSDKError("bad_request:studio_project", "Title required");
  }
  try {
    return await createProject({ title });
  } catch (error) {
    throw new ChatSDKError("rate_limit:studio_project");
  }
}

// Client
try {
  const project = await createProjectAction(title);
  showStudioSuccess("Created!", project.title);
  router.push(`/studio/${project.id}`);
} catch (error) {
  showStudioError(error, "project");
}
```

### Get Resource
```typescript
// Server
const resource = await getById(id);
if (!resource) {
  throw new ChatSDKError("not_found:studio_project");
}
if (resource.userId !== user.id) {
  throw new ChatSDKError("forbidden:studio_project");
}
return resource;
```

### Delete Resource
```typescript
// Server
const resource = await getById(id);
if (!resource) {
  throw new ChatSDKError("not_found:studio_asset");
}
if (resource.userId !== user.id) {
  throw new ChatSDKError("forbidden:studio_asset");
}
try {
  await delete(id);
} catch (error) {
  throw new ChatSDKError("bad_request:studio_asset", error.message);
}

// Client
try {
  await deleteAssetAction(id);
  showStudioSuccess("Deleted!");
  onRefresh();
} catch (error) {
  showStudioError(error, "asset");
}
```

### Generate Content
```typescript
// Server
const model = getModelById(modelId);
if (!model) {
  throw new ChatSDKError("not_found:fal_api", `Model: ${modelId}`);
}
if (!prompt?.trim()) {
  throw new ChatSDKError("bad_request:studio_generation", "Prompt required");
}

// Client
if (!selectedModel) {
  toast.error("Select model", { description: "Choose AI model first" });
  return;
}
try {
  await generateAction(request);
  showStudioSuccess("Started!", "Your content is being generated");
} catch (error) {
  showStudioError(error, "generation");
}
```

## 🚫 Common Mistakes

### ❌ Don't
```typescript
// Generic error
throw new Error("Something went wrong");

// No context
showStudioError(error);

// Console instead of proper error
console.error("Failed");
```

### ✅ Do
```typescript
// Typed error
throw new ChatSDKError("bad_request:studio_project", "Title required");

// With context
showStudioError(error, "generation");

// Both
showStudioError(error, "generation"); // User sees toast + console logs
```

## 📝 Quick Checklist

- [ ] Validate input
- [ ] Check permissions
- [ ] Use ChatSDKError on server
- [ ] Add context on client
- [ ] User-friendly messages
- [ ] Handle all error paths

## 🔗 Full Docs

- [Complete Guide](./docs/STUDIO_ERROR_HANDLING.md)
- [Flow Diagrams](./docs/STUDIO_ERROR_HANDLING_FLOW.md)
- [Implementation Summary](./STUDIO_ERROR_HANDLING_SUMMARY.md)

---

**Keep this handy while coding!** 📌
