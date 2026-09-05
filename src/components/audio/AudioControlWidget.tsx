"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX, Music, Bell, BellOff, X } from "lucide-react";
import { audioManager } from "@/lib/audioManager";

export default function AudioControlWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMusicActive, setIsMusicActive] = useState(false);
  const [isSfxMuted, setIsSfxMuted] = useState(false);
  const [musicVol, setMusicVol] = useState(0.3);

  useEffect(() => {
    const updateState = () => {
      setIsMusicActive(audioManager.isMusicActive());
      setIsSfxMuted(audioManager.isSfxMuted);
      setMusicVol(audioManager.musicVolume);
    };

    updateState();
    const unsubscribe = audioManager.subscribe(updateState);
    return () => unsubscribe();
  }, []);

  const handleToggleMusic = () => {
    audioManager.playTap();
    audioManager.toggleMusic();
  };

  const handleToggleSfx = () => {
    audioManager.toggleSfx();
  };

  return (
    <div className="fixed bottom-20 right-4 md:bottom-6 md:right-6 z-50 select-none">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.92 }}
            transition={{ duration: 0.18 }}
            className="mb-3 p-4 w-64 bg-slate-950/95 border-2 border-yellow-600/70 rounded-xl shadow-2xl backdrop-blur-md text-amber-100 font-serif"
          >
            <div className="flex items-center justify-between pb-2 mb-3 border-b border-yellow-900/60">
              <span className="font-pixel text-[10px] tracking-wider text-yellow-400 uppercase">
                Realm Soundmaster
              </span>
              <button
                onClick={() => {
                  audioManager.playTap();
                  setIsOpen(false);
                }}
                className="text-amber-400/70 hover:text-amber-200 transition-colors"
                aria-label="Close sound settings"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Music Toggle */}
            <div className="flex items-center justify-between py-1.5">
              <div className="flex items-center gap-2 text-xs">
                <Music className="w-4 h-4 text-yellow-400" />
                <span>Village BGM</span>
              </div>
              <button
                onClick={handleToggleMusic}
                className={`px-3 py-1 text-[11px] font-pixel rounded border transition-all ${
                  isMusicActive
                    ? "bg-emerald-600/80 border-emerald-400 text-white shadow-[0_0_8px_rgba(16,185,129,0.5)]"
                    : "bg-slate-800 border-slate-700 text-slate-400 hover:text-slate-200"
                }`}
              >
                {isMusicActive ? "ON ♫" : "OFF"}
              </button>
            </div>

            {/* SFX Toggle */}
            <div className="flex items-center justify-between py-1.5 mt-1">
              <div className="flex items-center gap-2 text-xs">
                {isSfxMuted ? (
                  <BellOff className="w-4 h-4 text-slate-500" />
                ) : (
                  <Bell className="w-4 h-4 text-yellow-400" />
                )}
                <span>Sound Effects</span>
              </div>
              <button
                onClick={handleToggleSfx}
                className={`px-3 py-1 text-[11px] font-pixel rounded border transition-all ${
                  !isSfxMuted
                    ? "bg-amber-600/80 border-amber-400 text-white shadow-[0_0_8px_rgba(245,158,11,0.5)]"
                    : "bg-slate-800 border-slate-700 text-slate-400 hover:text-slate-200"
                }`}
              >
                {!isSfxMuted ? "ON" : "MUTED"}
              </button>
            </div>

            {/* Volume slider */}
            <div className="mt-3 pt-2 border-t border-yellow-950/60">
              <div className="flex justify-between text-[10px] text-amber-300/70 mb-1">
                <span>Music Volume</span>
                <span>{Math.round(musicVol * 100)}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={musicVol}
                onChange={(e) => {
                  const val = parseFloat(e.target.value);
                  audioManager.setMusicVolume(val);
                }}
                className="w-full accent-yellow-400 bg-slate-800 h-1.5 rounded cursor-pointer"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        onClick={() => {
          audioManager.playTap();
          // If first tap and music is off, start music immediately and open panel
          if (!isMusicActive && !isOpen) {
            audioManager.startMusic();
          }
          setIsOpen(!isOpen);
        }}
        className={`relative flex items-center justify-center w-11 h-11 rounded-full border-2 shadow-xl backdrop-blur-md transition-all ${
          isMusicActive
            ? "bg-yellow-950/90 border-yellow-400 text-yellow-300 shadow-[0_0_15px_rgba(234,179,8,0.4)]"
            : "bg-slate-950/90 border-slate-700 text-slate-400 hover:border-yellow-600 hover:text-yellow-300"
        }`}
        title="Realm Sounds & Village Music"
        aria-label="Sound Settings"
      >
        {isMusicActive ? (
          <div className="relative">
            <Music className="w-5 h-5 text-yellow-300 animate-pulse" />
            <span className="absolute -top-1 -right-1.5 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
          </div>
        ) : isSfxMuted ? (
          <VolumeX className="w-5 h-5 text-slate-500" />
        ) : (
          <Volume2 className="w-5 h-5" />
        )}
      </motion.button>
    </div>
  );
}
