# Instagram Clone

A full-stack Instagram clone built with React Native, NestJS, GraphQL, and MongoDB.

## Features

### Authentication
- User registration and login
- JWT token-based authentication
- Secure password handling
- Auto-login with stored tokens

### Feed & Stories
- Home feed with posts from DummyJSON API
- Stories carousel with user avatars
- Like and comment interactions
- Real-time post updates

### Reels
- Video playback with react-native-video
- Full-screen vertical video experience
- 13+ sample videos from media.json
- User attribution for each reel

### Search
- User search with real-time filtering
- Navigate to chat from search results
- Avatar and username display

### Chat
- Real-time messaging with GraphQL subscriptions
- One-on-one conversations
- Message history
- Chat list with recent conversations

### Profile
- User posts grid layout
- Upload from gallery or camera
- Native media permissions (Android)
- Followers/following counts
- Dark mode toggle
- Logout functionality

### Theme
- Light and dark mode support
- Persistent theme preference
- Smooth theme transitions

## Tech Stack

### Frontend
- React Native
- TypeScript
- Apollo Client (GraphQL)
- React Navigation
- AsyncStorage
- react-native-video

### Backend
- NestJS
- GraphQL (Apollo Server)
- MongoDB with Mongoose
- JWT Authentication
- GraphQL Subscriptions

## Project Structure

```
├── frontend/               # React Native app
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── screens/       # Screen components
│   │   ├── navigation/    # Navigation setup
│   │   ├── graphql/       # GraphQL queries/mutations
│   │   ├── services/      # API services
│   │   ├── theme/         # Theme configuration
│   │   ├── styles/        # Screen styles
│   │   └── data/          # Local data (media.json)
│   └── android/           # Android native code
│
├── backend/               # NestJS API
│   └── src/
│       ├── modules/       # Feature modules
│       │   ├── auth/      # Authentication
│       │   ├── posts/     # Posts management
│       │   ├── chat/      # Chat system
│       │   └── follows/   # Follow system
│       └── schema.gql     # GraphQL schema
│
└── specs/                 # Feature specifications
```

## Setup

### Prerequisites
- Node.js (v16+)
- MongoDB
- Android Studio (for Android development)
- React Native development environment

### Backend Setup

```bash
cd backend
npm install
```

Create `.env` file:
```
MONGODB_URI=mongodb://localhost:27017/instagram
JWT_SECRET=your-secret-key
```

Start the server:
```bash
npm run start:dev
```

### Frontend Setup

```bash
cd frontend
npm install
```

Start Metro bundler:
```bash
npm start
```

Run on Android:
```bash
npm run android
```

## Data Sources

- **Posts & Users**: DummyJSON API (https://dummyjson.com)
- **Reels**: Local media.json with sample videos
- **Chat & Profile**: Backend GraphQL API

## Key Features Implementation

### Data Ingestion
- Fetches posts and users from DummyJSON
- Loads reels from local JSON file
- Maps external data to app format
- Handles loading and error states

### Search Flow
- Loads all users on mount
- Filters locally by username
- Navigates to chat on user selection
- Shows empty state for no results

### Logout Flow
- Clears auth token from AsyncStorage
- Triggers auth state change
- Redirects to login screen
- Resets app state

## Development Notes

This project follows clean, human-written code principles:
- Simple and direct implementations
- Minimal abstractions
- Practical naming conventions
- No over-engineering
- Readable and maintainable code

## License

MIT
