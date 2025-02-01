# 📌 Comprehensive Project Compilation

## 🎯 Project Objective

The aim of this project is to revolutionize the MLB fan experience through a personalized mobile application that generates and delivers real-time game summaries in multiple formats:

- **Video clips of highlights** 📽️
- **Automatically generated audio narrations** 🎤
- **Translations in English, Spanish, and Japanese** 🌍

This enables fans to receive relevant content tailored to their preferences without the need to watch the game live, utilizing a system based on artificial intelligence and cloud computing.

## 🏗️ Project Overview

This system is built upon:

- **Real-time data extraction and analysis** from MLB's GUMBO API.
- **Processing and filtering of key events** such as home runs, strikeouts, and decisive plays.
- **Automated multimedia content generation** using Google Cloud AI (Video Intelligence, Text-to-Speech, Translation API).
- **Scalable storage and distribution** via Google Cloud Storage and Cloud CDN.
- **Personalized user experience**, providing summaries according to their team and player preferences.

## ⚙️ Technologies Used

<details>
<summary>📌 Backend (Express.js + Google Cloud)</summary>

- **Node.js + Express.js** → RESTful backend server.
- **Cloud Spanner** → Relational database for storing users, preferences, and games.
- **Firestore** → NoSQL database for storing events and summaries.
- **Redis (Memorystore)** → Cache to improve performance and reduce latency.
- **Google Tasks + Scheduler** → Automation of real-time data processing.
- **Cloud Pub/Sub + Eventarc** → Notification of key events in games.
- **Google Cloud Logging & Monitoring** → Infrastructure supervision and diagnostics.

</details>

<details>
<summary>📌 Frontend (React Native + Expo)</summary>

- **React Native** → Primary framework for mobile development.
- **Expo** → Allows rapid testing and agile deployments without manual compilation.
- **Axios** → HTTP client for backend communication.
- **Redux** → Global state management of the app.
- **EAS (Expo Application Services)** → For generating demo builds and OTA distribution.

</details>

<details>
<summary>📌 Artificial Intelligence (Google Cloud AI)</summary>

- **Vertex AI** → Trains Machine Learning models to personalize summaries based on user history.
- **Google Video Intelligence API** → Automatically trims clips of key moments in games.
- **Google Text-to-Speech API** → Generates automatic narrations in English, Spanish, and Japanese.
- **Google Translation API** → Translates content to offer a multilingual experience.

</details>

## 🔄 Complete System Flow

1. **User Configuration**
   - The user registers in the app.
   - Sets their preferences: teams, players, types of plays.
   - Google Tasks queues a task to associate their preferences with MLB data.
   - Cloud Spanner stores the user's preferences.

2. **MLB Data Capture**
   - Google Cloud Scheduler queries the GUMBO API every 10 minutes for scheduled games and every 1 minute for live games.
   - Game and event data are analyzed and stored in Firestore.

3. **Key Event Processing**
   - Cloud Pub/Sub detects relevant events in Firestore (`gameEvents`).
   - Multimedia content generation processes are activated:
     - 📽️ Clip trimming with Video Intelligence API
     - 🎤 Audio narrations with Text-to-Speech API
     - 🌍 Translation with Translation API

4. **Content Distribution and Delivery**
   - Video clips and audios are stored in Google Cloud Storage.
   - The user receives a push notification with a link to the summary.
   - Cloud CDN delivers the content quickly in the mobile app.
