"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, MessageSquare, Compass, Shield } from "lucide-react";
import RetroButton from "./RetroButton";

interface AskNovaModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AskNovaModal({ isOpen, onClose }: AskNovaModalProps) {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

  const tips = [
    {
      id: "journey",
      title: "Where should I start?",
      icon: Compass,
      answer:
        "Begin with 'Rotary Roots'! It teaches the core philosophy of 'Service Above Self' and unlocks your first official XP and Explorer badges.",
    },
    {
      id: "avenues",
      title: "What are the 5 Avenues?",
      icon: Shield,
      answer:
        "Club Service, Community Service, International Service, Professional Development, and Public Relations. You'll explore these in 'Avenue Realms'!",
    },
    {
      id: "xp",
      title: "How do I earn XP?",
      icon: Sparkles,
      answer:
        "Complete lessons, attend monthly meetings, participate in community projects, and keep your daily streak alive to earn bonus XP and rank up.",
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
            className="relative w-full max-w-lg bg-background-card border-2 border-border-card text-white shadow-retro-card p-5 md:p-6 z-10"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-3.5 right-3.5 text-text-secondary hover:text-white p-1 border border-border-card bg-[#02091F] hover:bg-red-950 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header with Nova */}
            <div className="flex items-center gap-3.5 mb-4 border-b border-border-card pb-4">
              <div className="relative w-14 h-14 shrink-0 border-2 border-border-card bg-[#02091F] overflow-hidden">
                <Image
                  src="/images/nova_companion.jpg"
                  alt="Nova companion"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-pixel text-base sm:text-lg text-white font-bold">
                    NOVA
                  </h3>
                  <span className="bg-regent-maroon px-2 py-0.5 text-[10px] font-pixel text-white border border-red-900">
                    GUIDE
                  </span>
                </div>
                <p className="text-xs text-text-secondary">
                  &ldquo;Hoo! What wisdom do you seek today, Lehan?&rdquo;
                </p>
              </div>
            </div>

            {/* Content / Question list */}
            <div className="space-y-2.5 mb-5">
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
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <Icon className="w-4 h-4 text-regent-blue shrink-0" />
                          <span className="font-pixel text-xs sm:text-sm text-white">
                            {item.title}
                          </span>
                        </div>
                        <span className="font-pixel text-xs text-text-secondary">
                          {isSelected ? "−" : "+"}
                        </span>
                      </div>
                      {isSelected && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          className="mt-2 text-xs sm:text-sm text-text-secondary pl-6 border-l-2 border-regent-blue/50"
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
            <div className="flex justify-end gap-2 pt-2 border-t border-border-card">
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
