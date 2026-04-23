# Feature: Register Screen UI

## Goal

Create the register (create account) screen UI that aligns visually and structurally with the login screen and Instagram-style layout.

This is UI only.

No backend.
No GraphQL.
No authentication logic.

---

## Relationship to Login Screen (IMPORTANT)

This screen should reuse:

- Input component
- Button component
- spacing system
- layout structure

Do NOT redesign UI.

It should feel like the same screen family.

---

## Layout Structure

Vertical stacked layout similar to login.

Top → Bottom:

1. Back button (top-left)
2. Title / header text
3. Input fields (multiple)
4. Register button
5. Optional helper text

---

## UI Elements

### 1. Background

- same dark background as login
- maintain consistency

---

### 2. Header

Top-left:

- back arrow button

Top-center or slightly below:

- Title text

Example:
"Create account"

Style:

- medium-large text
- bold but not heavy

---

### 3. Input Fields

Fields required:

- username
- email
- password

Optional (include for completeness):

- confirm password

---

## Input Style

Same as login screen:

- rounded edges
- dark fill
- light placeholder text
- consistent spacing

Do NOT change styling.

---

## Field Order

1. Username
2. Email
3. Password
4. Confirm Password

---

## Behavior

- controlled inputs
- password fields hidden
- keyboard handling (basic)

No validation yet.

---

### 4. Register Button

- full width
- same primary button style as login
- same color
- same height

Text:
"Create account"

---

### 5. Optional Footer Text

Small helper text:

Example:

"Already have an account? Log in"

- "Log in" can look clickable
- no navigation needed yet

---

## Component Expectations

Reuse:

- Input
- Button

Do NOT create:

- separate input variants unnecessarily
- multiple button types beyond simple prop-based variation

---

## Folder Direction

src/
  screens/
    auth/
      RegisterScreen.tsx

---

## Styling Expectations

- same spacing scale as login
- consistent padding
- no UI mismatch between screens

---

## Behavior Scope

Include:

- controlled state
- basic input handling
- button press handler (empty function)

Exclude:

- validation
- API
- navigation logic
- form libraries

---

## Naming Style

Use:

- email
- password
- confirmPassword
- handleRegister

Avoid:

- overly generic naming
- unnecessary abstraction

---

## Comments

Minimal only.

Example:

// update email value
// handle register press

---

## Do NOT

- do not connect backend
- do not validate passwords
- do not compare passwords yet
- do not add error messages
- do not add loading states
- do not use external form libraries
- do not add navigation

---

## Developer Notes

This screen should feel like:

- a natural extension of login
- not a new design
- not over-engineered

Reusability is important here.

Avoid duplication where it is obvious.

But do NOT over-abstract early.

Keep it balanced.