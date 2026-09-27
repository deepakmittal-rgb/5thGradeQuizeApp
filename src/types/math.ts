export type DomainCategory = 'fractions' | 'decimals';

export type ModuleId =
  | 'frac-equiv'
  | 'frac-add-sub'
  | 'frac-mixed'
  | 'frac-mult-div'
  | 'dec-place-value'
  | 'dec-compare-round'
  | 'dec-add-sub'
  | 'dec-frac-bridge';

export type VisualModelType =
  | 'fraction-bar'
  | 'lcd-grid'
  | 'mixed-number-line'
  | 'fraction-multiply'
  | 'decimal-grid'
  | 'decimal-number-line'
  | 'decimal-column'
  | 'equivalence-bridge';

export type QuestionType =
  | 'multiple-choice'
  | 'fraction-input'
  | 'decimal-input'
  | 'visual-fraction-shade'
  | 'visual-decimal-grid';

export type MasteryStatus = 'Mastered' | 'Developing' | 'Needs Review' | 'Not Started';

export interface CurriculumModule {
  id: ModuleId;
  indexNumber: string; // e.g., "01", "02"
  title: string;
  domain: DomainCategory;
  ccssCode: string; // e.g., "CCSS.5.NF.A.1"
  shortDescription: string;
  conceptSummary: string;
  keyFormula: string;
  visualModelType: VisualModelType;
  estimatedMinutes: number;
}

export interface VisualStageConfig {
  mode: VisualModelType;
  // Fraction values
  numA?: number;
  denA?: number;
  numB?: number;
  denB?: number;
  operation?: '+' | '-' | '×' | '÷' | '=';
  targetDen?: number;
  // Decimal values
  decimalA?: number;
  decimalB?: number;
  numberLineMin?: number;
  numberLineMax?: number;
  roundingPlace?: 'tenths' | 'hundredths' | 'whole';
  // Prompt instruction for interactive canvas
  canvasCaption?: string;
}

export interface FractionAnswer {
  whole?: number;
  num: number;
  den: number;
  requireSimplified?: boolean;
}

export interface QuizQuestion {
  id: string;
  moduleId: ModuleId;
  domain: DomainCategory;
  difficulty: 'Foundation' | 'Grade-Level' | 'Challenge';
  type: QuestionType;
  contextScenario: string;
  prompt: string;
  subPrompt?: string;
  visualConfig: VisualStageConfig;
  options?: string[];
  correctChoiceIndex?: number;
  correctFraction?: FractionAnswer;
  correctDecimal?: number;
  hint: string;
  workedSteps: string[];
}

export interface ModuleProgress {
  moduleId: ModuleId;
  questionsAttempted: number;
  questionsCorrect: number;
  bestQuizScore: number; // percentage 0-100
  lastPracticed: string; // e.g., "Today", "Sep 25, 2026"
  currentStreak: number;
  masteryLevel: MasteryStatus;
}

export interface QuestionAttemptDetail {
  questionId: string;
  moduleId: ModuleId;
  domain: DomainCategory;
  prompt: string;
  userAnswerText: string;
  correctAnswerText: string;
  isCorrect: boolean;
  explanation: string;
}

export interface QuizAttemptRecord {
  id: string;
  timestamp: string;
  title: string;
  domain: DomainCategory | 'mixed';
  moduleId?: ModuleId;
  score: number;
  totalQuestions: number;
  accuracyPercent: number;
  durationSeconds: number;
  questionResults: QuestionAttemptDetail[];
}

export interface StudentProfile {
  id: string;
  name: string;
  gradeLabel: string;
  dailyStreak: number;
  moduleProgress: Record<ModuleId, ModuleProgress>;
  attemptHistory: QuizAttemptRecord[];
}
