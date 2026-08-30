"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Send, Users, Sparkles, Mail, ShieldCheck } from "lucide-react";
import RetroCard from "@/components/ui/RetroCard";
import RetroButton from "@/components/ui/RetroButton";

export default function InviteFriendSection() {
  const [email, setEmail] = useState("");
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes("@")) {
      setFeedbackMessage("Please enter a valid email address.");
      return;
    }
    setFeedbackMessage("Invite system will be connected later.");
  };

  return (
    <section className="w-full mb-8">
      <RetroCard className="p-5 sm:p-7 text-center overflow-hidden bg-gradient-to-b from-[#071331] via-[#050F2D] to-[#03091B]">
        {/* Upgraded Pixel Art Illustration */}
        <div className="relative w-full max-w-md h-48 sm:h-56 mx-auto mb-4 border-2 border-border-card bg-[#02091F] overflow-hidden shadow-inner">
          <Image
            src="/images/invite_scroll_v2.jpg"
            alt="You Are Invited - Regent Journey Explorers"
            fill
            className="object-cover"
          />
        </div>

        {/* Heading */}
        <div className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-regent-maroon text-white font-pixel text-[10px] uppercase border border-red-950 mb-2">
          <ShieldCheck className="w-3 h-3 text-regent-gold" />
          FELLOWSHIP QUEST
        </div>

        <h2 className="font-pixel text-xl sm:text-2xl font-bold text-white tracking-wide mb-2">
          INVITE A FRIEND
        </h2>

        {/* Supporting Copy */}
        <p className="font-body text-xs sm:text-sm text-text-secondary max-w-md mx-auto mb-5 leading-relaxed">
          Know someone who would enjoy Rotaract?
          <br className="hidden sm:inline" /> Invite them to begin their own Regent Journey.
        </p>

        {/* Form Container */}
        <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-3">
          <div className="flex flex-col sm:flex-row items-stretch gap-2.5">
            <div className="relative flex-1">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (feedbackMessage) setFeedbackMessage(null);
                }}
                placeholder="Friend's email address"
                className="w-full pl-9 pr-3 py-2.5 bg-[#02091F] border-2 border-border-card text-white text-xs sm:text-sm placeholder:text-text-muted focus:outline-none focus:border-regent-blue transition-colors font-body"
              />
            </div>
            <RetroButton
              variant="green"
              size="md"
              type="submit"
              icon={<Send className="w-4 h-4" />}
            >
              SEND INVITE
            </RetroButton>
          </div>

          {/* Feedback Message */}
          {feedbackMessage && (
            <div className="p-2.5 bg-[#02091F] border border-regent-gold text-regent-gold font-pixel text-xs text-center animate-pulse">
              {feedbackMessage}
            </div>
          )}
        </form>
      </RetroCard>
    </section>
  );
}
