import React, { useState, useEffect } from 'react';
import {
  CurriculumModule,
  DomainCategory,
  ModuleId,
  QuestionAttemptDetail,
  QuizAttemptRecord,
  QuizQuestion,
} from '../types/math';
import {
  CURRICULUM_MODULES,
  CURATED_QUESTIONS,
  gcd,
  generateDynamicQuestions,
} from '../data/curriculumData';
import { InteractiveVisualStage } from './InteractiveVisualStage';

interface QuizWorkspaceProps {
  initialModuleId?: ModuleId | null;
  initialDomain?: DomainCategory | 'mixed';
  customQuestions?: QuizQuestion[] | null;
  customQuizTitle?: string | null;
  onCompleteQuiz: (record: QuizAttemptRecord) => void;
  onSelectModuleChange?: (moduleId: ModuleId | null) => void;
}

export const QuizWorkspace: React.FC<QuizWorkspaceProps> = ({
  initialModuleId = null,
  initialDomain = 'mixed',
  customQuestions = null,
  customQuizTitle = null,
  onCompleteQuiz,
  onSelectModuleChange,
}) => {
  const [selectedDomainFilter, setSelectedDomainFilter] = useState<
    DomainCategory | 'mixed'
  >(initialDomain);
  const [selectedModuleId, setSelectedModuleId] = useState<ModuleId | null>(
    initialModuleId
  );
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [quizTitle, setQuizTitle] = useState<string>('5th Grade Fractions & Decimals Quiz');
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  // User answer states for the current question
  const [selectedOptionIdx, setSelectedOptionIdx] = useState<number | null>(null);
  const [fracNumInput, setFracNumInput] = useState<string>('');
  const [fracDenInput, setFracDenInput] = useState<string>('');
  const [decimalInput, setDecimalInput] = useState<string>('');
  const [visualShadedNum, setVisualShadedNum] = useState<number>(0);
  const [visualDecimalVal, setVisualDecimalVal] = useState<number>(0);

  // Submission & feedback states
  const [showHint, setShowHint] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isCurrentCorrect, setIsCurrentCorrect] = useState<boolean>(false);
  const [feedbackNote, setFeedbackNote] = useState<string>('');
  const [attemptDetails, setAttemptDetails] = useState<QuestionAttemptDetail[]>([]);
  const [quizFinished, setQuizFinished] = useState<boolean>(false);
  const [startTimeMs, setStartTimeMs] = useState<number>(Date.now());

  // Initialize question set when module/domain/customQuestions change
  const loadQuestionSet = (
    modId: ModuleId | null,
    domain: DomainCategory | 'mixed',
    useProcedural: boolean = false,
    overrideQuestions?: QuizQuestion[] | null,
    overrideTitle?: string | null
  ) => {
    let list: QuizQuestion[] = [];
    let title = '';

    if (overrideQuestions && overrideQuestions.length > 0) {
      list = overrideQuestions;
      title = overrideTitle || 'Targeted Concept Review Quiz';
    } else if (useProcedural) {
      list = generateDynamicQuestions(domain, modId ?? undefined, 6);
      const modObj = CURRICULUM_MODULES.find((m) => m.id === modId);
      title = modObj
        ? `Dynamic Practice: ${modObj.indexNumber}. ${modObj.title}`
        : domain === 'fractions'
          ? 'Dynamic Fractions Mastery Set'
          : domain === 'decimals'
            ? 'Dynamic Decimals Mastery Set'
            : 'Dynamic 5th-Grade Mixed Spiral Quiz';
    } else if (modId) {
      list = CURATED_QUESTIONS.filter((q) => q.moduleId === modId);
      const modObj = CURRICULUM_MODULES.find((m) => m.id === modId);
      title = modObj
        ? `${modObj.indexNumber}. ${modObj.title}`
        : 'Module Assessment';
    } else if (domain === 'fractions') {
      list = CURATED_QUESTIONS.filter((q) => q.domain === 'fractions').slice(0, 8);
      title = 'Fractions Domain Assessment (CCSS.5.NF)';
    } else if (domain === 'decimals') {
      list = CURATED_QUESTIONS.filter((q) => q.domain === 'decimals').slice(0, 8);
      title = 'Decimals Domain Assessment (CCSS.5.NBT)';
    } else {
      // Balanced 8-question spiral assessment (1 per module)
      list = CURRICULUM_MODULES.map(
        (m) => CURATED_QUESTIONS.find((q) => q.moduleId === m.id)!
      ).filter(Boolean);
      title = 'Full 5th-Grade Fractions & Decimals Diagnostic';
    }

    setQuestions(list);
    setQuizTitle(title);
    setCurrentIndex(0);
    setAttemptDetails([]);
    setQuizFinished(false);
    setStartTimeMs(Date.now());
    resetQuestionInputs(list[0]);
  };

  const resetQuestionInputs = (q?: QuizQuestion) => {
    setSelectedOptionIdx(null);
    setFracNumInput('');
    setFracDenInput('');
    setDecimalInput('');
    setVisualShadedNum(q?.visualConfig.numB ?? 0);
    setVisualDecimalVal(q?.visualConfig.decimalA ?? 0);
    setShowHint(false);
    setIsSubmitted(false);
    setIsCurrentCorrect(false);
    setFeedbackNote('');
  };

  useEffect(() => {
    if (customQuestions && customQuestions.length > 0) {
      loadQuestionSet(null, 'mixed', false, customQuestions, customQuizTitle);
    } else if (initialModuleId) {
      const mod = CURRICULUM_MODULES.find((m) => m.id === initialModuleId);
      if (mod) setSelectedDomainFilter(mod.domain);
      setSelectedModuleId(initialModuleId);
      loadQuestionSet(initialModuleId, mod?.domain ?? 'mixed', false);
    } else {
      setSelectedModuleId(null);
      setSelectedDomainFilter(initialDomain);
      loadQuestionSet(null, initialDomain, false);
    }
  }, [initialModuleId, initialDomain, customQuestions]);

  const activeQuestion = questions[currentIndex];
  const activeModule: CurriculumModule | undefined = activeQuestion
    ? CURRICULUM_MODULES.find((m) => m.id === activeQuestion.moduleId)
    : undefined;

  const evaluateCurrentQuestion = () => {
    if (!activeQuestion || isSubmitted) return;

    let correct = false;
    let userAnsText = '';
    let expectedAnsText = '';
    let note = '';

    if (activeQuestion.type === 'multiple-choice') {
      if (selectedOptionIdx === null) return;
      userAnsText = activeQuestion.options?.[selectedOptionIdx] ?? '';
      expectedAnsText =
        activeQuestion.options?.[activeQuestion.correctChoiceIndex ?? 0] ?? '';
      correct = selectedOptionIdx === activeQuestion.correctChoiceIndex;
    } else if (activeQuestion.type === 'visual-fraction-shade') {
      const target = activeQuestion.correctFraction!;
      const den = activeQuestion.visualConfig.targetDen ?? target.den;
      userAnsText = `${visualShadedNum}/${den} shaded`;
      expectedAnsText = `${target.num}/${target.den}`;
      correct =
        Math.abs(visualShadedNum / den - target.num / target.den) < 0.0001;
    } else if (activeQuestion.type === 'visual-decimal-grid') {
      const targetDec = activeQuestion.correctDecimal ?? 0;
      userAnsText = `${visualDecimalVal.toFixed(2)} (${Math.round(visualDecimalVal * 100)}/100 shaded)`;
      expectedAnsText = targetDec.toFixed(2);
      correct = Math.abs(visualDecimalVal - targetDec) < 0.001;
    } else if (activeQuestion.type === 'fraction-input') {
      const n = parseInt(fracNumInput.trim(), 10);
      const d = parseInt(fracDenInput.trim(), 10);
      if (isNaN(n) || isNaN(d) || d === 0) return;

      const target = activeQuestion.correctFraction!;
      userAnsText = `${n}/${d}`;
      expectedAnsText = `${target.num}/${target.den}`;

      const valEqual = Math.abs(n / d - target.num / target.den) < 0.0001;
      if (target.requireSimplified) {
        const g = gcd(n, d);
        if (valEqual && g === 1 && n === target.num && d === target.den) {
          correct = true;
        } else if (valEqual && g > 1) {
          correct = false;
          note = `Your fraction ${n}/${d} is mathematically equivalent, but this question requires simplest form (${target.num}/${target.den}). Divide numerator and denominator by ${g}.`;
        }
      } else {
        correct = valEqual && d === target.den;
      }
    } else if (activeQuestion.type === 'decimal-input') {
      const parsed = parseFloat(decimalInput.trim());
      if (isNaN(parsed)) return;
      const targetDec = activeQuestion.correctDecimal ?? 0;
      userAnsText = decimalInput.trim();
      expectedAnsText = String(targetDec);
      correct = Math.abs(parsed - targetDec) < 0.0005;
    }

    setIsSubmitted(true);
    setIsCurrentCorrect(correct);
    setFeedbackNote(note);

    const detail: QuestionAttemptDetail = {
      questionId: activeQuestion.id,
      moduleId: activeQuestion.moduleId,
      domain: activeQuestion.domain,
      prompt: activeQuestion.prompt,
      userAnswerText: userAnsText,
      correctAnswerText: expectedAnsText,
      isCorrect: correct,
      explanation: activeQuestion.workedSteps.join(' → '),
    };

    setAttemptDetails((prev) => [...prev, detail]);
  };

  const handleNextOrFinish = () => {
    if (currentIndex + 1 < questions.length) {
      const nextIdx = currentIndex + 1;
      setCurrentIndex(nextIdx);
      resetQuestionInputs(questions[nextIdx]);
    } else {
      // Complete Quiz
      const correctCount = attemptDetails.filter((a) => a.isCorrect).length;
      const total = questions.length;
      const acc = Math.round((correctCount / Math.max(1, total)) * 100);
      const elapsedSec = Math.max(
        5,
        Math.round((Date.now() - startTimeMs) / 1000)
      );

      const record: QuizAttemptRecord = {
        id: `quiz-${Date.now()}`,
        timestamp: 'Just now',
        title: quizTitle,
        domain: selectedModuleId
          ? (CURRICULUM_MODULES.find((m) => m.id === selectedModuleId)?.domain ??
            'mixed')
          : selectedDomainFilter,
        moduleId: selectedModuleId ?? undefined,
        score: correctCount,
        totalQuestions: total,
        accuracyPercent: acc,
        durationSeconds: elapsedSec,
        questionResults: attemptDetails,
      };

      setQuizFinished(true);
      onCompleteQuiz(record);
    }
  };

  const canSubmit = () => {
    if (!activeQuestion || isSubmitted) return false;
    if (activeQuestion.type === 'multiple-choice') {
      return selectedOptionIdx !== null;
    }
    if (activeQuestion.type === 'fraction-input') {
      const n = parseInt(fracNumInput.trim(), 10);
      const d = parseInt(fracDenInput.trim(), 10);
      return !isNaN(n) && !isNaN(d) && d > 0;
    }
    if (activeQuestion.type === 'decimal-input') {
      return decimalInput.trim().length > 0 && !isNaN(parseFloat(decimalInput));
    }
    if (activeQuestion.type === 'visual-fraction-shade') {
      return visualShadedNum > 0;
    }
    if (activeQuestion.type === 'visual-decimal-grid') {
      return visualDecimalVal > 0;
    }
    return false;
  };

  // Compute live visual stage config synchronized with student inputs
  const getSynchronizedVisualConfig = () => {
    if (!activeQuestion) return { mode: 'fraction-bar' as const };
    const base = { ...activeQuestion.visualConfig };

    if (activeQuestion.type === 'fraction-input') {
      const n = parseInt(fracNumInput, 10);
      const d = parseInt(fracDenInput, 10);
      if (!isNaN(n) && !isNaN(d) && d > 0 && d <= 24) {
        base.numB = Math.min(n, d);
        base.denB = d;
      }
    }
    return base;
  };

  return (
    <div className="space-y-8">
      {/* Top Quiz Filter & Generator Deck */}
      <div className="flex flex-col gap-4 border-b border-slate-200 pb-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span>Interactive Assessment Studio</span>
            <span aria-hidden="true">·</span>
            <span>Grade 5 Mathematics</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono tabular-nums">
              {questions.length} Questions
            </span>
          </div>
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
            {quizTitle}
          </h2>
        </div>

        {/* Interactive Filter Controls */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Segmented Domain Selector */}
          <div className="flex items-center gap-1 rounded-lg bg-slate-100 p-1">
            {(
              [
                { id: 'mixed', label: 'All Topics' },
                { id: 'fractions', label: 'Fractions (5.NF)' },
                { id: 'decimals', label: 'Decimals (5.NBT)' },
              ] as const
            ).map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  setSelectedDomainFilter(tab.id);
                  setSelectedModuleId(null);
                  onSelectModuleChange?.(null);
                  loadQuestionSet(null, tab.id, false);
                }}
                className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap ${
                  selectedDomainFilter === tab.id && !selectedModuleId
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Module Selector Dropdown */}
          <select
            aria-label="Select Curriculum Module"
            value={selectedModuleId ?? ''}
            onChange={(e) => {
              const val = (e.target.value || null) as ModuleId | null;
              setSelectedModuleId(val);
              onSelectModuleChange?.(val);
              if (val) {
                const mod = CURRICULUM_MODULES.find((m) => m.id === val);
                if (mod) setSelectedDomainFilter(mod.domain);
                loadQuestionSet(val, mod?.domain ?? 'mixed', false);
              } else {
                loadQuestionSet(null, selectedDomainFilter, false);
              }
            }}
            className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-medium text-slate-800 focus:border-[#0284C7] focus:outline-none"
          >
            <option value="">All Modules in Selected Track</option>
            <optgroup label="Fractions (CCSS.5.NF)">
              {CURRICULUM_MODULES.filter((m) => m.domain === 'fractions').map(
                (m) => (
                  <option key={m.id} value={m.id}>
                    {m.indexNumber}. {m.title}
                  </option>
                )
              )}
            </optgroup>
            <optgroup label="Decimals (CCSS.5.NBT)">
              {CURRICULUM_MODULES.filter((m) => m.domain === 'decimals').map(
                (m) => (
                  <option key={m.id} value={m.id}>
                    {m.indexNumber}. {m.title}
                  </option>
                )
              )}
            </optgroup>
          </select>

          {/* Generate Fresh Practice Set Action */}
          <button
            type="button"
            onClick={() =>
              loadQuestionSet(selectedModuleId, selectedDomainFilter, true)
            }
            className="rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-xs font-semibold text-slate-800 transition-colors hover:bg-slate-50 whitespace-nowrap"
          >
            Generate Fresh Practice Set
          </button>
        </div>
      </div>

      {/* ================= END OF QUIZ SUMMARY SCREEN ================= */}
      {quizFinished ? (
        <div className="rounded-xl border border-slate-200 bg-white p-8 space-y-8">
          <div className="flex flex-col gap-4 border-b border-slate-200 pb-6 md:flex-row md:items-center md:justify-between">
            <div className="space-y-1">
              <div className="text-xs font-medium text-slate-500">
                Assessment Complete · Diagnostic Summary
              </div>
              <h3 className="text-2xl font-semibold text-slate-900">
                {quizTitle} — Final Report
              </h3>
            </div>
            <div className="flex items-center gap-3">
              {attemptDetails.some((d) => !d.isCorrect) && (
                <button
                  type="button"
                  onClick={() => {
                    const missedIds = new Set(
                      attemptDetails
                        .filter((d) => !d.isCorrect)
                        .map((d) => d.questionId)
                    );
                    const missedQuestions = questions.filter((q) =>
                      missedIds.has(q.id)
                    );
                    loadQuestionSet(
                      selectedModuleId,
                      selectedDomainFilter,
                      false,
                      missedQuestions,
                      `Retry Missed Concepts (${missedQuestions.length} Questions)`
                    );
                  }}
                  className="rounded-lg border border-[#D97706] bg-white px-4 py-2 text-xs font-semibold text-[#D97706] transition-colors hover:bg-amber-50 whitespace-nowrap"
                >
                  Retry Missed Questions (
                  {attemptDetails.filter((d) => !d.isCorrect).length})
                </button>
              )}
              <button
                type="button"
                onClick={() =>
                  loadQuestionSet(selectedModuleId, selectedDomainFilter, true)
                }
                className="rounded-lg bg-[#0284C7] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#0369A1] whitespace-nowrap"
              >
                Start New Dynamic Set
              </button>
            </div>
          </div>

          {/* Key Quantitative Metrics */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            <div className="border-l-2 border-[#0284C7] pl-4">
              <div className="text-xs text-slate-500">Accuracy Score</div>
              <div className="mt-1 font-mono text-3xl font-semibold text-slate-900 tabular-nums">
                {Math.round(
                  (attemptDetails.filter((a) => a.isCorrect).length /
                    Math.max(1, questions.length)) *
                    100
                )}
                %
              </div>
              <div className="mt-1 text-xs text-slate-600 font-mono tabular-nums">
                {attemptDetails.filter((a) => a.isCorrect).length} of{' '}
                {questions.length} Correct
              </div>
            </div>

            <div className="border-l-2 border-[#059669] pl-4">
              <div className="text-xs text-slate-500">Mastery Diagnostic</div>
              <div className="mt-1 text-xl font-semibold text-slate-900">
                {attemptDetails.filter((a) => a.isCorrect).length /
                  Math.max(1, questions.length) >=
                0.8 ? (
                  <span className="text-[#059669]">● Mastery Demonstrated</span>
                ) : attemptDetails.filter((a) => a.isCorrect).length /
                    Math.max(1, questions.length) >=
                  0.6 ? (
                  <span className="text-[#0284C7]">◐ Developing Fluency</span>
                ) : (
                  <span className="text-[#D97706]">▲ Concept Review Recommended</span>
                )}
              </div>
              <div className="mt-1 text-xs text-slate-600">
                Saved to Student Progress Record
              </div>
            </div>

            <div className="border-l-2 border-slate-400 pl-4">
              <div className="text-xs text-slate-500">Domain Breakdown</div>
              <div className="mt-1 font-mono text-sm font-semibold text-slate-900 tabular-nums">
                Fractions:{' '}
                {
                  attemptDetails.filter(
                    (a) => a.domain === 'fractions' && a.isCorrect
                  ).length
                }
                /
                {
                  attemptDetails.filter((a) => a.domain === 'fractions')
                    .length
                }{' '}
                · Decimals:{' '}
                {
                  attemptDetails.filter(
                    (a) => a.domain === 'decimals' && a.isCorrect
                  ).length
                }
                /
                {attemptDetails.filter((a) => a.domain === 'decimals').length}
              </div>
              <div className="mt-1 text-xs text-slate-600">
                CCSS.5.NF & CCSS.5.NBT Aligned
              </div>
            </div>
          </div>

          {/* Question-by-Question Review Table */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-slate-900">
              Question-by-Question Solution Log
            </h4>
            <div className="divide-y divide-slate-200 border-t border-b border-slate-200">
              {attemptDetails.map((item, idx) => (
                <div
                  key={item.questionId + idx}
                  className="py-4 flex flex-col gap-2 md:flex-row md:items-start md:justify-between"
                >
                  <div className="space-y-1 max-w-2xl">
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <span className="font-mono font-semibold text-slate-700 tabular-nums">
                        Q{idx + 1}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span className="capitalize">{item.domain}</span>
                      <span aria-hidden="true">·</span>
                      {item.isCorrect ? (
                        <span className="font-semibold text-[#059669]">
                          ✓ Correct
                        </span>
                      ) : (
                        <span className="font-semibold text-[#DC2626]">
                          ✕ Needs Review
                        </span>
                      )}
                    </div>
                    <p className="text-sm font-medium text-slate-900">
                      {item.prompt}
                    </p>
                    <p className="text-xs text-slate-600">{item.explanation}</p>
                  </div>
                  <div className="flex shrink-0 flex-col md:items-end font-mono text-xs tabular-nums gap-1">
                    <span className="text-slate-600">
                      Your Answer:{' '}
                      <strong
                        className={
                          item.isCorrect ? 'text-[#059669]' : 'text-[#DC2626]'
                        }
                      >
                        {item.userAnswerText}
                      </strong>
                    </span>
                    {!item.isCorrect && (
                      <span className="text-slate-800">
                        Correct Answer:{' '}
                        <strong className="text-[#059669]">
                          {item.correctAnswerText}
                        </strong>
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : activeQuestion ? (
        /* ================= ACTIVE TWO-ZONE SANDBOX QUIZ WORKSPACE ================= */
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start">
          {/* LEFT ZONE (60%): Interactive Visual Stage */}
          <div className="rounded-xl border border-slate-200 bg-white p-6 lg:col-span-7">
            <InteractiveVisualStage
              config={getSynchronizedVisualConfig()}
              interactiveShadedNum={
                activeQuestion.type === 'visual-fraction-shade'
                  ? visualShadedNum
                  : undefined
              }
              onShadedNumChange={(num) => {
                setVisualShadedNum(num);
              }}
              interactiveDecimal={
                activeQuestion.type === 'visual-decimal-grid'
                  ? visualDecimalVal
                  : activeQuestion.type === 'decimal-input' &&
                      !isNaN(parseFloat(decimalInput))
                    ? parseFloat(decimalInput) % 1 || parseFloat(decimalInput)
                    : undefined
              }
              onDecimalChange={(val) => {
                setVisualDecimalVal(val);
              }}
              readOnly={isSubmitted}
            />
          </div>

          {/* RIGHT ZONE (40%): Question & Response Deck */}
          <div className="rounded-xl border border-slate-200 bg-white p-6 flex flex-col gap-5 lg:col-span-5">
            {/* Progress & Unboxed Metadata Header */}
            <div className="space-y-2 border-b border-slate-200 pb-4">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <div className="flex items-center gap-1.5">
                  <span className="font-mono font-semibold text-slate-800 tabular-nums">
                    Question {currentIndex + 1} of {questions.length}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>{activeModule?.ccssCode ?? 'CCSS.5'}</span>
                  <span aria-hidden="true">·</span>
                  <span>{activeQuestion.difficulty}</span>
                </div>
                <span className="font-mono text-xs text-[#0284C7] tabular-nums">
                  {attemptDetails.filter((a) => a.isCorrect).length} Correct
                </span>
              </div>

              {/* Clean Segmented Question Progress Bar */}
              <div className="grid grid-cols-8 gap-1 pt-1">
                {questions.map((q, idx) => {
                  const detail = attemptDetails[idx];
                  let barColor = 'bg-slate-200';
                  if (detail) {
                    barColor = detail.isCorrect ? 'bg-[#059669]' : 'bg-[#DC2626]';
                  } else if (idx === currentIndex) {
                    barColor = 'bg-[#0284C7]';
                  }
                  return (
                    <div
                      key={q.id}
                      className={`h-1.5 rounded-xs transition-colors ${barColor}`}
                    />
                  );
                })}
              </div>
            </div>

            {/* Scenario Kicker & Prompt */}
            <div className="space-y-2">
              <div className="text-xs font-medium text-[#0284C7]">
                {activeQuestion.contextScenario}
              </div>
              <h3 className="text-lg font-semibold leading-snug text-slate-900">
                {activeQuestion.prompt}
              </h3>
              {activeQuestion.subPrompt && (
                <p className="text-xs leading-relaxed text-slate-600">
                  {activeQuestion.subPrompt}
                </p>
              )}
            </div>

            {/* RESPONSE CONTROLS BY QUESTION TYPE */}
            <div className="space-y-3 pt-1">
              {/* 1. Multiple Choice */}
              {activeQuestion.type === 'multiple-choice' &&
                activeQuestion.options && (
                  <div className="space-y-2">
                    {activeQuestion.options.map((opt, idx) => {
                      const isSelected = selectedOptionIdx === idx;
                      const isAnswer =
                        idx === activeQuestion.correctChoiceIndex;

                      let btnStyle =
                        'border-slate-200 bg-white text-slate-800 hover:border-slate-400';
                      if (isSubmitted) {
                        if (isAnswer) {
                          btnStyle =
                            'border-[#059669] bg-emerald-50/70 text-slate-900 font-semibold';
                        } else if (isSelected && !isAnswer) {
                          btnStyle =
                            'border-[#DC2626] bg-red-50/70 text-slate-900';
                        }
                      } else if (isSelected) {
                        btnStyle =
                          'border-[#0284C7] bg-sky-50/70 text-slate-900 font-semibold ring-1 ring-[#0284C7]';
                      }

                      return (
                        <button
                          key={idx}
                          type="button"
                          disabled={isSubmitted}
                          onClick={() => setSelectedOptionIdx(idx)}
                          className={`flex w-full items-center justify-between rounded-lg border px-4 py-3 text-left text-sm transition-colors ${btnStyle}`}
                        >
                          <div className="flex items-center gap-3">
                            <span className="font-mono text-xs font-semibold text-slate-500 tabular-nums">
                              {String.fromCharCode(65 + idx)}.
                            </span>
                            <span className="font-mono tabular-nums">{opt}</span>
                          </div>
                          {isSubmitted && isAnswer && (
                            <span className="font-mono text-xs font-semibold text-[#059669]">
                              ✓ Correct
                            </span>
                          )}
                          {isSubmitted && isSelected && !isAnswer && (
                            <span className="font-mono text-xs font-semibold text-[#DC2626]">
                              ✕ Your Choice
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}

              {/* 2. Fraction Input */}
              {activeQuestion.type === 'fraction-input' && (
                <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                  <div className="mb-3 text-xs font-medium text-slate-600">
                    Enter Numerator and Denominator:
                  </div>
                  <div className="flex items-center justify-center gap-6">
                    <div className="flex flex-col items-center gap-1.5">
                      <label
                        htmlFor="frac-num"
                        className="text-[11px] font-medium text-slate-500"
                      >
                        Numerator (Top)
                      </label>
                      <input
                        id="frac-num"
                        type="number"
                        min="0"
                        max="200"
                        disabled={isSubmitted}
                        value={fracNumInput}
                        onChange={(e) => setFracNumInput(e.target.value)}
                        placeholder="?"
                        className="w-24 rounded-lg border border-slate-300 bg-white px-3 py-2 text-center font-mono text-lg font-semibold text-slate-900 tabular-nums focus:border-[#0284C7] focus:outline-none"
                      />
                      <div className="h-0.5 w-24 bg-slate-800 my-0.5" />
                      <input
                        id="frac-den"
                        type="number"
                        min="1"
                        max="200"
                        disabled={isSubmitted}
                        value={fracDenInput}
                        onChange={(e) => setFracDenInput(e.target.value)}
                        placeholder="?"
                        className="w-24 rounded-lg border border-slate-300 bg-white px-3 py-2 text-center font-mono text-lg font-semibold text-slate-900 tabular-nums focus:border-[#0284C7] focus:outline-none"
                      />
                      <label
                        htmlFor="frac-den"
                        className="text-[11px] font-medium text-slate-500"
                      >
                        Denominator (Bottom)
                      </label>
                    </div>

                    <div className="text-xs text-slate-600 space-y-1 max-w-[180px]">
                      <div className="font-mono font-semibold text-slate-800 tabular-nums">
                        Preview:{' '}
                        {fracNumInput || '?'} / {fracDenInput || '?'}
                      </div>
                      {activeQuestion.correctFraction?.requireSimplified && (
                        <div className="text-slate-500">
                          Note: Express your fraction in simplest form (lowest terms).
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* 3. Decimal Input */}
              {activeQuestion.type === 'decimal-input' && (
                <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 space-y-2">
                  <label
                    htmlFor="dec-input"
                    className="block text-xs font-medium text-slate-700"
                  >
                    Enter Exact Decimal Value:
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      id="dec-input"
                      type="number"
                      step="0.001"
                      disabled={isSubmitted}
                      value={decimalInput}
                      onChange={(e) => setDecimalInput(e.target.value)}
                      placeholder="e.g. 0.75"
                      className="w-40 rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 font-mono text-lg font-semibold text-slate-900 tabular-nums focus:border-[#0284C7] focus:outline-none"
                    />
                    <span className="font-mono text-xs text-slate-500 tabular-nums">
                      {decimalInput && !isNaN(parseFloat(decimalInput))
                        ? `= ${parseFloat(decimalInput)}`
                        : 'Align decimal point carefully'}
                    </span>
                  </div>
                </div>
              )}

              {/* 4. Visual Fraction Shade Response Readout */}
              {activeQuestion.type === 'visual-fraction-shade' && (
                <div className="rounded-lg border border-[#0284C7]/40 bg-sky-50/50 p-4 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-xs font-medium text-slate-700">
                      Current Shaded Fraction on Left Canvas:
                    </div>
                    <div className="text-xs text-slate-500">
                      Click segments on Bar B or use +1 / -1 buttons.
                    </div>
                  </div>
                  <div className="font-mono text-xl font-semibold text-[#0284C7] tabular-nums">
                    {visualShadedNum}/
                    {activeQuestion.visualConfig.targetDen ??
                      activeQuestion.correctFraction?.den}
                  </div>
                </div>
              )}

              {/* 5. Visual Decimal Grid Response Readout */}
              {activeQuestion.type === 'visual-decimal-grid' && (
                <div className="rounded-lg border border-[#0284C7]/40 bg-sky-50/50 p-4 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-xs font-medium text-slate-700">
                      Current Shaded Decimal on 10 × 10 Grid:
                    </div>
                    <div className="text-xs text-slate-500">
                      Click squares on the grid or use +0.10 / +0.01 buttons.
                    </div>
                  </div>
                  <div className="font-mono text-xl font-semibold text-[#0284C7] tabular-nums">
                    {visualDecimalVal.toFixed(2)} (
                    {Math.round(visualDecimalVal * 100)}/100)
                  </div>
                </div>
              )}
            </div>

            {/* Concept Hint Toggle */}
            {!isSubmitted && (
              <div className="space-y-2">
                <button
                  type="button"
                  onClick={() => setShowHint((h) => !h)}
                  className="text-xs font-medium text-slate-600 underline decoration-slate-300 underline-offset-4 hover:text-slate-900"
                >
                  {showHint ? 'Hide Concept Hint' : 'Need a Concept Hint?'}
                </button>
                {showHint && (
                  <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-xs leading-relaxed text-slate-700">
                    <strong className="font-semibold text-slate-900">
                      Strategy Hint:{' '}
                    </strong>
                    {activeQuestion.hint}
                  </div>
                )}
              </div>
            )}

            {/* Dual-Coded Worked Solution Feedback after Submission */}
            {isSubmitted && (
              <div
                className={`rounded-lg border p-4 space-y-2.5 ${
                  isCurrentCorrect
                    ? 'border-[#059669]/40 bg-emerald-50/50'
                    : 'border-[#DC2626]/40 bg-red-50/50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`font-mono text-xs font-semibold ${
                      isCurrentCorrect ? 'text-[#059669]' : 'text-[#DC2626]'
                    }`}
                  >
                    {isCurrentCorrect
                      ? '✓ CORRECT SOLUTION'
                      : '✕ REVIEW WORKED SOLUTION'}
                  </span>
                  <span className="font-mono text-xs font-semibold text-slate-800 tabular-nums">
                    Answer:{' '}
                    {activeQuestion.correctFraction
                      ? `${activeQuestion.correctFraction.num}/${activeQuestion.correctFraction.den}`
                      : activeQuestion.correctDecimal !== undefined
                        ? activeQuestion.correctDecimal
                        : activeQuestion.options?.[
                            activeQuestion.correctChoiceIndex ?? 0
                          ]}
                  </span>
                </div>

                {feedbackNote && (
                  <p className="text-xs font-medium text-[#D97706]">
                    ▲ {feedbackNote}
                  </p>
                )}

                <div className="space-y-1 border-t border-slate-200/80 pt-2">
                  <div className="text-[11px] font-semibold text-slate-700">
                    Step-by-Step Mathematical Breakdown:
                  </div>
                  <ol className="list-decimal pl-4 space-y-1 text-xs text-slate-700">
                    {activeQuestion.workedSteps.map((step, sIdx) => (
                      <li key={sIdx} className="leading-relaxed">
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            )}

            {/* Primary Action Bar */}
            <div className="flex items-center justify-between border-t border-slate-200 pt-4 mt-auto">
              <span className="text-xs text-slate-500">
                {activeModule
                  ? `${activeModule.indexNumber}. ${activeModule.title}`
                  : ''}
              </span>

              {!isSubmitted ? (
                <button
                  type="button"
                  disabled={!canSubmit()}
                  onClick={evaluateCurrentQuestion}
                  className="rounded-lg bg-[#0F172A] px-5 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-slate-800 disabled:opacity-40 whitespace-nowrap"
                >
                  Check Answer
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleNextOrFinish}
                  className="rounded-lg bg-[#0284C7] px-5 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-[#0369A1] whitespace-nowrap"
                >
                  {currentIndex + 1 < questions.length
                    ? 'Next Question →'
                    : 'View Diagnostic Report →'}
                </button>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};
