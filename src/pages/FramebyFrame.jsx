import React from "react";
import { Link } from "react-router-dom";

/** Same reel for every slot until each tile has its own Vimeo upload. */
const DEMO_VIMEO_ID = "1148482890";
const BASE = import.meta.env.BASE_URL;


export default function FrameByFrame() {
    return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      {/* FRAME-by-FRAME page content */}
        <div className="portfolio-wrapper">
            <h1 className="portfolio-text">PORTFOLIO</h1>

            {/* TOP WRAPPER */}
            <div className="top-wrapper">
                <div className="wrapper1">
                    <Link to={`/video?id=1&title=v65_Demo_Reel&vimeoId=${DEMO_VIMEO_ID}`} className="portfolio-link">
                        <img
                            src={`${BASE}pictures/t1.png`}
                            alt=""
                            className="portfolio-image1"
                        />
                        
                        <div className="outline-light-chaser"/>
                    </Link>
                </div>
                
                <div className="wrapper2">
                    <Link to={`/video?id=2&title=Video%202&vimeoId=${DEMO_VIMEO_ID}`} className="portfolio-link">
                        <img
                            src={`${BASE}pictures/t2.png`}
                            alt=""
                            className="portfolio-image2"
                        />
                        <div className="outline-light-chaser"/>
                    </Link>
                </div>  
            </div>

            {/* MIDDLE WRAPPER */}
            <div className="middle-wrapper">
                <div className="wrapper3">
                    <Link to={`/video?id=3&title=Video%203&vimeoId=${DEMO_VIMEO_ID}`} className="portfolio-link">
                        <img
                            src={`${BASE}pictures/m1.png`}
                            alt=""
                            className="portfolio-image3"
                        />
                        <div className="outline-light-chaser"/>
                    </Link>
                </div>

                <div className="wrapper4">
                    <Link to={`/video?id=4&title=Video%204&vimeoId=${DEMO_VIMEO_ID}`} className="portfolio-link">
                        <img
                            src={`${BASE}pictures/m2.png`}
                            alt=""
                            className="portfolio-image4"
                        />
                        <div className="outline-light-chaser"/>
                    </Link>
                </div>
            </div>

            {/* BOTTOM WRAPPER */}
            <div className="bottom-wrapper">

                <div className="wrap-text">
                    <p className="portfolio-subtitle">Our Picks From 2025.</p>
                </div>
                <div className="wrap-text2">
                    <h1 className="portfolio-title">VIEW FRAME-BY-FRAME</h1>
                    <svg 
                        width="50" 
                        height="5" 
                        viewBox="0 0 50 5" 
                        fill="none" 
                        xmlns="http://www.w3.org/2000/svg"
                        className="arrow-right"
>
                    <path 
                        d="M0 2.5 L45 2.5 M45 2.5 L40 0 M45 2.5 L40 5" 
                        stroke="white" 
                        strokeWidth="1.5" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                    />
                    </svg>
                </div>
                
                <div className="wrapper5">
                    <Link to={`/video?id=5&title=Video%205&vimeoId=${DEMO_VIMEO_ID}`} className="portfolio-link">
                        <img
                            src={`${BASE}pictures/b1.png`}
                            alt=""
                            className="portfolio-image5"
                        />
                        <div className="outline-light-chaser"/>
                    </Link>
                </div>

                <div className="wrapper6">
                    <Link to={`/video?id=6&title=Video%206&vimeoId=${DEMO_VIMEO_ID}`} className="portfolio-link">
                        <img
                            src={`${BASE}pictures/b2.png`}
                            alt=""
                            className="portfolio-image6"
                        />
                        <div className="outline-light-chaser"/>
                    </Link>
                </div>
            </div>
        </div>
    </div>
  );
}
