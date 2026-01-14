# 🌱 QR Eco Game  
### Gamified, Location-Based Environmental Education Platform

**QR Eco Game** is a web-based, gamified learning platform that encourages environmental awareness through **real-world exploration, interactive quizzes, and reward-driven progression**. Designed for students in schools and colleges, the platform blends **map-based interaction, dynamic content generation, and game mechanics** to make sustainability education engaging and memorable.

> Built as part of **Smart India Hackathon 2025**  
> **Problem Statement ID:** SIH25009 — *Gamified Environmental Education Platform for Schools and Colleges*  
> **Theme:** Smart Education | **Category:** Software

---

## 🚀 Concept Overview

Traditional environmental education often struggles with engagement and retention. **QR Eco Game** addresses this by turning learning into a **location-aware game**:

- Students explore **real-world locations** marked as environmental hotspots  
- Reaching a hotspot unlocks **contextual quizzes**  
- Correct answers earn **rewards, streaks, and collectible characters**  
- Progress is tracked through **leaderboards and collections**

This approach leverages *learning through play* and *real-world relevance* to improve motivation and retention.

---

## ✨ Key Features

- **🗺️ Real-World Map Interface**  
  Interactive map showing nearby environmental hotspots using live location data.

- **📍 Location-Based Quiz Triggers**  
  Visiting a marked location unlocks quizzes related to environmental issues such as waste management and sustainability.

- **🤖 Dynamic Quiz Generation**  
  Quizzes are generated in real time using an LLM to avoid repetition and align content with curriculum topics.

- **🎮 Gamification & Rewards**  
  Streaks, health points, leaderboards, and gacha-style collectible characters incentivize consistent engagement.

- **📊 Progress Tracking**  
  User performance, collections, and rankings are stored and updated in real time.

---

## 🧠 Technical Architecture

### Tech Stack
- **Frontend:** HTML, CSS, JavaScript (mobile-first design)
- **Backend:** Firebase (Authentication, Database, Progress Tracking, Leaderboards)
- **Mapping:** Leaflet.js (live location & hotspot rendering)
- **AI Layer:** Gemini API (dynamic MCQ generation, syllabus alignment)

### Application Flow
1. User logs in via Firebase Authentication  
2. Map view displays real-time location and nearby hotspots  
3. Entering a hotspot triggers quiz generation via Gemini API  
4. Quiz completion updates streaks, rewards, and leaderboard in Firebase  
5. Users unlock characters and track progress through collections  

This modular workflow allows the platform to scale across institutions and content types.

---

## 📈 Feasibility & Design Rationale

### Why This Works
- **Proven Appeal:** Location-based games demonstrate strong user engagement  
- **Low Barrier to Entry:** Accessible on basic GPS-enabled smartphones  
- **Learning Through Play:** Gamified learning significantly improves retention  

### Key Challenges Addressed
- **Sustaining engagement:** Solved through dynamic content and reward systems  
- **Quiz database scalability:** Solved via LLM-powered quiz generation  
- **Privacy & safety:** Addressed through controlled geofencing and safety prompts  

---

## 🌍 Impact & Benefits

### Educational Impact
- Improves awareness of environmental issues through experiential learning  
- Encourages students to connect theory with real-world observation  

### Social Impact
- Promotes community engagement and youth participation  
- Enables teachers to integrate sustainability into curricula  

### Alignment with Sustainable Development Goals (SDGs)
- **SDG 4:** Quality Education  
- **SDG 11:** Sustainable Cities and Communities  
- **SDG 13:** Climate Action  
- **SDG 15:** Life on Land  

---

## 🔬 Research & Inspiration

This project is informed by:
- Indian education policy mandating environmental education  
- UNESCO findings on improved retention through gamified learning  
- Case studies of existing sustainability-focused educational platforms  
- Academic research on experiential and playful learning models  

---

## 🛠️ Project Status & Future Scope

### Current
- Core gameplay loop implemented  
- Real-time quizzes, rewards, and leaderboard functional  

### Planned Enhancements
- Teacher dashboard for syllabus-based quiz uploads  
- Avatar customization and progression paths  
- Expanded environmental themes and hotspot categories
  
