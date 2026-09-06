"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShieldCheck, QrCode, KeyRound, Sparkles, CheckCircle2, UserCheck, AlertCircle } from "lucide-react";
import confetti from "canvas-confetti";
import RetroButton from "@/components/ui/RetroButton";
import { CanonicalMission } from "@/data/missionsData";
import { audioManager } from "@/lib/audioManager";

interface OfficerVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  mission: CanonicalMission;
  playerName: string;
  onVerifySuccess: (missionId: string, officerName: string) => void;
}

const VALID_OFFICER_PINS = ["REGENT2026", "SEETHAWAKA", "DISTRICT3220", "SECRETARY", "PRESIDENT"];

export default function OfficerVerificationModal({
  isOpen,
  onClose,
  mission,
  playerName,
  onVerifySuccess,
}: OfficerVerificationModalProps) {
  const [activeTab, setActiveTab] = useState<"qr" | "pin">("pin");
  const [enteredPin, setEnteredPin] = useState("");
  const [officerRole, setOfficerRole] = useState("Club Secretary");
  const [errorMsg, setErrorMsg] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  // Procedural deterministic 11x11 pixel QR-matrix pattern based on mission & player
  const generateQrMatrix = () => {
    const seed = `${mission.id}-${playerName}-RACSR`;
    const matrix: boolean[][] = [];
    for (let r = 0; r < 11; r++) {
      const row: boolean[] = [];
      for (let c = 0; c < 11; c++) {
        // Standard corner detection squares for 11x11
        if (
          (r < 3 && c < 3) ||
          (r < 3 && c > 7) ||
          (r > 7 && c < 3)
        ) {
          row.push(r === 0 || r === 2 || c === 0 || c === 2 || (r === 1 && c === 1) || (r === 9 && c === 1) || (r === 1 && c === 9));
        } else {
          const charCode = seed.charCodeAt((r * 11 + c) % seed.length);
          row.push((charCode + r + c) % 2 === 0);
        }
      }
      matrix.push(row);
    }
    return matrix;
  };

  const qrMatrix = generateQrMatrix();

  const handleVerifyWithPin = () => {
    const cleanPin = enteredPin.trim().toUpperCase();
    if (!cleanPin) {
      setErrorMsg("Please enter the club officer seal passcode.");
      audioManager.playErrorBuzz();
      return;
    }

    if (VALID_OFFICER_PINS.includes(cleanPin)) {
      audioManager.playFanfare();
      audioManager.playCoinDing();
      confetti({
        particleCount: 75,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#FFC719", "#00A859", "#008BD2", "#8A1538"],
      });
      setIsSuccess(true);
      setErrorMsg("");
      setTimeout(() => {
        onVerifySuccess(mission.id, officerRole);
        onClose();
        setIsSuccess(false);
        setEnteredPin("");
      }, 1600);
    } else {
      audioManager.playErrorBuzz();
      setErrorMsg("Invalid Officer Key. (Club Officers can enter 'REGENT2026' to verify)");
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm select-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-md bg-[#071331] border-4 border-regent-gold shadow-[0_0_35px_rgba(255,199,25,0.25)] p-5 sm:p-6"
        >
          {/* Ornate Corner Rivets */}
          <div className="absolute top-2 left-2 w-2.5 h-2.5 border-t-2 border-l-2 border-regent-gold pointer-events-none" />
          <div className="absolute top-2 right-2 w-2.5 h-2.5 border-t-2 border-r-2 border-regent-gold pointer-events-none" />
          <div className="absolute bottom-2 left-2 w-2.5 h-2.5 border-b-2 border-l-2 border-regent-gold pointer-events-none" />
          <div className="absolute bottom-2 right-2 w-2.5 h-2.5 border-b-2 border-r-2 border-regent-gold pointer-events-none" />

          {/* Close button */}
          <button
            onClick={() => {
              audioManager.playTap();
              onClose();
            }}
            className="absolute top-3 right-3 p-1 text-slate-400 hover:text-white border border-border-card bg-[#02091F] hover:bg-red-950 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Modal Header */}
          <div className="text-center pb-3 border-b border-border-card mb-4">
            <div className="inline-flex p-2 bg-amber-950/80 border-2 border-regent-gold text-regent-gold mb-2 shadow-sm">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h2 className="font-pixel text-lg sm:text-xl font-bold text-white tracking-wide">
              PHYSICAL MISSION SEAL
            </h2>
            <p className="font-serif text-xs text-text-secondary mt-1">
              Verify attendance for <span className="text-regent-gold font-semibold">{playerName}</span>
            </p>
          </div>

          {/* Tab Switcher */}
          <div className="grid grid-cols-2 gap-2 mb-4">
            <button
              onClick={() => {
                audioManager.playTap();
                setActiveTab("pin");
                setErrorMsg("");
              }}
              className={`py-2 px-3 font-pixel text-xs flex items-center justify-center gap-1.5 border transition-all ${
                activeTab === "pin"
                  ? "border-regent-gold bg-amber-950/60 text-white font-bold shadow-[0_2px_0_#b45309]"
                  : "border-border-card bg-[#030B24] text-text-muted hover:text-white"
              }`}
            >
              <KeyRound className="w-3.5 h-3.5 text-regent-gold" />
              OFFICER PASSCODE
            </button>
            <button
              onClick={() => {
                audioManager.playTap();
                setActiveTab("qr");
                setErrorMsg("");
              }}
              className={`py-2 px-3 font-pixel text-xs flex items-center justify-center gap-1.5 border transition-all ${
                activeTab === "qr"
                  ? "border-regent-blue bg-blue-950/60 text-white font-bold shadow-[0_2px_0_#0284c7]"
                  : "border-border-card bg-[#030B24] text-text-muted hover:text-white"
              }`}
            >
              <QrCode className="w-3.5 h-3.5 text-regent-blue" />
              EXPLORER QR SEAL
            </button>
          </div>

          {/* Mission Info Card */}
          <div className="p-3 bg-[#03091A] border border-border-card mb-4">
            <div className="flex items-center justify-between text-[10px] font-pixel text-text-muted uppercase mb-1">
              <span>{mission.type}</span>
              <span className="text-regent-gold">+{mission.rewardXp} XP</span>
            </div>
            <h4 className="font-pixel text-xs sm:text-sm font-bold text-white truncate">
              {mission.title}
            </h4>
            <p className="text-[11px] font-serif text-text-secondary line-clamp-1 mt-0.5">
              {mission.tagline}
            </p>
          </div>

          {/* TAB 1: OFFICER PIN VERIFICATION */}
          {activeTab === "pin" && (
            <div className="space-y-3">
              <div>
                <label className="block font-pixel text-[10px] text-text-muted uppercase mb-1">
                  Verifying Officer Role
                </label>
                <select
                  value={officerRole}
                  onChange={(e) => setOfficerRole(e.target.value)}
                  className="w-full bg-[#02091F] border border-border-card text-white font-pixel text-xs p-2 focus:border-regent-gold outline-none"
                >
                  <option value="Club Secretary">Club Secretary</option>
                  <option value="Club President">Club President</option>
                  <option value="Project Chairperson">Project Chairperson</option>
                  <option value="VP Membership & Service">VP Membership & Service</option>
                  <option value="Executive Board Member">Executive Board Member</option>
                </select>
              </div>

              <div>
                <label className="block font-pixel text-[10px] text-text-muted uppercase mb-1">
                  Officer Seal Passcode
                </label>
                <div className="relative">
                  <input
                    type="password"
                    value={enteredPin}
                    onChange={(e) => {
                      setEnteredPin(e.target.value);
                      setErrorMsg("");
                    }}
                    placeholder="Enter club officer passcode..."
                    className="w-full bg-[#02091F] border border-border-card text-white font-mono text-sm tracking-widest p-2.5 pr-8 focus:border-regent-gold outline-none uppercase placeholder:text-slate-600 placeholder:tracking-normal placeholder:font-serif placeholder:text-xs"
                  />
                  <KeyRound className="w-4 h-4 text-slate-500 absolute right-2.5 top-3 pointer-events-none" />
                </div>
              </div>

              {errorMsg && (
                <div className="p-2 bg-red-950/80 border border-red-800 text-red-200 text-xs font-serif flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {isSuccess ? (
                <div className="p-3 bg-green-950/90 border border-regent-green text-regent-green text-center font-pixel text-xs flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  VERIFICATION CONFIRMED! (+{mission.rewardXp} XP)
                </div>
              ) : (
                <RetroButton
                  variant="yellow"
                  className="w-full justify-center text-xs sm:text-sm mt-1"
                  onClick={handleVerifyWithPin}
                >
                  <UserCheck className="w-4 h-4" /> CONFIRM VERIFICATION
                </RetroButton>
              )}

              <p className="text-[10px] font-pixel text-slate-500 text-center uppercase tracking-wider">
                Official RACSR Attendance Ledger • District 3220
              </p>
            </div>
          )}

          {/* TAB 2: EXPLORER QR SEAL */}
          {activeTab === "qr" && (
            <div className="flex flex-col items-center text-center space-y-3">
              {/* 16-Bit Pixelated QR Matrix Grid */}
              <div className="p-3.5 bg-white border-4 border-[#02091F] shadow-[0_0_20px_rgba(255,255,255,0.15)] inline-block">
                <div
                  className="grid gap-[2px] bg-black p-1"
                  style={{ gridTemplateColumns: "repeat(11, 14px)", gridTemplateRows: "repeat(11, 14px)" }}
                >
                  {qrMatrix.map((row, rIdx) =>
                    row.map((cell, cIdx) => (
                      <div
                        key={`${rIdx}-${cIdx}`}
                        className={`w-3.5 h-3.5 ${cell ? "bg-black" : "bg-white"}`}
                      />
                    ))
                  )}
                </div>
              </div>

              <div className="space-y-1">
                <span className="font-pixel text-[10px] text-regent-gold block uppercase font-bold">
                  TOKEN: RACSR-{mission.id.slice(0, 8).toUpperCase()}-{playerName.toUpperCase()}
                </span>
                <p className="text-xs font-serif text-text-secondary max-w-xs">
                  Present this QR token to the Club Secretary or project lead during the physical meeting to be verified.
                </p>
              </div>

              <RetroButton
                variant="outline"
                size="sm"
                className="text-[11px]"
                onClick={() => {
                  audioManager.playTap();
                  setActiveTab("pin");
                }}
              >
                SWITCH TO MANUAL PIN ENTRY
              </RetroButton>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
