import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function VideoView() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const videoId = searchParams.get('id') || '1';
  const videoTitle = searchParams.get('title') || 'Video Title';
  const vimeoId = searchParams.get('vimeoId') || '1148482890';

  /** Matches embed muted=1 so autoplay works under browser policies. */
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showProgressBar, setShowProgressBar] = useState(false);
  const playerRef = useRef(null);
  const containerRef = useRef(null);
  const videoContainerRef = useRef(null);

  // Initialize Vimeo player when component mounts
  useEffect(() => {
    // Wait for Vimeo API to load and iframe to be ready
    const initPlayer = () => {
      if (window.Vimeo && vimeoId) {
        const iframe = document.getElementById(`vimeo-player-${videoId}`);
        if (iframe) {
          try {
            playerRef.current = new window.Vimeo.Player(iframe);
            
            // Get initial state
            playerRef.current.getVolume().then(volume => {
              setIsMuted(volume === 0);
            });
            
            playerRef.current.getPaused().then(paused => {
              setIsPlaying(!paused);
            });
            
            playerRef.current.getDuration().then(dur => {
              setDuration(dur);
            });
            
            playerRef.current.getCurrentTime().then(time => {
              setCurrentTime(time);
            });
            
            // Set up event listeners
            playerRef.current.on('play', () => setIsPlaying(true));
            playerRef.current.on('pause', () => setIsPlaying(false));
            playerRef.current.on('volumechange', (data) => {
              setIsMuted(data.volume === 0);
            });
            playerRef.current.on('timeupdate', (data) => {
              setCurrentTime(data.seconds);
            });
            playerRef.current.on('loaded', (data) => {
              setDuration(data.duration);
            });
            playerRef.current.on('progress', (data) => {
              // Update duration if it changes
              if (data.duration) {
                setDuration(data.duration);
              }
            });
            
            // Poll for current time as a fallback (in case timeupdate doesn't fire)
            const timeUpdateInterval = setInterval(async () => {
              if (playerRef.current) {
                try {
                  const time = await playerRef.current.getCurrentTime();
                  setCurrentTime(time);
                } catch (error) {
                  // Silently fail if player is not ready
                }
              }
            }, 250); // Update 4 times per second
            
            // Store interval ID for cleanup
            if (playerRef.current) {
              playerRef.current._timeUpdateInterval = timeUpdateInterval;
            }
          } catch (error) {
            console.error('Error initializing Vimeo player:', error);
          }
        }
      }
    };

    let vimeoPollIntervalId = null;
    let vimeoPollStopTimeoutId = null;

    const timeoutId = setTimeout(initPlayer, 100);

    if (!window.Vimeo) {
      vimeoPollIntervalId = setInterval(() => {
        if (window.Vimeo) {
          if (vimeoPollIntervalId) {
            clearInterval(vimeoPollIntervalId);
            vimeoPollIntervalId = null;
          }
          initPlayer();
        }
      }, 100);

      vimeoPollStopTimeoutId = setTimeout(() => {
        if (vimeoPollIntervalId) {
          clearInterval(vimeoPollIntervalId);
          vimeoPollIntervalId = null;
        }
      }, 5000);
    }

    return () => {
      clearTimeout(timeoutId);
      if (vimeoPollIntervalId) clearInterval(vimeoPollIntervalId);
      if (vimeoPollStopTimeoutId) clearTimeout(vimeoPollStopTimeoutId);
      if (playerRef.current) {
        try {
          playerRef.current.off('play');
          playerRef.current.off('pause');
          playerRef.current.off('volumechange');
          playerRef.current.off('timeupdate');
          playerRef.current.off('loaded');
          playerRef.current.off('progress');
          
          // Clear polling interval if it exists
          if (playerRef.current._timeUpdateInterval) {
            clearInterval(playerRef.current._timeUpdateInterval);
            delete playerRef.current._timeUpdateInterval;
          }
        } catch (error) {
          console.error('Error cleaning up Vimeo player:', error);
        }
      }
    };
  }, [vimeoId, videoId]);

  const toggleMute = async () => {
    if (playerRef.current) {
      try {
        const volume = await playerRef.current.getVolume();
        await playerRef.current.setVolume(volume > 0 ? 0 : 1);
        setIsMuted(volume > 0);
      } catch (error) {
        console.error('Error toggling mute:', error);
      }
    }
  };

  const togglePlay = async () => {
    if (playerRef.current) {
      try {
        if (isPlaying) {
          await playerRef.current.pause();
        } else {
          await playerRef.current.play();
        }
      } catch (error) {
        console.error('Error toggling play:', error);
      }
    }
  };

  const handleReturn = () => {
    navigate(-1);
  };

  const handleSeek = async (e) => {
    if (playerRef.current && duration) {
      const rect = e.currentTarget.getBoundingClientRect();
      const pos = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      const newTime = pos * duration;
      try {
        await playerRef.current.setCurrentTime(newTime);
        setCurrentTime(newTime);
      } catch (error) {
        console.error('Error seeking:', error);
      }
    }
  };

  const handleProgressBarMouseDown = (e) => {
    e.preventDefault();
    handleSeek(e);
    
    const handleMouseMove = (moveEvent) => {
      if (playerRef.current && duration) {
        const rect = e.currentTarget.getBoundingClientRect();
        const pos = Math.max(0, Math.min(1, (moveEvent.clientX - rect.left) / rect.width));
        const newTime = pos * duration;
        playerRef.current.setCurrentTime(newTime).then(() => {
          setCurrentTime(newTime);
        }).catch(err => console.error('Error seeking:', err));
      }
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const formatTime = (seconds) => {
    if (isNaN(seconds) || !isFinite(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleFullscreen = () => {
    // Use CSS-based fullscreen that stays within the browser page
    const newFullscreenState = !isFullscreen;
    setIsFullscreen(newFullscreenState);
    
    if (newFullscreenState) {
      document.body.classList.add('video-fullscreen-active');
      document.documentElement.classList.add('video-fullscreen-active');
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.classList.remove('video-fullscreen-active');
      document.documentElement.classList.remove('video-fullscreen-active');
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
  };
  
  // Cleanup on unmount
  useEffect(() => {
    return () => {
      document.body.classList.remove('video-fullscreen-active');
      document.documentElement.classList.remove('video-fullscreen-active');
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, []);


  return (
    <div className={`video-view-container ${isFullscreen ? 'fullscreen-mode' : ''}`} ref={containerRef}>
      {/* Dimmed overlay */}
      <div className="video-view-overlay" />
      
      {/* Video container */}
      <div 
        className="video-view-content"
        ref={videoContainerRef}
        onMouseEnter={() => setShowProgressBar(true)}
        onMouseLeave={() => setShowProgressBar(false)}
        onClick={togglePlay}
        style={{ cursor: 'pointer' }}
      >
        {/* Vimeo iframe embed */}
        <div 
          className="video-iframe-wrapper"
          style={{
            width: '100%',
            height: '100%',
            position: 'relative',
            paddingBottom: isFullscreen ? '0' : '56.25%', // 16:9 aspect ratio, removed in fullscreen
          }}
        >
          <iframe
            id={`vimeo-player-${videoId}`}
            src={`https://player.vimeo.com/video/${vimeoId}?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&muted=1&loop=1&responsive=1&controls=0&title=0&byline=0&portrait=0`}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              border: 'none',
            }}
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className="video-view-video"
            title={videoTitle}
          />
          
          {/* Progress bar overlay - shows on hover */}
          {showProgressBar && (
            <div 
              className="video-progress-overlay"
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: '20px',
                background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)',
                pointerEvents: 'none',
                zIndex: 10,
              }}
            >
              <div 
                className="video-progress-bar-track"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent triggering video play/pause
                  handleSeek(e);
                }}
                onMouseDown={(e) => {
                  e.stopPropagation(); // Prevent triggering video play/pause
                  handleProgressBarMouseDown(e);
                }}
                style={{
                  width: '100%',
                  height: '8px',
                  background: 'rgba(255, 255, 255, 0.3)',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  pointerEvents: 'auto',
                  position: 'relative',
                  transition: 'height 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.height = '10px';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.height = '8px';
                }}
              >
                <div 
                  className="video-progress-bar-progress"
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    height: '100%',
                    width: `${duration ? (currentTime / duration) * 100 : 0}%`,
                    background: 'rgba(255, 255, 255, 0.9)',
                    borderRadius: '3px',
                    transition: 'width 0.1s linear',
                  }}
                />
                <div 
                  className="video-progress-bar-handle"
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: `${duration ? (currentTime / duration) * 100 : 0}%`,
                    transform: 'translate(-50%, -50%)',
                    width: '12px',
                    height: '12px',
                    background: 'white',
                    borderRadius: '50%',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
                    transition: 'left 0.1s linear',
                  }}
                />
              </div>
              {duration > 0 && (
                <div 
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginTop: '8px',
                    fontSize: '12px',
                    color: 'rgba(255, 255, 255, 0.9)',
                    fontFamily: 'Inter, sans-serif',
                  }}
                >
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              )}
            </div>
          )}
        </div>
        
        {/* Video title caption */}
        <p className="video-view-caption">
          {videoTitle}
        </p>
      </div>

      {/* Control buttons */}
      <div className="video-view-controls" onClick={(e) => e.stopPropagation()}>
        <button 
          className="video-control-button"
          onClick={handleReturn}
          aria-label="Return"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
        </button>

        <button 
          className="video-control-button"
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

        <button 
          className="video-control-button"
          onClick={togglePlay}
          aria-label={isPlaying ? "Pause video" : "Play video"}
        >
          {isPlaying ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="6" y="4" width="4" height="16"/>
              <rect x="14" y="4" width="4" height="16"/>
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="5 3 19 12 5 21 5 3"/>
            </svg>
          )}
        </button>

        <button 
          className="video-control-button"
          onClick={toggleFullscreen}
          aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
        >
          {isFullscreen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"/>
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/>
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}
