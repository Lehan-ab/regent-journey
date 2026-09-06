"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Target, Sparkles, Clock, MapPin, CheckCircle2, ShieldCheck, QrCode } from "lucide-react";
import RetroCard from "@/components/ui/RetroCard";
import RetroButton from "@/components/ui/RetroButton";
import { usePlayer } from "@/context/PlayerContext";
import { CANONICAL_MISSIONS, CanonicalMission } from "@/data/missionsData";
import OfficerVerificationModal from "@/components/missions/OfficerVerificationModal";

export default function MissionsPage() {
  const { player, isHydrated, enrollMission, verifyMission } = usePlayer();
  const [activeVerifyMission, setActiveVerifyMission] = useState<CanonicalMission | null>(null);

  const totalAvailableXp = CANONICAL_MISSIONS.reduce((acc, m) => acc + m.rewardXp, 0);

  const meetingsVerified = isHydrated ? player.membership?.meetingsVerified || 0 : 0;
  const projectsVerified = isHydrated ? player.membership?.projectsVerified || 0 : 0;
  const isBoardReady = isHydrated && player.membership?.eligibleForBoardReview;

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 pt-4 sm:pt-6 pb-12">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-border-card mb-6">
        <Link
          href="/home"
          className="flex items-center gap-2 font-pixel text-xs text-regent-blue hover:underline"
        >
          <ArrowLeft className="w-4 h-4" /> BACK TO REALM MAP
        </Link>
        <span className="font-pixel text-xs text-regent-gold">
          +{totalAvailableXp} XP AVAILABLE
        </span>
      </div>

      <div className="text-center max-w-xl mx-auto mb-6">
        <div className="inline-flex p-3 bg-green-950 border-2 border-regent-green mb-3 shadow-retro-card">
          <Target className="w-7 h-7 text-regent-green" />
        </div>
        <h1 className="font-pixel text-2xl sm:text-3xl font-bold text-white tracking-wide">
          REGENT MISSIONS & QUESTS
        </h1>
        <p className="text-xs sm:text-sm text-text-secondary mt-2 leading-relaxed">
          Participate in physical club assemblies, hands-on community projects, and fellowship activities to turn knowledge into real-world action.
        </p>
      </div>

      {/* Board Review Readiness Tracker */}
      <div className="p-4 bg-[#050F2D] border-2 border-border-card mb-8 shadow-retro-card">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-border-card/60">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-regent-gold" />
            <span className="font-pixel text-xs sm:text-sm font-bold text-white uppercase tracking-wider">
              FIELD INDUCTION PROGRESSION (IMPACT FRONTIER)
            </span>
          </div>
          <span className={`font-pixel text-[10px] px-2 py-0.5 border ${
            isBoardReady
              ? "bg-green-950 text-regent-green border-green-700 font-bold animate-pulse"
              : "bg-[#02091F] text-slate-400 border-border-card"
          }`}>
            {isBoardReady ? "★ READY FOR BOARD REVIEW" : "IN PROGRESS"}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-3">
          <div className="bg-[#02091F] p-2.5 border border-border-card/80 text-center">
            <span className="font-pixel text-[9px] text-text-muted block uppercase mb-0.5">
              Verified Meetings
            </span>
            <span className="font-pixel text-base font-bold text-regent-blue">
              {meetingsVerified} / 2
            </span>
          </div>
          <div className="bg-[#02091F] p-2.5 border border-border-card/80 text-center">
            <span className="font-pixel text-[9px] text-text-muted block uppercase mb-0.5">
              Verified Projects
            </span>
            <span className="font-pixel text-base font-bold text-regent-green">
              {projectsVerified} / 2
            </span>
          </div>
          <div className="col-span-2 sm:col-span-1 bg-[#02091F] p-2.5 border border-border-card/80 text-center">
            <span className="font-pixel text-[9px] text-text-muted block uppercase mb-0.5">
              Induction Status
            </span>
            <span className="font-pixel text-xs font-bold text-regent-gold block truncate">
              {isBoardReady ? "ELIGIBLE" : "PENDING CRITERIA"}
            </span>
          </div>
        </div>
      </div>

      {/* Missions Grid */}
      <div className="space-y-4">
        {CANONICAL_MISSIONS.map((mission) => {
          const isVerified = isHydrated && player.missions?.verified?.includes(mission.id);
          const isEnrolled = isHydrated && player.missions?.enrolled?.includes(mission.id);

          return (
            <RetroCard key={mission.id} className="p-4 sm:p-5 bg-[#071331]">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-2 py-0.5 bg-regent-maroon text-white font-pixel text-[9px] uppercase border border-red-950 font-bold">
                      {mission.type}
                    </span>
                    {isVerified ? (
                      <span className="px-2 py-0.5 bg-green-950 text-regent-green font-pixel text-[9px] border border-green-800 font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> VERIFIED
                      </span>
                    ) : isEnrolled ? (
                      <span className="px-2 py-0.5 bg-blue-950 text-regent-blue font-pixel text-[9px] border border-blue-800 font-bold">
                        ENROLLED
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 bg-regent-blue/20 text-regent-blue font-pixel text-[9px] border border-regent-blue/50">
                        {mission.status}
                      </span>
                    )}
                    <span className="text-[10px] font-pixel text-text-muted flex items-center gap-1">
                      <Clock className="w-3 h-3 text-regent-gold" /> {mission.date}
                    </span>
                  </div>

                  <h3 className="font-pixel text-base sm:text-lg font-bold text-white tracking-wide truncate">
                    {mission.title}
                  </h3>
                  <p className="font-body text-xs sm:text-sm text-text-secondary leading-relaxed">
                    {mission.tagline}
                  </p>

                  <div className="flex items-center gap-1.5 text-[11px] text-text-muted pt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-red-400 shrink-0" />
                    <span className="truncate">{mission.location || "Seethawaka / Hybrid"}</span>
                  </div>
                </div>

                <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2.5 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-border-card">
                  <div className="flex items-center gap-1.5 font-pixel text-xs sm:text-sm font-bold text-regent-gold bg-[#02091F] px-2.5 py-1 border border-border-card">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>+{mission.rewardXp} XP</span>
                  </div>

                  {isVerified ? (
                    <RetroButton variant="green" size="sm" disabled>
                      COMPLETED & VERIFIED
                    </RetroButton>
                  ) : isEnrolled ? (
                    <RetroButton
                      variant="yellow"
                      size="sm"
                      onClick={() => setActiveVerifyMission(mission)}
                      className="flex items-center gap-1.5"
                    >
                      <QrCode className="w-3.5 h-3.5" /> OFFICER VERIFY
                    </RetroButton>
                  ) : (
                    <RetroButton
                      variant="green"
                      size="sm"
                      onClick={() => enrollMission(mission.id)}
                    >
                      ENROLL IN MISSION
                    </RetroButton>
                  )}
                </div>
              </div>
            </RetroCard>
          );
        })}
      </div>

      {/* Officer Verification Modal */}
      {activeVerifyMission && (
        <OfficerVerificationModal
          isOpen={true}
          onClose={() => setActiveVerifyMission(null)}
          mission={activeVerifyMission}
          playerName={isHydrated ? player.name : "TRAVELLER"}
          onVerifySuccess={(missionId, officerName) => {
            verifyMission(missionId, officerName);
          }}
        />
      )}
    </div>
  );
}
