import React, { useState } from 'react';
import {
  CurriculumModule,
  DomainCategory,
  MasteryStatus,
  ModuleId,
  StudentProfile,
} from '../types/math';
import { CURRICULUM_MODULES, gcd } from '../data/curriculumData';

interface CurriculumOverviewProps {
  student: StudentProfile;
  onStartModuleQuiz: (moduleId: ModuleId) => void;
  onStartDomainQuiz: (domain: DomainCategory | 'mixed') => void;
  onOpenSandbox: () => void;
}

export const CurriculumOverview: React.FC<CurriculumOverviewProps> = ({
  student,
  onStartModuleQuiz,
  onStartDomainQuiz,
  onOpenSandbox,
}) => {
  // Interactive Hero Equivalence Explorer state
  const [heroNum, setHeroNum] = useState<number>(3);
  const [heroDen, setHeroDen] = useState<number>(4);
  const [trackFilter, setTrackFilter] = useState<'all' | DomainCategory>('all');

  const heroDecimal = heroNum / heroDen;
  const heroHundredths = Math.round(heroDecimal * 100);
  const gHero = gcd(heroNum, heroDen);

  const renderStatusText = (status: MasteryStatus) => {
    if (status === 'Mastered') {
      return <span className="font-semibold text-[#059669]">● Mastered</span>;
    }
    if (status === 'Developing') {
      return <span className="font-semibold text-[#0284C7]">◐ Developing</span>;
    }
    if (status === 'Needs Review') {
      return (
        <span className="font-semibold text-[#D97706]">▲ Needs Review</span>
      );
    }
    return <span className="text-slate-400">○ Not Started</span>;
  };

  const renderModuleCard = (mod: CurriculumModule) => {
    const prog = student.moduleProgress[mod.id];
    const acc =
      prog && prog.questionsAttempted > 0
        ? Math.round((prog.questionsCorrect / prog.questionsAttempted) * 100)
        : null;

    return (
      <div
        key={mod.id}
        className="flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-6 transition-colors hover:border-slate-300"
      >
        <div className="space-y-3">
          {/* Quiet 1-line unboxed metadata kicker */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-500">
            <span className="font-mono font-medium text-slate-700">
              {mod.ccssCode}
            </span>
            <span aria-hidden="true">·</span>
            <span>{mod.estimatedMinutes} min quiz</span>
            <span aria-hidden="true">·</span>
            {prog ? renderStatusText(prog.masteryLevel) : renderStatusText('Not Started')}
            {acc !== null && (
              <>
                <span aria-hidden="true">·</span>
                <span className="font-mono font-semibold text-slate-800 tabular-nums">
                  {acc}% Accuracy
                </span>
              </>
            )}
          </div>

          {/* Primary Title with natural editorial numbering */}
          <h3 className="text-lg font-semibold text-slate-900">
            {mod.indexNumber}. {mod.title}
          </h3>

          <p className="text-sm leading-relaxed text-slate-600">
            {mod.shortDescription}
          </p>

          <div className="border-l-2 border-slate-200 pl-3 py-0.5 font-mono text-xs text-slate-700 tabular-nums">
            Core Principle: {mod.keyFormula}
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
          <span className="font-mono text-xs text-slate-500 tabular-nums">
            {prog
              ? `${prog.questionsCorrect}/${prog.questionsAttempted} Solved`
              : '0 Solved'}
          </span>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onOpenSandbox}
              className="text-xs font-medium text-slate-600 hover:text-slate-900 hover:underline whitespace-nowrap"
            >
              Visual Model
            </button>
            <button
              type="button"
              onClick={() => onStartModuleQuiz(mod.id)}
              className="rounded-lg bg-[#0F172A] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-slate-800 whitespace-nowrap"
            >
              Start Module Quiz →
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Compute quick domain tallies for the proof strip
  const totalSolved = Object.values(student.moduleProgress).reduce(
    (sum, p) => sum + p.questionsAttempted,
    0
  );
  const totalCorrect = Object.values(student.moduleProgress).reduce(
    (sum, p) => sum + p.questionsCorrect,
    0
  );
  const totalMastered = Object.values(student.moduleProgress).filter(
    (p) => p.masteryLevel === 'Mastered'
  ).length;

  return (
    <div className="space-y-12">
      {/* HERO SECTION: Two-Zone Interactive Concept & Assessment Anchor */}
      <section className="grid grid-cols-1 gap-8 rounded-2xl border border-slate-200 bg-white p-6 md:p-8 lg:grid-cols-12 lg:items-center">
        {/* Left Hero Column: Editorial Copy & Single Focal CTA */}
        <div className="space-y-5 lg:col-span-6">
          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
            <span>5th Grade Common Core Mathematics</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono">CCSS.5.NF & 5.NBT</span>
            <span aria-hidden="true">·</span>
            <span>Interactive Assessment Studio</span>
          </div>

          <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            Master Fractions and Decimals Through Visual Reasoning.
          </h1>

          <p className="text-base leading-relaxed text-slate-600 max-w-xl">
            Explore proportional fraction bars, common denominator partitions,
            and Base-10 hundredths grids alongside adaptive 5th-grade quizzes
            with step-by-step worked solutions and standard-level mastery
            tracking.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-1">
            <button
              type="button"
              onClick={() => onStartDomainQuiz('mixed')}
              className="rounded-lg bg-[#0284C7] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#0369A1] whitespace-nowrap"
            >
              Start 5th-Grade Diagnostic Quiz
            </button>
            <button
              type="button"
              onClick={() => onStartDomainQuiz('fractions')}
              className="rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-800 transition-colors hover:bg-slate-50 whitespace-nowrap"
            >
              Fractions Quiz (5.NF)
            </button>
            <button
              type="button"
              onClick={() => onStartDomainQuiz('decimals')}
              className="rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-800 transition-colors hover:bg-slate-50 whitespace-nowrap"
            >
              Decimals Quiz (5.NBT)
            </button>
          </div>

          {/* Adjacent Quantitative Proof Strip */}
          <div className="grid grid-cols-3 gap-4 border-t border-slate-100 pt-5">
            <div>
              <div className="font-mono text-xl font-semibold text-slate-900 tabular-nums">
                {totalMastered} / 8
              </div>
              <div className="text-xs text-slate-500">
                Standards Mastered by {student.name.split(' ')[0]}
              </div>
            </div>
            <div>
              <div className="font-mono text-xl font-semibold text-[#059669] tabular-nums">
                {totalSolved > 0
                  ? Math.round((totalCorrect / totalSolved) * 100)
                  : 0}
                %
              </div>
              <div className="text-xs text-slate-500">
                Cumulative Accuracy ({totalCorrect}/{totalSolved})
              </div>
            </div>
            <div>
              <div className="font-mono text-xl font-semibold text-[#0284C7] tabular-nums">
                {student.dailyStreak} Days
              </div>
              <div className="text-xs text-slate-500">
                Active Practice Streak
              </div>
            </div>
          </div>
        </div>

        {/* Right Hero Column: Live Interactive Fraction ↔ Decimal Equivalence Bridge */}
        <div className="rounded-xl border border-slate-200 bg-[#F8FAFC] p-5 space-y-4 lg:col-span-6">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <div>
              <span className="text-xs font-medium text-slate-500">
                Live Interactive Manipulative · Try Clicking Segments
              </span>
              <h2 className="text-base font-semibold text-slate-900">
                Fraction ↔ Decimal Equivalence Bridge
              </h2>
            </div>
            <span className="font-mono text-sm font-semibold text-[#0284C7] tabular-nums">
              {heroNum}/{heroDen} = {heroDecimal.toFixed(heroDen === 8 ? 3 : 2)}
            </span>
          </div>

          {/* Interactive Fraction Strip */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-medium text-slate-700">
                1. Click Fraction Segments ({heroNum} of {heroDen} shaded)
              </span>
              <span className="font-mono text-xs text-slate-600 tabular-nums">
                Simplest Form: {heroNum / gHero}/{heroDen / gHero}
              </span>
            </div>
            <div className="flex h-11 w-full overflow-hidden rounded-lg border-2 border-slate-800 bg-white">
              {Array.from({ length: heroDen }).map((_, idx) => {
                const shaded = idx < heroNum;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setHeroNum(idx + 1)}
                    className={`flex flex-1 items-center justify-center border-r border-slate-200 last:border-r-0 font-mono text-xs tabular-nums transition-colors ${
                      shaded
                        ? 'bg-[#0284C7] font-semibold text-white'
                        : 'bg-white text-slate-400 hover:bg-slate-100'
                    }`}
                  >
                    1/{heroDen}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Synchronized Hundredths Decimal Bar */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-medium text-slate-700">
                2. Synchronized Base-10 Decimal Scale (Hundredths & Thousandths)
              </span>
              <span className="font-mono font-semibold text-[#059669] tabular-nums">
                {heroDecimal.toFixed(heroDen === 8 ? 3 : 2)} ({heroHundredths}/100)
              </span>
            </div>
            <div className="relative h-8 w-full overflow-hidden rounded-lg border border-slate-300 bg-white">
              <div
                className="h-full bg-[#059669] transition-all duration-150"
                style={{ width: `${Math.min(100, heroDecimal * 100)}%` }}
              />
              <div className="absolute inset-0 grid grid-cols-10 pointer-events-none">
                {Array.from({ length: 10 }).map((_, i) => (
                  <div
                    key={i}
                    className="border-r border-slate-900/15 last:border-r-0 flex items-center justify-end pr-1 font-mono text-[10px] text-slate-600 tabular-nums"
                  >
                    .{(i + 1)}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Denominator Preset Selector */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-medium text-slate-600">
                Partition Unit Whole:
              </span>
              {[2, 4, 5, 8, 10].map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => {
                    setHeroDen(d);
                    setHeroNum(Math.min(heroNum, d));
                  }}
                  className={`rounded-md px-2.5 py-1 font-mono text-xs font-medium tabular-nums transition-colors ${
                    heroDen === d
                      ? 'bg-slate-900 text-white'
                      : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  /{d}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={onOpenSandbox}
              className="text-xs font-semibold text-[#0284C7] hover:underline whitespace-nowrap"
            >
              Open Full Visual Sandbox →
            </button>
          </div>
        </div>
      </section>

      {/* CURRICULUM MODULES DIRECTORY */}
      <section className="space-y-8">
        <div className="flex flex-col gap-4 border-b border-slate-200 pb-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="text-xs font-medium text-slate-500">
              Structured 5th-Grade Scope & Sequence
            </div>
            <h2 className="mt-1 text-2xl font-semibold tracking-tight text-slate-900">
              Curriculum Modules & Interactive Quizzes
            </h2>
          </div>

          {/* Interactive Track Filter */}
          <div className="flex items-center gap-1 rounded-lg bg-slate-100 p-1">
            {(
              [
                { id: 'all', label: 'All 8 Modules' },
                { id: 'fractions', label: 'Fractions Track (01–04)' },
                { id: 'decimals', label: 'Decimals Track (05–08)' },
              ] as const
            ).map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setTrackFilter(tab.id)}
                className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap ${
                  trackFilter === tab.id
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Track 1: Fractions */}
        {(trackFilter === 'all' || trackFilter === 'fractions') && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-slate-900">
                  Track I: Fractions Equivalence & Operations (CCSS.5.NF)
                </h3>
                <p className="text-xs text-slate-500">
                  Visual fraction bars, least common denominators, mixed numbers, and 2D unit area multiplication.
                </p>
              </div>
              <button
                type="button"
                onClick={() => onStartDomainQuiz('fractions')}
                className="text-xs font-semibold text-[#0284C7] hover:underline whitespace-nowrap"
              >
                Quiz All Fractions →
              </button>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {CURRICULUM_MODULES.filter((m) => m.domain === 'fractions').map(
                renderModuleCard
              )}
            </div>
          </div>
        )}

        {/* Track 2: Decimals */}
        {(trackFilter === 'all' || trackFilter === 'decimals') && (
          <div className="space-y-4 pt-2">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-slate-900">
                  Track II: Decimals Place Value & Operations (CCSS.5.NBT)
                </h3>
                <p className="text-xs text-slate-500">
                  Base-10 hundredths & thousandths grids, coordinate number line rounding, decimal alignment, and fraction conversion.
                </p>
              </div>
              <button
                type="button"
                onClick={() => onStartDomainQuiz('decimals')}
                className="text-xs font-semibold text-[#059669] hover:underline whitespace-nowrap"
              >
                Quiz All Decimals →
              </button>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {CURRICULUM_MODULES.filter((m) => m.domain === 'decimals').map(
                renderModuleCard
              )}
            </div>
          </div>
        )}
      </section>
    </div>
  );
};
