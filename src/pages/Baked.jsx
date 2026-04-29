import React, { useState, useRef } from "react";

export default function Baked() {
  const BASE = import.meta.env.BASE_URL;
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoref = useRef(null);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const toggleMute = () => {
    if(videoref.current){
      videoref.current.muted = !videoref.current.muted;
      setIsMuted(videoref.current.muted);
    }
  };

    return (
    <div className="baked-page">
      <video
        ref={videoref}
        autoPlay
        loop
        muted
        playsInline
        className="baked-video"
        style={{
          opacity: isMuted ? 0.7 : 1,
          transition: 'opacity 0.8s ease',
        }}
      >
        <source src="" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="baked-overlay" 
            style={{
              opacity: isMuted ? 0.7 : 1,
              transition: 'opacity 0.8s ease',
            }}
      />

      <button 
        className="baked-mute-button"
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
        className="baked-content"
        style={{ 
          opacity: isMuted ? 1 : 0,
          transition: 'opacity 0.8s ease',
        }}
      >
        <img 
          src={`${BASE}pictures/cookie.png`} 
          alt="Baked & Halfbaked Cookie" 
          className="baked-image"
        />
        <h1 className="baked-title">
          Baked & Halfbaked
        </h1>
        <p className="baked-tagline">
          Coming Soon.
        </p>
      </div>

      {/* Toggle Button */}
      <div className="baked-toggle-container">
        <button 
          className="baked-toggle-button"
          onClick={toggleExpand}
          aria-expanded={isExpanded}
          aria-label={isExpanded ? 'Close' : 'Explore'}
        >
          <span className={`baked-toggle-icon ${isExpanded ? 'expanded' : ''}`}>
            ↓
          </span>
        </button>
      </div>

      {/* Expanded Editorial Section */}
      <div className={`baked-editorial ${isExpanded ? 'expanded' : ''}`}>
        <div className="editorial-content">
          {/* Toggle Button Inside Editorial */}
          {isExpanded && (
            <div className="editorial-toggle-container">
              <button 
                className="baked-toggle-button"
                onClick={toggleExpand}
                aria-expanded={isExpanded}
                aria-label="Close"
              >
                <span className={`baked-toggle-icon expanded`}>
                  ↓
                </span>
              </button>
            </div>
          )}
          
          <div className="editorial-header">
            <h2 className="editorial-title">Editorial</h2>
            <p className="editorial-subtitle">Stories, insights, and creative explorations</p>
          </div>

          <div className="editorial-posts">
            <article className="editorial-post">
              <div className="post-content">
                <h3 className="post-title">Placeholder Title 1</h3>
                <p className="post-excerpt">
                  This is a placeholder excerpt for the first editorial post. 
                  Replace this content with your actual blog post content.
                </p>
                <span className="post-read-more">Read more →</span>
              </div>
            </article>

            <article className="editorial-post">
              <div className="post-content">
                <h3 className="post-title">Placeholder Title 2</h3>
                <p className="post-excerpt">
                  This is a placeholder excerpt for the second editorial post. 
                  Replace this content with your actual blog post content.
                </p>
                <span className="post-read-more">Read more →</span>
              </div>
            </article>

            <article className="editorial-post">
              <div className="post-content">
                <h3 className="post-title">Placeholder Title 3</h3>
                <p className="post-excerpt">
                  This is a placeholder excerpt for the third editorial post. 
                  Replace this content with your actual blog post content.
                </p>
                <span className="post-read-more">Read more →</span>
              </div>
            </article>
          </div>
        </div>
      </div>
    </div>
  );
}
