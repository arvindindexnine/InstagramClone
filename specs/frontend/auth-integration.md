# Feature: Frontend Auth Integration (Login Flow)

## Goal

Connect frontend login screen with backend login mutation.

This includes:

- calling login mutation
- handling response
- storing token locally
- basic authenticated state
- switching UI after login

---

## Scope

This includes:

- Apollo Client setup
- login mutation call
- storing token
- simple auth state
- redirect after login

This does NOT include:

- register integration (optional later)
- refresh tokens
- logout logic
- secure storage optimization
- global state libraries (keep simple)

---

## Apollo Client Setup

Install and configure:

- @apollo/client
- graphql

Setup:

- ApolloClient
- HttpLink → pointing to your backend
- InMemoryCache

Wrap app with:

ApolloProvider

---

## Folder Direction

src/
  graphql/
    client.ts
    auth/
      login.mutation.ts

---

## Login Mutation (Frontend)

Define GraphQL mutation matching backend.

Fields:

- identifier
- password

Response:

- token
- user (id, username, email)

---

## Login Screen Integration

Update LoginScreen:

On button press:

1. call login mutation
2. pass identifier + password
3. wait for response
4. handle success
5. handle error (simple)

---

## State Handling (Keep Simple)

Inside LoginScreen:

- local loading state
- local error state (optional simple string)

Do NOT introduce global state yet.

---

## Token Storage

Use:

- AsyncStorage

Store:

token

Example:

"auth_token"

---

## After Login Success

After successful login:

- store token
- trigger UI change

---

## Basic Auth State

Create simple auth check:

Option 1 (recommended):

- store token in memory (useState or simple context later)

For now:

- just navigate away from auth screens

---

## Navigation Transition

After login success:

Temporarily:

- replace AuthNavigator with a placeholder screen

Example:

"Home Screen"

Create a simple screen:

- text: "Logged In"

No bottom tabs yet.

---

## App Structure Update

In App.tsx:

Add simple conditional:

IF token exists → show Home screen  
ELSE → show AuthNavigator

Keep this logic simple.

---

## Error Handling

Basic only:

- invalid credentials → show simple text
- network error → console.log is fine

Do not build full error system.

---

## Loading Handling

- disable button OR
- show simple loading text

Keep minimal.

---

## Naming Style

Use:

- handleLogin
- loginUser
- token
- isLoading

Avoid:

- overly abstract naming
- complex state naming

---

## Code Expectations

- simple Apollo integration
- readable mutation call
- minimal state management
- no unnecessary hooks

---

## Comments

Minimal only.

Example:

// call login mutation
// store token

---

## Do NOT

- do not implement register flow yet
- do not create auth context yet
- do not use Zustand/Redux
- do not create interceptors
- do not handle token refresh
- do not optimize storage yet
- do not add secure storage yet

---

## Developer Notes

This step connects everything.

Focus on:

- correctness
- simplicity
- full working flow

After this step, the app should:

- allow login
- store token
- move to "logged in" state

That is the goal.