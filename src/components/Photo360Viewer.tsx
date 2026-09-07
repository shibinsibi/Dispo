import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Rotate3d, 
  Play, 
  Pause, 
  Sparkles, 
  Info, 
  Maximize2, 
  Compass, 
  Sliders, 
  Eye, 
  CheckCircle2,
  ZoomIn
} from 'lucide-react';

export interface PhotoAngle {
  angle: number;
  label: string;
  url: string;
  caption: string;
}

export interface InspectionHotspot {
  x: number; // percentage from left (0 - 100)
  y: number; // percentage from top (0 - 100)
  title: string;
  desc: string;
  tag: string;
}

interface Photo360ViewerProps {
  angles: PhotoAngle[];
  productName: string;
  category?: string;
  hotspots?: InspectionHotspot[];
  className?: string;
  showControls?: boolean;
}

export const Photo360Viewer: React.FC<Photo360ViewerProps> = ({
  angles,
  productName,
  category = 'Dispo World Packaging',
  hotspots = [],
  className = 'w-full h-[380px] sm:h-[460px]',
  showControls = true
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [showHotspots, setShowHotspots] = useState(true);
  const [activeHotspot, setActiveHotspot] = useState<InspectionHotspot | null>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const autoPlayTimerRef = useRef<NodeJS.Timeout | null>(null);

  const safeAngles = angles && angles.length > 0 ? angles : [
    { angle: 0, label: 'Front (0°)', url: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80', caption: 'Frontal studio photo' }
  ];

  const totalFrames = safeAngles.length;
  const currentFrame = safeAngles[currentIndex] || safeAngles[0];

  // Auto-play / continuous turntable rotation
  useEffect(() => {
    if (isPlaying && !isDragging) {
      autoPlayTimerRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % totalFrames);
      }, 700);
    } else if (autoPlayTimerRef.current) {
      clearInterval(autoPlayTimerRef.current);
    }
    return () => {
      if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
    };
  }, [isPlaying, isDragging, totalFrames]);

  // Drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
  };

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return;
    const diff = e.clientX - startX;
    const sensitivity = 28; // pixels moved per frame shift
    if (Math.abs(diff) >= sensitivity) {
      const step = Math.floor(diff / sensitivity);
      setCurrentIndex((prev) => {
        let next = (prev - step) % totalFrames;
        if (next < 0) next += totalFrames;
        return next;
      });
      setStartX(e.clientX);
    }
  }, [isDragging, startX, totalFrames]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Touch handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      setStartX(e.touches[0].clientX);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || e.touches.length !== 1) return;
    const diff = e.touches[0].clientX - startX;
    const sensitivity = 22;
    if (Math.abs(diff) >= sensitivity) {
      const step = Math.floor(diff / sensitivity);
      setCurrentIndex((prev) => {
        let next = (prev - step) % totalFrames;
        if (next < 0) next += totalFrames;
        return next;
      });
      setStartX(e.touches[0].clientX);
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  // Preload all angle images for instant rotation without flickering
  useEffect(() => {
    safeAngles.forEach((angle) => {
      const img = new Image();
      img.src = angle.url;
    });
  }, [safeAngles]);

  return (
    <div className="flex flex-col w-full select-none">
      {/* Viewer Stage */}
      <div 
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className={`relative bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 rounded-2xl border border-slate-800 flex items-center justify-center overflow-hidden shadow-2xl ${
          isDragging ? 'cursor-grabbing' : 'cursor-grab'
        } ${className}`}
      >
        {/* Background ambient lighting */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(14,165,233,0.15)_0,transparent_70%)] pointer-events-none" />

        {/* Real Product Photo */}
        <div className="relative w-full h-full flex items-center justify-center p-4">
          <img
            src={currentFrame.url}
            alt={`${productName} - ${currentFrame.label}`}
            referrerPolicy="no-referrer"
            style={{ transform: `scale(${zoomLevel})`, transition: isDragging ? 'none' : 'transform 0.2s ease-out' }}
            className="max-h-[85%] max-w-[85%] object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.6)] pointer-events-none transition-opacity duration-150"
          />
        </div>

        {/* Floating Top HUD */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none z-10">
          <div className="flex flex-col gap-1.5 pointer-events-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/85 backdrop-blur-md border border-slate-700/80 text-xs font-semibold text-white shadow-lg">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-sky-400 font-bold">{currentFrame.angle}°</span>
              <span className="text-slate-300 font-medium hidden sm:inline">• {currentFrame.label}</span>
            </div>
            <div className="text-[11px] text-slate-400 bg-slate-950/70 backdrop-blur-xs px-2.5 py-1 rounded-md border border-slate-800/80 max-w-xs truncate hidden sm:block">
              {currentFrame.caption}
            </div>
          </div>

          <div className="flex items-center gap-2 pointer-events-auto">
            {/* Zoom Toggle */}
            <button
              id="photo-360-zoom-toggle"
              onClick={() => setZoomLevel((prev) => (prev === 1 ? 1.35 : 1))}
              className={`p-2 rounded-xl border backdrop-blur-md transition-all cursor-pointer ${
                zoomLevel > 1 
                  ? 'bg-sky-500 text-slate-950 border-sky-400 font-bold' 
                  : 'bg-slate-900/80 text-slate-300 border-slate-700/80 hover:bg-slate-800'
              }`}
              title={zoomLevel > 1 ? 'Reset Zoom' : 'Zoom In Real Photo'}
            >
              <ZoomIn className="w-4 h-4" />
            </button>

            {/* Hotspots Toggle */}
            {hotspots.length > 0 && (
              <button
                id="photo-360-hotspots-toggle"
                onClick={() => setShowHotspots(!showHotspots)}
                className={`px-2.5 py-1.5 rounded-xl border backdrop-blur-md text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                  showHotspots 
                    ? 'bg-sky-500/20 text-sky-300 border-sky-500/40' 
                    : 'bg-slate-900/80 text-slate-400 border-slate-700/80'
                }`}
                title="Toggle inspection hotspots"
              >
                <Sparkles className="w-3.5 h-3.5 text-sky-400" />
                <span className="hidden sm:inline">Specs</span>
              </button>
            )}

            {/* Play / Pause Auto-spin */}
            <button
              id="photo-360-autoplay-toggle"
              onClick={() => setIsPlaying(!isPlaying)}
              className={`px-3 py-1.5 rounded-xl border backdrop-blur-md text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                isPlaying 
                  ? 'bg-sky-600 text-white border-sky-400 shadow-md shadow-sky-500/30' 
                  : 'bg-slate-900/80 text-slate-300 border-slate-700/80 hover:bg-slate-800'
              }`}
            >
              {isPlaying ? (
                <>
                  <Pause className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Pause</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Auto Spin</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Drag Instruction Watermark in Bottom Left */}
        <div className="absolute bottom-4 left-4 pointer-events-none flex items-center gap-2 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-700/60 text-xs text-slate-300 shadow-md">
          <Rotate3d className="w-4 h-4 text-sky-400 animate-spin-slow" />
          <span>Drag horizontally to rotate 360° photo</span>
        </div>

        {/* Hotspots Overlays */}
        {showHotspots && hotspots.map((spot, idx) => (
          <div
            key={idx}
            style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
            className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
          >
            <button
              id={`hotspot-${idx}`}
              onClick={(e) => {
                e.stopPropagation();
                setActiveHotspot(activeHotspot?.title === spot.title ? null : spot);
              }}
              className="relative group p-1.5 rounded-full bg-sky-500 text-slate-950 shadow-lg shadow-sky-500/50 hover:scale-125 transition-transform cursor-pointer"
            >
              <span className="absolute inset-0 rounded-full bg-sky-400 animate-ping opacity-75" />
              <Sparkles className="w-3.5 h-3.5 relative z-10 text-white" />
            </button>

            {/* Hotspot Popover Tooltip */}
            {activeHotspot?.title === spot.title && (
              <div 
                onClick={(e) => e.stopPropagation()}
                className="absolute left-1/2 -translate-x-1/2 bottom-full mb-3 w-60 p-3.5 rounded-2xl bg-slate-900 text-white border border-sky-500/40 shadow-2xl backdrop-blur-xl z-30 animate-in fade-in zoom-in-95"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] uppercase font-bold text-sky-400 tracking-wider">
                    {spot.tag}
                  </span>
                  <button 
                    onClick={() => setActiveHotspot(null)}
                    className="text-slate-400 hover:text-white text-xs cursor-pointer"
                  >
                    ✕
                  </button>
                </div>
                <div className="text-xs font-bold text-slate-100 mb-1">{spot.title}</div>
                <div className="text-[11px] text-slate-300 leading-relaxed">{spot.desc}</div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Interactive Controls & Scrub Slider */}
      {showControls && (
        <div className="mt-4 bg-slate-900/80 border border-slate-800/90 rounded-2xl p-3.5 flex flex-col gap-3">
          {/* Angular Angle Slider */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-slate-400 w-12 text-right">
              {currentFrame.angle}°
            </span>
            <input
              id="photo-360-scrub-slider"
              type="range"
              min={0}
              max={totalFrames - 1}
              value={currentIndex}
              onChange={(e) => {
                setCurrentIndex(Number(e.target.value));
                if (isPlaying) setIsPlaying(false);
              }}
              className="flex-1 accent-sky-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
              title="Scrub 360° photo angles"
            />
            <span className="text-xs text-slate-400 font-mono w-16">
              {currentIndex + 1}/{totalFrames} views
            </span>
          </div>

          {/* Quick Angle Chips */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-slate-800/80 text-xs">
            <span className="text-slate-400 font-medium text-[11px] flex items-center gap-1">
              <Compass className="w-3.5 h-3.5 text-sky-400" />
              <span>Studio Angles:</span>
            </span>

            <div className="flex flex-wrap items-center gap-1.5">
              {safeAngles.map((angle, idx) => (
                <button
                  key={idx}
                  id={`angle-btn-${angle.angle}`}
                  onClick={() => {
                    setCurrentIndex(idx);
                    if (isPlaying) setIsPlaying(false);
                  }}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all cursor-pointer ${
                    currentIndex === idx
                      ? 'bg-sky-600 text-white font-bold shadow-sm'
                      : 'bg-slate-800/70 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                  }`}
                >
                  {angle.label.split(' ')[0]} {angle.angle}°
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
