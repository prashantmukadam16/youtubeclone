import React, { useState } from "react";
import "./App.css";

const videos = [
  {
    id: 1,
    title: "Azure DevOps Pipeline Tutorial",
    channel: "Cloud Academy",
    views: "120K views",
    time: "2 days ago",
    thumbnail: "https://i.ytimg.com/vi/ijbGx6jR4ng/hqdefault.jpg"
  },
  {
    id: 2,
    title: "React JS Full Course",
    channel: "Code With React",
    views: "540K views",
    time: "1 week ago",
    thumbnail: "https://i.ytimg.com/vi/SqcY0GlETPk/hqdefault.jpg"
  },
  {
    id: 3,
    title: "Deploy React App to Azure",
    channel: "Azure Learning",
    views: "89K views",
    time: "5 days ago",
    thumbnail: "https://i.ytimg.com/vi/k1RI5locZE4/hqdefault.jpg"
  },
  {
    id: 4,
    title: "JavaScript Project for Beginners",
    channel: "Frontend Mastery",
    views: "230K views",
    time: "3 weeks ago",
    thumbnail: "https://i.ytimg.com/vi/PkZNo7MFNFg/hqdefault.jpg"
  },
  {
    id: 5,
    title: "Node JS Backend Tutorial",
    channel: "Backend Hub",
    views: "310K views",
    time: "1 month ago",
    thumbnail: "https://i.ytimg.com/vi/Oe421EPjeBE/hqdefault.jpg"
  },
  {
    id: 6,
    title: "Docker Tutorial for DevOps",
    channel: "DevOps School",
    views: "190K views",
    time: "4 days ago",
    thumbnail: "https://i.ytimg.com/vi/fqMOX6JJhGo/hqdefault.jpg"
  }
];

export default function App() {
  const [search, setSearch] = useState("");

  const filteredVideos = videos.filter((video) =>
    video.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="app">
      <header className="header">
        <div className="logo-section">
          <span className="menu">☰</span>
          <span className="youtube-logo">▶</span>
          <span className="logo-text">YouTube Clone</span>
        </div>

        <div className="search-section">
          <input
            type="text"
            placeholder="Search videos"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button>Search</button>
        </div>

        <div className="profile">P</div>
      </header>

      <div className="layout">
        <aside className="sidebar">
          <p>🏠 Home</p>
          <p>🔥 Trending</p>
          <p>📺 Subscriptions</p>
          <p>🎬 Library</p>
          <p>🕘 History</p>
        </aside>

        <main className="content">
          <div className="chips">
            <button>All</button>
            <button>React</button>
            <button>Azure</button>
            <button>DevOps</button>
            <button>JavaScript</button>
            <button>Node JS</button>
          </div>

          <div className="video-grid">
            {filteredVideos.map((video) => (
              <div className="video-card" key={video.id}>
                <img src={video.thumbnail} alt={video.title} />
                <div className="video-info">
                  <h3>{video.title}</h3>
                  <p>{video.channel}</p>
                  <span>
                    {video.views} • {video.time}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
