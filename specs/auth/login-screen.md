# Feature: Login Screen UI

## Goal

Create the login screen UI that closely matches the real Instagram mobile login experience shown in reference.

This is UI only.

Do not connect backend.
Do not add GraphQL.
Do not implement authentication logic.

---

## Reference Behavior (IMPORTANT)

Follow the provided Instagram login screen reference:

- Dark background
- Centered Instagram logo
- Two rounded input fields
- Large primary login button
- Secondary actions below (forgot password + create account)
- Minimal, clean layout with proper spacing

The screen should feel visually close to Instagram, not a generic form screen.

---

## Layout Structure

Screen is vertically stacked and centered.

Top → Bottom:

1. Language selector (small, subtle)
2. Instagram logo (centered)
3. Input fields
4. Login button
5. "Forgot password?"
6. "Create new account" button (outlined style)
7. Footer branding ("Meta")

Spacing is important — do not compress elements.

---

## UI Elements

### 1. Background

- Dark mode default
- solid dark background (not pure black, slightly soft black/charcoal)
- no gradients

---

### 2. Language Selector

- Positioned at top
- small text
- centered
- subtle color (grey/low contrast)

Example:
"English (UK)"

No functionality needed.

---

### 3. Instagram Logo

- centered horizontally
- placed above inputs
- medium-large size
- use either:
  - image asset (preferred), OR
  - temporary text placeholder

Spacing:
- clear gap between logo and inputs

---

### 4. Input Fields

Two inputs:

- username/email/phone
- password

Style:

- rounded corners
- slightly thick border
- dark background fill
- light placeholder text
- good padding inside

Behavior:

- controlled inputs
- keyboard-aware (avoid overlap)
- password field should hide text

No validation yet.

---

### 5. Login Button

- full width
- rounded corners
- prominent color (Instagram blue tone)
- placed directly under inputs

Text:
"Log in"

State:
- static for now (no loading state needed yet)

---

### 6. Forgot Password

- text button
- centered
- placed under login button
- lighter color (grey/soft white)

No functionality.

---

### 7. Create Account Button

- outlined button (not filled)
- rounded edges
- full width
- placed near bottom

Text:
"Create new account"

Important:
Should visually contrast from login button.

---

### 8. Footer

- small "Meta" text/logo
- bottom aligned
- very subtle color

---

## Technical Requirements

Use:

- React Native CLI
- TypeScript
- functional components

Avoid:

- form libraries
- heavy validation systems
- custom hooks
- over-abstraction

---

## Component Expectations

Create reusable components:

### Input

- label not required
- accepts:
  - value
  - onChange
  - placeholder
  - secureTextEntry

### Button

- reusable for:
  - primary (filled)
  - secondary (outlined)

Keep components simple.

Do not over-generalize.

---

## Folder Direction

src/
  screens/
    auth/
      LoginScreen.tsx

  components/
    common/
      Input.tsx
      Button.tsx

  theme/

---

## Styling Expectations

- consistent spacing (important)
- padding should feel comfortable (not tight)
- avoid pixel-perfect obsession, but maintain visual balance
- no inline clutter — keep styles structured

---

## Behavior Scope

Include:

- controlled state for inputs
- keyboard handling (basic)
- button press handlers (empty functions)

Exclude:

- API calls
- navigation logic
- authentication state
- persistence

---

## Naming Style

Use normal naming:

- username
- password
- handleLogin
- setUsername

Avoid:

- overly generic names
- overly abstract names
- unnecessary prefixes

---

## Comments

Keep comments minimal.

Allowed:

// handle login press
// update username input

Avoid explaining obvious UI code.

---

## Do NOT

- do not connect backend
- do not use GraphQL
- do not add validation logic
- do not use Zustand/Redux
- do not implement auth flow
- do not add navigation yet
- do not create global state
- do not create complex abstractions

---

## Developer Notes

The goal is to produce code that feels like:

- written by a real developer
- clean but not artificially perfect
- readable and practical

Do not try to impress with patterns.

Focus on:

clarity > cleverness