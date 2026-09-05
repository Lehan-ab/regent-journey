import re

path = "src/app/journey/[chapterId]/page.tsx"
with open(path, "r", encoding="utf-8") as f:
    content = f.read()

# 1. Update imports
old_import = 'import CompanionGuidanceModal from "@/components/story/CompanionGuidanceModal";'
new_import = '''import CompanionGuidanceModal from "@/components/story/CompanionGuidanceModal";
import ChapterIntroCinematic from "@/components/story/ChapterIntroCinematic";
import ChapterCompletionCinematic from "@/components/story/ChapterCompletionCinematic";
import { getNPCForChapter } from "@/data/npcRegistry";'''
content = content.replace(old_import, new_import, 1)

# 2. Add TRIAL_SKINS before the component
trial_skins_code = '''
interface TrialSkin {
  containerBorder: string;
  containerBg: string;
  themeText: string;
  tokenIcon: string;
  tokenLabel: string;
  buttonActive: string;
  badgeStyle: string;
}

const TRIAL_SKINS: Record<string, TrialSkin> = {
  "loc-gateway": {
    containerBorder: "border-amber-600",
    containerBg: "bg-gradient-to-b from-[#180C04] via-[#100702] to-[#0A0502]",
    themeText: "text-amber-400",
    tokenIcon: "✦",
    tokenLabel: "STONE SEAL TRIAL",
    buttonActive: "border-amber-400 bg-amber-950/70 text-amber-100",
    badgeStyle: "bg-amber-950 text-amber-300 border-amber-500",
  },
  "loc-rotary-roots": {
    containerBorder: "border-emerald-600",
    containerBg: "bg-gradient-to-b from-[#041A0E] via-[#03130A] to-[#020D07]",
    themeText: "text-emerald-400",
    tokenIcon: "🌿",
    tokenLabel: "LEAF TABLET TRIAL",
    buttonActive: "border-emerald-400 bg-emerald-950/70 text-emerald-100",
    badgeStyle: "bg-emerald-950 text-emerald-300 border-emerald-500",
  },
  "loc-rotaract-harbor": {
    containerBorder: "border-cyan-600",
    containerBg: "bg-gradient-to-b from-[#041624] via-[#03101A] to-[#020B12]",
    themeText: "text-cyan-400",
    tokenIcon: "⚓",
    tokenLabel: "NAVIGATION TOKEN TRIAL",
    buttonActive: "border-cyan-400 bg-cyan-950/70 text-cyan-100",
    badgeStyle: "bg-cyan-950 text-cyan-300 border-cyan-500",
  },
  "loc-regent-keep": {
    containerBorder: "border-orange-600",
    containerBg: "bg-gradient-to-b from-[#1C0A04] via-[#140702] to-[#0D0502]",
    themeText: "text-orange-400",
    tokenIcon: "🔥",
    tokenLabel: "COUNCIL CARD TRIAL",
    buttonActive: "border-orange-400 bg-orange-950/70 text-orange-100",
    badgeStyle: "bg-orange-950 text-orange-300 border-orange-500",
  },
  "loc-seven-realms": {
    containerBorder: "border-indigo-600",
    containerBg: "bg-gradient-to-b from-[#0E0824] via-[#090518] to-[#060312]",
    themeText: "text-indigo-300",
    tokenIcon: "✦",
    tokenLabel: "CONSTELLATION NODE TRIAL",
    buttonActive: "border-indigo-400 bg-indigo-950/70 text-indigo-100",
    badgeStyle: "bg-indigo-950 text-indigo-300 border-indigo-500",
  },
  "loc-project-forge": {
    containerBorder: "border-amber-500",
    containerBg: "bg-gradient-to-b from-[#1C0D03] via-[#140902] to-[#0D0601]",
    themeText: "text-amber-400",
    tokenIcon: "⚒",
    tokenLabel: "BLUEPRINT PIECE TRIAL",
    buttonActive: "border-amber-400 bg-amber-950/70 text-amber-100",
    badgeStyle: "bg-amber-950 text-amber-300 border-amber-500",
  },
  "loc-codewood": {
    containerBorder: "border-teal-600",
    containerBg: "bg-gradient-to-b from-[#041816] via-[#031110] to-[#020D0C]",
    themeText: "text-teal-300",
    tokenIcon: "ᚱ",
    tokenLabel: "RUNE STONE TRIAL",
    buttonActive: "border-teal-400 bg-teal-950/70 text-teal-100",
    badgeStyle: "bg-teal-950 text-teal-300 border-teal-500",
  },
  "loc-grand-archive": {
    containerBorder: "border-purple-600",
    containerBg: "bg-gradient-to-b from-[#160822] via-[#0F0518] to-[#0A0310]",
    themeText: "text-purple-300",
    tokenIcon: "📜",
    tokenLabel: "LEDGER / INDEX CARD TRIAL",
    buttonActive: "border-purple-400 bg-purple-950/70 text-purple-100",
    badgeStyle: "bg-purple-950 text-purple-300 border-purple-500",
  },
  "loc-impact-frontier": {
    containerBorder: "border-emerald-600",
    containerBg: "bg-gradient-to-b from-[#041A12] via-[#03120D] to-[#020F0A]",
    themeText: "text-emerald-300",
    tokenIcon: "📍",
    tokenLabel: "MISSION PIN TRIAL",
    buttonActive: "border-emerald-400 bg-emerald-950/70 text-emerald-100",
    badgeStyle: "bg-emerald-950 text-emerald-300 border-emerald-500",
  },
  "loc-membership-citadel": {
    containerBorder: "border-yellow-500",
    containerBg: "bg-gradient-to-b from-[#201504] via-[#160E02] to-[#0E0902]",
    themeText: "text-yellow-400",
    tokenIcon: "⚜",
    tokenLabel: "CEREMONIAL SEAL TRIAL",
    buttonActive: "border-yellow-400 bg-yellow-950/70 text-yellow-100",
    badgeStyle: "bg-yellow-950 text-yellow-300 border-yellow-500",
  },
};
'''

content = content.replace("export default function ChapterQuestReaderPage() {", trial_skins_code + "\nexport default function ChapterQuestReaderPage() {", 1)

with open(path, "w", encoding="utf-8") as f:
    f.write(content)

print("Added imports and TRIAL_SKINS successfully")
