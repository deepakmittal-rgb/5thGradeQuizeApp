/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  DomainCategory,
  MasteryStatus,
  ModuleId,
  ModuleProgress,
  QuizAttemptRecord,
  StudentProfile,
} from './types/math';
import {
  CURRICULUM_MODULES,
  INITIAL_STUDENT_PROFILES,
} from './data/curriculumData';
import { CurriculumOverview } from './components/CurriculumOverview';
import { QuizWorkspace } from './components/QuizWorkspace';
import { VisualSandboxView } from './components/VisualSandboxView';
import { ProgressDashboardView } from './components/ProgressDashboardView';

type ActiveView = 'curriculum' | 'quiz' | 'sandbox' | 'progress';

const STORAGE_KEY = 'equate5_student_profiles_v1';

export default function App() {
  const [profiles, setProfiles] = useState<StudentProfile[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // Fallback to initial profiles if localStorage is unavailable
    }
    return INITIAL_STUDENT_PROFILES;
  });

  const [activeStudentId, setActiveStudentId] = useState<string>(
    () => profiles[0]?.id ?? 'student-maya'
  );
  const [activeView, setActiveView] = useState<ActiveView>('curriculum');
  const [quizModuleId, setQuizModuleId] = useState<ModuleId | null>(null);
  const [quizDomain, setQuizDomain] = useState<DomainCategory | 'mixed'>('mixed');

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(profiles));
    } catch {
      // Ignore storage quota errors
    }
  }, [profiles]);

  const activeStudent =
    profiles.find((p) => p.id === activeStudentId) ?? profiles[0];

  const handleStartModuleQuiz = (moduleId: ModuleId) => {
    const mod = CURRICULUM_MODULES.find((m) => m.id === moduleId);
    setQuizModuleId(moduleId);
    setQuizDomain(mod?.domain ?? 'mixed');
    setActiveView('quiz');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartDomainQuiz = (domain: DomainCategory | 'mixed') => {
    setQuizModuleId(null);
    setQuizDomain(domain);
    setActiveView('quiz');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCompleteQuiz = (record: QuizAttemptRecord) => {
    setProfiles((prevProfiles) =>
      prevProfiles.map((student) => {
        if (student.id !== activeStudent.id) return student;

        const updatedModuleProgress: Record<ModuleId, ModuleProgress> = {
          ...student.moduleProgress,
        };

        // Update per-question module metrics
        record.questionResults.forEach((qr) => {
          const existing = updatedModuleProgress[qr.moduleId] ?? {
            moduleId: qr.moduleId,
            questionsAttempted: 0,
            questionsCorrect: 0,
            bestQuizScore: 0,
            lastPracticed: 'Today',
            currentStreak: 0,
            masteryLevel: 'Not Started' as MasteryStatus,
          };

          const nextAttempted = existing.questionsAttempted + 1;
          const nextCorrect =
            existing.questionsCorrect + (qr.isCorrect ? 1 : 0);
          const nextStreak = qr.isCorrect ? existing.currentStreak + 1 : 0;
          const cumulativeAcc = Math.round((nextCorrect / nextAttempted) * 100);

          let nextMastery: MasteryStatus = 'Developing';
          if (cumulativeAcc >= 85 && nextAttempted >= 3) {
            nextMastery = 'Mastered';
          } else if (cumulativeAcc < 65) {
            nextMastery = 'Needs Review';
          }

          updatedModuleProgress[qr.moduleId] = {
            ...existing,
            questionsAttempted: nextAttempted,
            questionsCorrect: nextCorrect,
            bestQuizScore: Math.max(
              existing.bestQuizScore,
              record.accuracyPercent
            ),
            lastPracticed: 'Today',
            currentStreak: nextStreak,
            masteryLevel: nextMastery,
          };
        });

        return {
          ...student,
          moduleProgress: updatedModuleProgress,
          attemptHistory: [record, ...student.attemptHistory],
        };
      })
    );
  };

  const handleResetStudentProgress = () => {
    setProfiles((prevProfiles) =>
      prevProfiles.map((student) => {
        if (student.id !== activeStudent.id) return student;
        const emptyProgress = {} as Record<ModuleId, ModuleProgress>;
        CURRICULUM_MODULES.forEach((m) => {
          emptyProgress[m.id] = {
            moduleId: m.id,
            questionsAttempted: 0,
            questionsCorrect: 0,
            bestQuizScore: 0,
            lastPracticed: 'Never',
            currentStreak: 0,
            masteryLevel: 'Not Started',
          };
        });
        return {
          ...student,
          dailyStreak: 1,
          moduleProgress: emptyProgress,
          attemptHistory: [],
        };
      })
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#0F172A]">
      {/* TOP BAR CONTRACT: One-row, three-zone header */}
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur-xs">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          {/* Zone 1: Single text element wordmark */}
          <button
            type="button"
            onClick={() => setActiveView('curriculum')}
            className="font-display text-xl font-semibold tracking-tight text-slate-900 whitespace-nowrap"
          >
            Equate 5
          </button>

          {/* Zone 2: 4 clean text navigation links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600">
            <button
              type="button"
              onClick={() => setActiveView('curriculum')}
              className={`transition-colors hover:text-slate-900 hover:underline underline-offset-8 whitespace-nowrap ${
                activeView === 'curriculum'
                  ? 'font-semibold text-slate-900 underline decoration-[#0284C7] decoration-2'
                  : ''
              }`}
            >
              Curriculum
            </button>
            <button
              type="button"
              onClick={() => setActiveView('quiz')}
              className={`transition-colors hover:text-slate-900 hover:underline underline-offset-8 whitespace-nowrap ${
                activeView === 'quiz'
                  ? 'font-semibold text-slate-900 underline decoration-[#0284C7] decoration-2'
                  : ''
              }`}
            >
              Interactive Quiz
            </button>
            <button
              type="button"
              onClick={() => setActiveView('sandbox')}
              className={`transition-colors hover:text-slate-900 hover:underline underline-offset-8 whitespace-nowrap ${
                activeView === 'sandbox'
                  ? 'font-semibold text-slate-900 underline decoration-[#0284C7] decoration-2'
                  : ''
              }`}
            >
              Visual Sandbox
            </button>
            <button
              type="button"
              onClick={() => setActiveView('progress')}
              className={`transition-colors hover:text-slate-900 hover:underline underline-offset-8 whitespace-nowrap ${
                activeView === 'progress'
                  ? 'font-semibold text-slate-900 underline decoration-[#0284C7] decoration-2'
                  : ''
              }`}
            >
              Progress Record
            </button>
          </nav>

          {/* Zone 3: 1-2 primary actions */}
          <div className="flex items-center gap-3">
            <select
              aria-label="Select Student Profile"
              value={activeStudent.id}
              onChange={(e) => setActiveStudentId(e.target.value)}
              className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-700 focus:border-[#0284C7] focus:outline-none"
            >
              {profiles.map((p) => (
                <option key={p.id} value={p.id}>
                  Student: {p.name}
                </option>
              ))}
            </select>

            <button
              type="button"
              onClick={() => handleStartDomainQuiz('mixed')}
              className="rounded-lg bg-[#0F172A] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-slate-800 whitespace-nowrap"
            >
              Start Quick Quiz
            </button>
          </div>
        </div>

        {/* Mobile Secondary Nav Bar */}
        <div className="flex md:hidden items-center justify-around border-t border-slate-100 px-4 py-2 text-xs font-medium text-slate-600">
          <button
            type="button"
            onClick={() => setActiveView('curriculum')}
            className={
              activeView === 'curriculum' ? 'font-semibold text-[#0284C7]' : ''
            }
          >
            Curriculum
          </button>
          <button
            type="button"
            onClick={() => setActiveView('quiz')}
            className={
              activeView === 'quiz' ? 'font-semibold text-[#0284C7]' : ''
            }
          >
            Quiz
          </button>
          <button
            type="button"
            onClick={() => setActiveView('sandbox')}
            className={
              activeView === 'sandbox' ? 'font-semibold text-[#0284C7]' : ''
            }
          >
            Sandbox
          </button>
          <button
            type="button"
            onClick={() => setActiveView('progress')}
            className={
              activeView === 'progress' ? 'font-semibold text-[#0284C7]' : ''
            }
          >
            Progress
          </button>
        </div>
      </header>

      {/* MAIN CONTENT CONTAINER */}
      <main className="mx-auto w-full max-w-7xl flex-1 px-6 py-8">
        {activeView === 'curriculum' && (
          <CurriculumOverview
            student={activeStudent}
            onStartModuleQuiz={handleStartModuleQuiz}
            onStartDomainQuiz={handleStartDomainQuiz}
            onOpenSandbox={() => {
              setActiveView('sandbox');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {activeView === 'quiz' && (
          <QuizWorkspace
            initialModuleId={quizModuleId}
            initialDomain={quizDomain}
            onCompleteQuiz={handleCompleteQuiz}
            onSelectModuleChange={(modId) => setQuizModuleId(modId)}
          />
        )}

        {activeView === 'sandbox' && (
          <VisualSandboxView onLaunchModuleQuiz={handleStartModuleQuiz} />
        )}

        {activeView === 'progress' && (
          <ProgressDashboardView
            student={activeStudent}
            onStartModuleQuiz={handleStartModuleQuiz}
            onStartDomainQuiz={handleStartDomainQuiz}
            onResetStudentProgress={handleResetStudentProgress}
          />
        )}
      </main>

      {/* QUIET FOOTER */}
      <footer className="mt-16 border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <div>
            Equate 5 · 5th Grade Fractions (CCSS.5.NF) & Decimals (CCSS.5.NBT)
            Learning Studio
          </div>
          <div className="flex items-center gap-5">
            <button
              type="button"
              onClick={() => setActiveView('curriculum')}
              className="hover:text-slate-900"
            >
              Curriculum Scope
            </button>
            <button
              type="button"
              onClick={() => setActiveView('sandbox')}
              className="hover:text-slate-900"
            >
              Visual Manipulatives
            </button>
            <button
              type="button"
              onClick={() => setActiveView('progress')}
              className="hover:text-slate-900"
            >
              Progress Rubric
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
