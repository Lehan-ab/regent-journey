"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, Compass, Shield, Award } from "lucide-react";
import RetroButton from "./RetroButton";
import PixelCompanion from "@/components/companion/PixelCompanion";
import { usePlayer } from "@/context/PlayerContext";
import { COMPANIONS } from "@/data/companionsData";

interface AskNovaModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AskNovaModal({ isOpen, onClose }: AskNovaModalProps) {
  const { player } = usePlayer();
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

  const companion = COMPANIONS[player.companion] || COMPANIONS.nova;

  const tips = [
    {
      id: "journey",
      title: "Where should I start?",
      icon: Compass,
      answer:
        "Begin with 'Chapter 1: Rotary Roots'! It introduces the core philosophy of 'Service Above Self' and unlocks your first official XP and Explorer badges.",
    },
    {
      id: "avenues",
      title: "What are the 7 Avenues of Service?",
      icon: Shield,
      answer:
        "Community Service (Heartland), Club Service (The Hearth), Professional Development (The Forge), International Service (Far Harbor), Public Relations (Signal Spire), Sports & Recreation (Grand Arena), and Finance (Treasury Quarter). You can explore all 7 in Chapter 4!",
    },
    {
      id: "xp",
      title: "How do I earn XP and rank up?",
      icon: Sparkles,
      answer:
        "Complete lessons, attend monthly meetings, participate in community projects, and keep your daily streak alive to earn bonus XP and progress toward official induction.",
    },
    {
      id: "membership",
      title: "How do I become an official member?",
      icon: Award,
      answer:
        "Progress through the 9 chapters, participate in physical club activities, and complete the induction quest at Chapter 9 (Membership Citadel) to receive your Regent Pin!",
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#02091F]/80 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-lg bg-[#071331] border-2 border-border-card text-white shadow-retro-card p-5 md:p-6 z-10 max-h-[90vh] overflow-y-auto"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-3.5 right-3.5 text-text-secondary hover:text-white p-1 border border-border-card bg-[#02091F] hover:bg-red-950 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Header with Companion */}
            <div className="flex items-center gap-3.5 mb-4 border-b border-border-card pb-3.5">
              <div className="relative w-12 h-12 sm:w-14 sm:h-14 shrink-0 border-2 border-regent-gold bg-[#02091F] p-1 flex items-center justify-center">
                <PixelCompanion
                  companionId={companion.id}
                  emotion="happy"
                  size="full"
                  animate={true}
                />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-pixel text-base sm:text-lg text-white font-bold uppercase">
                    {companion.name}
                  </h3>
                  <span className="bg-regent-maroon px-2 py-0.5 text-[9px] font-pixel text-regent-gold border border-red-950 font-bold uppercase">
                    {companion.tagline}
                  </span>
                </div>
                <p className="text-xs text-text-secondary truncate">
                  &ldquo;What guidance do you seek today, {player.name || "Explorer"}?&rdquo;
                </p>
              </div>
            </div>

            {/* Content / Question list */}
            <div className="space-y-2 mb-5">
              <p className="font-pixel text-xs text-regent-gold uppercase tracking-wide">
                Quick Guide Questions:
              </p>

              <div className="space-y-2">
                {tips.map((item) => {
                  const Icon = item.icon;
                  const isSelected = selectedTopic === item.id;
                  return (
                    <div
                      key={item.id}
                      onClick={() => setSelectedTopic(isSelected ? null : item.id)}
                      className={`p-3 border-2 cursor-pointer transition-all ${
                        isSelected
                          ? "bg-[#09173A] border-regent-blue"
                          : "bg-[#030B22] border-border-card hover:border-border-cardHighlight"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <Icon className="w-4 h-4 text-regent-blue shrink-0" />
                          <span className="font-pixel text-xs sm:text-sm text-white truncate">
                            {item.title}
                          </span>
                        </div>
                        <span className="font-pixel text-xs text-text-secondary shrink-0">
                          {isSelected ? "−" : "+"}
                        </span>
                      </div>
                      {isSelected && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          className="mt-2 text-xs sm:text-sm text-text-secondary pl-6 border-l-2 border-regent-blue/50 leading-relaxed break-words"
                        >
                          {item.answer}
                        </motion.p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-end gap-2 pt-3 border-t border-border-card">
              <RetroButton variant="outline" size="sm" onClick={onClose}>
                CLOSE
              </RetroButton>
              <RetroButton
                variant="blue"
                size="sm"
                href="/journey"
                onClick={onClose}
              >
                CONTINUE JOURNEY
              </RetroButton>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
