import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import Navbar from "./components/Navbar";
import PaddedBorder from "./components/PaddedBorder";
import Home from "./pages/Home";
import FrameByFrame from "./pages/FramebyFrame";
import Baked from "./pages/Baked";
import CoffeeRuns from "./pages/CoffeeRuns";
import VideoView from "./components/VideoView";

export default function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Navbar />
        <main className="main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/frame-by-frame" element={<FrameByFrame />} />
            <Route path="/baked" element={<Baked />} />
            <Route path="/coffee" element={<CoffeeRuns />} />
            <Route path="/video" element={<VideoView />} />
          </Routes>
        </main>
        <PaddedBorder />
      </div>
    </BrowserRouter>
  );
}
