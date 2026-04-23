# Feature: Backend Integration (Posts, Reels, Profile, Follow)

## Goal

Replace mock data with real backend data using GraphQL.

This includes:

- Post creation and feed queries
- Profile posts
- Reels data
- Basic follow/unfollow and counts

Keep everything simple and direct.

---

## Scope

Includes:

- new backend modules: posts, follows (reels reuses posts)
- GraphQL queries and mutations
- frontend integration with Apollo
- replacing Mockoon usage in Home, Profile, Reels

Excludes:

- media upload pipeline
- pagination or caching
- advanced validation
- complex auth guards

---

## Backend — Modules

Create:

src/modules/
  posts/
  follows/

---

## Post Model

Fields:

- _id
- userId
- mediaUrl (string)
- caption (string, optional)
- type (string: "image" | "video")
- createdAt

Keep schema simple (Mongoose).

---

## Posts Module

Files:

- posts.module.ts
- posts.service.ts
- posts.resolver.ts
- schemas/post.schema.ts

---

## Posts — Mutations & Queries

### createPost

Input:

- mediaUrl
- caption (optional)
- type ("image" or "video")

Behavior:

- assign userId (use a fixed user for now if auth context not ready)
- save document
- return created post

---

### getFeed

- return list of posts
- sorted by createdAt desc

---

### getUserPosts(userId)

- return posts for a specific user

---

### getReels

- return posts where type = "video"

---

## Follows Module

Keep minimal.

---

### Data

Follow document:

- followerId
- followingId

---

### Mutations

- followUser(userId)
- unfollowUser(userId)

---

### Queries

- getFollowersCount(userId)
- getFollowingCount(userId)

---

## Frontend — GraphQL Integration

Use existing Apollo setup.

Create:

src/graphql/
  posts/
    feed.query.ts
    createPost.mutation.ts
    userPosts.query.ts
    reels.query.ts
  follows/
    follow.mutation.ts
    counts.query.ts

Keep queries simple.

---

## HomeScreen Update

Replace Mockoon:

- use getFeed query

Render:

- same UI
- map posts directly

Remove mockApi usage.

---

## ReelsScreen Update

Replace hardcoded URLs:

- use getReels query
- render video using mediaUrl

Keep single video or basic list.

---

## ProfileScreen Update

### Fetch Posts

- use getUserPosts

Merge:

- localPosts (for immediate UI)
- backend posts

Show local first, backend after.

---

### Create Post (Update)

When user selects media:

- call createPost mutation
- still update localPosts immediately
- no need to refetch aggressively

---

### Follow Data

- fetch followers/following counts
- display in stats row

Optional:

- add follow button (simple toggle)

---

## Data Handling

Keep it simple:

- no normalization
- no caching logic
- no global state

Use useQuery and useMutation directly in screens.

---

## Error Handling

Minimal:

- console.log errors
- optional small text feedback

---

## Naming

Use:

- posts
- feed
- reels
- createPost

Avoid abstraction-heavy naming.

---

## Code Expectations

- direct GraphQL usage in screens
- minimal helper functions
- readable logic
- no custom hooks unless clearly needed

---

## Do NOT

- do not reintroduce Mockoon
- do not add pagination
- do not optimize queries
- do not create complex state systems
- do not build upload pipeline
- do not over-structure modules

---

## Developer Notes

This step transitions the app from mock-driven to backend-driven.

Focus on:

- correctness of data flow
- keeping UI unchanged
- avoiding complexity

Once done, the app should behave the same, but with real backend data.