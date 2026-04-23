# Feature: Data Ingestion + Search + Logout (Final Functional Layer)

## Goal

Make the app fully usable by:

- loading real data (DummyJSON + media.json)
- enabling user search
- allowing chat from search
- enabling logout

---

## PART 1 — DATA INGESTION

(Same as previous spec — keep it unchanged)

- fetchPosts → DummyJSON
- fetchUsers → DummyJSON
- fetchReels → media.json

---

## PART 2 — SEARCH FUNCTIONALITY

### Data Source

Use:

https://dummyjson.com/users

---

### SearchScreen Update

Replace empty UI with:

- search input
- result list

---

### Behavior

On input change:

- filter users locally:

users.filter(user =>
  user.username.toLowerCase().includes(query.toLowerCase())
)

---

### Render

Each result:

- avatar (user.image)
- username

---

### On Press

When user taps a result:

- navigate to ChatDetailScreen
- pass:
  - userId
  - username

---

### Chat Flow

No extra logic needed:

- sendMessage will create chat if not exists (already implemented)

---

## PART 3 — LOGOUT

---

### ProfileScreen

Add button:

"Logout"

Placement:

- below stats OR top-right

---

### Behavior

On press:

1. AsyncStorage.removeItem("auth_token")
2. trigger auth state update
3. App.tsx switches to AuthNavigator

---

### Implementation

Use your existing:

authState.ts

Call:

notifyAuthChanged()

---

## PART 4 — INTEGRATION RULES

- do not create new services
- keep logic inside screens
- do not over-abstract

---

## PART 5 — UX DETAILS

Search:

- show "No users found" if empty

Feed:

- show fallback if empty

Logout:

- immediate transition to login

---

## Do NOT

- do not rebuild architecture
- do not add libraries
- do not refactor working code heavily