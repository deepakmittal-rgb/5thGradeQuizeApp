import React, { useState } from 'react';
import { ModuleId, VisualModelType } from '../types/math';
import { InteractiveVisualStage } from './InteractiveVisualStage';
import { gcd, lcm } from '../data/curriculumData';

interface VisualSandboxViewProps {
  onLaunchModuleQuiz: (moduleId: ModuleId) => void;
}

interface SandboxStagePreset {
  id: string;
  stageLabel: string;
  title: string;
  domain: 'fractions' | 'decimals';
  linkedModuleId: ModuleId;
  mode: VisualModelType;
  description: string;
  formulaNote: string;
}

const SANDBOX_STAGES: SandboxStagePreset[] = [
  {
    id: 'stage-equiv',
    stageLabel: 'Stage 1 · Fractions',
    title: 'Proportional Equivalence & Simplifying',
    domain: 'fractions',
    linkedModuleId: 'frac-equiv',
    mode: 'fraction-bar',
    description:
      'Adjust the numerator and denominator of Bar A and shade Bar B to observe when different partition counts occupy the exact same length of the unit whole.',
    formulaNote: 'a / b = (a × k) / (b × k)',
  },
  {
    id: 'stage-lcd',
    stageLabel: 'Stage 2 · Fractions',
    title: 'Least Common Denominator (LCD) Builder',
    domain: 'fractions',
    linkedModuleId: 'frac-add-sub',
    mode: 'lcd-grid',
    description:
      'Combine two fractions with different denominators by repartitioning both bars into their Least Common Multiple.',
    formulaNote: 'LCD(b, d) = (b × d) / GCF(b, d)',
  },
  {
    id: 'stage-area-mult',
    stageLabel: 'Stage 3 · Fractions',
    title: '2D Unit Square Fraction Multiplication',
    domain: 'fractions',
    linkedModuleId: 'frac-mult-div',
    mode: 'fraction-multiply',
    description:
      'Visualize multiplying two fractions as the overlapping region of horizontal rows and vertical columns inside a 1 × 1 unit square.',
    formulaNote: '(a / b) × (c / d) = (a × c) / (b × d)',
  },
  {
    id: 'stage-dec-grid',
    stageLabel: 'Stage 4 · Decimals',
    title: 'Base-10 Hundredths & Place Value Explorer',
    domain: 'decimals',
    linkedModuleId: 'dec-place-value',
    mode: 'decimal-grid',
    description:
      'Manipulate tenths columns (0.1) and hundredths cells (0.01) on a 10 × 10 grid to see standard, expanded, and simplified fraction forms simultaneously.',
    formulaNote: '1 Whole = 10 Tenths = 100 Hundredths = 1,000 Thousandths',
  },
  {
    id: 'stage-bridge',
    stageLabel: 'Stage 5 · Decimals',
    title: 'Coordinate Number Line & Rounding Scale',
    domain: 'decimals',
    linkedModuleId: 'dec-compare-round',
    mode: 'equivalence-bridge',
    description:
      'Slide the coordinate marker across the interval to compare benchmark fractions with decimals and test midpoint rounding thresholds.',
    formulaNote: 'Value ≥ Midpoint (0.5) → Rounds Up',
  },
];

export const VisualSandboxView: React.FC<VisualSandboxViewProps> = ({
  onLaunchModuleQuiz,
}) => {
  const [activeStageId, setActiveStageId] = useState<string>('stage-equiv');

  // Fraction parameters with explicit labeled sliders
  const [numA, setNumA] = useState<number>(3);
  const [denA, setDenA] = useState<number>(4);
  const [numB, setNumB] = useState<number>(9);
  const [denB, setDenB] = useState<number>(12);
  const [operation, setOperation] = useState<'+' | '-'>('+');

  // Decimal parameters with explicit labeled sliders
  const [tenthsVal, setTenthsVal] = useState<number>(6);
  const [hundredthsVal, setHundredthsVal] = useState<number>(4);
  const [thousandthsVal, setThousandthsVal] = useState<number>(0);

  const activeStage =
    SANDBOX_STAGES.find((s) => s.id === activeStageId) ?? SANDBOX_STAGES[0];

  const combinedDecimal = Number(
    (tenthsVal * 0.1 + hundredthsVal * 0.01 + thousandthsVal * 0.001).toFixed(3)
  );

  const handleDirectDecimalUpdate = (val: number) => {
    const clamped = Math.max(0, Math.min(0.999, val));
    const t = Math.floor((clamped * 10) % 10);
    const h = Math.floor(Math.round(clamped * 100) % 10);
    const th = Math.floor(Math.round(clamped * 1000) % 10);
    setTenthsVal(t);
    setHundredthsVal(h);
    setThousandthsVal(th);
  };

  return (
    <div className="space-y-8">
      {/* Header & Guided Stage Progression Bar */}
      <div className="space-y-4 border-b border-slate-200 pb-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span>Interactive Mathematical Laboratory</span>
              <span aria-hidden="true">·</span>
              <span>Hands-On Visual Manipulatives</span>
            </div>
            <h2 className="mt-1 text-2xl font-semibold tracking-tight text-slate-900">
              Fractions & Decimals Concept Sandbox
            </h2>
          </div>

          <button
            type="button"
            onClick={() => onLaunchModuleQuiz(activeStage.linkedModuleId)}
            className="rounded-lg bg-[#0F172A] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-slate-800 whitespace-nowrap"
          >
            Quiz This Concept ({activeStage.stageLabel}) →
          </button>
        </div>

        {/* Guided Learning Stages Selector */}
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-5">
          {SANDBOX_STAGES.map((stage) => {
            const isSelected = stage.id === activeStage.id;
            return (
              <button
                key={stage.id}
                type="button"
                onClick={() => setActiveStageId(stage.id)}
                className={`flex flex-col items-start rounded-lg border p-3 text-left transition-colors ${
                  isSelected
                    ? 'border-[#0284C7] bg-white shadow-xs ring-1 ring-[#0284C7]'
                    : 'border-slate-200 bg-slate-50/70 hover:bg-white'
                }`}
              >
                <span className="font-mono text-[11px] font-medium text-[#0284C7] tabular-nums">
                  {stage.stageLabel}
                </span>
                <span className="mt-0.5 text-xs font-semibold text-slate-900 line-clamp-1">
                  {stage.title}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* TWO-ZONE SANDBOX LAYOUT (Left 65% Stage / Right 35% Control & Concept Deck) */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start">
        {/* LEFT ZONE: Interactive Stage */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 lg:col-span-7">
          <InteractiveVisualStage
            config={{
              mode: activeStage.mode,
              numA,
              denA,
              numB,
              denB,
              operation,
              decimalA: combinedDecimal,
              numberLineMin: 0,
              numberLineMax: 1,
              canvasCaption: activeStage.description,
            }}
            interactiveShadedNum={numB}
            onShadedNumChange={(n, d) => {
              setNumB(n);
              setDenB(d);
            }}
            interactiveDecimal={combinedDecimal}
            onDecimalChange={handleDirectDecimalUpdate}
          />
        </div>

        {/* RIGHT ZONE: Control & Concept Deck */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-6 lg:col-span-5">
          <div className="border-b border-slate-200 pb-4">
            <div className="text-xs font-medium text-slate-500">
              Parameter Controls & Live Equations
            </div>
            <h3 className="mt-0.5 text-lg font-semibold text-slate-900">
              {activeStage.title}
            </h3>
            <p className="mt-1 font-mono text-xs text-[#0284C7] tabular-nums">
              Rule: {activeStage.formulaNote}
            </p>
          </div>

          {activeStage.domain === 'fractions' ? (
            <div className="space-y-5">
              {/* Slider 1: Denominator A */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <label
                    htmlFor="slider-den-a"
                    className="font-medium text-slate-700"
                  >
                    Denominator A (Total Parts):
                  </label>
                  <span className="font-mono font-semibold text-slate-900 tabular-nums">
                    {denA} parts (1/{denA} units)
                  </span>
                </div>
                <input
                  id="slider-den-a"
                  type="range"
                  min={2}
                  max={12}
                  step={1}
                  value={denA}
                  onChange={(e) => {
                    const nextD = parseInt(e.target.value, 10);
                    setDenA(nextD);
                    if (numA > nextD) setNumA(nextD);
                  }}
                  className="w-full accent-[#0284C7] cursor-pointer"
                />
              </div>

              {/* Slider 2: Numerator A */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <label
                    htmlFor="slider-num-a"
                    className="font-medium text-slate-700"
                  >
                    Numerator A (Shaded Parts):
                  </label>
                  <span className="font-mono font-semibold text-[#0284C7] tabular-nums">
                    {numA} of {denA} ({((numA / denA) * 100).toFixed(1)}%)
                  </span>
                </div>
                <input
                  id="slider-num-a"
                  type="range"
                  min={1}
                  max={denA}
                  step={1}
                  value={numA}
                  onChange={(e) => setNumA(parseInt(e.target.value, 10))}
                  className="w-full accent-[#0284C7] cursor-pointer"
                />
              </div>

              {/* Slider 3: Denominator B */}
              <div className="space-y-1.5 border-t border-slate-100 pt-4">
                <div className="flex items-center justify-between text-xs">
                  <label
                    htmlFor="slider-den-b"
                    className="font-medium text-slate-700"
                  >
                    Denominator B (Comparison Parts):
                  </label>
                  <span className="font-mono font-semibold text-slate-900 tabular-nums">
                    {denB} parts (1/{denB} units)
                  </span>
                </div>
                <input
                  id="slider-den-b"
                  type="range"
                  min={2}
                  max={16}
                  step={1}
                  value={denB}
                  onChange={(e) => {
                    const nextD = parseInt(e.target.value, 10);
                    setDenB(nextD);
                    if (numB > nextD) setNumB(nextD);
                  }}
                  className="w-full accent-[#059669] cursor-pointer"
                />
              </div>

              {/* Slider 4: Numerator B */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <label
                    htmlFor="slider-num-b"
                    className="font-medium text-slate-700"
                  >
                    Numerator B (Shaded Parts):
                  </label>
                  <span className="font-mono font-semibold text-[#059669] tabular-nums">
                    {numB} of {denB} ({((numB / denB) * 100).toFixed(1)}%)
                  </span>
                </div>
                <input
                  id="slider-num-b"
                  type="range"
                  min={0}
                  max={denB}
                  step={1}
                  value={numB}
                  onChange={(e) => setNumB(parseInt(e.target.value, 10))}
                  className="w-full accent-[#059669] cursor-pointer"
                />
              </div>

              {activeStage.mode === 'lcd-grid' && (
                <div className="flex items-center justify-between border-t border-slate-100 pt-3">
                  <span className="text-xs font-medium text-slate-700">
                    Operation Mode:
                  </span>
                  <div className="flex items-center gap-1 rounded-lg bg-slate-100 p-1">
                    <button
                      type="button"
                      onClick={() => setOperation('+')}
                      className={`rounded-md px-3 py-1 text-xs font-medium ${
                        operation === '+'
                          ? 'bg-white text-slate-900 shadow-xs'
                          : 'text-slate-600'
                      }`}
                    >
                      Addition (+)
                    </button>
                    <button
                      type="button"
                      onClick={() => setOperation('-')}
                      className={`rounded-md px-3 py-1 text-xs font-medium ${
                        operation === '-'
                          ? 'bg-white text-slate-900 shadow-xs'
                          : 'text-slate-600'
                      }`}
                    >
                      Subtraction (-)
                    </button>
                  </div>
                </div>
              )}

              {/* Live Mathematical Readout Box */}
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 space-y-1.5 font-mono text-xs tabular-nums">
                <div className="text-slate-500 font-sans font-medium">
                  Live Mathematical Readout
                </div>
                <div>
                  GCF({numA}, {denA}) = {gcd(numA, denA)} · LCM({denA}, {denB}) ={' '}
                  {lcm(denA, denB)}
                </div>
                <div className="text-slate-900 font-semibold">
                  Decimal Equivalents: {numA}/{denA} = {(numA / denA).toFixed(3)}{' '}
                  · {numB}/{denB} = {(numB / denB).toFixed(3)}
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-5">
              {/* Slider 1: Tenths */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <label
                    htmlFor="slider-tenths"
                    className="font-medium text-slate-700"
                  >
                    Tenths Place Value (0.1):
                  </label>
                  <span className="font-mono font-semibold text-[#0284C7] tabular-nums">
                    {tenthsVal} tenths ({(tenthsVal * 0.1).toFixed(1)})
                  </span>
                </div>
                <input
                  id="slider-tenths"
                  type="range"
                  min={0}
                  max={9}
                  step={1}
                  value={tenthsVal}
                  onChange={(e) => setTenthsVal(parseInt(e.target.value, 10))}
                  className="w-full accent-[#0284C7] cursor-pointer"
                />
              </div>

              {/* Slider 2: Hundredths */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <label
                    htmlFor="slider-hundredths"
                    className="font-medium text-slate-700"
                  >
                    Hundredths Place Value (0.01):
                  </label>
                  <span className="font-mono font-semibold text-[#059669] tabular-nums">
                    {hundredthsVal} hundredths ({(hundredthsVal * 0.01).toFixed(2)})
                  </span>
                </div>
                <input
                  id="slider-hundredths"
                  type="range"
                  min={0}
                  max={9}
                  step={1}
                  value={hundredthsVal}
                  onChange={(e) =>
                    setHundredthsVal(parseInt(e.target.value, 10))
                  }
                  className="w-full accent-[#059669] cursor-pointer"
                />
              </div>

              {/* Slider 3: Thousandths */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <label
                    htmlFor="slider-thousandths"
                    className="font-medium text-slate-700"
                  >
                    Thousandths Place Value (0.001):
                  </label>
                  <span className="font-mono font-semibold text-slate-800 tabular-nums">
                    {thousandthsVal} thousandths (
                    {(thousandthsVal * 0.001).toFixed(3)})
                  </span>
                </div>
                <input
                  id="slider-thousandths"
                  type="range"
                  min={0}
                  max={9}
                  step={1}
                  value={thousandthsVal}
                  onChange={(e) =>
                    setThousandthsVal(parseInt(e.target.value, 10))
                  }
                  className="w-full accent-slate-800 cursor-pointer"
                />
              </div>

              {/* Live Base-10 Readout Box */}
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 space-y-1.5 font-mono text-xs tabular-nums">
                <div className="text-slate-500 font-sans font-medium">
                  Standard, Expanded & Rounded Values
                </div>
                <div className="text-slate-900 font-semibold">
                  Standard Form: {combinedDecimal.toFixed(3)}
                </div>
                <div>
                  Nearest Tenth: {combinedDecimal.toFixed(1)} · Nearest
                  Hundredth: {combinedDecimal.toFixed(2)}
                </div>
                <div>
                  Fraction over 1,000: {Math.round(combinedDecimal * 1000)}/1000
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
