# Feature: Auth Module Foundation (Backend)

## Goal

Set up the foundational backend structure for authentication.

This includes:

- Auth module
- User schema (MongoDB)
- basic NestJS module structure

This does NOT include:

- register logic
- login logic
- JWT
- password hashing
- GraphQL mutations yet

---

## Tech Context

Backend stack:

- NestJS
- GraphQL (code-first)
- MongoDB Atlas
- Mongoose

Follow NestJS conventions but keep things simple.

---

## Module Setup

Create:

- Auth module

Location:

src/
  modules/
    auth/

---

## Files Inside Auth Module

Create basic structure:

- auth.module.ts
- auth.service.ts
- auth.resolver.ts

Keep them minimal.

Do not implement logic yet.

---

## User Schema

Create user model using Mongoose.

Location:

src/
  modules/
    auth/
      schemas/
        user.schema.ts

---

## User Fields

Include only essential fields:

- _id (default Mongo)
- username (string, required, unique)
- email (string, required, unique)
- password (string, required)
- createdAt (date, default now)
- updatedAt (date)

---

## Schema Rules

- use Mongoose decorators
- define types clearly
- keep schema simple
- no virtuals
- no hooks (no pre-save yet)

---

## GraphQL Integration

Prepare for code-first GraphQL.

- User should be compatible with GraphQL ObjectType later

Do NOT fully implement GraphQL types yet.

Just keep structure ready.

---

## Auth Service

Create empty service with basic structure.

Example expectations:

- class exists
- injectable
- no real methods yet OR placeholder methods only

---

## Auth Resolver

Create resolver file.

- class exists
- decorated with @Resolver

No queries or mutations yet.

---

## App Module Integration

- register AuthModule inside AppModule

---

## Folder Direction

src/
  modules/
    auth/
      auth.module.ts
      auth.service.ts
      auth.resolver.ts
      schemas/
        user.schema.ts

---

## Naming Style

Use:

- User
- AuthService
- AuthResolver

Avoid:

- overly generic names
- unnecessary prefixes

---

## Code Expectations

- clean NestJS structure
- readable code
- no unnecessary abstraction
- no complex patterns

---

## Comments

Minimal.

Example:

// user schema
// auth module setup

Avoid long explanations.

---

## Do NOT

- do not implement register logic
- do not implement login logic
- do not hash password
- do not create JWT logic
- do not create guards
- do not create DTOs yet
- do not create validation pipes
- do not over-structure code

---

## Developer Notes

This step is about:

- structure
- clarity
- correctness

Not about features.

Keep everything:

simple
clean
expandable

Do not try to build the full auth system yet.