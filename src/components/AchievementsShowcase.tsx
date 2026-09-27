import React, { useState } from 'react';
import {
  AchievementBadge,
  ModuleId,
  StudentProfile,
} from '../types/math';
import {
  CURRICULUM_MODULES,
  evaluateStudentAchievements,
} from '../data/curriculumData';

interface AchievementsShowcaseProps {
  student: StudentProfile;
  onStartModuleQuiz: (moduleId: ModuleId) => void;
}

export const AchievementsShowcase: React.FC<AchievementsShowcaseProps> = ({
  student,
  onStartModuleQuiz,
}) => {
  const [badgeFilter, setBadgeFilter] = useState<'all' | 'earned' | 'progress'>(
    'all'
  );

  const badges = evaluateStudentAchievements(student);
  const earnedCount = badges.filter((b) => b.unlocked).length;

  const filteredBadges = badges.filter((b) => {
    if (badgeFilter === 'earned') return b.unlocked;
    if (badgeFilter === 'progress') return !b.unlocked;
    return true;
  });

  const renderBadgeInsignia = (badge: AchievementBadge) => {
    const isUnlocked = badge.unlocked;
    const strokeColor = !isUnlocked
      ? '#94A3B8'
      : badge.accentColor === 'emerald'
        ? '#059669'
        : badge.accentColor === 'amber'
          ? '#D97706'
          : '#0284C7';
    const bgClass = !isUnlocked
      ? 'bg-slate-100 border-slate-200'
      : badge.accentColor === 'emerald'
        ? 'bg-emerald-50/80 border-[#059669]/30'
        : badge.accentColor === 'amber'
          ? 'bg-amber-50/80 border-[#D97706]/30'
          : 'bg-sky-50/80 border-[#0284C7]/30';

    return (
      <div
        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border ${bgClass}`}
        aria-hidden="true"
      >
        <svg viewBox="0 0 36 36" className="h-7 w-7">
          {badge.iconType === 'fraction-pro' && (
            <g stroke={strokeColor} strokeWidth="2" fill="none">
              <rect x="5" y="7" width="26" height="9" rx="2" />
              <line x1="18" y1="7" x2="18" y2="16" />
              <rect x="5" y="20" width="26" height="9" rx="2" />
              <line x1="13.6" y1="20" x2="13.6" y2="29" />
              <line x1="22.3" y1="20" x2="22.3" y2="29" />
            </g>
          )}
          {badge.iconType === 'decimal-master' && (
            <g stroke={strokeColor} strokeWidth="2" fill="none">
              <rect x="6" y="6" width="24" height="24" rx="2" />
              <line x1="14" y1="6" x2="14" y2="30" />
              <line x1="22" y1="6" x2="22" y2="30" />
              <line x1="6" y1="14" x2="30" y2="14" />
              <line x1="6" y1="22" x2="30" y2="22" />
            </g>
          )}
          {badge.iconType === 'sixth-ready' && (
            <g stroke={strokeColor} strokeWidth="2" fill="none">
              <polygon points="18,4 31,11.5 31,24.5 18,32 5,24.5 5,11.5" />
              <path d="M13 18 L17 22 L24 14" strokeLinecap="round" strokeLinejoin="round" />
            </g>
          )}
          {badge.iconType === 'precision-100' && (
            <g stroke={strokeColor} strokeWidth="2" fill="none">
              <circle cx="18" cy="18" r="12" />
              <circle cx="18" cy="18" r="6" />
              <circle cx="18" cy="18" r="1.5" fill={strokeColor} />
            </g>
          )}
          {badge.iconType === 'percent-bridge' && (
            <g stroke={strokeColor} strokeWidth="2" fill="none">
              <line x1="9" y1="27" x2="27" y2="9" strokeLinecap="round" />
              <circle cx="12" cy="12" r="3" />
              <circle cx="24" cy="24" r="3" />
            </g>
          )}
          {badge.iconType === 'streak-flame' && (
            <g stroke={strokeColor} strokeWidth="2" fill="none">
              <polygon
                points="20,4 9,20 17,20 15,32 27,16 19,16"
                strokeLinejoin="round"
              />
            </g>
          )}
          {badge.iconType === 'polymath-compass' && (
            <g stroke={strokeColor} strokeWidth="2" fill="none">
              <circle cx="18" cy="18" r="12" />
              <polygon points="18,9 22,18 18,27 14,18" />
            </g>
          )}
          {badge.iconType === 'grandmaster-crown' && (
            <g stroke={strokeColor} strokeWidth="2" fill="none">
              <polygon
                points="5,26 8,11 14,18 18,8 22,18 28,11 31,26"
                strokeLinejoin="round"
              />
              <line x1="5" y1="29" x2="31" y2="29" strokeLinecap="round" />
            </g>
          )}
        </svg>
      </div>
    );
  };

  return (
    <section className="space-y-5">
      {/* Header & Interactive Filter Controls */}
      <div className="flex flex-col gap-3 border-b border-slate-200 pb-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span>Mastery Milestones & Distinctions</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono font-semibold text-slate-800 tabular-nums">
              {earnedCount} of {badges.length} Earned
            </span>
          </div>
          <h3 className="mt-1 text-xl font-semibold text-slate-900">
            Earned Achievements & 6th-Grade Readiness Badges
          </h3>
        </div>

        {/* Segmented Filter Control */}
        <div className="flex items-center gap-1 rounded-lg bg-slate-100 p-1">
          {(
            [
              { id: 'all', label: `All Milestones (${badges.length})` },
              { id: 'earned', label: `Earned (${earnedCount})` },
              {
                id: 'progress',
                label: `In Progress (${badges.length - earnedCount})`,
              },
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setBadgeFilter(tab.id)}
              className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap ${
                badgeFilter === tab.id
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Achievements Grid */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
        {filteredBadges.map((badge) => {
          const pct = Math.min(
            100,
            Math.round((badge.progressCurrent / badge.progressTarget) * 100)
          );
          const recMod = CURRICULUM_MODULES.find(
            (m) => m.id === badge.recommendedModuleId
          );

          return (
            <div
              key={badge.id}
              className={`flex flex-col justify-between rounded-xl border p-5 transition-colors ${
                badge.unlocked
                  ? 'border-slate-200 bg-white'
                  : 'border-slate-200/80 bg-slate-50/60'
              }`}
            >
              <div className="space-y-3.5">
                {/* Top Row: Geometric Insignia + Unboxed Status Text */}
                <div className="flex items-start justify-between gap-3">
                  {renderBadgeInsignia(badge)}
                  <div className="text-right font-mono text-xs tabular-nums">
                    {badge.unlocked ? (
                      <span className="font-semibold text-[#059669]">
                        ● EARNED
                      </span>
                    ) : (
                      <span className="font-medium text-slate-500">
                        ◐ {pct}%
                      </span>
                    )}
                    <div className="mt-0.5 text-[11px] text-slate-500">
                      {badge.progressCurrent}/{badge.progressTarget}{' '}
                      {badge.progressUnit}
                    </div>
                  </div>
                </div>

                {/* Title & Unboxed Category Kicker */}
                <div className="space-y-1">
                  <div className="text-[11px] font-medium text-slate-500">
                    {badge.categoryLabel}
                  </div>
                  <h4 className="text-base font-semibold text-slate-900">
                    {badge.title}
                  </h4>
                  <p className="text-xs leading-relaxed text-slate-600">
                    {badge.description}
                  </p>
                </div>
              </div>

              {/* Bottom Progress Bar & Action */}
              <div className="mt-5 space-y-3 border-t border-slate-200/80 pt-3.5">
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-200">
                  <div
                    className={`h-full transition-opacity duration-200 ${
                      badge.unlocked ? 'bg-[#059669]' : 'bg-[#0284C7]'
                    }`}
                    style={{ width: `${pct}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono text-[11px] text-slate-500 tabular-nums">
                    {badge.criteriaText}
                  </span>

                  {!badge.unlocked && recMod ? (
                    <button
                      type="button"
                      onClick={() =>
                        onStartModuleQuiz(badge.recommendedModuleId)
                      }
                      className="font-semibold text-[#0284C7] hover:underline whitespace-nowrap"
                    >
                      Practice Mod {recMod.indexNumber} →
                    </button>
                  ) : (
                    <span className="font-mono text-[11px] font-semibold text-[#059669]">
                      ✓ Milestone Complete
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
