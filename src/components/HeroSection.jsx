import React from "react";
import { useState, useRef } from "react";

export default function HeroSection() {
  const [isMuted, setIsMuted] = useState(true);
  const iframeRef = useRef(null);
  const playerRef = useRef(null);

  const initVimeoPlayer = () => {
    if (window.Vimeo && iframeRef.current && !playerRef.current) {
      playerRef.current = new window.Vimeo.Player(iframeRef.current);
      playerRef.current.getVolume().then((volume) => {
        setIsMuted(volume === 0);
      }).catch(() => {
        setIsMuted(true);
      });
    }
  };

  const toggleMute = async () => {
    if (playerRef.current) {
      try {
        const volume = await playerRef.current.getVolume();
        const nextMuted = volume > 0;
        await playerRef.current.setVolume(nextMuted ? 0 : 1);
        setIsMuted(nextMuted);
      } catch (error) {
        console.error("Error toggling Vimeo mute:", error);
      }
    }
  };

  return (
    <section className="hero-section">
      <iframe
        ref={iframeRef}
        src="https://player.vimeo.com/video/1187572557?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&muted=1&loop=1&background=1"
        className="hero-video"
        title="V65_Demo_Reel_4132026"
        frameBorder="0"
        allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        onLoad={initVimeoPlayer}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          opacity: isMuted ? 0.7 : 1,
          transition: "opacity 0.8s ease",
        }}
      />

      <div className="hero-overlay" 
            style={{
              opacity: isMuted ? 0.7 : 1,
              transition: 'opacity 0.8s ease',
            }}
      />

      <button 
        className="mute-button"
        onClick={toggleMute}
        aria-label={isMuted ? "Unmute video" : "Mute video"}
      >
        {isMuted ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M11 5L6 9H2v6h4l5 4V5z"/>
            <line x1="23" y1="9" x2="17" y2="15"/>
            <line x1="17" y1="9" x2="23" y2="15"/>
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M11 5L6 9H2v6h4l5 4V5z"/>
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/>
          </svg>
        )}
      </button>

      <div 
        className="hero-content"
        style={{ 
          opacity: isMuted ? 1 : 0,
          transition: 'opacity 0.8s ease',
        }}
      >
      <h1 className="hero-title">
        V65 STUDIO
      </h1>
      <div className="hero-year">2026</div>
      <p className="hero-tagline">
      Coming Soon.
      </p>
      </div>
      </section>
  );
}

