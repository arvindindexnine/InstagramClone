# Instagram Clone

A full-stack Instagram clone built with React Native, NestJS, GraphQL, and MongoDB featuring real-time chat, post management, user authentication, and comprehensive social media functionality.

## 🚀 Features Overview

### 🔐 Authentication System
- **User Registration**: Complete signup flow with username, email, and password validation
- **Secure Login**: JWT token-based authentication with persistent sessions
- **Auto-Login**: Automatic authentication using stored tokens in AsyncStorage
- **Session Management**: Token validation and refresh mechanisms

### 📱 Core Screens & Functionality

#### **Home Screen (Feed)**
- **Combined Feed**: Displays user-created posts alongside curated dummy content
- **Stories Carousel**: Interactive user stories with avatar display
- **Post Interactions**: Like and comment functionality with real-time updates
- **Infinite Scroll**: Smooth scrolling experience with optimized rendering
- **Data Sources**: Integrates DummyJSON API with backend GraphQL data

#### **Profile Screen**
- **Post Creation Flow**: 
  - Image selection with preview modal
  - Caption input with multi-line support
  - Instant local state updates for immediate UI feedback
  - Backend synchronization with GraphQL mutations
- **3x3 Grid Layout**: Instagram-style post grid with proper aspect ratios
- **User Statistics**: Followers, following, and post counts
- **Theme Toggle**: Light/dark mode switching with persistent preferences
- **Database Management**: Admin controls for data cleanup and reset

#### **Search Screen**
- **Real-time User Search**: Instant filtering with debounced input
- **GraphQL Integration**: Server-side user queries with efficient caching
- **Navigation Flow**: Direct chat initiation from search results
- **Empty States**: Proper handling of no results scenarios

#### **Chat System**
- **Real-time Messaging**: WebSocket-based instant message delivery
- **Chat Persistence**: Messages saved to MongoDB with proper indexing
- **Conversation Management**: Chat list with last message preview
- **Optimistic Updates**: Immediate UI updates with server synchronization
- **Auto-refresh**: Screen focus detection for chat list updates

#### **Reels Screen**
- **Video Playback**: Full-screen vertical video experience
- **Media Management**: Local video assets with proper attribution
- **User Interface**: Instagram-style video controls and overlays

### 🎨 UI/UX Features
- **Responsive Design**: Adaptive layouts for different screen sizes
- **Theme System**: Comprehensive light/dark mode implementation
- **Smooth Animations**: Native-feeling transitions and interactions
- **Loading States**: Proper loading indicators and skeleton screens
- **Error Handling**: User-friendly error messages and retry mechanisms

## 🏗️ Technical Architecture

### **Frontend Stack**
- **React Native**: Cross-platform mobile development
- **TypeScript**: Type-safe development with enhanced IDE support
- **Apollo Client**: GraphQL client with caching and state management
- **React Navigation**: Stack and tab navigation with deep linking
- **AsyncStorage**: Persistent local storage for user preferences
- **React Hooks**: Modern state management with useState and useEffect

### **Backend Stack**
- **NestJS**: Scalable Node.js framework with dependency injection
- **GraphQL**: Type-safe API with Apollo Server integration
- **MongoDB**: NoSQL database with Mongoose ODM
- **JWT Authentication**: Secure token-based authentication
- **WebSocket Subscriptions**: Real-time communication for chat features
- **GraphQL Subscriptions**: Live data updates using PubSub pattern

## 📊 Data Flow Architecture

### **Authentication Flow**
```
Client → LoginScreen → GraphQL Mutation → JWT Token → AsyncStorage → Auto-Login
```

### **Post Creation Flow**
```
ProfileScreen → Image Selection → Preview Modal → Caption Input → 
GraphQL Mutation → MongoDB → Local State Update → Home Feed Refresh
```

### **Chat Flow**
```
SearchScreen → User Selection → ChatDetail → Message Input → 
GraphQL Mutation → WebSocket Subscription → Real-time Updates → Chat Persistence
```

### **Feed Data Flow**
```
HomeScreen → GraphQL Query + DummyJSON API → Data Combination → 
FlatList Rendering → Infinite Scroll → Cache Management
```

## 🔧 GraphQL API Schema

### **Mutations**
- `login(input: LoginInput!)`: User authentication
- `register(input: RegisterInput!)`: User registration
- `createPost(input: CreatePostInput!)`: Post creation with media and caption
- `sendMessage(input: SendMessageInput!)`: Real-time message sending
- `deleteAllPosts()`: Database cleanup utility
- `deleteAllChats()`: Chat data cleanup
- `deleteAllMessages()`: Message cleanup

### **Queries**
- `getFeed()`: Retrieve all posts for home feed
- `getUserPosts(userId: String!)`: User-specific posts for profile
- `getUserChats(userId: String!)`: Chat conversations for user
- `getMessages(chatId: String!)`: Messages for specific chat
- `searchUsers(query: String!)`: User search functionality
- `getFollowersCount(userId: String!)`: Social statistics

### **Subscriptions**
- `messageReceived(chatId: String!)`: Real-time chat updates

## 🗄️ Database Schema

### **User Model**
```typescript
{
  _id: ObjectId,
  username: string,
  email: string,
  password: string (hashed),
  createdAt: Date
}
```

### **Post Model**
```typescript
{
  _id: ObjectId,
  userId: string,
  username: string,
  mediaUrl: string,
  caption: string,
  type: 'image' | 'video',
  createdAt: Date
}
```

### **Chat Model**
```typescript
{
  _id: ObjectId,
  participants: [string],
  updatedAt: Date
}
```

### **Message Model**
```typescript
{
  _id: ObjectId,
  chatId: string,
  senderId: string,
  text: string,
  createdAt: Date
}
```

## 📁 Project Structure

```
├── frontend/                    # React Native Application
│   ├── src/
│   │   ├── components/         # Reusable UI Components
│   │   │   └── common/         # Button, Input, etc.
│   │   ├── screens/            # Screen Components
│   │   │   ├── auth/          # Login, Register
│   │   │   └── main/          # Home, Profile, Chat, Search, Reels
│   │   ├── navigation/         # Navigation Configuration
│   │   │   ├── AppNavigator.tsx
│   │   │   └── AuthNavigator.tsx
│   │   ├── graphql/           # GraphQL Operations
│   │   │   ├── auth/          # Authentication mutations
│   │   │   ├── posts/         # Post queries and mutations
│   │   │   ├── chat/          # Chat operations
│   │   │   └── users/         # User search queries
│   │   ├── services/          # External API Services
│   │   │   └── api.ts         # DummyJSON integration
│   │   ├── theme/             # Theme System
│   │   │   ├── ThemeContext.tsx
│   │   │   └── colors.ts
│   │   ├── styles/            # Screen-specific Styles
│   │   ├── data/              # Local Data
│   │   │   └── mockReels.ts   # Video content
│   │   └── config/            # Configuration
│   │       └── network.json   # API endpoints
│   └── android/               # Android Native Code
│
├── backend/                    # NestJS GraphQL API
│   └── src/
│       ├── modules/           # Feature Modules
│       │   ├── auth/          # Authentication Module
│       │   │   ├── auth.service.ts
│       │   │   ├── auth.resolver.ts
│       │   │   └── schemas/user.schema.ts
│       │   ├── posts/         # Posts Module
│       │   │   ├── posts.service.ts
│       │   │   ├── posts.resolver.ts
│       │   │   ├── schemas/post.schema.ts
│       │   │   └── dto/create-post.input.ts
│       │   ├── chat/          # Chat Module
│       │   │   ├── chat.service.ts
│       │   │   ├── chat.resolver.ts
│       │   │   ├── schemas/
│       │   │   │   ├── chat.schema.ts
│       │   │   │   └── message.schema.ts
│       │   │   └── dto/
│       │   │       ├── send-message.input.ts
│       │   │       └── chat-summary.ts
│       │   └── follows/       # Follow System Module
│       └── schema.gql         # Generated GraphQL Schema
│
├── specs/                     # Technical Specifications
│   ├── global-rules.md       # Development Guidelines
│   └── backend/              # Backend Specifications
│
└── update-ip.js              # Network Configuration Utility
```

## 🚀 Setup & Installation

### **Prerequisites**
- Node.js (v16 or higher)
- MongoDB (v4.4 or higher)
- Android Studio with SDK
- React Native development environment
- Git for version control

### **Backend Setup**

1. **Install Dependencies**
```bash
cd backend
npm install
```

2. **Environment Configuration**
Create `.env` file in backend directory:
```env
MONGODB_URI=mongodb://localhost:27017/instagram_clone
JWT_SECRET=your-super-secret-jwt-key-here
PORT=3000
```

3. **Start MongoDB**
```bash
# Using MongoDB service
sudo systemctl start mongod

# Or using Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

4. **Launch Backend Server**
```bash
npm run start:dev
```

The GraphQL playground will be available at `http://localhost:3000/graphql`

### **Frontend Setup**

1. **Install Dependencies**
```bash
cd frontend
npm install
```

2. **Network Configuration**
Update `frontend/src/config/network.json` with your backend URL:
```json
{
  "API_URL": "http://YOUR_IP_ADDRESS:3000/graphql"
}
```

3. **Start Metro Bundler**
```bash
npm start
```

4. **Run on Android**
```bash
npm run android
```

## 🔄 Key Implementation Details

### **Real-time Chat Implementation**
- **WebSocket Connection**: Persistent connection for instant message delivery
- **Optimistic Updates**: Messages appear immediately with server confirmation
- **Message Persistence**: All messages stored in MongoDB with proper indexing
- **Chat Auto-refresh**: Automatic chat list updates when returning to screen

### **Post Creation System**
- **Image Preview**: Full-screen modal with image display and caption input
- **Local State Management**: Immediate UI updates for better user experience
- **Backend Synchronization**: GraphQL mutations for data persistence
- **Feed Integration**: Automatic home feed refresh after post creation

### **Authentication Flow**
- **JWT Token Management**: Secure token storage and validation
- **Auto-login**: Seamless app restart experience
- **Session Persistence**: Maintains user session across app launches
- **Secure Logout**: Complete session cleanup and state reset

### **Search Functionality**
- **Real-time Filtering**: Instant search results as user types
- **GraphQL Integration**: Server-side user queries with caching
- **Navigation Integration**: Direct chat initiation from search results

### **Theme System**
- **Context-based State**: React Context for global theme management
- **Persistent Preferences**: Theme choice saved in AsyncStorage
- **Dynamic Styling**: All components adapt to theme changes
- **Smooth Transitions**: Native-feeling theme switching

## 🛠️ Development Utilities

### **Database Management**
- **Reset All Data**: Complete database cleanup via ProfileScreen button
- **GraphQL Playground**: Direct database operations via web interface
- **MongoDB Shell**: Direct database access for advanced operations

### **Network Configuration**
- **Dynamic IP Setup**: `update-ip.js` script for development environment
- **Environment Switching**: Easy backend URL configuration
- **API Endpoint Management**: Centralized network configuration

### **Debugging Tools**
- **Console Logging**: Comprehensive logging throughout the application
- **GraphQL DevTools**: Query and mutation debugging
- **React Native Debugger**: Component and state inspection

## 📱 User Experience Features

### **Smooth Interactions**
- **Optimistic Updates**: Immediate UI feedback for all user actions
- **Loading States**: Proper loading indicators for all async operations
- **Error Handling**: User-friendly error messages with retry options
- **Offline Support**: Graceful handling of network connectivity issues

### **Performance Optimizations**
- **Image Caching**: Efficient image loading and caching
- **List Virtualization**: Optimized rendering for large data sets
- **Memory Management**: Proper cleanup of resources and subscriptions
- **Bundle Optimization**: Minimized app size and startup time

## 🔒 Security Features

### **Authentication Security**
- **Password Hashing**: Secure password storage using bcrypt
- **JWT Validation**: Token-based authentication with expiration
- **Input Sanitization**: Protection against injection attacks
- **CORS Configuration**: Proper cross-origin request handling

### **Data Protection**
- **Input Validation**: Server-side validation for all user inputs
- **Rate Limiting**: Protection against spam and abuse
- **Secure Headers**: Proper HTTP security headers
- **Environment Variables**: Sensitive data stored securely

## 🚀 Deployment Ready

### **Production Considerations**
- **Environment Configuration**: Separate configs for dev/staging/production
- **Database Indexing**: Optimized queries for production scale
- **Error Monitoring**: Comprehensive error tracking and reporting
- **Performance Monitoring**: Application performance metrics

### **Scalability Features**
- **Modular Architecture**: Easy to extend and maintain
- **Database Optimization**: Efficient queries and indexing
- **Caching Strategy**: Apollo Client caching for optimal performance
- **Code Splitting**: Optimized bundle loading

## 📄 License

MIT License - feel free to use this project for learning and development purposes.

## 🤝 Contributing

This project follows clean code principles and human-readable implementations. Contributions should maintain:
- Simple and direct code structure
- Minimal abstractions
- Practical naming conventions
- Comprehensive documentation
- No over-engineering

---

**Built with ❤️ using React Native, NestJS, GraphQL, and MongoDB**
