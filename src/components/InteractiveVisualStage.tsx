import React, { useState, useEffect } from 'react';
import { VisualStageConfig } from '../types/math';
import { gcd, lcm } from '../data/curriculumData';

interface InteractiveVisualStageProps {
  config: VisualStageConfig;
  interactiveShadedNum?: number;
  onShadedNumChange?: (num: number, den: number) => void;
  interactiveDecimal?: number;
  onDecimalChange?: (val: number) => void;
  readOnly?: boolean;
}

export const InteractiveVisualStage: React.FC<InteractiveVisualStageProps> = ({
  config,
  interactiveShadedNum,
  onShadedNumChange,
  interactiveDecimal,
  onDecimalChange,
  readOnly = false,
}) => {
  // Local state for interactive exploration when not controlled externally
  const [localNumA, setLocalNumA] = useState<number>(config.numA ?? 3);
  const [localDenA, setLocalDenA] = useState<number>(config.denA ?? 4);
  const [localNumB, setLocalNumB] = useState<number>(config.numB ?? 6);
  const [localDenB, setLocalDenB] = useState<number>(config.targetDen ?? config.denB ?? 8);
  const [showLcdLines, setShowLcdLines] = useState<boolean>(true);
  const [areaLayerMode, setAreaLayerMode] = useState<'both' | 'rows' | 'cols'>('both');
  const [localDecimal, setLocalDecimal] = useState<number>(config.decimalA ?? 0.47);

  useEffect(() => {
    setLocalNumA(config.numA ?? 3);
    setLocalDenA(config.denA ?? 4);
    setLocalNumB(config.numB ?? 0);
    setLocalDenB(config.targetDen ?? config.denB ?? 12);
    setLocalDecimal(config.decimalA ?? 0.47);
  }, [config]);

  const activeShadedNum =
    interactiveShadedNum !== undefined ? interactiveShadedNum : localNumB;
  const activeDenB = config.targetDen ?? localDenB;

  const handleSegmentClick = (index: number) => {
    if (readOnly) return;
    // Clicking segment i sets shaded count to i+1, or if already i+1, unshades to i
    const nextNum = activeShadedNum === index + 1 ? index : index + 1;
    setLocalNumB(nextNum);
    if (onShadedNumChange) {
      onShadedNumChange(nextNum, activeDenB);
    }
  };

  const handleStepNumB = (delta: number) => {
    if (readOnly) return;
    const next = Math.max(0, Math.min(activeDenB, activeShadedNum + delta));
    setLocalNumB(next);
    if (onShadedNumChange) {
      onShadedNumChange(next, activeDenB);
    }
  };

  const activeDecimal =
    interactiveDecimal !== undefined ? interactiveDecimal : localDecimal;

  const updateDecimalValue = (nextVal: number) => {
    if (readOnly) return;
    const clamped = Math.max(0, Math.min(1, Number(nextVal.toFixed(3))));
    setLocalDecimal(clamped);
    if (onDecimalChange) {
      onDecimalChange(clamped);
    }
  };

  // ================= 1. FRACTION BAR EQUIVALENCE STUDIO =================
  if (config.mode === 'fraction-bar') {
    const refRatio = localNumA / localDenA;
    const userRatio = activeShadedNum / activeDenB;
    const isEquivalent = Math.abs(refRatio - userRatio) < 0.0001;
    const gUser = gcd(activeShadedNum, activeDenB);

    return (
      <div className="flex flex-col gap-6">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-3">
          <div>
            <span className="text-xs font-medium text-slate-500">
              Interactive Model · Proportional Fraction Bars
            </span>
            <h3 className="text-lg font-semibold text-slate-900">
              Equivalence & Partition Comparison
            </h3>
          </div>
          <div className="font-mono text-xs tabular-nums">
            {isEquivalent ? (
              <span className="font-semibold text-[#059669]">
                ● EQUIVALENT PROPORTION ({localNumA}/{localDenA} = {activeShadedNum}/{activeDenB})
              </span>
            ) : (
              <span className="font-medium text-[#D97706]">
                ▲ DIFFERENCE: {Math.abs((refRatio - userRatio) * 100).toFixed(1)}% OF UNIT
              </span>
            )}
          </div>
        </div>

        {/* Reference Bar A */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-medium text-slate-700">
              Reference Bar A · Partitioned into {localDenA} Equal Parts
            </span>
            <span className="font-mono font-semibold text-[#0284C7] tabular-nums">
              {localNumA}/{localDenA} ({(refRatio * 100).toFixed(1)}%)
            </span>
          </div>
          <div className="relative flex h-12 w-full overflow-hidden rounded-lg border border-slate-300 bg-slate-100">
            {Array.from({ length: localDenA }).map((_, idx) => {
              const shaded = idx < localNumA;
              return (
                <div
                  key={idx}
                  className={`flex flex-1 items-center justify-center border-r border-slate-300/80 last:border-r-0 font-mono text-xs tabular-nums transition-colors duration-150 ${
                    shaded
                      ? 'bg-[#0284C7] font-semibold text-white'
                      : 'bg-white text-slate-400'
                  }`}
                >
                  {localDenA <= 16 ? `1/${localDenA}` : ''}
                </div>
              );
            })}
          </div>
        </div>

        {/* Equivalence Alignment Guide */}
        <div className="relative flex items-center justify-between px-1 text-xs text-slate-500">
          <span>0 (Origin)</span>
          <span className="font-mono text-slate-600 tabular-nums">
            Target Boundary: {(refRatio * 100).toFixed(1)}% of Whole
          </span>
          <span>1 Whole</span>
        </div>

        {/* Interactive Student Bar B */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-medium text-slate-700">
              Interactive Workspace Bar B · Click Segments to Shade ({activeDenB} Parts)
            </span>
            <span className="font-mono font-semibold text-slate-900 tabular-nums">
              {activeShadedNum}/{activeDenB}
              {activeShadedNum > 0 && gUser > 1
                ? ` · Simplifies to ${activeShadedNum / gUser}/${activeDenB / gUser}`
                : ''}
            </span>
          </div>
          <div className="relative flex h-14 w-full overflow-hidden rounded-lg border-2 border-slate-800 bg-white">
            {Array.from({ length: activeDenB }).map((_, idx) => {
              const shaded = idx < activeShadedNum;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSegmentClick(idx)}
                  aria-label={`Shade ${idx + 1} of ${activeDenB}`}
                  className={`flex flex-1 items-center justify-center border-r border-slate-200 last:border-r-0 font-mono text-xs tabular-nums transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-[#0284C7] ${
                    shaded
                      ? isEquivalent
                        ? 'bg-[#059669] font-semibold text-white'
                        : 'bg-[#0284C7]/85 font-semibold text-white'
                      : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
                  }`}
                >
                  {activeDenB <= 16 ? `${idx + 1}` : ''}
                </button>
              );
            })}
          </div>
        </div>

        {/* Interactive Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => handleStepNumB(-1)}
              disabled={activeShadedNum <= 0}
              className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 font-mono text-xs font-medium text-slate-700 transition-colors hover:bg-slate-50 disabled:opacity-40 whitespace-nowrap"
            >
              -1 Segment
            </button>
            <button
              type="button"
              onClick={() => handleStepNumB(1)}
              disabled={activeShadedNum >= activeDenB}
              className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 font-mono text-xs font-medium text-slate-700 transition-colors hover:bg-slate-50 disabled:opacity-40 whitespace-nowrap"
            >
              +1 Segment
            </button>
            <button
              type="button"
              onClick={() => {
                setLocalNumB(0);
                onShadedNumChange?.(0, activeDenB);
              }}
              className="rounded-lg border border-slate-200 bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-600 transition-colors hover:bg-slate-200 whitespace-nowrap"
            >
              Clear Shading
            </button>
          </div>

          {!config.targetDen && (
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500">Denominator B:</span>
              {[4, 6, 8, 10, 12, 15, 20].map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => {
                    setLocalDenB(d);
                    setLocalNumB(Math.min(activeShadedNum, d));
                  }}
                  className={`rounded-md px-2.5 py-1 font-mono text-xs font-medium tabular-nums transition-colors ${
                    activeDenB === d
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  /{d}
                </button>
              ))}
            </div>
          )}
        </div>

        {config.canvasCaption && (
          <p className="border-t border-slate-200/80 pt-3 text-xs text-slate-600">
            {config.canvasCaption}
          </p>
        )}
      </div>
    );
  }

  // ================= 2. UNLIKE FRACTIONS LCD VISUALIZER =================
  if (config.mode === 'lcd-grid') {
    const n1 = config.numA ?? 1;
    const d1 = config.denA ?? 3;
    const n2 = config.numB ?? 1;
    const d2 = config.denB ?? 4;
    const op = config.operation ?? '+';
    const commonDen = lcm(d1, d2);
    const scaledN1 = n1 * (commonDen / d1);
    const scaledN2 = n2 * (commonDen / d2);
    const resultNum = op === '-' ? Math.max(0, scaledN1 - scaledN2) : scaledN1 + scaledN2;
    const gRes = gcd(resultNum, commonDen);

    return (
      <div className="flex flex-col gap-5">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-3">
          <div>
            <span className="text-xs font-medium text-slate-500">
              Interactive Model · Least Common Denominator (LCD)
            </span>
            <h3 className="text-lg font-semibold text-slate-900">
              Common Unit Partitioning ({n1}/{d1} {op} {n2}/{d2})
            </h3>
          </div>
          <button
            type="button"
            onClick={() => setShowLcdLines((prev) => !prev)}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap ${
              showLcdLines
                ? 'bg-[#0284C7] text-white'
                : 'border border-slate-300 bg-white text-slate-700 hover:bg-slate-50'
            }`}
          >
            {showLcdLines ? `● LCD Grid Active (/${commonDen})` : `Show LCD Subdivisions (/${commonDen})`}
          </button>
        </div>

        {/* Bar 1 */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="font-medium text-slate-700">
              Fraction A: {n1}/{d1}
            </span>
            <span className="font-mono font-semibold text-[#0284C7] tabular-nums">
              {showLcdLines ? `${n1}/${d1} = ${scaledN1}/${commonDen}` : `${n1}/${d1}`}
            </span>
          </div>
          <div className="relative flex h-11 w-full overflow-hidden rounded-lg border border-slate-300 bg-white">
            {Array.from({ length: showLcdLines ? commonDen : d1 }).map((_, idx) => {
              const shaded = idx < (showLcdLines ? scaledN1 : n1);
              return (
                <div
                  key={idx}
                  className={`flex flex-1 items-center justify-center border-r border-slate-300/70 last:border-r-0 font-mono text-[11px] tabular-nums ${
                    shaded ? 'bg-[#0284C7] text-white font-medium' : 'bg-slate-50 text-slate-400'
                  }`}
                >
                  {commonDen <= 16 ? `1/${showLcdLines ? commonDen : d1}` : ''}
                </div>
              );
            })}
          </div>
        </div>

        {/* Bar 2 */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="font-medium text-slate-700">
              Fraction B ({op === '-' ? 'Subtract' : 'Add'}): {n2}/{d2}
            </span>
            <span className="font-mono font-semibold text-[#D97706] tabular-nums">
              {showLcdLines ? `${n2}/${d2} = ${scaledN2}/${commonDen}` : `${n2}/${d2}`}
            </span>
          </div>
          <div className="relative flex h-11 w-full overflow-hidden rounded-lg border border-slate-300 bg-white">
            {Array.from({ length: showLcdLines ? commonDen : d2 }).map((_, idx) => {
              const shaded = idx < (showLcdLines ? scaledN2 : n2);
              return (
                <div
                  key={idx}
                  className={`flex flex-1 items-center justify-center border-r border-slate-300/70 last:border-r-0 font-mono text-[11px] tabular-nums ${
                    shaded ? 'bg-[#D97706] text-white font-medium' : 'bg-slate-50 text-slate-400'
                  }`}
                >
                  {commonDen <= 16 ? `1/${showLcdLines ? commonDen : d2}` : ''}
                </div>
              );
            })}
          </div>
        </div>

        {/* Combined LCD Result Bar */}
        <div className="space-y-1.5 pt-1">
          <div className="flex items-center justify-between text-xs">
            <span className="font-medium text-slate-700">
              Combined Result in Common Units (/{commonDen})
            </span>
            <span className="font-mono font-semibold text-[#059669] tabular-nums">
              {scaledN1}/{commonDen} {op} {scaledN2}/{commonDen} = {resultNum}/{commonDen}
              {gRes > 1 ? ` = ${resultNum / gRes}/${commonDen / gRes}` : ''}
            </span>
          </div>
          <div className="relative flex h-12 w-full overflow-hidden rounded-lg border-2 border-slate-800 bg-white">
            {Array.from({ length: Math.max(commonDen, resultNum) }).map((_, idx) => {
              const isFromA = op === '+' ? idx < scaledN1 : idx < resultNum;
              const isFromB = op === '+' && idx >= scaledN1 && idx < resultNum;
              return (
                <div
                  key={idx}
                  className={`flex flex-1 items-center justify-center border-r border-slate-200 last:border-r-0 font-mono text-xs tabular-nums ${
                    isFromA
                      ? 'bg-[#0284C7] text-white font-semibold'
                      : isFromB
                        ? 'bg-[#059669] text-white font-semibold'
                        : 'bg-slate-50 text-slate-400'
                  }`}
                >
                  {idx + 1}
                </div>
              );
            })}
          </div>
        </div>

        {config.canvasCaption && (
          <p className="border-t border-slate-200/80 pt-3 text-xs text-slate-600">
            {config.canvasCaption}
          </p>
        )}
      </div>
    );
  }

  // ================= 3. FRACTION MULTIPLICATION 2D AREA MODEL =================
  if (config.mode === 'fraction-multiply') {
    const rNum = config.numA ?? 3;
    const rDen = config.denA ?? 4;
    const cNum = config.numB ?? 2;
    const cDen = config.denB ?? 3;
    const overlapCells = rNum * cNum;
    const totalCells = rDen * cDen;
    const g = gcd(overlapCells, totalCells);

    return (
      <div className="flex flex-col gap-5">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-3">
          <div>
            <span className="text-xs font-medium text-slate-500">
              Interactive Model · 2D Unit Square Area Overlap
            </span>
            <h3 className="text-lg font-semibold text-slate-900">
              ({rNum}/{rDen} Rows) × ({cNum}/{cDen} Columns)
            </h3>
          </div>
          <div className="flex items-center gap-1 rounded-lg bg-slate-100 p-1">
            {(['rows', 'cols', 'both'] as const).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setAreaLayerMode(m)}
                className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors whitespace-nowrap ${
                  areaLayerMode === m
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {m === 'rows' ? `${rNum}/${rDen} Rows` : m === 'cols' ? `${cNum}/${cDen} Cols` : 'Overlap Product'}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-12">
          {/* 2D Grid */}
          <div className="md:col-span-7">
            <div
              className="grid aspect-square w-full max-w-[280px] mx-auto overflow-hidden rounded-lg border-2 border-slate-800 bg-white"
              style={{
                gridTemplateRows: `repeat(${rDen}, minmax(0, 1fr))`,
                gridTemplateColumns: `repeat(${cDen}, minmax(0, 1fr))`,
              }}
            >
              {Array.from({ length: rDen }).map((_, rIdx) =>
                Array.from({ length: cDen }).map((__, cIdx) => {
                  const inRow = rIdx < rNum;
                  const inCol = cIdx < cNum;
                  const inOverlap = inRow && inCol;

                  let cellClass = 'bg-slate-50 text-slate-400';
                  let cellLabel = '';

                  if (areaLayerMode === 'rows' && inRow) {
                    cellClass = 'bg-[#0284C7]/85 text-white font-semibold';
                    cellLabel = 'R';
                  } else if (areaLayerMode === 'cols' && inCol) {
                    cellClass = 'bg-[#D97706]/85 text-white font-semibold';
                    cellLabel = 'C';
                  } else if (areaLayerMode === 'both') {
                    if (inOverlap) {
                      cellClass = 'bg-[#059669] text-white font-semibold';
                      cellLabel = '✓';
                    } else if (inRow) {
                      cellClass = 'bg-[#0284C7]/25 text-slate-700';
                    } else if (inCol) {
                      cellClass = 'bg-[#D97706]/25 text-slate-700';
                    }
                  }

                  return (
                    <div
                      key={`${rIdx}-${cIdx}`}
                      className={`flex items-center justify-center border-r border-b border-slate-300 font-mono text-xs tabular-nums transition-colors duration-150 ${cellClass}`}
                    >
                      {cellLabel}
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Legend & Formula Breakdown */}
          <div className="space-y-3 md:col-span-5">
            <div className="border-l-2 border-[#0284C7] pl-3">
              <div className="text-xs text-slate-500">Horizontal Factor (Rows)</div>
              <div className="font-mono text-sm font-semibold text-slate-900 tabular-nums">
                {rNum} of {rDen} rows shaded ({rNum}/{rDen})
              </div>
            </div>
            <div className="border-l-2 border-[#D97706] pl-3">
              <div className="text-xs text-slate-500">Vertical Factor (Columns)</div>
              <div className="font-mono text-sm font-semibold text-slate-900 tabular-nums">
                {cNum} of {cDen} columns shaded ({cNum}/{cDen})
              </div>
            </div>
            <div className="border-l-2 border-[#059669] pl-3">
              <div className="text-xs text-slate-500">Double-Shaded Overlap (✓)</div>
              <div className="font-mono text-base font-semibold text-[#059669] tabular-nums">
                {overlapCells} / {totalCells} cells
                {g > 1 ? ` = ${overlapCells / g}/${totalCells / g}` : ''}
              </div>
            </div>
          </div>
        </div>

        {config.canvasCaption && (
          <p className="border-t border-slate-200/80 pt-3 text-xs text-slate-600">
            {config.canvasCaption}
          </p>
        )}
      </div>
    );
  }

  // ================= 4. BASE-10 HUNDREDTHS & THOUSANDTHS GRID =================
  if (config.mode === 'decimal-grid' || config.mode === 'decimal-column') {
    const hundredthsCount = Math.round(activeDecimal * 100);
    const onesDigit = Math.floor(activeDecimal);
    const tenthsDigit = Math.floor((activeDecimal * 10) % 10);
    const hundredthsDigit = Math.floor(Math.round(activeDecimal * 100) % 10);
    const thousandthsDigit = Math.floor(Math.round(activeDecimal * 1000) % 10);
    const gDec = gcd(Math.round(activeDecimal * 100), 100);

    return (
      <div className="flex flex-col gap-5">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-3">
          <div>
            <span className="text-xs font-medium text-slate-500">
              Interactive Model · Base-10 Hundredths Area Grid (10 × 10)
            </span>
            <h3 className="text-lg font-semibold text-slate-900">
              Decimal Place Value & Hundredths Shading
            </h3>
          </div>
          <div className="font-mono text-sm font-semibold text-[#0284C7] tabular-nums">
            ● Shaded Value: {activeDecimal.toFixed(thousandthsDigit > 0 ? 3 : 2)} ({hundredthsCount}/100)
          </div>
        </div>

        <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-12">
          {/* 10 x 10 Interactive Grid */}
          <div className="md:col-span-7">
            <div className="grid aspect-square w-full max-w-[290px] mx-auto grid-cols-10 overflow-hidden rounded-lg border-2 border-slate-800 bg-white">
              {Array.from({ length: 100 }).map((_, idx) => {
                // Column-major ordering so each vertical column represents 1 tenth (10 hundredths)
                const col = idx % 10;
                const row = Math.floor(idx / 10);
                const cellNumber = col * 10 + row + 1;
                const isShaded = cellNumber <= hundredthsCount;
                const isFullTenthCol = (col + 1) * 10 <= hundredthsCount;

                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => updateDecimalValue(cellNumber / 100)}
                    aria-label={`Shade ${cellNumber} hundredths`}
                    className={`flex items-center justify-center border-r border-b border-slate-200 font-mono text-[10px] tabular-nums transition-colors duration-100 ${
                      isShaded
                        ? isFullTenthCol
                          ? 'bg-[#0284C7] text-white font-semibold'
                          : 'bg-[#059669] text-white font-semibold'
                        : 'bg-white text-slate-300 hover:bg-slate-100'
                    }`}
                  >
                    {cellNumber % 10 === 0 ? `.${cellNumber / 10}` : ''}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Live Place Value Chart & Quick Controls */}
          <div className="flex flex-col gap-4 md:col-span-5">
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-3.5">
              <div className="mb-2 text-xs font-medium text-slate-500">
                Place-Value Decomposition
              </div>
              <div className="grid grid-cols-4 gap-1 text-center font-mono tabular-nums">
                <div className="rounded bg-white p-2 border border-slate-200">
                  <div className="text-[10px] text-slate-500">Ones (1)</div>
                  <div className="text-base font-semibold text-slate-900">{onesDigit}.</div>
                </div>
                <div className="rounded bg-white p-2 border border-slate-200">
                  <div className="text-[10px] text-[#0284C7]">Tenths</div>
                  <div className="text-base font-semibold text-[#0284C7]">{tenthsDigit}</div>
                </div>
                <div className="rounded bg-white p-2 border border-slate-200">
                  <div className="text-[10px] text-[#059669]">Hund.</div>
                  <div className="text-base font-semibold text-[#059669]">{hundredthsDigit}</div>
                </div>
                <div className="rounded bg-white p-2 border border-slate-200">
                  <div className="text-[10px] text-slate-500">Thous.</div>
                  <div className="text-base font-semibold text-slate-700">{thousandthsDigit}</div>
                </div>
              </div>

              <div className="mt-3 space-y-1 text-xs text-slate-600 font-mono tabular-nums">
                <div>
                  Expanded: ({tenthsDigit} × 0.1) + ({hundredthsDigit} × 0.01)
                </div>
                <div>
                  Fraction: {hundredthsCount}/100
                  {hundredthsCount > 0 && gDec > 1
                    ? ` = ${hundredthsCount / gDec}/${100 / gDec}`
                    : ''}
                </div>
              </div>
            </div>

            {!readOnly && (
              <div className="space-y-2">
                <div className="text-xs font-medium text-slate-600">
                  Quick Base-10 Manipulative Controls
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => updateDecimalValue(activeDecimal + 0.1)}
                    className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 font-mono text-xs font-medium text-slate-800 hover:bg-slate-50 whitespace-nowrap"
                  >
                    +0.10 (1 Tenth)
                  </button>
                  <button
                    type="button"
                    onClick={() => updateDecimalValue(activeDecimal - 0.1)}
                    className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 font-mono text-xs font-medium text-slate-800 hover:bg-slate-50 whitespace-nowrap"
                  >
                    -0.10 (1 Tenth)
                  </button>
                  <button
                    type="button"
                    onClick={() => updateDecimalValue(activeDecimal + 0.01)}
                    className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 font-mono text-xs font-medium text-slate-800 hover:bg-slate-50 whitespace-nowrap"
                  >
                    +0.01 (1 Hund.)
                  </button>
                  <button
                    type="button"
                    onClick={() => updateDecimalValue(activeDecimal - 0.01)}
                    className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 font-mono text-xs font-medium text-slate-800 hover:bg-slate-50 whitespace-nowrap"
                  >
                    -0.01 (1 Hund.)
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => updateDecimalValue(0)}
                  className="w-full rounded-lg bg-slate-100 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-200"
                >
                  Reset Grid (0.00)
                </button>
              </div>
            )}
          </div>
        </div>

        {config.canvasCaption && (
          <p className="border-t border-slate-200/80 pt-3 text-xs text-slate-600">
            {config.canvasCaption}
          </p>
        )}
      </div>
    );
  }

  // ================= 5. NUMBER LINE & EQUIVALENCE BRIDGE =================
  const minVal = config.numberLineMin ?? 0;
  const maxVal = config.numberLineMax ?? 1;
  const span = Math.max(0.05, maxVal - minVal);
  const currentPoint =
    config.mode === 'mixed-number-line' && config.numA && config.denA
      ? config.numA / config.denA
      : activeDecimal;
  const clampedRatio = Math.max(0, Math.min(1, (currentPoint - minVal) / span));
  const midVal = (minVal + maxVal) / 2;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-3">
        <div>
          <span className="text-xs font-medium text-slate-500">
            Interactive Model · Coordinate Number Line & Dual Scale
          </span>
          <h3 className="text-lg font-semibold text-slate-900">
            {config.mode === 'mixed-number-line'
              ? `Improper & Mixed Number Line (${config.numA}/${config.denA})`
              : config.mode === 'equivalence-bridge'
                ? `Fraction ↔ Decimal Equivalence Scale`
                : `Precision Decimal Number Line [${minVal.toFixed(2)} to ${maxVal.toFixed(2)}]`}
          </h3>
        </div>
        <div className="font-mono text-xs font-semibold text-[#0284C7] tabular-nums">
          ● Marker Position: {currentPoint.toFixed(3)}
        </div>
      </div>

      {/* SVG Number Line */}
      <div className="rounded-lg border border-slate-200 bg-white p-5">
        <svg viewBox="0 0 600 130" className="w-full overflow-visible">
          {/* Main Horizontal Axis */}
          <line
            x1="40"
            y1="65"
            x2="560"
            y2="65"
            stroke="#0F172A"
            strokeWidth="2.5"
          />

          {/* 10 Subdivisions */}
          {Array.from({ length: 11 }).map((_, idx) => {
            const x = 40 + (idx / 10) * 520;
            const tickVal = minVal + (idx / 10) * span;
            const isMajor = idx === 0 || idx === 5 || idx === 10;

            return (
              <g key={idx}>
                <line
                  x1={x}
                  y1={isMajor ? 48 : 55}
                  x2={x}
                  y2={isMajor ? 82 : 75}
                  stroke={idx === 5 ? '#D97706' : '#334155'}
                  strokeWidth={isMajor ? '2' : '1.2'}
                />
                <text
                  x={x}
                  y="102"
                  textAnchor="middle"
                  className="fill-slate-700 font-mono text-[11px] tabular-nums"
                >
                  {tickVal.toFixed(span < 0.5 ? 2 : 1)}
                </text>
                {config.mode === 'equivalence-bridge' && idx % 2 === 0 && (
                  <text
                    x={x}
                    y="34"
                    textAnchor="middle"
                    className="fill-[#0284C7] font-mono text-[11px] font-semibold tabular-nums"
                  >
                    {idx}/10
                  </text>
                )}
              </g>
            );
          })}

          {/* Midpoint Indicator */}
          <text
            x={300}
            y={120}
            textAnchor="middle"
            className="fill-[#D97706] font-mono text-[10px] font-medium tabular-nums"
          >
            ▲ Midpoint ({midVal.toFixed(3)})
          </text>

          {/* Active Point Marker */}
          <g transform={`translate(${40 + clampedRatio * 520}, 65)`}>
            <circle r="9" fill="#059669" stroke="#FFFFFF" strokeWidth="2.5" />
            <rect
              x="-34"
              y="-38"
              width="68"
              height="22"
              rx="4"
              fill="#0F172A"
            />
            <text
              x="0"
              y="-23"
              textAnchor="middle"
              className="fill-white font-mono text-[11px] font-semibold tabular-nums"
            >
              {currentPoint.toFixed(3)}
            </text>
          </g>
        </svg>

        {/* Labeled Interactive Slider for Number Line Inspection */}
        <div className="mt-4 space-y-1.5 border-t border-slate-100 pt-3">
          <div className="flex items-center justify-between text-xs">
            <label htmlFor="nl-slider" className="font-medium text-slate-700">
              Interactive Coordinate Marker Value:
            </label>
            <span className="font-mono font-semibold text-slate-900 tabular-nums">
              {currentPoint.toFixed(3)} ({currentPoint >= midVal ? '≥ Midpoint → Rounds Up' : '< Midpoint → Rounds Down'})
            </span>
          </div>
          <input
            id="nl-slider"
            type="range"
            min={minVal}
            max={maxVal}
            step={span / 100}
            value={Math.max(minVal, Math.min(maxVal, currentPoint))}
            onChange={(e) => updateDecimalValue(parseFloat(e.target.value))}
            className="w-full accent-[#0284C7] cursor-pointer"
          />
        </div>
      </div>

      {config.canvasCaption && (
        <p className="border-t border-slate-200/80 pt-2 text-xs text-slate-600">
          {config.canvasCaption}
        </p>
      )}
    </div>
  );
};
