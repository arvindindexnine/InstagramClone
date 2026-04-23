# Feature: Chat System (Messaging + Basic Real-Time)

## Goal

Add a working chat system where users can:

- see a list of conversations
- open a chat
- send messages
- receive messages in real-time

Keep implementation minimal and practical.

---

## Scope

Includes:

- chat + message backend
- GraphQL queries + mutations
- basic subscriptions for real-time
- chat list UI
- chat detail screen

Excludes:

- typing indicators
- read receipts
- media messages
- push notifications
- message deletion/editing

---

## Backend — Modules

Create:

src/modules/
  chat/

---

## Data Models

### Chat

- _id
- participants (array of userIds)
- updatedAt

---

### Message

- _id
- chatId
- senderId
- text
- createdAt

---

## Chat Module Files

- chat.module.ts
- chat.service.ts
- chat.resolver.ts
- schemas/chat.schema.ts
- schemas/message.schema.ts

---

## Queries

### getUserChats(userId)

Returns:

- list of chats
- each chat includes:
  - chatId
  - other user (basic info)
  - last message text

---

### getMessages(chatId)

Returns:

- list of messages sorted by createdAt

---

## Mutations

### sendMessage

Input:

- chatId (optional)
- receiverId
- text

Behavior:

1. if chatId not provided:
   - find existing chat OR create new
2. create message
3. update chat.updatedAt
4. return message

---

## Subscriptions

### messageReceived(chatId)

- triggered when new message is sent
- returns message

Use simple pub/sub from NestJS GraphQL.

Do not over-structure event system.

---

## Frontend — Structure

Create:

src/screens/main/
  ChatScreen.tsx
  ChatDetailScreen.tsx

---

## ChatScreen (List)

Replace mock list.

Use:

- GET_USER_CHATS query

Render:

- avatar (placeholder or user image)
- username
- last message
- touchable row

On press:

- navigate to ChatDetailScreen with chatId + user info

---

## ChatDetailScreen

### Layout

- message list (FlatList)
- input box at bottom
- send button

---

### Data

- use GET_MESSAGES query
- subscribe to MESSAGE_RECEIVED

---

### Behavior

- render messages (left/right based on sender)
- send message on button press
- clear input after send

---

### Subscription

- listen for new messages
- append to list

Keep logic simple:

- no merge strategies
- no dedup system

---

## Apollo Setup (Subscription)

Add:

- WebSocketLink

Combine:

- HttpLink (queries/mutations)
- WS link (subscriptions)

Use split link.

---

## State Handling

Keep inside screens:

- useState
- useQuery
- useMutation
- useSubscription

No global state.

---

## UI Expectations

- simple message bubbles
- left/right alignment
- basic spacing

No animation needed.

---

## Naming

Use:

- messages
- chats
- sendMessage
- chatId

Avoid abstraction-heavy naming.

---

## Code Expectations

- direct GraphQL usage in screens
- no custom hooks unless needed
- minimal logic
- readable structure

---

## Error Handling

Minimal:

- console.log
- no UI system

---

## Do NOT

- do not build complex chat architecture
- do not add pagination
- do not optimize subscription handling
- do not create message stores
- do not add typing indicators
- do not use Redux/Zustand

---

## Developer Notes

Focus on:

- sending and receiving messages
- real-time updates working
- clean and simple flow

This should feel like a working chat, not a production chat system.