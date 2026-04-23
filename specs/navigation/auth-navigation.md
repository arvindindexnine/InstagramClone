# Feature: Auth Navigation (Login ↔ Register)

## Goal

Set up basic navigation for authentication screens using React Navigation.

This includes:

- Login screen
- Register screen
- navigation between them

No authentication logic.

No protected routes yet.

---

## Navigation Type

Use:

- React Navigation
- Native Stack Navigator

Do NOT use:

- tab navigator
- drawer navigator
- complex nested navigators

Keep it simple.

---

## Structure Overview

Navigation flow:

Login → Register  
Register → Login

That’s it.

---

## Screens Included

- LoginScreen
- RegisterScreen

Both already implemented.

---

## Navigation Behavior

### From Login Screen

- "Create new account" button should navigate to Register screen

---

### From Register Screen

- back button should go back to Login
- optional: "Already have an account? Log in" → navigate to Login

---

## Navigation Setup

Create a dedicated navigation file.

Example direction:

src/
  navigation/
    AuthNavigator.tsx

---

## Root Integration

In App.tsx:

- wrap app in NavigationContainer
- render AuthNavigator

No conditions yet.

Always show auth screens.

---

## Stack Configuration

- header should be disabled (we are building custom headers)
- gestures can remain default

---

## Naming Style

Use:

- AuthNavigator
- AuthStack

Avoid:

- overly generic names
- unnecessary prefixes

---

## Code Expectations

- simple stack navigator
- clear screen registration
- no abstraction layers
- no config over-engineering

---

## Behavior Scope

Include:

- navigation between screens
- proper screen registration
- back navigation working

Exclude:

- authentication state
- JWT handling
- protected routes
- conditional rendering
- deep linking
- persistence

---

## UI Responsibility

Navigation should NOT control UI.

Screens remain responsible for layout and UI.

---

## Comments

Minimal only.

Example:

// auth stack screens
// navigate to register

---

## Do NOT

- do not introduce global state
- do not create auth context
- do not create navigation wrappers
- do not create route guards
- do not add bottom tabs
- do not structure full app navigation yet

---

## Developer Notes

This is a foundational setup.

Keep it:

- clean
- readable
- obvious

Avoid trying to build the full navigation system now.

That will come later.

Right now:

just make login ↔ register work properly.