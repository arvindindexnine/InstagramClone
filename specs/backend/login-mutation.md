# Feature: Login Mutation (User Authentication)

## Goal

Implement a GraphQL mutation to authenticate an existing user.

This includes:

- finding user
- verifying password
- returning a basic token response

Keep implementation simple and readable.

---

## Scope

This includes:

- GraphQL login mutation
- user lookup
- password comparison
- returning a token string

This does NOT include:

- JWT library integration (use placeholder token)
- hashing (password is still plain text)
- refresh tokens
- guards
- session handling

---

## Mutation Definition

Create mutation:

login(input)

Returns:

- token (string)
- user (basic user fields)

---

## Input Fields

Define input type:

- email OR username (single field: identifier)
- password

Example:

identifier: string  
password: string

---

## GraphQL Setup

Use code-first:

- define LoginInput
- define return type (can be simple object type)

Avoid over-structuring response types.

---

## Resolver Responsibility

In AuthResolver:

- create login mutation
- call AuthService.login()
- return result

Keep resolver thin.

---

## Service Responsibility

In AuthService:

Create method:

login(input)

Steps:

1. find user by email OR username
2. if not found → throw error
3. compare password (plain text)
4. if mismatch → throw error
5. generate simple token (temporary string)
6. return token + user

---

## Token Generation (Temporary)

Do NOT implement JWT yet.

Return something simple like:

"mock-token-userId"

Example:

token = `token-${user._id}`

This will be replaced later.

---

## Error Handling

Use simple errors:

- "User not found"
- "Invalid credentials"

Do not leak too much detail.

Keep messages simple.

---

## Returned Fields

Return:

token  
user:
  - id
  - username
  - email

Do NOT return password.

---

## Folder Direction

src/
  modules/
    auth/
      dto/
        login.input.ts

---

## Naming Style

Use:

- login
- loginInput
- identifier
- handleLogin

Avoid:

- overly complex naming
- unnecessary abstractions

---

## Code Expectations

- simple flow
- readable logic
- no extra layers
- no advanced patterns

---

## Comments

Minimal only.

Example:

// find user
// check password
// return token

---

## Do NOT

- do not use JWT yet
- do not hash password yet
- do not create guards
- do not create middleware
- do not create auth context
- do not over-engineer token logic

---

## Developer Notes

This is intentionally simplified authentication.

Focus on:

- flow correctness
- clean structure
- easy readability

Security improvements will come later.