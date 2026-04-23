# Feature: Mock Data Integration (Home + Stories + Reels)

## Goal

Turn static UI into a data-driven experience using Mockoon.

This includes:

- fetching posts and stories for HomeScreen
- rendering stories carousel and feed
- rendering real video in ReelsScreen
- keeping implementation simple and local to screens

---

## Data Source

Use Mockoon API:

Base URL (Android emulator):
http://10.0.2.2:3000

Expected endpoints:

- /posts
- /stories

If dataset shape differs, map fields in code rather than reshaping API.

---

## Structure

Create:

src/
  services/
    mockApi.ts

---

## mockApi.ts

Export simple functions:

- fetchPosts()
- fetchStories()

Use fetch or axios.

Return raw JSON or lightly mapped data.

Do not create classes or complex layers.

---

## HomeScreen — Data Integration

Replace placeholder content.

---

### Stories

- fetch from /stories on mount
- store in local state
- render using horizontal FlatList

Each item:

- avatar image (Image)
- username (Text)

Use circular style for avatar.

No press handling needed.

---

### Posts Feed

- fetch from /posts on mount
- store in local state
- render using FlatList

Each post item:

- username
- image URL
- optional caption
- like/comment row (static)

Image:

- use <Image source={{ uri }} />
- fixed height box (no dynamic ratio needed)

---

### State

Use:

- useState
- useEffect

Keep everything inside HomeScreen.

No global state.

---

### Loading

Optional:

- simple boolean
- show basic text or nothing

Do not build loaders.

---

## ReelsScreen — Video Integration

---

### Setup

Install:

react-native-video

---

### Data

Reuse /posts or map subset for video URLs.

If dataset does not include video:

- hardcode 2–3 sample video URLs inside screen

---

### Rendering

Single full-screen video:

- Video component
- resizeMode="cover"
- repeat enabled

Overlay:

- existing action UI stays

No vertical paging yet.

No list required.

---

## Error Handling

Minimal:

- try/catch in fetch
- console.log errors

Do not show complex UI.

---

## Styling

- keep existing dark theme
- maintain spacing from 2A
- avoid layout changes

---

## Naming

Use straightforward naming:

- posts
- stories
- isLoading

Avoid utility-style naming or abstractions.

---

## Code Expectations

- direct logic inside screen
- no custom hooks
- no service layers beyond mockApi.ts
- no memoization or optimization

---

## Do NOT

- do not use GraphQL here
- do not introduce global state
- do not implement pagination
- do not normalize data heavily
- do not create reusable feed systems yet
- do not over-structure code

---

## Developer Notes

Focus on:

- getting real data on screen
- making UI feel alive
- keeping implementation simple

If data shape is inconsistent, handle it inline.

Do not over-engineer data models.