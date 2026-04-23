# Feature: App Navigation + Main Screens (Post-Auth)

## Goal

Set up the main application navigation after login using a bottom tab navigator.

This includes:

- Bottom tab navigation
- 5 main screens
- basic UI structure for each screen
- switching between auth flow and app flow

This should result in a working app shell that feels like a real product.

---

## Scope

This includes:

- AppNavigator (bottom tabs)
- Home, Reels, Search, Chat, Profile screens
- basic UI layout for each screen
- icons and tab behavior
- App.tsx update to switch between auth and app

This does NOT include:

- backend data fetching
- posts logic
- reels logic
- chat backend
- followers/profile data
- search functionality

---

## Navigation Setup

Use:

- React Navigation
- Bottom Tab Navigator

Do not use:

- nested stacks yet
- complex navigation patterns
- wrappers or abstraction layers

Keep everything straightforward.

---

## Structure

Create:

src/
  navigation/
    AppNavigator.tsx

  screens/
    main/
      HomeScreen.tsx
      ReelsScreen.tsx
      SearchScreen.tsx
      ChatScreen.tsx
      ProfileScreen.tsx

---

## AppNavigator

Tabs:

- Home
- Reels
- Search
- Chat
- Profile

Each tab maps directly to its screen.

Use simple icons.

Do not over-customize tab bar.

---

## App.tsx Update

Update logic:

- if token exists → render AppNavigator
- else → render AuthNavigator

Remove HomeScreen from AuthNavigator.

---

## Screen Expectations

Each screen should feel intentional, not empty.

Do not leave blank screens.

---

### HomeScreen

- scrollable container
- top header (Instagram text or placeholder)
- horizontal stories row (simple placeholders)
- one or two post cards

Post card should include:

- username
- image placeholder (view box)
- like/comment row

Keep layout clean.

No backend.

---

### ReelsScreen

- full screen container
- dark background
- centered placeholder video block
- right side vertical actions (like, comment icons)

No video playback logic.

---

### SearchScreen

- top search input
- empty content area

No grid
No API
No filtering

Keep minimal as per requirement.

---

### ChatScreen

- list layout
- 5–6 mock users

Each item:

- avatar placeholder
- username
- last message text

Touchable but no navigation yet.

---

### ProfileScreen

- profile header:

  - avatar placeholder
  - username
  - stats row (posts, followers, following)

- grid layout below (simple boxes)

No backend.

---

## Reusable Approach

Reuse:

- existing Input component (for search)
- basic View/Text composition

Do not create new abstraction layers.

---

## Styling Expectations

- follow existing dark theme
- consistent spacing
- avoid overly tight layouts
- no pixel perfection needed, just balance

---

## Naming Style

Use simple naming:

- HomeScreen
- ReelsScreen
- handlePress
- isActive

Avoid:

- generic utility naming
- overly complex naming

---

## Code Expectations

- direct implementation
- minimal layers
- readable components
- no unnecessary hooks

---

## Comments

Keep almost none.

Only where needed.

---

## Do NOT

- do not fetch data
- do not connect GraphQL
- do not add navigation stacks inside tabs
- do not create global state
- do not create reusable UI systems prematurely
- do not over-structure folders

---

## Developer Notes

This step builds the full app shell.

It should:

- feel like a real app
- navigate smoothly
- have visible structure in every screen

Do not try to perfect UI.

Do not try to optimize.

Just make it clean, usable, and consistent.