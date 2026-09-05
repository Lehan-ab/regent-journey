with open("src/app/journey/[chapterId]/page.tsx", "r", encoding="utf-8") as f:
    content = f.read()

# 1. Add cinematic states inside ChapterQuestReaderPage
state_target = """  // Reset quiz state when switching lessons
  useEffect(() => {
    setSelectedOptionId(null);
    setIsAnswerChecked(false);
    setIsCorrect(false);
  }, [activeLessonId]);"""

new_states = """  // Reset quiz state when switching lessons
  useEffect(() => {
    setSelectedOptionId(null);
    setIsAnswerChecked(false);
    setIsCorrect(false);
  }, [activeLessonId]);

  // Cinematic States
  const [showIntroCinematic, setShowIntroCinematic] = useState<boolean>(false);
  const [showCompletionCinematic, setShowCompletionCinematic] = useState<boolean>(false);
  const [completionCinematicData, setCompletionCinematicData] = useState<{
    xpAwarded: number;
    badgeTitle?: string;
    nextChapterId?: string;
    nextChapterTitle?: string;
  }>({ xpAwarded: 0 });

  // Auto-play Chapter Intro once per session when entering chapter
  useEffect(() => {
    if (!chapter) return;
    const storageKey = `seen_intro_${chapter.id}`;
    const seen = typeof window !== "undefined" ? sessionStorage.getItem(storageKey) : null;
    if (!seen) {
      setShowIntroCinematic(true);
      if (typeof window !== "undefined") {
        sessionStorage.setItem(storageKey, "true");
      }
    }
  }, [chapter?.id]);"""

content = content.replace(state_target, new_states, 1)

# 2. Update handleCheckAnswer to also trigger ChapterCompletionCinematic when finishing chapter
completion_target = """      // Trigger automatic guidance modal
      if (res.chapterCompleted || isLastLesson) {
        const currentIdxInRealms = realmLocations.findIndex((r) => r.id === chapter.id);
        const nextLoc = realmLocations[currentIdxInRealms + 1] || realmLocations[0];
        setGuidanceConfig({
          isOpen: true,
          type: "chapter",
          currentTitle: chapter.worldName,
          nextTitle: nextLoc.worldName,
          xpAwarded: activeLesson.xpReward + chapter.xpReward,
          badgeUnlockedTitle: res.badgeUnlocked?.title || chapter.badgeReward,
          nextChapterId: nextLoc.id,
        });
      }"""

new_completion = """      // Trigger automatic guidance modal & completion cinematic
      if (res.chapterCompleted || isLastLesson) {
        const currentIdxInRealms = realmLocations.findIndex((r) => r.id === chapter.id);
        const nextLoc = realmLocations[currentIdxInRealms + 1] || realmLocations[0];
        setCompletionCinematicData({
          xpAwarded: activeLesson.xpReward + chapter.xpReward,
          badgeTitle: res.badgeUnlocked?.title || chapter.badgeReward,
          nextChapterId: nextLoc.id,
          nextChapterTitle: nextLoc.worldName,
        });
        setShowCompletionCinematic(true);
      }"""

content = content.replace(completion_target, new_completion, 1)

# 3. Add Replay Intro button in the Top Badges bar
replay_target = """            <div className="px-2 py-0.5 bg-[#0A0503]/90 text-regent-gold font-pixel text-[10px] sm:text-xs border border-yellow-800 flex items-center gap-1 font-bold">
              <Sparkles className="w-3 h-3 text-regent-gold" /> BADGE: {chapter.badgeReward}
            </div>"""

new_replay = """            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowIntroCinematic(true)}
                className="px-2 py-0.5 bg-[#0A0503]/90 text-regent-gold hover:text-white font-pixel text-[10px] sm:text-xs border border-yellow-800/80 hover:border-regent-gold flex items-center gap-1 font-bold transition-all shadow-sm"
                title="Replay World Intro Cinematic"
              >
                <Sparkles className="w-3 h-3 text-regent-gold" /> INTRO
              </button>
              <div className="px-2 py-0.5 bg-[#0A0503]/90 text-regent-gold font-pixel text-[10px] sm:text-xs border border-yellow-800 flex items-center gap-1 font-bold">
                <Sparkles className="w-3 h-3 text-regent-gold" /> BADGE: {chapter.badgeReward}
              </div>
            </div>"""

content = content.replace(replay_target, new_replay, 1)

# 4. Update StorybookDialogueView guideNpcId
dialogue_npc_target = """guideNpcId={chapter.guideNpc || "gatekeeper-aaron"}"""
dialogue_npc_new = """guideNpcId={chapter.guideNpc || getNPCForChapter(chapter.id)?.id || "gatekeeper-aaron"}"""
content = content.replace(dialogue_npc_target, dialogue_npc_new, 1)

# 5. Apply TRIAL_SKIN styling to knowledge-check-section
trial_old = """      {/* 6. The Guardian's Riddle / Interactive Knowledge Trial */}
      {currentTrial && (
        <div
          id="knowledge-check-section"
          className="rounded-none border-4 border-regent-gold bg-[#0C0603] p-5 sm:p-7 shadow-[0_0_30px_rgba(255,199,25,0.15)] relative mb-8"
        >
          <div className="flex items-start gap-3 mb-4">
            <div className="w-10 h-10 bg-[#170B05] border-2 border-regent-gold flex items-center justify-center shrink-0">
              <HelpCircle className="w-6 h-6 text-regent-gold" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-[10px] font-pixel text-regent-gold uppercase tracking-widest block">
                  KNOWLEDGE TRIAL
                </span>
                {"type" in currentTrial && (
                  <span className="px-1.5 py-0.2 bg-amber-950/80 border border-amber-500 text-[8px] font-pixel text-yellow-300 uppercase">
                    {(currentTrial as any).type}
                  </span>
                )}
              </div>
              <h3 className="font-pixel text-sm sm:text-base font-bold text-white leading-snug">
                {currentTrial.question}
              </h3>
              <p className="text-[11px] font-serif text-[#C9B9A6] mt-0.5">
                Select the correct truth to prove your mastery and advance to the next chronicle!
              </p>
            </div>
          </div>

          {/* Options Grid */}
          <div className="space-y-2.5 mb-4">
            {currentTrial.options.map((option) => {
              const isSelected = selectedOptionId === option.id;
              const isTheCorrectOption = option.id === currentTrial.correctOptionId;

              let buttonStyle = "border-[#3D2612] bg-[#140803] text-white hover:border-regent-gold";
              if (isAnswerChecked) {
                if (isTheCorrectOption) {
                  buttonStyle = "border-regent-green bg-green-950/80 text-white font-bold";
                } else if (isSelected && !isTheCorrectOption) {
                  buttonStyle = "border-red-600 bg-red-950/80 text-white line-through";
                }
              } else if (isSelected) {
                buttonStyle = "border-regent-gold bg-[#2D1609] text-white font-bold shadow-md";
              }"""

trial_new = """      {/* 6. The Guardian's Riddle / Interactive Knowledge Trial */}
      {currentTrial && (() => {
        const skin = TRIAL_SKINS[chapter.id] || TRIAL_SKINS["loc-gateway"];
        return (
        <div
          id="knowledge-check-section"
          className={`rounded-none border-4 ${skin.containerBorder} ${skin.containerBg} p-5 sm:p-7 shadow-[0_0_30px_rgba(255,199,25,0.15)] relative mb-8 transition-colors duration-500`}
        >
          <div className="flex items-start gap-3 mb-4">
            <div className={`w-10 h-10 bg-[#170B05] border-2 ${skin.containerBorder} flex items-center justify-center shrink-0`}>
              <span className="text-xl select-none">{skin.tokenIcon}</span>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <span className={`text-[10px] font-pixel ${skin.themeText} uppercase tracking-widest block font-bold`}>
                  {skin.tokenLabel}
                </span>
                {"type" in currentTrial && (
                  <span className={`px-1.5 py-0.2 border text-[8px] font-pixel uppercase ${skin.badgeStyle}`}>
                    {(currentTrial as any).type}
                  </span>
                )}
              </div>
              <h3 className="font-pixel text-sm sm:text-base font-bold text-white leading-snug">
                {currentTrial.question}
              </h3>
              <p className="text-[11px] font-serif text-[#C9B9A6] mt-0.5">
                Select the correct truth to prove your mastery and advance to the next chronicle!
              </p>
            </div>
          </div>

          {/* Options Grid */}
          <div className="space-y-2.5 mb-4">
            {currentTrial.options.map((option) => {
              const isSelected = selectedOptionId === option.id;
              const isTheCorrectOption = option.id === currentTrial.correctOptionId;

              let buttonStyle = "border-[#3D2612] bg-[#140803]/80 text-white hover:border-regent-gold";
              if (isAnswerChecked) {
                if (isTheCorrectOption) {
                  buttonStyle = "border-regent-green bg-green-950/80 text-white font-bold";
                } else if (isSelected && !isTheCorrectOption) {
                  buttonStyle = "border-red-600 bg-red-950/80 text-white line-through";
                }
              } else if (isSelected) {
                buttonStyle = `${skin.buttonActive} font-bold shadow-md`;
              }"""

content = content.replace(trial_old, trial_new, 1)

# And close the IIFE in trial
trial_close_old = """            <div className="flex items-center gap-2">
              {!isAnswerChecked || !isCorrect ? (
                <RetroButton
                  variant="yellow"
                  size="sm"
                  disabled={!selectedOptionId}
                  onClick={handleCheckAnswer}
                >
                  SUBMIT ANSWER
                </RetroButton>
              ) : (
                <RetroButton
                  variant="green"
                  size="sm"
                  onClick={handleNextLessonManual}
                  icon={<ArrowRight className="w-3.5 h-3.5" />}
                  iconPosition="right"
                >
                  {currentLessonIndex < chapter.lessons.length - 1
                    ? "NEXT CHRONICLE →"
                    : "FINISH REALM QUEST →"}
                </RetroButton>
              )}
            </div>
          </div>
        </div>
      )}"""

trial_close_new = """            <div className="flex items-center gap-2">
              {!isAnswerChecked || !isCorrect ? (
                <RetroButton
                  variant="yellow"
                  size="sm"
                  disabled={!selectedOptionId}
                  onClick={handleCheckAnswer}
                >
                  SUBMIT ANSWER
                </RetroButton>
              ) : (
                <RetroButton
                  variant="green"
                  size="sm"
                  onClick={handleNextLessonManual}
                  icon={<ArrowRight className="w-3.5 h-3.5" />}
                  iconPosition="right"
                >
                  {currentLessonIndex < chapter.lessons.length - 1
                    ? "NEXT CHRONICLE →"
                    : "FINISH REALM QUEST →"}
                </RetroButton>
              )}
            </div>
          </div>
        </div>
        );
      })()}"""

content = content.replace(trial_close_old, trial_close_new, 1)

# 6. Render ChapterIntroCinematic and ChapterCompletionCinematic before closing div
modals_target = """      {/* 8. AUTOMATIC COMPANION GUIDANCE MODAL */}
      <CompanionGuidanceModal
        isOpen={guidanceConfig.isOpen}
        type={guidanceConfig.type}
        currentTitle={guidanceConfig.currentTitle}
        nextTitle={guidanceConfig.nextTitle}
        xpAwarded={guidanceConfig.xpAwarded}
        badgeUnlockedTitle={guidanceConfig.badgeUnlockedTitle}
        nextChapterId={guidanceConfig.nextChapterId}
        onAdvance={handleAdvanceGuidance}
        onClose={() => setGuidanceConfig((prev) => ({ ...prev, isOpen: false }))}
      />
    </div>"""

modals_new = """      {/* 8. AUTOMATIC COMPANION GUIDANCE MODAL */}
      <CompanionGuidanceModal
        isOpen={guidanceConfig.isOpen}
        type={guidanceConfig.type}
        currentTitle={guidanceConfig.currentTitle}
        nextTitle={guidanceConfig.nextTitle}
        xpAwarded={guidanceConfig.xpAwarded}
        badgeUnlockedTitle={guidanceConfig.badgeUnlockedTitle}
        nextChapterId={guidanceConfig.nextChapterId}
        onAdvance={handleAdvanceGuidance}
        onClose={() => setGuidanceConfig((prev) => ({ ...prev, isOpen: false }))}
      />

      {/* 9. CHAPTER INTRO CINEMATIC */}
      <ChapterIntroCinematic
        chapterId={chapter.id}
        chapterNumber={chapter.chapterNumber}
        chapterLabel={chapter.chapterLabel}
        chapterTitle={chapter.chapterTitle}
        worldName={chapter.worldName}
        seethawakaInspiration={chapter.seethawakaInspiration}
        guideNpcId={chapter.guideNpc || getNPCForChapter(chapter.id)?.id || "gatekeeper-aaron"}
        companionId={companionKey}
        isOpen={showIntroCinematic}
        onComplete={() => setShowIntroCinematic(false)}
      />

      {/* 10. CHAPTER COMPLETION CINEMATIC */}
      <ChapterCompletionCinematic
        chapterId={chapter.id}
        chapterTitle={chapter.chapterTitle}
        worldName={chapter.worldName}
        nextChapterId={completionCinematicData.nextChapterId}
        nextChapterTitle={completionCinematicData.nextChapterTitle}
        badgeUnlockedTitle={completionCinematicData.badgeTitle}
        xpAwarded={completionCinematicData.xpAwarded}
        companionId={companionKey}
        isOpen={showCompletionCinematic}
        onAdvance={() => {
          setShowCompletionCinematic(false);
          if (completionCinematicData.nextChapterId) {
            router.push(`/journey/${completionCinematicData.nextChapterId}`);
          } else {
            router.push("/journey");
          }
        }}
        onClose={() => setShowCompletionCinematic(false)}
      />
    </div>"""

content = content.replace(modals_target, modals_new, 1)

with open("src/app/journey/[chapterId]/page.tsx", "w", encoding="utf-8") as f:
    f.write(content)

print("page.tsx updated with cinematics and skins successfully!")
