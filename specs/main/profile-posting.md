# Feature: Profile Posting (Local Media + UI Flow)

## Goal

Allow the user to create a post from the Profile screen using:

- gallery selection (temporary logic)
- camera trigger (temporary logic)

The selected media should appear in the profile grid immediately.

This is local-only behavior.

---

## Scope

This includes:

- "Post" button in ProfileScreen
- media selection UI (simple options)
- handling selected media (temporary/mock)
- updating profile grid with new post

This does NOT include:

- native permissions (handled in next phase)
- backend upload
- saving to database
- syncing with feed

---

## ProfileScreen Update

Add a "Post" entry point.

Placement:

- top right (header area)
OR
- below profile stats

Keep it simple.

---

## Post Action Flow

On press:

Show two options:

- Upload from gallery
- Use camera

Use:

- simple modal
OR
- conditional view

No external libraries.

---

## Temporary Media Handling

Since native integration is not done yet:

Simulate selection.

For now:

- use a hardcoded list of image URLs
OR
- pick randomly from a small set

Example:

- 4–5 static image URLs

---

## Local Post State

Inside ProfileScreen:

Create state:

- localPosts (array)

Structure:

- id
- imageUrl

---

## Adding a Post

When user selects gallery or camera:

- choose one image (mock)
- prepend to localPosts

Newest post appears first.

---

## Grid Update

Profile grid should render:

- localPosts first
- existing placeholder/mock posts after

Use simple grid layout:

- 3 columns
- fixed square items

---

## Rendering

Use:

- FlatList with numColumns = 3
OR
- manual grid using flexWrap

Each item:

- Image component
- cover style

---

## UI Expectations

- grid updates instantly
- no loading states needed
- no animations required

---

## State Handling

Keep everything inside ProfileScreen:

- useState only

No context
No global state

---

## Naming

Use:

- localPosts
- handleAddPost
- selectedImage

Avoid:

- generic utility naming
- abstraction-heavy naming

---

## Code Expectations

- simple flow
- direct state updates
- minimal logic
- readable structure

---

## Comments

Minimal only.

---

## Do NOT

- do not use native modules yet
- do not implement permissions
- do not upload files
- do not store files persistently
- do not sync with Home feed
- do not create media services
- do not over-structure logic

---

## Developer Notes

This step is about flow, not correctness of media handling.

Focus on:

- interaction working
- UI updating correctly
- keeping logic simple

Native correctness comes in next phase.