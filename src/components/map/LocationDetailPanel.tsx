"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  X,
  Sparkles,
  BookOpen,
  Lock,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  MapPin,
  Landmark,
} from "lucide-react";
import RetroCard from "@/components/ui/RetroCard";
import RetroButton from "@/components/ui/RetroButton";
import PixelProgressBar from "@/components/ui/PixelProgressBar";
import { RealmLocation, MapSecret, sevenAvenueRealms } from "@/data/realmMapLocations";

interface LocationDetailPanelProps {
  location: RealmLocation | null;
  secret?: MapSecret | null;
  onClose: () => void;
}

export default function LocationDetailPanel({
  location,
  secret,
  onClose,
}: LocationDetailPanelProps) {
  // If secret landmark is inspected
  if (secret) {
    return (
      <RetroCard className="p-4 sm:p-5 bg-gradient-to-b from-[#091a42] via-[#05102A] to-[#03091B] border-2 border-regent-gold shadow-retro-card-lg relative">
        <button
          onClick={onClose}
          className="absolute top-3.5 right-3.5 text-text-secondary hover:text-white p-1 border border-border-card bg-[#02091F] hover:bg-red-950 transition-colors z-20"
          aria-label="Close inspector"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2 mb-2 pr-8">
          <span className="px-2 py-0.5 bg-regent-maroon text-white font-pixel text-[10px] uppercase border border-red-950 flex items-center gap-1">
            <Landmark className="w-3 h-3 text-regent-gold" />
            {secret.type === "HERITAGE_LORE"
              ? "SEETHAWAKA HERITAGE"
              : secret.type === "BOTANICAL_NOTE"
              ? "BOTANICAL LANDMARK"
              : "SECRET DISCOVERY"}
          </span>
        </div>

        <h3 className="font-pixel text-lg sm:text-xl font-bold text-white tracking-wide mb-2">
          {secret.title}
        </h3>

        <p className="font-body text-xs sm:text-sm text-text-secondary leading-relaxed mb-4">
          {secret.description}
        </p>

        {secret.rewardXp && (
          <div className="p-2.5 bg-[#02091F] border border-regent-gold/50 flex items-center justify-between text-xs font-pixel">
            <span className="text-regent-gold flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" /> EXPLORATION DISCOVERY
            </span>
            <span className="text-white font-bold">+{secret.rewardXp} XP EARNED</span>
          </div>
        )}
      </RetroCard>
    );
  }

  if (!location) return null;

  const isCompleted = location.status === "COMPLETED";
  const isCurrent = location.status === "CURRENT";
  const isLocked = location.status === "LOCKED";
  const isSevenRealms = location.id === "loc-seven-realms";

  return (
    <RetroCard className="p-4 sm:p-5 bg-gradient-to-b from-[#071331] via-[#05102A] to-[#03091B] border-2 border-regent-blue shadow-retro-card-lg relative">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-3.5 right-3.5 text-text-secondary hover:text-white p-1 border border-border-card bg-[#02091F] hover:bg-red-950 transition-colors z-20"
        aria-label="Close location inspector"
      >
        <X className="w-4 h-4" />
      </button>

      {/* Header Info */}
      <div className="flex items-center gap-2 flex-wrap mb-2 pr-8">
        <span className="px-2 py-0.5 bg-regent-maroon text-white font-pixel text-[10px] uppercase border border-red-950">
          CHAPTER {location.number}
        </span>
        {isCompleted ? (
          <span className="px-2.5 py-0.5 bg-green-950 text-regent-green font-pixel text-[10px] border border-regent-green/50 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> COMPLETED ✓
          </span>
        ) : isCurrent ? (
          <span className="px-2.5 py-0.5 bg-blue-950 text-regent-blue font-pixel text-[10px] border border-regent-blue flex items-center gap-1 animate-pulse">
            <Sparkles className="w-3 h-3 text-regent-gold" /> CURRENT WORLD
          </span>
        ) : (
          <span className="px-2.5 py-0.5 bg-[#1E293B] text-text-muted font-pixel text-[10px] border border-border-card flex items-center gap-1">
            <Lock className="w-3 h-3" /> LOCKED
          </span>
        )}
      </div>

      <h3 className="font-pixel text-lg sm:text-xl font-bold text-white tracking-wide mb-1">
        {location.name}
      </h3>

      <div className="flex items-center gap-1 text-[11px] font-pixel text-text-muted mb-2">
        <MapPin className="w-3 h-3 text-regent-blue shrink-0" />
        <span>{location.regionTitle}</span>
      </div>

      {/* Seethawaka Landmark Heritage Pill */}
      {location.seethawakaInspiration && (
        <div className="mb-3 px-2.5 py-1 bg-[#02091F] border border-regent-gold/40 text-[10px] font-pixel text-regent-gold flex items-center gap-1.5 shadow-sm">
          <Landmark className="w-3.5 h-3.5 text-regent-gold shrink-0" />
          <span className="truncate">Inspired by: {location.seethawakaInspiration}</span>
        </div>
      )}

      {/* Illustrated Location Banner */}
      <div className="relative w-full h-28 sm:h-32 mb-3 border-2 border-border-card bg-[#02091F] overflow-hidden">
        <Image
          src={location.image}
          alt={location.name}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#071331] via-transparent to-transparent" />
        <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-[#02091F]/90 text-[10px] font-pixel text-regent-gold border border-yellow-900/50 flex items-center gap-1">
          <Sparkles className="w-2.5 h-2.5" /> +{location.xpReward} XP REWARD
        </div>
      </div>

      {/* Short Description */}
      <p className="font-body text-xs text-text-secondary leading-relaxed mb-3.5">
        {location.description}
      </p>

      {/* 7 Avenue Sub-Realms Breakdown (For The Seven Realms) */}
      {isSevenRealms && (
        <div className="mb-3.5 space-y-1 bg-[#03091B] p-2.5 border border-border-card">
          <span className="font-pixel text-[10px] text-regent-gold uppercase tracking-wider block mb-1">
            7 Themed Avenue Realms:
          </span>
          <div className="grid grid-cols-1 gap-1 text-[11px]">
            {sevenAvenueRealms.map((realm) => (
              <div
                key={realm.id}
                className="flex items-center justify-between p-1 bg-[#071331] border border-border-card/50"
              >
                <span className="text-white font-pixel text-[10px] font-bold">
                  {realm.realmTitle}
                </span>
                <span className="text-text-muted text-[10px]">{realm.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Progress & Quest Info for Current World */}
      {isCurrent && (
        <div className="mb-3.5 bg-[#02091F] p-2.5 border border-border-card">
          <div className="flex items-center justify-between text-xs font-pixel mb-1">
            <span className="text-regent-blue flex items-center gap-1">
              <BookOpen className="w-3 h-3" /> PROGRESS
            </span>
            <span className="text-white font-bold">
              {location.lessonsCompleted} / {location.lessonsTotal} LESSONS
            </span>
          </div>
          <PixelProgressBar
            progress={(location.lessonsCompleted / location.lessonsTotal) * 100}
            color="blue"
            showLabel={false}
            size="sm"
          />
          {location.nextLesson && (
            <p className="text-[11px] text-text-secondary mt-1.5">
              Next quest: <strong className="text-white">{location.nextLesson}</strong>
            </p>
          )}
        </div>
      )}

      {/* Locked Requirement Notice */}
      {isLocked && location.unlockRequirement && (
        <div className="mb-3.5 p-2 bg-[#02091F] border border-border-card flex items-start gap-2 text-xs text-text-muted">
          <Lock className="w-3.5 h-3.5 text-orange-400 shrink-0 mt-0.5" />
          <span>
            Requirement: <strong className="text-text-secondary">{location.unlockRequirement}</strong>
          </span>
        </div>
      )}

      {/* Actions */}
      <div className="pt-2 border-t border-border-card flex items-center justify-between gap-3">
        {location.badgeReward && (
          <div className="text-[10px] font-pixel text-text-muted flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-regent-gold" />
            <span>Badge: {location.badgeReward}</span>
          </div>
        )}

        {isCurrent ? (
          <RetroButton
            variant="blue"
            size="md"
            href={location.routeHref}
            icon={<ArrowRight className="w-4 h-4" />}
            iconPosition="right"
          >
            CONTINUE JOURNEY
          </RetroButton>
        ) : isCompleted ? (
          <RetroButton
            variant="outline"
            size="sm"
            href={location.routeHref}
          >
            REVISIT REALM
          </RetroButton>
        ) : (
          <RetroButton
            variant="outline"
            size="sm"
            disabled
          >
            LOCKED REALM
          </RetroButton>
        )}
      </div>
    </RetroCard>
  );
}
