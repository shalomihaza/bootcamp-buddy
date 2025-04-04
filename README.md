# Bootcamp Buddy 👋

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Prebuild Project

   ```bash
   npx expo prebuild 
   ```

3. Install Native Deps
   ```
   npx expo run:ios
   npx expo run:android
   ```

4. Start Project
   ```
   npx expo start
   ```


## Overview
**Bootcamp Buddy** is a productivity and community application designed to assist bootcamp students in managing their tasks and engaging with peers. The app features three main tabs: **Forum**, **Task**, and **Account**, along with authentication via **Google Sign-In** and **Email (Sign Up/Sign In)**.

---

## Features

### 1. **Forum Tab** *(Social Media-Style Posts)*
- Users can create, view, upVote and downVote on posts.
- Real-time updates for new posts and interactions.
- Markdown support for forum post

### 2. **Task Tab** *(Offline-First Draggable List)*
- **Offline-first approach**: Tasks are accessible without internet and sync when online.
- **Draggable & Reorderable**: Users can prioritize tasks via drag-and-drop.
- **Task Details**: Due dates, descriptions, and completion status.
- **Local Storage**: Persists tasks between sessions.

### 3. **Account Tab** *(Profile Management)*
- Displays user profile information (name, email, profile picture).
- **Authentication Options**:
  - **Google Sign-In**: Quick login via Google OAuth.
  - **Email/Password**: Traditional sign-up and sign-in.
- Edit profile details (e.g., bio, profile picture).

---

## Technical Specifications

### Authentication
- **Firebase Authentication** (or equivalent):
  - Google OAuth integration.
  - Email/password sign-up and login.
  - Session persistence.

### Task Tab
- **Offline Support**:
  - IndexedDB/localStorage for offline task management.
  - Sync with backend when online.
- **UI Library**:
  - Drag-and-drop functionality (e.g., React DnD, Beautiful DnD).

### Forum Tab
- **Real-Time Updates**:
  - Firebase Firestore or WebSockets for live post/comment updates.
- **Media Support**:
  - Image uploads (optional stretch goal).

### Frontend
- **Framework**: React.js (or Flutter for cross-platform).
- **State Management**: Redux/Context API for shared state (e.g., auth, tasks).

### Backend (if applicable)
- **Database**: Firestore for forum posts and user data.
- **API**: RealmDB for task synchronization.

---

## User Flow
1. **Sign Up/In**:
   - User logs in via Google or email.
2. **Task Management**:
   - Adds/reorders tasks offline; syncs when online.
3. **Forum Engagement**:
   - Browses posts or creates new discussions.
4. **Profile Updates**:
   - Edits account details in the **Account** tab.

---

## Stretch Goals
- Push notifications for task deadlines or forum replies.
- Dark mode toggle
