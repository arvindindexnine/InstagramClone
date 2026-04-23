# Feature: Register Mutation (Create User)

## Goal

Implement a GraphQL mutation to create a new user in the database.

This is the first real backend operation.

Keep it simple and correct.

---

## Scope

This includes:

- GraphQL mutation for register
- input handling
- basic validation (very minimal)
- saving user to MongoDB

This does NOT include:

- login logic
- JWT
- password hashing (store plain text for now — will fix later)
- advanced validation
- email verification

---

## Mutation Definition

Create a mutation:

register(input)

Returns:

User object (basic fields only)

---

## Input Fields

Define a simple input type:

- username (string)
- email (string)
- password (string)

Keep it minimal.

---

## GraphQL Setup

Use code-first approach.

- define input type using @InputType
- define mutation in AuthResolver

Do not over-structure types.

---

## Resolver Responsibility

In AuthResolver:

- create register mutation
- call AuthService
- return created user

Keep resolver thin.

---

## Service Responsibility

In AuthService:

Create method:

register(input)

Steps:

1. check if user exists (by email OR username)
2. if exists → throw simple error
3. create new user
4. save to DB
5. return user

---

## Validation Rules (Keep Simple)

- username not empty
- email not empty
- password not empty

No regex.
No strong validation.

Just basic checks.

---

## Error Handling

Use simple NestJS errors:

- throw Error or BadRequestException

Messages should be simple:

- "User already exists"
- "Invalid input"

Do not over-engineer error system.

---

## Database Interaction

Use Mongoose model from schema.

- create new instance
- save

No advanced patterns.

---

## Returned Fields

Return:

- id
- username
- email
- createdAt

Do NOT return:

- password

Even if stored plain for now.

---

## Folder Direction

src/
  modules/
    auth/
      dto/
        register.input.ts

---

## Naming Style

Use:

- register
- registerInput
- createUser

Avoid:

- overly generic names
- overly complex naming

---

## Code Expectations

- clean resolver → service flow
- no extra layers
- readable logic
- no abstraction

---

## Comments

Minimal only.

Example:

// check if user exists
// create new user

---

## Do NOT

- do not hash password yet
- do not create JWT
- do not create login logic
- do not use pipes or class-validator yet
- do not add guards
- do not create response wrappers
- do not split into multiple services

---

## Developer Notes

This is your first real backend feature.

Focus on:

- correctness
- simplicity
- clarity

Do not try to make it production-perfect yet.

We will improve it step by step later.