# Feature: Final Polish + Stability

## Goal

Refine the application so it feels complete and production-ready:

- secure authentication (JWT + hashing)
- clean navigation and auth flow
- consistent UI and theme
- small UX improvements
- code cleanup

No new features.

---

## Scope

Includes:

- JWT auth backend
- password hashing
- frontend token handling update
- navigation cleanup
- UI polish
- basic error handling
- code cleanup

Excludes:

- refresh tokens
- push notifications
- advanced caching
- performance optimization

---

## Backend — Auth Improvements

### Password Hashing

Use bcrypt:

- hash password on register
- compare hash on login

Do not store plain text anymore.

---

### JWT

Replace mock token with real JWT:

- sign token with userId
- use JWT_SECRET from .env
- expiration: simple (e.g. 7d)

Return:

token + user

---

### Auth Guard (Minimal)

Create simple guard:

- extract token from header
- verify JWT
- attach userId to context

Use it only where needed (e.g. createPost, sendMessage).

Keep it light.

---

## Frontend — Auth Update

### Token Handling

Already storing token → keep same.

Update:

- attach token in Apollo headers

Example:

Authorization: Bearer <token>

---

### Remove Temporary Logic

- remove mock token format
- remove any fallback auth checks
- ensure App.tsx only checks token existence

---

## Navigation Cleanup

Ensure clean separation:

- AuthNavigator → Login, Register
- AppNavigator → Tabs

No leftover logic from Phase 1.

---

## UI Polish

### General

- fix spacing inconsistencies
- align paddings/margins across screens
- normalize text sizes

---

### Home

- improve spacing between posts
- adjust story avatar sizing

---

### Reels

- align action buttons properly
- ensure full-screen coverage

---

### Chat

- improve bubble spacing
- adjust input alignment

---

### Profile

- align grid spacing
- fix stats layout
- ensure consistent margins

---

## Theme

Add simple light/dark toggle:

- default = dark
- toggle stored in local state or AsyncStorage

Do not build complex theme system.

---

## Error Handling

Add basic UI-level handling:

- login errors → show text
- failed fetch → small fallback text

No global error system.

---

## Loading States

Add minimal loading feedback:

- Home → simple loading text
- Chat → loading indicator before messages
- Profile → optional placeholder

No skeleton loaders required.

---

## Code Cleanup

- remove unused files (mockApi, etc.)
- remove unused imports
- rename unclear variables
- group files logically
- keep folder structure clean

---

## Naming Cleanup

- avoid leftover “mock” naming
- keep consistent naming across modules

---

## Stability Checks

Ensure:

- no crashes on navigation
- no undefined data access
- safe rendering when data is empty

---

## Do NOT

- do not introduce new libraries
- do not add complex state systems
- do not over-refactor working code
- do not optimize prematurely

---

## Developer Notes

This phase is about finishing, not building.

Focus on:

- smooth user flow
- visual consistency
- clean codebase

Avoid adding anything new unless necessary.