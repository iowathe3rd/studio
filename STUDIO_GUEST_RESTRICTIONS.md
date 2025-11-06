# 🔒 Studio Guest User Restrictions

## Overview

AI Studio functionality is restricted to users with permanent accounts. Guest (anonymous) users cannot access Studio features to prevent:

- 💸 Unlimited API costs (fal.ai generations)
- 🗄️ Unlimited storage usage
- 🔄 Database pollution with abandoned projects

## Implementation

### 1. **Server Actions Protection**

All Studio server actions now require a permanent account:

```typescript
// lib/studio/actions.ts
async function getCurrentUser() {
  const { requirePermanentUser } = await import("@/lib/auth");
  return await requirePermanentUser(); // Redirects guests to /register
}
```

**Affected actions:**

- `getProjectsAction()` ❌ Guest
- `createProjectAction()` ❌ Guest
- `updateProjectAction()` ❌ Guest
- `deleteProjectAction()` ❌ Guest
- `generateAction()` ❌ Guest
- `getUserAssetsAction()` ❌ Guest
- `getUserGenerationsAction()` ❌ Guest

### 2. **UI Restrictions**

#### Studio Page (Paywall)

```tsx
// app/studio/page.tsx
const isGuest = user?.is_anonymous === true;

if (isGuest) {
  // Show upgrade paywall with CTA buttons
  return <StudioPaywall />;
}
```

**Paywall features:**

- 🎨 Beautiful gradient design matching Studio branding
- 📋 Feature showcase (Image Generation, Video Creation, AI Tools)
- 🔗 Two CTA buttons:
  - "Sign Up Free" → `/api/auth/convert?redirectTo=/studio`
  - "Create New Account" → `/register`

#### Sidebar Navigation

```tsx
// components/app-sidebar.tsx
const isGuest = user?.is_anonymous === true;

const teams = [
  { name: "Чат", url: "/" },
  ...(!isGuest ? [{ name: "Студия", url: "/studio" }] : []),
];
```

Guest users don't see the "Студия" option in the sidebar.

### 3. **Auth Helper Function**

```typescript
// lib/auth/index.ts
export async function requirePermanentUser() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  if (user.is_anonymous) {
    redirect("/register?fromGuest=true");
  }

  return user;
}
```

**Behavior:**

- Not authenticated → redirects to `/login`
- Guest user → redirects to `/register?fromGuest=true`
- Permanent user → returns user object

### 4. **Conversion Flow**

#### GET /api/auth/convert

Redirects guest users to registration:

```typescript
GET /api/auth/convert?redirectTo=/studio
→ Redirects to /register?fromGuest=true&redirectTo=/studio
```

#### POST /api/auth/convert

Converts anonymous account to permanent:

```typescript
POST /api/auth/convert
Body: { email, password }
→ Updates user account
→ Preserves chat history
```

### 5. **Registration Page Enhancement**

Shows special message for guests:

```tsx
// app/(auth)/register/page.tsx
{
  fromGuest
    ? "Upgrade your guest account to save your work and unlock all features"
    : "Create an account with your email and password";
}
```

## User Experience Flow

### Guest tries to access Studio:

```
1. Guest visits /studio
   ↓
2. Studio page shows paywall UI
   ↓
3. Guest clicks "Sign Up Free" or "Create New Account"
   ↓
4. Redirected to /register?fromGuest=true
   ↓
5. Sees upgrade message
   ↓
6. Creates permanent account
   ↓
7. Chat history preserved
   ↓
8. Redirected to /studio (if specified)
   ↓
9. Full Studio access granted ✅
```

### Guest tries Studio action directly:

```
1. Guest somehow calls Studio action
   ↓
2. requirePermanentUser() triggered
   ↓
3. Automatic redirect to /register?fromGuest=true
   ↓
4. Registration flow...
```

## Chat vs Studio Comparison

| Feature             | Guest (Chat) | Guest (Studio) | Permanent User |
| ------------------- | ------------ | -------------- | -------------- |
| **Chat messages**   | 20/day       | 20/day         | 100/day        |
| **Chat models**     | All          | All            | All            |
| **Studio access**   | ❌ No        | ❌ No          | ✅ Yes         |
| **Create projects** | ❌ No        | ❌ No          | ✅ Yes         |
| **Generate assets** | ❌ No        | ❌ No          | ✅ Yes         |
| **Upload files**    | ❌ No        | ❌ No          | ✅ Yes         |

## Testing

### Test Guest Restriction:

```bash
# 1. Login as guest
curl http://localhost:3000/api/auth/guest

# 2. Try to access Studio
curl http://localhost:3000/studio
# Should show paywall

# 3. Try to create project (will redirect)
# Browser: Navigate to /studio/new
# Expected: Redirect to /register?fromGuest=true
```

### Test Conversion:

```bash
# 1. As guest, convert account
curl -X POST http://localhost:3000/api/auth/convert \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'

# 2. Verify Studio access
curl http://localhost:3000/studio
# Should show project list (empty)
```

## Files Changed

| File                                   | Change                                      |
| -------------------------------------- | ------------------------------------------- |
| `lib/studio/actions.ts`                | ✅ Use `requirePermanentUser()`             |
| `lib/auth/index.ts`                    | ✅ Add redirect to `requirePermanentUser()` |
| `app/studio/page.tsx`                  | ✅ Show paywall for guests                  |
| `components/app-sidebar.tsx`           | ✅ Hide Studio link for guests              |
| `app/(auth)/api/auth/convert/route.ts` | ✅ Add GET redirect handler                 |
| `app/(auth)/register/page.tsx`         | ✅ Show upgrade message for guests          |

## Security Benefits

✅ **Cost Control**: Prevents unlimited API usage
✅ **Storage Control**: Prevents storage abuse
✅ **Quality Control**: Reduces abandoned content
✅ **User Intent**: Only serious users access Studio
✅ **Conversion**: Encourages account creation

## Future Enhancements

### Potential Studio Limits for Permanent Users:

```typescript
// Future: lib/studio/entitlements.ts
export const studioEntitlements = {
  free: {
    maxGenerationsPerDay: 50,
    maxProjects: 10,
    maxAssetsPerProject: 100,
    maxCostPerDay: 10.0,
  },
  pro: {
    maxGenerationsPerDay: 500,
    maxProjects: 100,
    maxAssetsPerProject: 1000,
    maxCostPerDay: 100.0,
  },
};
```

## FAQ

**Q: Can guests view Studio without using it?**
A: Yes, they see a beautiful paywall that showcases features.

**Q: What happens to chat history when converting?**
A: All chat data is preserved when converting from guest to permanent.

**Q: Can guests access Studio API directly?**
A: No, `requirePermanentUser()` blocks all Studio actions.

**Q: What if guest bookmarks a Studio project URL?**
A: They'll be redirected to registration page.

---

**Status**: ✅ **IMPLEMENTED**
**Date**: November 6, 2025
**Impact**: All Studio features restricted to permanent users
