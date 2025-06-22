# FireStick TV Interface

A modern, feature-rich React-based interface inspired by Amazon FireStick, providing a unified streaming dashboard, personalized recommendations, social features, and seamless navigation across multiple entertainment platforms.

---

## 📖 Project Overview

**FireStick TV Interface** is a full-featured frontend application that emulates the experience of a smart TV dashboard. It aggregates content from popular streaming services (Netflix, Prime Video, Disney+, Hulu, YouTube, etc.), offers personalized recommendations, and enables social features like watch parties, friend networks, and memory lane. The interface is designed for TV screens but works on desktops and tablets.

**Tech Stack:**
- **Frontend:** React 18, Tailwind CSS, React Router, Axios, PapaParse, Recharts
- **UI/UX:** Responsive, TV-optimized, dark/light mode, animated transitions
- **Target Audience:** Streaming enthusiasts, families, friend groups, and anyone seeking a smart, unified streaming dashboard.

---

## 🌐 Live Demo & URLs

- **Frontend (Vite/React):** [https://your-frontend-url.com](https://your-frontend-url.com)
  - Local: [http://localhost:5173](http://localhost:5173)
- **Backend API (Flask):** [http://localhost:5000](http://localhost:5000) (for recommendations)
- **Similarity Model API:** [http://localhost:5001](http://localhost:5001) (for "Because You Watched" feature)

---

## 🗺️ Pages and Routes

### Main Navigation

| Route                        | Description                                                                                   |
|------------------------------|----------------------------------------------------------------------------------------------|
| `/`                          | **Home Page:** App launcher, featured banner, quick access to apps/games, search             |
| `/profile`                   | **Profile:** Personal details, statistics, subscriptions, activity log                       |
| `/my-network`                | **My Network:** Friends, recommendations, requests, watch party groups                       |
| `/memory-lane`               | **Memory Lane:** Watch history, relive options, people you watched with, platforms           |
| `/watch-along`               | **Watch Along:** Schedule/join watch parties, upcoming events, invite friends                |
| `/netflix`                   | **Netflix App:** Netflix-like interface with trending, top picks, and hero banner            |
| `/prime-video`               | **Prime Video:** Dashboard with recommendations, trending, explore, new releases, etc.       |
| `/prime-video/movies`        | **All Movies:** Full searchable/browsable movie catalog                                      |
| `/prime-video/series`        | **All Series:** Full searchable/browsable series catalog                                     |
| `/disney`                    | **Disney+ App:** Disney+ themed interface                                                    |
| `/hulu`                      | **Hulu App:** Hulu themed interface                                                          |
| `/youtube`                   | **YouTube:** Direct link to YouTube homepage                                                 |
| `/youtube-music`             | **YouTube Music:** Direct link to YouTube Music                                              |
| `/engine-visualization`      | **Engine Visualization:** Visualizes recommendation engine context and results               |
| `/sleep-timer`               | **Sleep Timer:** Set your sleep time for smarter recommendations                             |

### Component/Modal Details

- **MediaModalDetails:** Modal with detailed info, cast, rating, runtime, and "Watch Now" logic (sleep time aware)
- **RowSection:** Horizontal carousels for each content row (Trending, Explore, Top Rated, etc.)
- **PrimeNavBar:** App bar with navigation, search, and quick links
- **SideBarMenu:** Persistent sidebar for navigation, theme toggle, and voice command

---

## 🖥️ Installation Instructions

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yash21755/Amazon-FireStick-recommendation-modal-prototype.git
   cd Amazon-FireStick-recommendation-modal-prototype/Frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Environment Variables:**
   - No `.env` required for frontend by default.
   - If you use custom API endpoints, add a `.env` file with:
     ```
     VITE_API_URL=http://localhost:5000
     VITE_SIMILARITY_API_URL=http://localhost:5001
     ```

---

## 📁 File Structure

```
Frontend/
│
├── public/
│   ├── images/
│   └── logos/
│
├── src/
│   ├── components/
│   │   ├── Applications.jsx
│   │   ├── Diagram.jsx
│   │   ├── HomeBanner.jsx
│   │   ├── HomeContentSection.jsx
│   │   ├── MediaModalDetails.jsx
│   │   ├── PersonalDetails.jsx
│   │   ├── PrimeNavBar.jsx
│   │   ├── Remote.jsx
│   │   ├── Requests.jsx
│   │   ├── RowSection.jsx
│   │   ├── SideBarMenu.jsx
│   │   ├── Statistics.jsx
│   │   ├── Subscriptions.jsx
│   │   ├── ui/
│   │   └── ...
│   ├── pages/
│   │   ├── AllMovies.jsx
│   │   ├── AllSeries.jsx
│   │   ├── Disney.jsx
│   │   ├── HomePage.jsx
│   │   ├── Hulu.jsx
│   │   ├── MemoryLanePage.jsx
│   │   ├── ModalVisualisation.jsx
│   │   ├── MyNetworkPage.jsx
│   │   ├── Netflix.jsx
│   │   ├── PrimeVideo.jsx
│   │   ├── Profile.jsx
│   │   ├── WatchAlongPage.jsx
│   │   ├── YouTube.jsx
│   │   ├── YouTubeMusic.jsx
│   │   └── ...
│   ├── data/
│   │   ├── movie_database.csv
│   │   ├── series_database.csv
│   │   ├── memoryLane_database.json
│   │   └── requests_database.json
│   ├── App.jsx
│   ├── main.jsx
│   ├── style.css
│   └── ...
│
├── tailwind.config.js
├── postcss.config.js
├── index.html
└── README.md
```

---

## ⚙️ Environment Setup

- **Node.js:** v18.x or higher (recommended)
- **npm:** v9.x or higher (or yarn/pnpm)
- **Browser:** Chrome, Firefox, Edge, or any modern browser

### Optional `.env` Variables

| Variable                | Description                                | Example Value                |
|-------------------------|--------------------------------------------|------------------------------|
| `VITE_API_URL`          | Backend recommendation API endpoint        | `http://localhost:5000`      |
| `VITE_SIMILARITY_API_URL` | Similarity model API endpoint             | `http://localhost:5001`      |

---

## 📜 Scripts

- `npm run dev` — Start development server (hot reload)
- `npm run build` — Build for production
- `npm run preview` — Preview production build

---

## 📦 Dependencies

- **React** (UI library)
- **React Router** (routing)
- **Tailwind CSS** (utility-first styling)
- **Axios** (HTTP requests)
- **PapaParse** (CSV parsing)
- **Recharts** (charts/visualizations)
- **Framer Motion** (animations)
- **clsx**, **tailwind-merge** (utility class merging)
- **react-icons** (iconography)

---

## 🧭 Detailed Page & Feature List

### Home Page (`/`)
- **HomeBanner:** Rotating featured content, platform branding
- **HomeContentSection:** App/game launcher, search, quick navigation
- **Sidebar:** Persistent navigation, theme toggle, voice command

### Profile (`/profile`)
- **PersonalDetails:** Avatar, email, username, phone, location, language, DOB, account type, subscription info, genres, favorite actor, bio, linked accounts
- **Statistics:** Watch time by platform, monthly stats, charts (Recharts)
- **Subscriptions:** List of active subscriptions
- **Activity Log:** Placeholder for future activity tracking

### My Network (`/my-network`)
- **Tabs:** My Friends, Recommendations, Requests, Watch Party Groups
- **MyFriends:** List, search, chat, send recommendation
- **Recommendations:** Recommendations from friends, accept/watch
- **Requests:** Friend requests, accept/decline
- **Watch Party Groups:** List of groups, join/schedule parties

### Memory Lane (`/memory-lane`)
- **Timeline:** Chronological watch history
- **Details:** Movie/series, date, people, duration, rating, platforms
- **Relive:** Quick links to rewatch on available platforms

### Watch Along (`/watch-along`)
- **Upcoming Events:** Scheduled watch parties, participants, countdown
- **Invite Friends:** Add friends to events
- **Search:** Find movies/series to schedule

### Netflix (`/netflix`)
- **Hero Banner:** Featured movie/series
- **Rows:** Trending Now, Top Picks, Critically Acclaimed (dummy data)
- **Navbar:** Netflix branding, navigation

### Prime Video (`/prime-video`)
- **Rows:** Trending, Explore, Because You Watched, New Releases, Top IMDb Rated, Popular Series, Classic TV
- **Recommendations:** Personalized, context-aware, with scores
- **MediaModalDetails:** Detailed modal with sleep time logic

### All Movies (`/prime-video/movies`)
- **Grid:** All movies, search, modal details

### All Series (`/prime-video/series`)
- **Grid:** All series, search, modal details

### Disney+ (`/disney`), Hulu (`/hulu`)
- **Branding:** Themed landing pages

### YouTube (`/youtube`), YouTube Music (`/youtube-music`)
- **Links:** Direct to respective homepages

### Engine Visualization (`/engine-visualization`)
- **Diagram:** Visualizes recommendation context, mood, time, weather, summary stats, and final recommendations

### Sleep Timer (`/sleep-timer`)
- **Set Sleep Time:** Used for smarter recommendations and playback warnings

---

## 📝 License

This project is licensed under the **MIT License**.  
See [LICENSE](../LICENSE) for details.

---

## 👨‍💻 Developers

- **Yash Pratap Singh Deora**  
  [LinkedIn](http://linkedin.com/in/yash-pratap-singh-deora-37b769290/)

- **Ayush Kumar**  
  [LinkedIn](https://www.linkedin.com/in/ayush-kumar-80a002282/)

---

> _Built with ❤️ for the streaming community. Enjoy your personalized FireStick TV experience!_
