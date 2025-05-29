# Real-Time Collaborative Editor

A simple real-time collaborative text editor built using Next.js, TypeScript, TipTap, and Socket.IO.

## Features

- Live real-time editing across browser tabs
- User identification with custom color tagging
- Rich-text editing with TipTap (based on ProseMirror)

## Tech Stack

- Next.js 14 + App Router
- TypeScript
- TailwindCSS
- TipTap Editor
- Socket.IO

## Setup & Run Locally

### 1. Clone the Repo

```bash
git clone https://github.com/Shubhankar61/realtime-collab-editor
cd realtime-collab-editor
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start Socket Server

```bash
node socket-server.js
```

### 4. Run Next.js App

```bash
npm run dev
```

Open http://localhost:3000 in two browser tabs.
