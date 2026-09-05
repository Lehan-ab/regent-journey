"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  BookOpen,
  Search,
  Compass,
  Sparkles,
  Shield,
  Cpu,
  Database,
  Scale,
  Users,
  Lock,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Layers,
} from "lucide-react";
import RetroCard from "@/components/ui/RetroCard";
import RetroButton from "@/components/ui/RetroButton";
import { CODEX_ARTICLES, CODEX_SECTIONS, CodexArticle } from "@/data/codexData";

const SECTION_ICONS: Record<string, React.ReactNode> = {
  all: <BookOpen className="w-3.5 h-3.5" />,
  START_HERE: <Compass className="w-3.5 h-3.5" />,
  AVENUES: <Sparkles className="w-3.5 h-3.5" />,
  CONDUCT: <Shield className="w-3.5 h-3.5" />,
  DIGITAL_AI: <Cpu className="w-3.5 h-3.5" />,
  SECRETARIAT_RMIS: <Database className="w-3.5 h-3.5" />,
  TREASURY: <Scale className="w-3.5 h-3.5" />,
  MEMBERSHIP: <Users className="w-3.5 h-3.5" />,
  OFFICER_ARCHIVE: <Lock className="w-3.5 h-3.5" />,
};

export default function RegentCodexPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [expandedArticles, setExpandedArticles] = useState<Record<string, boolean>>({
    "codex-spirit-2026": true,
    "codex-eleven-avenues-overview": true,
  });

  const toggleArticle = (id: string) => {
    setExpandedArticles((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredArticles = useMemo(() => {
    return CODEX_ARTICLES.filter((art) => {
      const matchesCategory =
        selectedCategory === "all" || art.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        art.title.toLowerCase().includes(q) ||
        art.summary.toLowerCase().includes(q) ||
        art.contentParagraphs.some((p) => p.toLowerCase().includes(q)) ||
        art.keyPrinciples?.some((kp) => kp.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 pt-4 sm:pt-6 pb-16">
      {/* Top Breadcrumb Navigation */}
      <div className="flex items-center justify-between pb-3 border-b border-[#3D2612] mb-6">
        <Link
          href="/journey"
          className="flex items-center gap-2 font-pixel text-xs text-regent-blue hover:underline"
        >
          <ArrowLeft className="w-4 h-4" /> BACK TO ADVENTURE PATH
        </Link>
        <span className="font-pixel text-xs text-regent-gold uppercase">
          REFERENCE ARCHIVE • RID 3220
        </span>
      </div>

      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto mb-8">
        <div className="inline-flex p-3 bg-[#120703] border-2 border-regent-gold mb-3 shadow-[0_0_20px_rgba(255,199,25,0.2)]">
          <BookOpen className="w-7 h-7 text-regent-gold animate-bounce-slight" />
        </div>
        <h1 className="font-pixel text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-wide">
          THE REGENT CODEX
        </h1>
        <p className="font-serif text-xs sm:text-sm text-[#D1C2B0] mt-2 leading-relaxed">
          Comprehensive, handbook-grounded reference library for Rotaract Club of Seethawaka Regent.
          While the Journey offers a story-driven learning quest, the Codex houses deep operational procedures,
          the 11 Avenue blueprints, digital ethics, and District 3220 governance archives.
        </p>
      </div>

      {/* Search & Filter Controls */}
      <div className="mb-8 space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-regent-gold" />
          <input
            type="text"
            placeholder="Search articles, avenue guidelines, RMIS terms, or governance standards..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-[#0C0603] border-2 border-[#3D2612] text-xs sm:text-sm text-white placeholder-[#8B735F] focus:border-regent-gold focus:outline-none transition-all"
          />
        </div>

        {/* Section Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-thin">
          {CODEX_SECTIONS.map((sec) => {
            const isSelected = selectedCategory === sec.id;
            return (
              <button
                key={sec.id}
                onClick={() => setSelectedCategory(sec.id)}
                className={`px-3 py-1.5 border text-xs font-pixel whitespace-nowrap flex items-center gap-1.5 transition-all ${
                  isSelected
                    ? "bg-regent-maroon border-regent-gold text-regent-gold font-bold shadow-md"
                    : "bg-[#100703] border-[#3D2612] text-[#A48871] hover:text-white hover:border-[#6B4223]"
                }`}
              >
                {SECTION_ICONS[sec.id] || <BookOpen className="w-3.5 h-3.5" />}
                <span>{sec.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Articles Count Status */}
      <div className="flex items-center justify-between text-xs font-pixel text-[#8B735F] mb-4 pb-2 border-b border-[#3D2612]/60">
        <span>SHOWING {filteredArticles.length} CODEX ENTRIES</span>
        <span>ROTARACT INFORMATION HANDBOOK 2026–27</span>
      </div>

      {/* Articles Stream */}
      <div className="space-y-5">
        {filteredArticles.length === 0 ? (
          <div className="p-8 text-center bg-[#0C0603] border-2 border-[#3D2612]">
            <p className="font-pixel text-sm text-regent-gold mb-1">NO CODEX RECORDS FOUND</p>
            <p className="font-serif text-xs text-[#A48871]">
              Try adjusting your search terms or clearing the category filter.
            </p>
          </div>
        ) : (
          filteredArticles.map((article: CodexArticle) => {
            const isExpanded = !!expandedArticles[article.id];
            const isSourceRequired = article.badgeLabel === "SOURCE REQUIRED";
            const isOfficer = article.category === "OFFICER_ARCHIVE";

            return (
              <div
                key={article.id}
                className="border-2 border-[#3D2612] bg-[#0A0503] shadow-lg transition-all"
              >
                {/* Article Header Card */}
                <div
                  onClick={() => toggleArticle(article.id)}
                  className="p-4 sm:p-5 flex items-start justify-between gap-3 cursor-pointer hover:bg-[#120703] transition-all"
                >
                  <div className="space-y-1.5 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span
                        className={`text-[9px] font-pixel px-2 py-0.5 border font-bold ${
                          isSourceRequired
                            ? "bg-amber-950/80 text-yellow-300 border-amber-600"
                            : isOfficer
                            ? "bg-purple-950/80 text-purple-300 border-purple-700"
                            : article.badgeLabel.includes("PRIMARY")
                            ? "bg-indigo-950/80 text-cyan-300 border-indigo-600"
                            : "bg-[#1A0C06] text-regent-gold border-[#5A351C]"
                        }`}
                      >
                        {article.badgeLabel}
                      </span>
                      <span className="text-[10px] font-serif text-[#8B735F] italic truncate">
                        {article.sourceCitation}
                      </span>
                    </div>

                    <h2 className="font-pixel text-sm sm:text-base md:text-lg text-white font-bold leading-snug">
                      {article.title}
                    </h2>

                    <p className="font-serif text-xs sm:text-sm text-[#C9B9A6] leading-relaxed">
                      {article.summary}
                    </p>
                  </div>

                  <button
                    className="p-1.5 border border-[#3D2612] text-regent-gold hover:border-regent-gold shrink-0 mt-1"
                    aria-label="Toggle article contents"
                  >
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </button>
                </div>

                {/* Expanded Article Body */}
                {isExpanded && (
                  <div className="px-4 sm:px-5 pb-5 pt-2 border-t border-[#24130A] bg-[#0E0604] space-y-4">
                    {/* Status Notice (if any) */}
                    {article.statusNotice && (
                      <div className="p-2.5 bg-amber-950/50 border border-amber-600/80 text-xs font-serif text-yellow-200">
                        <strong>Status Notice:</strong> {article.statusNotice}
                      </div>
                    )}

                    {/* Content Paragraphs */}
                    <div className="space-y-2 text-xs sm:text-sm font-serif text-[#E2D6C8] leading-relaxed">
                      {article.contentParagraphs.map((p, pIdx) => (
                        <p key={pIdx}>{p}</p>
                      ))}
                    </div>

                    {/* Key Principles Callout */}
                    {article.keyPrinciples && article.keyPrinciples.length > 0 && (
                      <div className="p-3 bg-[#150904] border border-[#4D2810]">
                        <div className="text-[10px] font-pixel text-regent-gold uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-regent-gold" />
                          <span>Core Codex Principles:</span>
                        </div>
                        <ul className="space-y-1 list-disc list-inside text-xs font-serif text-[#DDD]">
                          {article.keyPrinciples.map((kp, kpIdx) => (
                            <li key={kpIdx} className="leading-normal">
                              {kp}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Operational Notes (For officer guides, etc.) */}
                    {article.operationalNotes && article.operationalNotes.length > 0 && (
                      <div className="p-3 bg-[#0B151A] border border-cyan-900/60">
                        <div className="text-[10px] font-pixel text-cyan-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                          <Layers className="w-3.5 h-3.5 text-cyan-400" />
                          <span>Operational Execution Notes:</span>
                        </div>
                        <ul className="space-y-1 list-disc list-inside text-xs font-serif text-cyan-100">
                          {article.operationalNotes.map((note, nIdx) => (
                            <li key={nIdx} className="leading-normal">
                              {note}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Footer Navigation */}
      <div className="mt-12 pt-6 border-t border-[#3D2612] flex flex-col sm:flex-row items-center justify-between gap-4">
        <RetroButton variant="outline" href="/journey">
          ← RETURN TO ADVENTURE PATH
        </RetroButton>

        <RetroButton variant="yellow" href="/home">
          HOME CITADEL →
        </RetroButton>
      </div>
    </div>
  );
}
