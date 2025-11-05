# Sidebar Collapsible State Guide

## 📋 Overview

Sidebar теперь имеет два состояния: **expanded** (открыт) и **collapsed** (свёрнут). В свёрнутом состоянии видны только ключевые кнопки с tooltip подсказками.

## 🎨 Visual Comparison

### Collapsed State (Icon Mode) - Свёрнут ⚡

```
┌──┐
│☰ │  ← Sidebar Toggle
├──┤
│+ │  ← New Chat (tooltip: "New Chat")
├──┤
│🔍│  ← Search (tooltip: "Search chats")
│  │     При клике → открывает sidebar
├──┤
│  │
│  │  (NavMain скрыт)
│  │  (History скрыт)
│  │
├──┤
│👤│  ← User Avatar (tooltip: "{username}")
└──┘
```

**Ширина:** `3rem` (48px)

### Expanded State - Развёрнут 📖

```
┌─────────────────┐
│ Chat    Studio │  ← Team Switcher
├─────────────────┤
│ + New chat     │  ← New Chat Button
├─────────────────┤
│ 🔍 Search      │  ← Search Button
├─────────────────┤
│ [Search input] │  ← Search Input Field
├─────────────────┤
│ AI Models      │  ← NavMain (collapsible)
│  ├ Model 1     │
│  ├ Model 2     │
│  └ Model 3     │
├─────────────────┤
│ Chat History   │  ← SidebarHistory
│  Today         │
│  ├ Chat 1      │
│  ├ Chat 2      │
│  Yesterday     │
│  ├ Chat 3      │
│  └ ...         │
├─────────────────┤
│ 👤 Username    │  ← User Info
│    email       │
└─────────────────┘
```

**Ширина:** `16rem` (256px)

## 🔧 Technical Implementation

### Key CSS Classes

```typescript
// Скрыть элемент в collapsed состоянии
className="group-data-[collapsible=icon]:hidden"

// Элемент всегда виден (с tooltip в collapsed)
<SidebarMenuButton tooltip="Text here">
  <Icon />
  <span>Text</span>  // автоматически скрывается в collapsed
</SidebarMenuButton>
```

### Components Structure

#### AppSidebar (`components/app-sidebar.tsx`)

```tsx
<Sidebar collapsible="icon">
  <SidebarHeader>
    {/* Team Switcher - hidden when collapsed */}
    <div className="group-data-[collapsible=icon]:hidden">
      <TeamSwitcher />
    </div>

    {/* New Chat - always visible with tooltip */}
    <SidebarMenuButton tooltip="New Chat">
      <Plus /> <span>New chat</span>
    </SidebarMenuButton>

    {/* Search Button - always visible, opens sidebar when clicked */}
    <SidebarMenuButton 
      tooltip="Search chats"
      onClick={() => !open && setOpen(true)}
    >
      <Search /> <span>Search</span>
    </SidebarMenuButton>

    {/* Search Input - only in expanded */}
    <div className="group-data-[collapsible=icon]:hidden">
      <Input placeholder="Search chats..." />
    </div>
  </SidebarHeader>

  <SidebarContent>
    {/* NavMain - already has group-data-[collapsible=icon]:hidden */}
    <NavMain items={[...]} />

    {/* SidebarHistory - hidden when collapsed */}
    <div className="group-data-[collapsible=icon]:hidden">
      <SidebarHistory />
    </div>
  </SidebarContent>

  <SidebarFooter>
    {/* NavUser - avatar always visible, text hidden */}
    <NavUser user={...} />
  </SidebarFooter>
</Sidebar>
```

#### NavUser (`components/nav-user.tsx`)

```tsx
<SidebarMenuButton tooltip={user.name}>
  {/* Avatar - always visible */}
  <Avatar>...</Avatar>

  {/* Name & Email - hidden in collapsed */}
  <div className="group-data-[collapsible=icon]:hidden">
    <span>{user.name}</span>
    <span>{user.email}</span>
  </div>

  {/* Chevron - hidden in collapsed */}
  <ChevronsUpDown className="group-data-[collapsible=icon]:hidden" />
</SidebarMenuButton>
```

#### NavMain (`components/nav-main.tsx`)

```tsx
<SidebarGroup className="group-data-[collapsible=icon]:hidden">
  {/* Весь контент скрыт в collapsed */}
</SidebarGroup>
```

## 📱 Responsive Behavior

### Desktop
- **Collapsed**: 48px wide, icons only
- **Expanded**: 256px wide, full content
- Toggle: Click rail or keyboard shortcut (Cmd/Ctrl + B)

### Mobile
- Always uses Sheet (drawer) instead of collapsible sidebar
- Opens full-width from left
- No collapsed state on mobile

## 🎯 User Experience

### In Collapsed State:

1. **New Chat** 🆕
   - Click → Creates new chat
   - Tooltip: "New Chat"
   - Always accessible

2. **Search** 🔍
   - Click → Opens sidebar automatically
   - Tooltip: "Search chats"
   - Smart behavior: expands to show search input

3. **User Avatar** 👤
   - Click → Opens user menu
   - Tooltip: Shows username
   - Quick access to profile/logout

4. **Sidebar Toggle** ☰
   - Click → Expands sidebar
   - Also accessible via rail (invisible border on right)
   - Keyboard: Cmd/Ctrl + B

### In Expanded State:

All features fully accessible:
- Team switcher (Chat/Studio)
- New chat button
- Search with input field
- AI Models list
- Full chat history with groups
- User profile with email

## 🔄 State Management

```typescript
const { state, open, setOpen } = useSidebar()

// state: "expanded" | "collapsed"
// open: boolean
// setOpen: (boolean) => void

// Check if collapsed
const isCollapsed = state === "collapsed"

// Toggle programmatically
setOpen(!open)
```

## 🎨 Styling Guidelines

### Tooltips
- Show in collapsed state only
- Position: right side of icon
- Delay: instant (delayDuration={0})

### Icons
- Size: `h-4 w-4` (16px)
- Consistent across all buttons
- Color: inherits from theme

### Spacing
- Collapsed width: `3rem` (48px)
- Icon padding: `px-2` (8px each side)
- Vertical gap: `gap-2` (8px)

## 🧪 Testing Checklist

- [ ] Sidebar collapses/expands on toggle click
- [ ] New Chat button works in both states
- [ ] Search button opens sidebar when collapsed
- [ ] Tooltips appear in collapsed state
- [ ] NavMain hidden in collapsed
- [ ] History hidden in collapsed
- [ ] User shows only avatar in collapsed
- [ ] Team switcher hidden in collapsed
- [ ] Search input hidden in collapsed
- [ ] Keyboard shortcut (Cmd/Ctrl + B) works
- [ ] Rail click toggles sidebar
- [ ] Mobile uses drawer (Sheet)
- [ ] State persists in cookie

## 📊 Before/After Comparison

### Before Changes ❌
- All elements visible in collapsed
- Cluttered icon view
- No smart search behavior
- User info always showing

### After Changes ✅
- Clean icon-only collapsed state
- Only essential buttons visible
- Search opens sidebar automatically
- User shows only avatar
- Professional, minimal design

## 🚀 Benefits

1. **More Screen Space**: Collapsed sidebar uses only 48px
2. **Better Focus**: Less distraction when writing
3. **Quick Access**: Essential features always one click away
4. **Smart Interactions**: Search auto-expands sidebar
5. **ChatGPT-like**: Follows modern AI chat UI patterns

## 🔮 Future Enhancements

Potential improvements:
- [ ] Animated transitions between states
- [ ] Remember search query when collapsing
- [ ] Keyboard navigation in collapsed state
- [ ] Hover to peek at full content
- [ ] Custom collapsed width setting

---

**Last Updated**: November 5, 2025
**Status**: ✅ Complete and tested
