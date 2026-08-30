"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Trophy, Flame, Star, ShieldCheck } from "lucide-react";
import RetroButton from "./RetroButton";

interface ImpactBoardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ImpactBoardModal({
  isOpen,
  onClose,
}: ImpactBoardModalProps) {
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
            className="relative w-full max-w-md bg-background-card border-2 border-border-card text-white shadow-retro-card p-5 md:p-6 z-10"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-3.5 right-3.5 text-text-secondary hover:text-white p-1 border border-border-card bg-[#02091F] hover:bg-red-950 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="text-center pb-4 border-b border-border-card mb-4">
              <div className="inline-flex p-3 bg-regent-gold/10 border-2 border-regent-gold mb-2">
                <Trophy className="w-8 h-8 text-regent-gold" />
              </div>
              <h3 className="font-pixel text-lg text-white font-bold tracking-wider">
                REGENT IMPACT BOARD
              </h3>
              <p className="text-xs text-regent-gold font-pixel mt-1">
                [ FEATURE IN DEVELOPMENT ]
              </p>
            </div>

            {/* Description */}
            <div className="space-y-3 mb-5 text-xs sm:text-sm text-text-secondary">
              <p>
                The <strong>Impact Board</strong> will rank prospect explorers across the Rotaract Club of Seethawaka Regent based on:
              </p>
              <div className="bg-[#030B22] p-3 border border-border-card space-y-2">
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-regent-gold shrink-0" />
                  <span><strong>Total XP:</strong> Earned from lessons & missions</span>
                </div>
                <div className="flex items-center gap-2">
                  <Flame className="w-4 h-4 text-orange-400 shrink-0" />
                  <span><strong>Day Streaks:</strong> Consistent daily check-ins</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-regent-green shrink-0" />
                  <span><strong>Avenue Quests:</strong> Hands-on project milestones</span>
                </div>
              </div>
              <p className="text-[11px] text-text-muted italic">
                Top prospects on the board will receive honorary recognition and direct induction consideration at the annual installation!
              </p>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-2 pt-2 border-t border-border-card">
              <RetroButton variant="yellow" size="sm" onClick={onClose} fullWidth>
                GOT IT, EXPLORER!
              </RetroButton>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
