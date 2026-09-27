import React, { useState } from 'react';
import {
  DomainCategory,
  MasteryStatus,
  ModuleId,
  StudentProfile,
} from '../types/math';
import { CURRICULUM_MODULES } from '../data/curriculumData';
import { AchievementsShowcase } from './AchievementsShowcase';

interface ProgressDashboardViewProps {
  student: StudentProfile;
  onStartModuleQuiz: (moduleId: ModuleId) => void;
  onStartDomainQuiz: (domain: DomainCategory | 'mixed') => void;
  onResetStudentProgress: () => void;
}

export const ProgressDashboardView: React.FC<ProgressDashboardViewProps> = ({
  student,
  onStartModuleQuiz,
  onStartDomainQuiz,
  onResetStudentProgress,
}) => {
  const [domainFilter, setDomainFilter] = useState<
    'all' | DomainCategory | 'review'
  >('all');
  const [expandedAttemptId, setExpandedAttemptId] = useState<string | null>(
    student.attemptHistory[0]?.id ?? null
  );
  const [confirmReset, setConfirmReset] = useState<boolean>(false);

  // Compute aggregate Fractions, Decimals, and 6th-Grade Bridge metrics
  const fractionModules = CURRICULUM_MODULES.filter(
    (m) => m.domain === 'fractions'
  );
  const decimalModules = CURRICULUM_MODULES.filter(
    (m) => m.domain === 'decimals'
  );
  const bridgeModules = CURRICULUM_MODULES.filter(
    (m) => m.domain === 'bridge6'
  );

  const calcDomainStats = (mods: typeof CURRICULUM_MODULES) => {
    let attempted = 0;
    let correct = 0;
    let masteredCount = 0;

    mods.forEach((m) => {
      const p = student.moduleProgress[m.id];
      if (p) {
        attempted += p.questionsAttempted;
        correct += p.questionsCorrect;
        if (p.masteryLevel === 'Mastered') masteredCount += 1;
      }
    });

    const accuracy =
      attempted > 0 ? Math.round((correct / attempted) * 100) : 0;
    return {
      attempted,
      correct,
      accuracy,
      masteredCount,
      totalModules: mods.length,
    };
  };

  const fracStats = calcDomainStats(fractionModules);
  const decStats = calcDomainStats(decimalModules);
  const bridgeStats = calcDomainStats(bridgeModules);

  const overallAttempted =
    fracStats.attempted + decStats.attempted + bridgeStats.attempted;
  const overallCorrect =
    fracStats.correct + decStats.correct + bridgeStats.correct;
  const overallAccuracy =
    overallAttempted > 0
      ? Math.round((overallCorrect / overallAttempted) * 100)
      : 0;
  const totalMastered =
    fracStats.masteredCount +
    decStats.masteredCount +
    bridgeStats.masteredCount;

  const filteredModules = CURRICULUM_MODULES.filter((m) => {
    if (domainFilter === 'all') return true;
    if (domainFilter === 'review') {
      const p = student.moduleProgress[m.id];
      return (
        p?.masteryLevel === 'Needs Review' || p?.masteryLevel === 'Developing'
      );
    }
    return m.domain === domainFilter;
  });

  const renderMasteryIndicator = (status: MasteryStatus) => {
    if (status === 'Mastered') {
      return (
        <span className="font-mono text-xs font-semibold text-[#059669]">
          ● Mastery Achieved
        </span>
      );
    }
    if (status === 'Developing') {
      return (
        <span className="font-mono text-xs font-semibold text-[#0284C7]">
          ◐ Developing Fluency
        </span>
      );
    }
    if (status === 'Needs Review') {
      return (
        <span className="font-mono text-xs font-semibold text-[#D97706]">
          ▲ Needs Review
        </span>
      );
    }
    return <span className="font-mono text-xs text-slate-400">○ Not Started</span>;
  };

  return (
    <div className="space-y-12">
      {/* Header & Student Overview */}
      <div className="flex flex-col gap-4 border-b border-slate-200 pb-6 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span>Rising 6th-Grade Mastery Analytics</span>
            <span aria-hidden="true">·</span>
            <span>{student.name}</span>
            <span aria-hidden="true">·</span>
            <span>{student.gradeLabel}</span>
          </div>
          <h2 className="mt-1 text-2xl font-semibold tracking-tight text-slate-900">
            Progress Dashboard & Mastery Achievements
          </h2>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {!confirmReset ? (
            <button
              type="button"
              onClick={() => setConfirmReset(true)}
              className="rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-xs font-medium text-slate-700 transition-colors hover:bg-slate-50 whitespace-nowrap"
            >
              Reset Progress Data
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  onResetStudentProgress();
                  setConfirmReset(false);
                }}
                className="rounded-lg bg-[#DC2626] px-3 py-2 text-xs font-semibold text-white hover:bg-red-700 whitespace-nowrap"
              >
                Confirm Reset
              </button>
              <button
                type="button"
                onClick={() => setConfirmReset(false)}
                className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50 whitespace-nowrap"
              >
                Cancel
              </button>
            </div>
          )}

          <button
            type="button"
            onClick={() => onStartDomainQuiz('mixed')}
            className="rounded-lg bg-[#0284C7] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#0369A1] whitespace-nowrap"
          >
            Take 6th-Grade Readiness Diagnostic
          </button>
        </div>
      </div>

      {/* Domain Comparison Cards: Fractions, Decimals, and 6th-Grade Bridge */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
        {/* Card 1: Fractions Track (CCSS.5.NF → 6.NS.A) */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 flex flex-col justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>Track I · 5.NF → 6.NS.A</span>
              <span className="font-mono font-semibold text-[#0284C7] tabular-nums">
                {fracStats.masteredCount}/{fracStats.totalModules} Mastered
              </span>
            </div>
            <h3 className="text-base font-semibold text-slate-900">
              Fractions & Rational Division
            </h3>
            <div className="flex items-baseline gap-2 pt-1">
              <span className="font-mono text-2xl font-semibold text-slate-900 tabular-nums">
                {fracStats.accuracy}%
              </span>
              <span className="font-mono text-xs text-slate-500 tabular-nums">
                ({fracStats.correct}/{fracStats.attempted} Correct)
              </span>
            </div>
          </div>

          <div className="space-y-2.5">
            <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full bg-[#0284C7]"
                style={{ width: `${fracStats.accuracy}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500">GCF · LCD · Reciprocals</span>
              <button
                type="button"
                onClick={() => onStartDomainQuiz('fractions')}
                className="font-semibold text-[#0284C7] hover:underline whitespace-nowrap"
              >
                Quiz Track I →
              </button>
            </div>
          </div>
        </div>

        {/* Card 2: Decimals Track (CCSS.5.NBT → 6.NS.B) */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 flex flex-col justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>Track II · 5.NBT → 6.NS.B</span>
              <span className="font-mono font-semibold text-[#059669] tabular-nums">
                {decStats.masteredCount}/{decStats.totalModules} Mastered
              </span>
            </div>
            <h3 className="text-base font-semibold text-slate-900">
              Precision Decimals & Operations
            </h3>
            <div className="flex items-baseline gap-2 pt-1">
              <span className="font-mono text-2xl font-semibold text-slate-900 tabular-nums">
                {decStats.accuracy}%
              </span>
              <span className="font-mono text-xs text-slate-500 tabular-nums">
                ({decStats.correct}/{decStats.attempted} Correct)
              </span>
            </div>
          </div>

          <div className="space-y-2.5">
            <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full bg-[#059669]"
                style={{ width: `${decStats.accuracy}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500">10ⁿ · Scaling · Division</span>
              <button
                type="button"
                onClick={() => onStartDomainQuiz('decimals')}
                className="font-semibold text-[#059669] hover:underline whitespace-nowrap"
              >
                Quiz Track II →
              </button>
            </div>
          </div>
        </div>

        {/* Card 3: 6th-Grade Bridge Track (6.RP · 6.EE · 6.G) */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 flex flex-col justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>Track III · 6.RP / 6.EE / 6.G</span>
              <span className="font-mono font-semibold text-[#D97706] tabular-nums">
                {bridgeStats.masteredCount}/{bridgeStats.totalModules} Mastered
              </span>
            </div>
            <h3 className="text-base font-semibold text-slate-900">
              Ratios, Exponents & Volume
            </h3>
            <div className="flex items-baseline gap-2 pt-1">
              <span className="font-mono text-2xl font-semibold text-slate-900 tabular-nums">
                {bridgeStats.accuracy}%
              </span>
              <span className="font-mono text-xs text-slate-500 tabular-nums">
                ({bridgeStats.correct}/{bridgeStats.attempted} Correct)
              </span>
            </div>
          </div>

          <div className="space-y-2.5">
            <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full bg-[#D97706]"
                style={{ width: `${bridgeStats.accuracy}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500">Unit Rates · PEMDAS · 3D</span>
              <button
                type="button"
                onClick={() => onStartDomainQuiz('bridge6')}
                className="font-semibold text-[#D97706] hover:underline whitespace-nowrap"
              >
                Quiz Track III →
              </button>
            </div>
          </div>
        </div>

        {/* Card 4: Cumulative 6th-Grade Readiness Standing */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 flex flex-col justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>Cumulative Standing</span>
              <span className="font-mono font-semibold text-slate-800 tabular-nums">
                {student.dailyStreak} Day Streak
              </span>
            </div>
            <h3 className="text-base font-semibold text-slate-900">
              6th-Grade Readiness Index
            </h3>
            <div className="flex items-baseline gap-2 pt-1">
              <span className="font-mono text-2xl font-semibold text-slate-900 tabular-nums">
                {overallAccuracy}%
              </span>
              <span className="font-mono text-xs text-slate-500 tabular-nums">
                ({overallCorrect}/{overallAttempted} Solved)
              </span>
            </div>
          </div>

          <div className="space-y-1.5 border-t border-slate-100 pt-2.5 text-xs text-slate-600">
            <div className="flex items-center justify-between">
              <span>Mastered Modules (≥85%):</span>
              <span className="font-mono font-semibold text-slate-900 tabular-nums">
                {totalMastered} of 10
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span>Completed Sessions:</span>
              <span className="font-mono font-semibold text-slate-900 tabular-nums">
                {student.attemptHistory.length} Sessions
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* INTEGRATED ACHIEVEMENTS COMPONENT */}
      <AchievementsShowcase
        student={student}
        onStartModuleQuiz={onStartModuleQuiz}
      />

      {/* Curriculum Standards Rubric Table */}
      <div className="space-y-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">
              Grade 5 → Grade 6 Mastery Rubric (All 10 Modules)
            </h3>
            <p className="text-xs text-slate-500">
              Click any module action to launch an interactive assessment and unlock remaining achievement milestones.
            </p>
          </div>

          {/* Interactive Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1 rounded-lg bg-slate-100 p-1">
            {(
              [
                { id: 'all', label: 'All 10 Modules' },
                { id: 'fractions', label: 'Fractions (5.NF→6.NS)' },
                { id: 'decimals', label: 'Decimals (5.NBT→6.NS)' },
                { id: 'bridge6', label: '6th Bridge (6.RP/EE/G)' },
                { id: 'review', label: 'Focus Areas' },
              ] as const
            ).map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setDomainFilter(f.id)}
                className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap ${
                  domainFilter === f.id
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/70 text-[11px] font-semibold text-slate-500">
                <th className="py-3.5 px-4">Module & Standard Bridge</th>
                <th className="py-3.5 px-4">Track</th>
                <th className="py-3.5 px-4 text-right">Solved</th>
                <th className="py-3.5 px-4 text-right">Accuracy</th>
                <th className="py-3.5 px-4 text-right">Streak</th>
                <th className="py-3.5 px-4">Mastery Diagnostic</th>
                <th className="py-3.5 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-sm">
              {filteredModules.map((mod) => {
                const prog = student.moduleProgress[mod.id] ?? {
                  moduleId: mod.id,
                  questionsAttempted: 0,
                  questionsCorrect: 0,
                  bestQuizScore: 0,
                  lastPracticed: 'Never',
                  currentStreak: 0,
                  masteryLevel: 'Not Started' as MasteryStatus,
                };
                const acc =
                  prog.questionsAttempted > 0
                    ? Math.round(
                        (prog.questionsCorrect / prog.questionsAttempted) * 100
                      )
                    : 0;

                return (
                  <tr
                    key={mod.id}
                    className="hover:bg-slate-50/80 transition-colors"
                  >
                    <td className="py-4 px-4">
                      <div className="font-semibold text-slate-900">
                        {mod.indexNumber}. {mod.title}
                      </div>
                      <div className="mt-0.5 flex items-center gap-1.5 text-xs text-slate-500">
                        <span className="font-mono">{mod.ccssCode}</span>
                        <span aria-hidden="true">·</span>
                        <span>Last practiced: {prog.lastPracticed}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-xs text-slate-600">
                      {mod.domain === 'fractions'
                        ? 'Fractions'
                        : mod.domain === 'decimals'
                          ? 'Decimals'
                          : '6th Bridge'}
                    </td>
                    <td className="py-4 px-4 text-right font-mono text-xs text-slate-700 tabular-nums">
                      {prog.questionsCorrect}/{prog.questionsAttempted}
                    </td>
                    <td className="py-4 px-4 text-right font-mono text-sm font-semibold text-slate-900 tabular-nums">
                      {prog.questionsAttempted > 0 ? `${acc}%` : '—'}
                    </td>
                    <td className="py-4 px-4 text-right font-mono text-xs text-slate-600 tabular-nums">
                      {prog.currentStreak} in a row
                    </td>
                    <td className="py-4 px-4">
                      {renderMasteryIndicator(prog.masteryLevel)}
                    </td>
                    <td className="py-4 px-4 text-right">
                      <button
                        type="button"
                        onClick={() => onStartModuleQuiz(mod.id)}
                        className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-800 transition-colors hover:bg-slate-900 hover:text-white hover:border-slate-900 whitespace-nowrap"
                      >
                        Start Quiz
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Quiz Session History Log */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">
            Recent Assessment History & Solution Logs
          </h3>
          <p className="text-xs text-slate-500">
            Select any completed quiz session to review student responses and worked explanations.
          </p>
        </div>

        {student.attemptHistory.length === 0 ? (
          <div className="rounded-xl border border-slate-200 bg-white p-8 text-center space-y-3">
            <p className="text-sm text-slate-600">
              No quiz sessions recorded yet for {student.name}.
            </p>
            <button
              type="button"
              onClick={() => onStartDomainQuiz('mixed')}
              className="rounded-lg bg-[#0284C7] px-4 py-2 text-xs font-semibold text-white"
            >
              Start First Quiz Session
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {student.attemptHistory.map((attempt) => {
              const isExpanded = expandedAttemptId === attempt.id;
              return (
                <div
                  key={attempt.id}
                  className="rounded-xl border border-slate-200 bg-white overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() =>
                      setExpandedAttemptId(isExpanded ? null : attempt.id)
                    }
                    className="flex w-full flex-col gap-2 px-5 py-4 text-left hover:bg-slate-50/70 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <span>{attempt.timestamp}</span>
                        <span aria-hidden="true">·</span>
                        <span className="capitalize">
                          {attempt.domain === 'bridge6'
                            ? '6th-Grade Bridge'
                            : attempt.domain}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span className="font-mono tabular-nums">
                          {attempt.durationSeconds}s elapsed
                        </span>
                      </div>
                      <div className="text-sm font-semibold text-slate-900">
                        {attempt.title}
                      </div>
                    </div>

                    <div className="flex items-center gap-4 font-mono text-xs tabular-nums">
                      <span
                        className={`font-semibold ${
                          attempt.accuracyPercent >= 80
                            ? 'text-[#059669]'
                            : attempt.accuracyPercent >= 60
                              ? 'text-[#0284C7]'
                              : 'text-[#D97706]'
                        }`}
                      >
                        {attempt.accuracyPercent >= 80
                          ? '● '
                          : attempt.accuracyPercent >= 60
                            ? '◐ '
                            : '▲ '}
                        {attempt.score}/{attempt.totalQuestions} (
                        {attempt.accuracyPercent}%)
                      </span>
                      <span className="text-slate-500">
                        {isExpanded ? 'Hide Details ↑' : 'Inspect Log ↓'}
                      </span>
                    </div>
                  </button>

                  {isExpanded && attempt.questionResults.length > 0 && (
                    <div className="border-t border-slate-200 bg-slate-50/50 px-5 py-4 divide-y divide-slate-200/80">
                      {attempt.questionResults.map((qr, qIdx) => (
                        <div
                          key={qr.questionId + qIdx}
                          className="py-3 first:pt-0 last:pb-0 flex flex-col gap-1.5 md:flex-row md:items-start md:justify-between"
                        >
                          <div className="space-y-0.5 max-w-2xl">
                            <div className="text-xs font-medium text-slate-900">
                              <span className="font-mono text-slate-500 mr-1.5">
                                {qIdx + 1}.
                              </span>
                              {qr.prompt}
                            </div>
                            <div className="text-xs text-slate-600">
                              {qr.explanation}
                            </div>
                          </div>
                          <div className="font-mono text-xs tabular-nums shrink-0 md:text-right">
                            <span
                              className={
                                qr.isCorrect
                                  ? 'font-semibold text-[#059669]'
                                  : 'font-semibold text-[#DC2626]'
                              }
                            >
                              {qr.isCorrect ? '✓ ' : '✕ '}
                              {qr.userAnswerText}
                            </span>
                            {!qr.isCorrect && (
                              <div className="text-slate-600">
                                Expected: {qr.correctAnswerText}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
