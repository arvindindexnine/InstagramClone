# Feature: Data Ingestion (Feed, Stories, Reels, Search)

## Goal

Replace all previous data sources with:

- DummyJSON for posts + users
- media.json for reels videos

Make all screens display real content.

Keep implementation simple and direct.

---

## Data Sources

### Posts (Feed)

https://dummyjson.com/posts

Fields used:

- id
- title → caption
- userId
- reactions → likes

---

### Users (Stories + Search + Profile)

https://dummyjson.com/users

Fields used:

- id
- username
- image

---

### Reels (Videos)

Use local media.json

Path example:

src/data/media.json

Access:

categories[0].videos

Fields used:

- sources[0] → video URL
- thumb → thumbnail
- title

---

## Structure

Create/update:

src/services/api.ts

---

## api.ts

Create simple functions:

- fetchPosts()
- fetchUsers()
- fetchReels() (read from local JSON)

Use fetch for APIs.

No classes.

No abstraction layers.

---

## PART 1 — HomeScreen

---

### Fetch

On mount:

- fetchPosts()
- fetchUsers()

---

### Mapping

Posts:

- caption = post.title
- likes = post.reactions

Assign user:

- match userId with users list
- get username + image

Image:

- use fallback image:

https://picsum.photos/400/400?random={post.id}

---

### Stories

Use users:

- map first 10 users
- avatar = user.image
- username = user.username

---

### Render

- stories → horizontal FlatList
- posts → vertical FlatList

---

## PART 2 — ReelsScreen

---

### Fetch

Use fetchReels() (local JSON)

---

### Mapping

For each video:

- videoUrl = sources[0]
- thumbnail = thumb
- title

Optional:

- randomly attach user from DummyJSON

---

### Render

- use react-native-video
- full screen
- repeat = true
- resizeMode = cover

No scroll logic needed.

---

## PART 3 — SearchScreen

---

### Fetch

- fetchUsers()

---

### Behavior

- filter locally:

user.username.includes(query)

---

### Render

- list of users
- avatar + username

---

### On Press

- navigate to ChatDetailScreen
- pass userId + username

---

## PART 4 — ProfileScreen

---

### Data

- keep backend posts (from 3A)
- localPosts (from camera/gallery)

---

### No changes needed for DummyJSON here

Profile remains backend-driven.

---

## PART 5 — Error Handling

Minimal:

- try/catch in fetch
- console.log errors

---

## PART 6 — Loading

Optional:

- simple "Loading..." text

---

## Naming

Use simple names:

- posts
- users
- reels

Avoid abstraction naming.

---

## Code Expectations

- direct fetch calls
- logic inside screens or api.ts
- no custom hooks
- no over-structuring

---

## Do NOT

- do not use GraphQL for this
- do not reintroduce Mockoon
- do not normalize data heavily
- do not build caching
- do not create data layers

---

## Developer Notes

This step is purely:

fetch → map → render

Nothing more.