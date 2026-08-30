"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Bell, Menu, X, Compass, Shield, Award, User, Flame } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { mockUser } from "@/data/mockUserData";

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showNotificationToast, setShowNotificationToast] = useState(false);

  const isStartScreen = pathname === "/";

  const navLinks = [
    { label: "Home", href: "/home" },
    { label: "Journey", href: "/journey" },
    { label: "Missions", href: "/missions" },
    { label: "Achievements", href: "/achievements" },
    { label: "Profile", href: "/profile" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#02091F]/95 backdrop-blur border-b-2 border-border-card">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Left: Brand Icon + Title */}
        <Link href={isStartScreen ? "/" : "/home"} className="flex items-center gap-2.5 group">
          {/* Custom Regent Crest Emblem */}
          <div className="relative w-9 h-9 bg-regent-maroon border-2 border-regent-gold flex items-center justify-center shadow-[0_2px_0_#400000] group-hover:scale-105 transition-transform">
            <span className="font-pixel-heading text-regent-gold text-sm font-bold">R</span>
            <div className="absolute top-0.5 left-0.5 w-1 h-1 bg-regent-gold" />
            <div className="absolute bottom-0.5 right-0.5 w-1 h-1 bg-regent-gold" />
          </div>

          <div className="flex flex-col">
            <span className="font-pixel font-bold text-base sm:text-lg text-white tracking-wide group-hover:text-regent-blue transition-colors">
              REGENT JOURNEY
            </span>
            <span className="text-[10px] text-text-muted hidden sm:inline-block -mt-1 tracking-wider uppercase">
              RAC Seethawaka Regent
            </span>
          </div>
        </Link>

        {/* Start Screen Simplified Navigation */}
        {isStartScreen ? (
          <div className="flex items-center gap-3">
            <Link
              href="/home"
              className="px-4 py-2 bg-regent-blue hover:bg-blue-400 text-[#02091F] font-pixel text-xs font-bold uppercase tracking-wider border-2 border-[#0c5784] shadow-retro-blue transition-all"
            >
              ENTER REALM →
            </Link>
          </div>
        ) : (
          <>
            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1.5 lg:gap-2">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-3.5 py-1.5 font-pixel text-xs tracking-wider uppercase transition-all duration-150 border-2 ${
                      isActive
                        ? "bg-[#071331] text-regent-blue border-regent-blue shadow-[0_2px_0_#0c5784]"
                        : "text-text-secondary border-transparent hover:text-white hover:border-border-card hover:bg-background-card/50"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* Right: Actions */}
            <div className="flex items-center gap-2 sm:gap-2.5">
              {/* Streak Indicator */}
              <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 bg-[#071331] border-2 border-border-card text-xs font-pixel">
                <Flame className="w-3.5 h-3.5 text-orange-400 fill-orange-400" />
                <span className="text-white font-bold">{mockUser.streak}</span>
              </div>

              {/* Notifications Button */}
              <div className="relative">
                <button
                  onClick={() => setShowNotificationToast(!showNotificationToast)}
                  className="p-2 bg-[#071331] border-2 border-border-card text-text-secondary hover:text-white hover:border-border-cardHighlight transition-colors relative"
                  aria-label="Notifications"
                >
                  <Bell className="w-4 h-4" />
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-regent-blue rounded-full" />
                </button>

                {/* Notification Dropdown */}
                <AnimatePresence>
                  {showNotificationToast && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 mt-2 w-72 bg-background-card border-2 border-border-card p-3 shadow-retro-card z-50 text-xs"
                    >
                      <div className="flex items-center justify-between pb-2 mb-2 border-b border-border-card">
                        <span className="font-pixel font-bold text-regent-gold">
                          DIRECTIVES
                        </span>
                        <button
                          onClick={() => setShowNotificationToast(false)}
                          className="text-text-secondary hover:text-white"
                        >
                          ✕
                        </button>
                      </div>
                      <div className="space-y-2">
                        <div className="p-2 bg-[#02091F] border border-border-card">
                          <p className="text-white font-medium">Chapter 1 in Progress</p>
                          <p className="text-[11px] text-text-secondary mt-0.5">
                            You are at Rotary Roots! Complete &ldquo;Service Above Self&rdquo; to unlock Rotaract Harbor.
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Mobile Menu Toggle Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 bg-[#071331] border-2 border-border-card text-text-secondary hover:text-white hover:border-border-cardHighlight transition-colors"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </button>
            </div>
          </>
        )}
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && !isStartScreen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#050F2D] border-b-2 border-border-card px-4 py-4 space-y-2"
          >
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-3 py-2 font-pixel text-xs tracking-wider uppercase border-2 ${
                    isActive
                      ? "bg-[#071331] text-regent-blue border-regent-blue shadow-[0_2px_0_#0c5784]"
                      : "text-text-secondary border-border-card/50 hover:text-white hover:bg-background-card"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
