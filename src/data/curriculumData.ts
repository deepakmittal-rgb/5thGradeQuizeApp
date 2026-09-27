import {
  AchievementBadge,
  CurriculumModule,
  DomainCategory,
  ModuleId,
  QuizQuestion,
  StudentProfile,
} from '../types/math';

export function gcd(a: number, b: number): number {
  let x = Math.abs(a);
  let y = Math.abs(b);
  while (y !== 0) {
    const t = y;
    y = x % y;
    x = t;
  }
  return x || 1;
}

export function lcm(a: number, b: number): number {
  return Math.abs(a * b) / gcd(a, b);
}

export const CURRICULUM_MODULES: CurriculumModule[] = [
  // TRACK I: FRACTIONS & RATIONAL OPERATIONS (CCSS.5.NF → 6.NS.A)
  {
    id: 'frac-equiv',
    indexNumber: '01',
    title: 'Equivalent Fractions, GCF & LCM Factoring',
    domain: 'fractions',
    ccssCode: 'CCSS.5.NF.A.1 → 6.NS.B.4',
    shortDescription:
      'Reduce complex fractions using Greatest Common Factors (GCF), find Least Common Multiples (LCM), and factor numerical sums.',
    conceptSummary:
      'Building on 5th-grade equivalence, 6th-grade readiness uses GCF to reduce large ratios and factor expressions like 24 + 36 = 12(2 + 3).',
    keyFormula: 'GCF(a, b) × LCM(a, b) = a × b',
    visualModelType: 'fraction-bar',
    estimatedMinutes: 7,
  },
  {
    id: 'frac-add-sub',
    indexNumber: '02',
    title: 'Multi-Step Unlike Fractions & Equations',
    domain: 'fractions',
    ccssCode: 'CCSS.5.NF.A.1–2 → 6.EE.B.7',
    shortDescription:
      'Solve multi-term unlike fraction expressions and one-step fractional variable equations (x + a/b = c/d).',
    conceptSummary:
      'Convert all terms to their Least Common Denominator (LCD) to evaluate three-term expressions and isolate unknown fractional quantities.',
    keyFormula: 'x + a/b = c/d  ⇒  x = (c·b - a·d) / (b·d)',
    visualModelType: 'lcd-grid',
    estimatedMinutes: 8,
  },
  {
    id: 'frac-mixed',
    indexNumber: '03',
    title: 'Mixed Numbers, Regrouping & Scaling Products',
    domain: 'fractions',
    ccssCode: 'CCSS.5.NF.B.4–6 → 6.NS.A.1',
    shortDescription:
      'Multiply mixed numbers by converting to improper fractions and analyze how scaling factors (>1 vs <1) resize quantities.',
    conceptSummary:
      'To multiply or divide mixed numbers, convert each mixed number W n/d into its improper form ((W·d + n)/d) and cross-simplify common factors.',
    keyFormula: 'W₁(n₁/d₁) × W₂(n₂/d₂) = (I₁/d₁) × (I₂/d₂)',
    visualModelType: 'mixed-number-line',
    estimatedMinutes: 8,
  },
  {
    id: 'frac-mult-div',
    indexNumber: '04',
    title: 'Fraction-by-Fraction Division & Reciprocals',
    domain: 'fractions',
    ccssCode: 'CCSS.5.NF.B.7 → 6.NS.A.1',
    shortDescription:
      'Extend 5th-grade unit-fraction division to dividing any fraction by a fraction (a/b ÷ c/d) using visual common denominators and reciprocals.',
    conceptSummary:
      'Dividing by a fraction c/d asks how many groups of size c/d fit inside a/b, which is mathematically equivalent to multiplying by its reciprocal d/c.',
    keyFormula: '(a / b) ÷ (c / d) = (a / b) × (d / c)',
    visualModelType: 'fraction-multiply',
    estimatedMinutes: 9,
  },

  // TRACK II: PRECISION DECIMALS & BASE-10 OPERATIONS (CCSS.5.NBT → 6.NS.B)
  {
    id: 'dec-place-value',
    indexNumber: '05',
    title: 'Powers of 10, Exponents & Thousandths Place Value',
    domain: 'decimals',
    ccssCode: 'CCSS.5.NBT.A.1–3 → 6.EE.A.1',
    shortDescription:
      'Master base-10 exponent notation (10ⁿ), decimal shifts across powers of 10, and expanded form to thousandths.',
    conceptSummary:
      'Multiplying by 10ⁿ shifts digits n places left; dividing by 10ⁿ (or multiplying by 0.1ⁿ) shifts digits n places right relative to the decimal point.',
    keyFormula: 'd × 10³ = 1,000d · d ÷ 10² = d × 0.01',
    visualModelType: 'decimal-grid',
    estimatedMinutes: 7,
  },
  {
    id: 'dec-compare-round',
    indexNumber: '06',
    title: 'Rational Number Line, Ordering & Rounding',
    domain: 'decimals',
    ccssCode: 'CCSS.5.NBT.A.4 → 6.NS.C.6',
    shortDescription:
      'Order mixed sets of fractions and decimals on precision coordinate number lines and round to specified place values.',
    conceptSummary:
      'All fractions and decimals occupy exact coordinates on the real number line. Express values in a common thousandths format to compare with certainty.',
    keyFormula: 'Midpoint ≥ 5 → Round Up · Midpoint < 5 → Round Down',
    visualModelType: 'decimal-number-line',
    estimatedMinutes: 7,
  },
  {
    id: 'dec-add-sub',
    indexNumber: '07',
    title: 'Multi-Digit Decimal Operations & Product Scaling',
    domain: 'decimals',
    ccssCode: 'CCSS.5.NBT.B.7 → 6.NS.B.3',
    shortDescription:
      'Execute multi-step decimal addition, subtraction, and decimal-by-decimal multiplication with exact place-value alignment.',
    conceptSummary:
      'When adding/subtracting, align decimal points vertically; when multiplying decimals, sum the number of decimal places in both factors.',
    keyFormula: '(a × 10⁻ᵐ) × (b × 10⁻ⁿ) = (a·b) × 10⁻⁽ᵐ⁺ⁿ⁾',
    visualModelType: 'decimal-grid',
    estimatedMinutes: 8,
  },
  {
    id: 'dec-frac-bridge',
    indexNumber: '08',
    title: 'Decimal Division & Fraction-Decimal-Percent Fluency',
    domain: 'decimals',
    ccssCode: 'CCSS.5.NBT.B.7 → 6.NS.B.3 · 6.RP.A.3c',
    shortDescription:
      'Divide decimals by decimal divisors (e.g. 3.6 ÷ 0.15) and convert seamlessly between fractions, decimals, and percents.',
    conceptSummary:
      'To divide by a decimal divisor, multiply both dividend and divisor by the same power of 10 to create a whole-number divisor without changing the quotient.',
    keyFormula: 'a ÷ b = (a × 100) ÷ (b × 100) · p% = p/100',
    visualModelType: 'equivalence-bridge',
    estimatedMinutes: 9,
  },

  // TRACK III: 5TH MASTER TO 6TH GRADE BRIDGE (5.OA / 5.MD / 5.G → 6.RP / 6.EE / 6.G)
  {
    id: 'bridge-ratios-percents',
    indexNumber: '09',
    title: 'Ratios, Unit Rates & Proportional Reasoning',
    domain: 'bridge6',
    ccssCode: 'CCSS.5.NF.B.3 → 6.RP.A.1–3',
    shortDescription:
      'Connect 5th-grade fraction equivalence to 6th-grade part-to-part ratios, unit rates, and percent proportion problems.',
    conceptSummary:
      'A ratio compares two quantities multiplicatively. Dividing a quantity by its corresponding unit count produces the unit rate (per 1 unit).',
    keyFormula: 'Unit Rate = (Quantity A) ÷ (Quantity B) per 1 unit',
    visualModelType: 'fraction-bar',
    estimatedMinutes: 8,
  },
  {
    id: 'bridge-expressions-volume',
    indexNumber: '10',
    title: 'Order of Operations (Exponents), Volume & Coordinates',
    domain: 'bridge6',
    ccssCode: 'CCSS.5.OA · 5.MD · 5.G → 6.EE · 6.G.A.2',
    shortDescription:
      'Evaluate nested expressions with exponents, calculate volume of rectangular prisms with fractional edges, and analyze coordinate distances.',
    conceptSummary:
      'Synthesizes 5th-grade geometry and operations into 6th-grade algebraic order of operations (PEMDAS) and fractional 3D volume (V = l × w × h).',
    keyFormula: 'V = l × w × h · PEMDAS: ( ) → aⁿ → ×/÷ → +/-',
    visualModelType: 'fraction-multiply',
    estimatedMinutes: 9,
  },
];

export const CURATED_QUESTIONS: QuizQuestion[] = [
  // ================= MODULE 01: EQUIVALENT FRACTIONS, GCF & LCM =================
  {
    id: 'q-frac-equiv-1',
    moduleId: 'frac-equiv',
    domain: 'fractions',
    difficulty: 'Foundation',
    type: 'visual-fraction-shade',
    contextScenario: 'Proportional Partition Studio · Rising 6th Review',
    prompt:
      'Shade the bottom fraction bar (partitioned into 12 twelfths) so that it is proportional to 3/4.',
    subPrompt:
      'Click segments on the 12-part workspace bar on the left until it matches 3/4.',
    visualConfig: {
      mode: 'fraction-bar',
      numA: 3,
      denA: 4,
      numB: 0,
      denB: 12,
      targetDen: 12,
      canvasCaption: 'Scale 3/4 by a factor of 3/3 to determine the number of twelfths.',
    },
    correctFraction: { num: 9, den: 12 },
    hint: 'Multiply both numerator (3) and denominator (4) by 3.',
    workedSteps: [
      'Start with the ratio 3/4.',
      'Multiply numerator and denominator by 3: (3 × 3) / (4 × 3) = 9/12.',
    ],
  },
  {
    id: 'q-frac-equiv-2',
    moduleId: 'frac-equiv',
    domain: 'fractions',
    difficulty: 'Grade-Level',
    type: 'fraction-input',
    contextScenario: 'Environmental Engineering · Water Filtration Ratio',
    prompt:
      'A filtration system processes 42/56 of a reservoir tank per hour. Reduce 42/56 to its simplest form using the Greatest Common Factor (GCF).',
    subPrompt: 'Find GCF(42, 56) and enter the reduced numerator and denominator.',
    visualConfig: {
      mode: 'fraction-bar',
      numA: 3,
      denA: 4,
      numB: 6,
      denB: 8,
      canvasCaption: 'Both 42 and 56 share a Greatest Common Factor of 14.',
    },
    correctFraction: { num: 3, den: 4, requireSimplified: true },
    hint: 'Both 42 and 56 are divisible by 7, and also by 2, so their GCF is 14.',
    workedSteps: [
      'Factor 42 = 14 × 3 and 56 = 14 × 4.',
      'The Greatest Common Factor (GCF) of 42 and 56 is 14.',
      'Divide numerator and denominator by 14: (42 ÷ 14) / (56 ÷ 14) = 3/4.',
    ],
  },
  {
    id: 'q-frac-equiv-3',
    moduleId: 'frac-equiv',
    domain: 'fractions',
    difficulty: '6th-Grade Accelerated',
    type: 'multiple-choice',
    contextScenario: '6th-Grade Number Theory · GCF Distributive Property (6.NS.B.4)',
    prompt:
      'Using the Greatest Common Factor of 36 and 48, which expression correctly rewrites 36 + 48 using the distributive property?',
    visualConfig: {
      mode: 'fraction-bar',
      numA: 3,
      denA: 4,
      numB: 9,
      denB: 12,
      canvasCaption: ' Notice that 36/48 reduces to 3/4 when divided by GCF = 12.',
    },
    options: ['6(6 + 8)', '12(3 + 4)', '4(9 + 12)', '12(4 + 3)'],
    correctChoiceIndex: 1,
    hint: 'Find the GREATEST common factor of 36 and 48 (which is 12), then factor 12 out of both terms.',
    workedSteps: [
      'Find GCF(36, 48): Factors of 36 are 1, 2, 3, 4, 6, 9, 12, 18, 36. The largest factor that also divides 48 is 12.',
      'Divide each term by 12: 36 ÷ 12 = 3 and 48 ÷ 12 = 4.',
      'By the distributive property: 36 + 48 = 12(3 + 4).',
    ],
  },
  {
    id: 'q-frac-equiv-4',
    moduleId: 'frac-equiv',
    domain: 'fractions',
    difficulty: '6th-Grade Accelerated',
    type: 'decimal-input',
    contextScenario: 'Orbital Satellites · Least Common Multiple (LCM)',
    prompt:
      'Satellite Alpha completes a calibration cycle every 8 minutes, and Satellite Beta every 12 minutes. If both calibrate now, in how many minutes will they next calibrate at the exact same moment?',
    subPrompt: 'Enter the Least Common Multiple (LCM) of 8 and 12.',
    visualConfig: {
      mode: 'lcd-grid',
      numA: 3,
      denA: 8,
      numB: 5,
      denB: 12,
      operation: '+',
      canvasCaption: 'The Least Common Multiple of 8 and 12 is also the LCD of eighths and twelfths.',
    },
    correctDecimal: 24,
    hint: 'List multiples of 12: 12, 24, 36... and check the first one divisible by 8.',
    workedSteps: [
      'Multiples of 8: 8, 16, 24, 32, 40, 48.',
      'Multiples of 12: 12, 24, 36, 48.',
      'The Least Common Multiple (LCM) is 24 minutes.',
    ],
  },

  // ================= MODULE 02: MULTI-STEP UNLIKE FRACTIONS & EQUATIONS =================
  {
    id: 'q-frac-add-1',
    moduleId: 'frac-add-sub',
    domain: 'fractions',
    difficulty: 'Foundation',
    type: 'fraction-input',
    contextScenario: 'Woodworking Lab · Precision Joinery',
    prompt:
      'A carpenter has a cedar board 5/6 meter long and trims off 1/4 meter. How much length remains in simplest form?',
    subPrompt: 'Use the LCD visualizer on the left (LCD = 12) and enter the simplified fraction.',
    visualConfig: {
      mode: 'lcd-grid',
      numA: 5,
      denA: 6,
      numB: 1,
      denB: 4,
      operation: '-',
      canvasCaption: 'Repartition sixths and fourths into twelfths (LCD = 12) to subtract.',
    },
    correctFraction: { num: 7, den: 12, requireSimplified: true },
    hint: 'Convert 5/6 to 10/12 and 1/4 to 3/12, then subtract.',
    workedSteps: [
      'Find the LCD of 6 and 4: LCM(6, 4) = 12.',
      '5/6 = 10/12 and 1/4 = 3/12.',
      '10/12 - 3/12 = 7/12 meter.',
    ],
  },
  {
    id: 'q-frac-add-2',
    moduleId: 'frac-add-sub',
    domain: 'fractions',
    difficulty: 'Grade-Level',
    type: 'fraction-input',
    contextScenario: 'Chemistry Lab · Three-Component Buffer',
    prompt:
      'Evaluate the three-term expression: 2/3 + 1/4 - 1/6. Express your result in simplest form.',
    subPrompt: 'Convert all three fractions to twelfths (denominator = 12), then simplify.',
    visualConfig: {
      mode: 'lcd-grid',
      numA: 2,
      denA: 3,
      numB: 1,
      denB: 4,
      operation: '+',
      canvasCaption: 'In twelfths: 2/3 = 8/12, 1/4 = 3/12, and 1/6 = 2/12.',
    },
    correctFraction: { num: 3, den: 4, requireSimplified: true },
    hint: 'Compute (8 + 3 - 2) / 12 = 9/12, then reduce 9/12 to lowest terms.',
    workedSteps: [
      'Common denominator of 3, 4, and 6 is 12.',
      'Convert each fraction: 2/3 = 8/12, 1/4 = 3/12, 1/6 = 2/12.',
      'Combine numerators: (8 + 3 - 2) / 12 = 9/12.',
      'Divide numerator and denominator by 3: 9/12 = 3/4.',
    ],
  },
  {
    id: 'q-frac-add-3',
    moduleId: 'frac-add-sub',
    domain: 'fractions',
    difficulty: '6th-Grade Accelerated',
    type: 'fraction-input',
    contextScenario: '6th-Grade Algebraic Equations · Solving for x (6.EE.B.7)',
    prompt:
      'Solve the fractional equation for x in simplest form: x + 3/8 = 5/6.',
    subPrompt: 'Isolate x by computing x = 5/6 - 3/8 using LCD(6, 8) = 24.',
    visualConfig: {
      mode: 'lcd-grid',
      numA: 5,
      denA: 6,
      numB: 3,
      denB: 8,
      operation: '-',
      canvasCaption: 'Subtract 3/8 from both sides: x = 5/6 - 3/8.',
    },
    correctFraction: { num: 11, den: 24, requireSimplified: true },
    hint: 'The LCD of 6 and 8 is 24. Rewrite 5/6 as 20/24 and 3/8 as 9/24.',
    workedSteps: [
      'Subtract 3/8 from both sides of the equation: x = 5/6 - 3/8.',
      'Find LCD(6, 8) = 24.',
      'Convert: 5/6 = 20/24 and 3/8 = 9/24.',
      'Subtract: x = 20/24 - 9/24 = 11/24.',
    ],
  },
  {
    id: 'q-frac-add-4',
    moduleId: 'frac-add-sub',
    domain: 'fractions',
    difficulty: '6th-Grade Accelerated',
    type: 'multiple-choice',
    contextScenario: 'Renewable Energy Grid · Power Allocation',
    prompt:
      'A microgrid draws 2/5 of its energy from solar, 1/3 from wind, and the rest from hydro storage. What fraction of the grid comes from hydro storage?',
    visualConfig: {
      mode: 'lcd-grid',
      numA: 2,
      denA: 5,
      numB: 1,
      denB: 3,
      operation: '+',
      canvasCaption: 'Subtract (2/5 + 1/3) from 1 whole (15/15).',
    },
    options: ['4/15', '11/15', '3/8', '2/15'],
    correctChoiceIndex: 0,
    hint: 'Add 2/5 + 1/3 using LCD = 15 (6/15 + 5/15 = 11/15), then subtract from 15/15.',
    workedSteps: [
      'Find LCD(5, 3) = 15.',
      'Solar + Wind = 6/15 + 5/15 = 11/15.',
      'Hydro storage = 1 - 11/15 = 15/15 - 11/15 = 4/15.',
    ],
  },

  // ================= MODULE 03: MIXED NUMBERS, REGROUPING & SCALING =================
  {
    id: 'q-frac-mixed-1',
    moduleId: 'frac-mixed',
    domain: 'fractions',
    difficulty: 'Foundation',
    type: 'multiple-choice',
    contextScenario: 'Marine Biology · Coral Reef Ascent',
    prompt:
      'A research submersible at a depth of 5 1/6 meters ascends 2 5/6 meters. What is its new depth in simplest form?',
    visualConfig: {
      mode: 'mixed-number-line',
      numA: 14,
      denA: 6,
      numberLineMin: 0,
      numberLineMax: 5,
      canvasCaption: 'Regroup 5 1/6 as 4 7/6 before subtracting 2 5/6.',
    },
    options: ['3 2/6 meters', '2 1/3 meters', '2 2/3 meters', '3 1/3 meters'],
    correctChoiceIndex: 1,
    hint: 'Borrow 1 whole (6/6) from 5 so 5 1/6 becomes 4 7/6, subtract 2 5/6, then simplify 2 2/6.',
    workedSteps: [
      'Regroup 5 1/6 by borrowing 1 whole (6/6): 5 1/6 = 4 7/6.',
      'Subtract: (4 - 2) + (7/6 - 5/6) = 2 2/6.',
      'Simplify 2/6 to 1/3: 2 1/3 meters.',
    ],
  },
  {
    id: 'q-frac-mixed-2',
    moduleId: 'frac-mixed',
    domain: 'fractions',
    difficulty: 'Grade-Level',
    type: 'fraction-input',
    contextScenario: 'Architectural Blueprint · Mixed Number Area',
    prompt:
      'Multiply the mixed numbers 1 1/2 × 2 2/3 and express the product as a simplified fraction (put 1 in the denominator if the result is a whole number).',
    subPrompt: 'Convert both mixed numbers to improper fractions first: (3/2) × (8/3).',
    visualConfig: {
      mode: 'mixed-number-line',
      numA: 12,
      denA: 3,
      numberLineMin: 0,
      numberLineMax: 5,
      canvasCaption: '1 1/2 = 3/2 and 2 2/3 = 8/3. Multiply (3/2) × (8/3).',
    },
    correctFraction: { num: 4, den: 1, requireSimplified: true },
    hint: '(3/2) × (8/3) = 24/6 = 4/1.',
    workedSteps: [
      'Convert 1 1/2 to improper fraction: (1 × 2 + 1) / 2 = 3/2.',
      'Convert 2 2/3 to improper fraction: (2 × 3 + 2) / 3 = 8/3.',
      'Multiply: (3 × 8) / (2 × 3) = 24/6 = 4/1 (4 wholes).',
    ],
  },
  {
    id: 'q-frac-mixed-3',
    moduleId: 'frac-mixed',
    domain: 'fractions',
    difficulty: '6th-Grade Accelerated',
    type: 'fraction-input',
    contextScenario: 'Mechanical Gear Train · Mixed Product',
    prompt:
      'Calculate (2 1/4) × (1 1/3) and enter the exact value as a simplified fraction (use denominator 1 for a whole number).',
    subPrompt: 'Convert 2 1/4 = 9/4 and 1 1/3 = 4/3, then cross-cancel the 4s.',
    visualConfig: {
      mode: 'mixed-number-line',
      numA: 12,
      denA: 4,
      numberLineMin: 0,
      numberLineMax: 4,
      canvasCaption: '(9/4) × (4/3) = 36/12 = 3 wholes (3/1).',
    },
    correctFraction: { num: 3, den: 1, requireSimplified: true },
    hint: '(9/4) × (4/3) simplifies by canceling 4 in the numerator and denominator, leaving 9/3 = 3/1.',
    workedSteps: [
      'Rewrite as improper fractions: 2 1/4 = 9/4 and 1 1/3 = 4/3.',
      'Multiply: (9 × 4) / (4 × 3) = 36/12.',
      'Reduce to lowest terms: 36/12 = 3/1.',
    ],
  },
  {
    id: 'q-frac-mixed-4',
    moduleId: 'frac-mixed',
    domain: 'fractions',
    difficulty: '6th-Grade Accelerated',
    type: 'multiple-choice',
    contextScenario: 'Multiplicative Scaling Analysis (5.NF.B.5)',
    prompt:
      'Without calculating the exact value, which expression has a value STRICTLY LESS than 7/8?',
    visualConfig: {
      mode: 'fraction-bar',
      numA: 7,
      denA: 8,
      numB: 5,
      denB: 6,
      canvasCaption: 'Multiplying a positive number by a factor less than 1 scales it down.',
    },
    options: [
      '(7/8) × (9/8)',
      '(7/8) × (6/6)',
      '(7/8) × (5/6)',
      '(7/8) × (1 1/4)',
    ],
    correctChoiceIndex: 2,
    hint: 'Multiplying 7/8 by a fraction less than 1 produces a product smaller than 7/8.',
    workedSteps: [
      '9/8 > 1 and 1 1/4 > 1, so those products are greater than 7/8.',
      '6/6 = 1, so (7/8) × (6/6) equals 7/8.',
      '5/6 < 1, so (7/8) × (5/6) is strictly less than 7/8.',
    ],
  },

  // ================= MODULE 04: FRACTION-BY-FRACTION DIVISION (6.NS.A.1) =================
  {
    id: 'q-frac-mult-1',
    moduleId: 'frac-mult-div',
    domain: 'fractions',
    difficulty: 'Foundation',
    type: 'fraction-input',
    contextScenario: 'Architecture Studio · Mosaic Area Overlap',
    prompt:
      'A rectangular solar cell measures 4/5 decimeter wide by 5/8 decimeter tall. What is its area in square decimeters (in simplest form)?',
    subPrompt: 'Multiply (4/5) × (5/8) and reduce to lowest terms.',
    visualConfig: {
      mode: 'fraction-multiply',
      numA: 4,
      denA: 5,
      numB: 5,
      denB: 8,
      operation: '×',
      canvasCaption: '20 out of 40 grid squares are double-shaded: 20/40 = 1/2.',
    },
    correctFraction: { num: 1, den: 2, requireSimplified: true },
    hint: 'Multiply 4 × 5 = 20 and 5 × 8 = 40, then simplify 20/40.',
    workedSteps: [
      'Area = (4/5) × (5/8) = 20/40.',
      'Divide numerator and denominator by 20: 1/2 square decimeter.',
    ],
  },
  {
    id: 'q-frac-mult-2',
    moduleId: 'frac-mult-div',
    domain: 'fractions',
    difficulty: '6th-Grade Accelerated',
    type: 'fraction-input',
    contextScenario: '6th-Grade Fraction Division · Reciprocal Method (6.NS.A.1)',
    prompt:
      'Divide the fractions: (3/4) ÷ (3/8). Express your answer as a simplified fraction (use denominator 1 if it is a whole number).',
    subPrompt: 'Multiply 3/4 by the reciprocal of 3/8 (which is 8/3), or ask how many 3/8 fit inside 6/8.',
    visualConfig: {
      mode: 'lcd-grid',
      numA: 3,
      denA: 4,
      numB: 3,
      denB: 8,
      operation: '-',
      canvasCaption: 'In eighths, 3/4 = 6/8. Exactly two groups of 3/8 fit inside 6/8!',
    },
    correctFraction: { num: 2, den: 1, requireSimplified: true },
    hint: '(3/4) ÷ (3/8) = (3/4) × (8/3) = 24/12 = 2/1.',
    workedSteps: [
      'Method 1 (Common Denominator): 3/4 = 6/8, and (6/8) ÷ (3/8) = 6 ÷ 3 = 2.',
      'Method 2 (Reciprocal): Multiply by the reciprocal of the divisor: (3/4) × (8/3) = 24/12 = 2/1.',
    ],
  },
  {
    id: 'q-frac-mult-3',
    moduleId: 'frac-mult-div',
    domain: 'fractions',
    difficulty: '6th-Grade Accelerated',
    type: 'fraction-input',
    contextScenario: '6th-Grade Rational Division · Chemistry Vials (6.NS.A.1)',
    prompt:
      'A lab technician has 5/6 liter of reagent and pours 2/9 liter into each test flask. Exactly how many flasks can be filled? Express (5/6) ÷ (2/9) as an improper fraction in simplest form.',
    subPrompt: 'Compute (5/6) × (9/2) and simplify before entering.',
    visualConfig: {
      mode: 'fraction-multiply',
      numA: 5,
      denA: 6,
      numB: 2,
      denB: 9,
      operation: '×',
      canvasCaption: '(5/6) ÷ (2/9) = (5/6) × (9/2) = 45/12 = 15/4 flasks.',
    },
    correctFraction: { num: 15, den: 4, requireSimplified: true },
    hint: 'Multiply (5/6) × (9/2) = 45/12, then divide numerator and denominator by 3.',
    workedSteps: [
      'Rewrite division as multiplication by the reciprocal: (5/6) ÷ (2/9) = (5/6) × (9/2).',
      'Multiply across: (5 × 9) / (6 × 2) = 45/12.',
      'Divide numerator and denominator by GCF = 3: 15/4 (or 3 3/4 flasks).',
    ],
  },
  {
    id: 'q-frac-mult-4',
    moduleId: 'frac-mult-div',
    domain: 'fractions',
    difficulty: '6th-Grade Accelerated',
    type: 'multiple-choice',
    contextScenario: 'Civil Engineering · Roadway Striping (6.NS.A.1)',
    prompt:
      'A crew paints 3/5 kilometer of bike lane in 3/4 of an hour. At this constant rate, how many kilometers do they paint in 1 full hour?',
    visualConfig: {
      mode: 'fraction-bar',
      numA: 3,
      denA: 5,
      numB: 4,
      denB: 5,
      canvasCaption: 'Divide distance (3/5 km) by time (3/4 hr): (3/5) ÷ (3/4).',
    },
    options: ['9/20 km/hr', '4/5 km/hr', '5/4 km/hr', '12/20 km/hr'],
    correctChoiceIndex: 1,
    hint: 'Compute (3/5) ÷ (3/4) = (3/5) × (4/3).',
    workedSteps: [
      'Unit rate = Distance ÷ Time = (3/5) ÷ (3/4).',
      'Multiply by the reciprocal of 3/4: (3/5) × (4/3) = 12/15.',
      'Simplify 12/15 by dividing by 3: 4/5 km per hour.',
    ],
  },

  // ================= MODULE 05: POWERS OF 10, EXPONENTS & THOUSANDTHS =================
  {
    id: 'q-dec-pv-1',
    moduleId: 'dec-place-value',
    domain: 'decimals',
    difficulty: 'Foundation',
    type: 'visual-decimal-grid',
    contextScenario: 'Base-10 Hundredths Grid · Visual Representation',
    prompt:
      'Shade the 10 × 10 hundredths grid on the left to represent 4 tenths and 7 hundredths (0.47).',
    subPrompt:
      'Use the +0.10 / +0.01 buttons or click cells on the hundredths grid until 0.47 is shaded.',
    visualConfig: {
      mode: 'decimal-grid',
      decimalA: 0.0,
      canvasCaption: 'Shade 4 full tenths columns (0.40) and 7 hundredths squares (0.07).',
    },
    correctDecimal: 0.47,
    hint: '4 tenths = 40 squares, plus 7 squares = 47 squares (0.47).',
    workedSteps: [
      '4 × 0.1 = 0.40 and 7 × 0.01 = 0.07.',
      '0.40 + 0.07 = 0.47.',
    ],
  },
  {
    id: 'q-dec-pv-2',
    moduleId: 'dec-place-value',
    domain: 'decimals',
    difficulty: 'Grade-Level',
    type: 'decimal-input',
    contextScenario: 'Precision Meteorology · Expanded Powers of 10',
    prompt:
      'Write the expanded expression (4 × 10¹) + (3 × 1) + (6 × 0.1) + (0 × 0.01) + (8 × 0.001) in standard decimal form.',
    subPrompt: 'Include the tens place, ones place, and placeholder zero in the hundredths place.',
    visualConfig: {
      mode: 'decimal-grid',
      decimalA: 0.608,
      canvasCaption: '40 + 3 + 0.6 + 0.00 + 0.008 = 43.608.',
    },
    correctDecimal: 43.608,
    hint: '4 × 10¹ = 40, plus 3 ones = 43, plus 6 tenths and 8 thousandths = 43.608.',
    workedSteps: [
      '4 × 10¹ = 40 and 3 × 1 = 3 → 43 before the decimal point.',
      '6 × 0.1 = 0.6, 0 × 0.01 = 0.00, 8 × 0.001 = 0.008.',
      'Combined standard decimal: 43.608.',
    ],
  },
  {
    id: 'q-dec-pv-3',
    moduleId: 'dec-place-value',
    domain: 'decimals',
    difficulty: '6th-Grade Accelerated',
    type: 'decimal-input',
    contextScenario: 'Spectroscopy Lab · Powers of 10 Scaling (5.NBT.A.2 → 6.EE.A.1)',
    prompt:
      'A laser pulse wavelength is calculated as 0.0485 × 10³ nanometers. Write this value in standard decimal form.',
    subPrompt: 'Multiplying by 10³ (1,000) shifts the decimal point 3 places to the right.',
    visualConfig: {
      mode: 'decimal-grid',
      decimalA: 0.485,
      canvasCaption: '10³ = 10 × 10 × 10 = 1,000. Shift the decimal point 3 places right.',
    },
    correctDecimal: 48.5,
    hint: 'Move the decimal point in 0.0485 three places to the right: 0.0485 → 0.485 → 4.85 → 48.5.',
    workedSteps: [
      '10³ = 1,000, so multiplying by 10³ increases each digit’s place value by 3 positions.',
      'Shifting the decimal point 3 places right in 0.0485 yields 48.5.',
    ],
  },
  {
    id: 'q-dec-pv-4',
    moduleId: 'dec-place-value',
    domain: 'decimals',
    difficulty: '6th-Grade Accelerated',
    type: 'multiple-choice',
    contextScenario: 'Nanotechnology · Scientific Scaling',
    prompt:
      'Which expression is equivalent to dividing 62.4 by 10²?',
    visualConfig: {
      mode: 'decimal-grid',
      decimalA: 0.624,
      canvasCaption: '62.4 ÷ 10² = 62.4 ÷ 100 = 0.624.',
    },
    options: [
      '62.4 × 0.01 = 0.624',
      '62.4 × 0.1 = 6.24',
      '62.4 × 100 = 6,240',
      '62.4 ÷ 20 = 3.12',
    ],
    correctChoiceIndex: 0,
    hint: 'Dividing by 10² (100) is identical to multiplying by 1/100 (0.01).',
    workedSteps: [
      '10² = 10 × 10 = 100 (not 20).',
      'Dividing 62.4 by 100 shifts the decimal 2 places left to 0.624, which equals 62.4 × 0.01.',
    ],
  },

  // ================= MODULE 06: RATIONAL NUMBER LINE, ORDERING & ROUNDING =================
  {
    id: 'q-dec-comp-1',
    moduleId: 'dec-compare-round',
    domain: 'decimals',
    difficulty: 'Foundation',
    type: 'decimal-input',
    contextScenario: 'Athletics Timing · Photo Finish Rounding',
    prompt:
      'Round the sprint time 14.376 seconds to the nearest hundredth of a second.',
    subPrompt: 'Inspect the thousandths digit (6) on the zoomed number line.',
    visualConfig: {
      mode: 'decimal-number-line',
      decimalA: 0.376,
      numberLineMin: 0.3,
      numberLineMax: 0.4,
      roundingPlace: 'hundredths',
      canvasCaption: '0.376 is past the midpoint 0.375 between 0.370 and 0.380.',
    },
    correctDecimal: 14.38,
    hint: 'Since the thousandths digit is 6 (≥ 5), round 14.37 up to 14.38.',
    workedSteps: [
      '14.376 lies between 14.37 and 14.38.',
      'The thousandths digit is 6 ≥ 5, so it rounds up to 14.38.',
    ],
  },
  {
    id: 'q-dec-comp-2',
    moduleId: 'dec-compare-round',
    domain: 'decimals',
    difficulty: 'Grade-Level',
    type: 'multiple-choice',
    contextScenario: '6th-Grade Rational Number Ordering (6.NS.C.6)',
    prompt:
      'Order the following four rational numbers from LEAST to GREATEST: 0.62, 5/8, 0.605, 3/5.',
    visualConfig: {
      mode: 'decimal-number-line',
      decimalA: 0.625,
      decimalB: 0.605,
      numberLineMin: 0.55,
      numberLineMax: 0.65,
      canvasCaption: 'Convert fractions to thousandths: 3/5 = 0.600 and 5/8 = 0.625.',
    },
    options: [
      '3/5, 0.605, 0.62, 5/8',
      '0.605, 3/5, 0.62, 5/8',
      '3/5, 0.62, 0.605, 5/8',
      '5/8, 0.62, 0.605, 3/5',
    ],
    correctChoiceIndex: 0,
    hint: 'Convert all values to 3-place decimals: 3/5 = 0.600, 0.605 = 0.605, 0.62 = 0.620, 5/8 = 0.625.',
    workedSteps: [
      'Convert fractions to decimals: 3/5 = 0.600 and 5/8 = 0.625.',
      'Pad all decimals to thousandths: 0.600, 0.605, 0.620, 0.625.',
      'Ordered from least to greatest: 3/5 (0.600) < 0.605 < 0.62 (0.620) < 5/8 (0.625).',
    ],
  },
  {
    id: 'q-dec-comp-3',
    moduleId: 'dec-compare-round',
    domain: 'decimals',
    difficulty: '6th-Grade Accelerated',
    type: 'decimal-input',
    contextScenario: 'Coordinate Number Line · Midpoint Calculation',
    prompt:
      'What decimal number lies halfway (at the exact midpoint) between 0.34 and 0.35 on the number line?',
    subPrompt: 'Rewrite 0.34 as 0.340 and 0.35 as 0.350 to find their midpoint.',
    visualConfig: {
      mode: 'decimal-number-line',
      decimalA: 0.345,
      numberLineMin: 0.3,
      numberLineMax: 0.4,
      canvasCaption: 'Midpoint of 0.340 and 0.350 is (0.340 + 0.350) ÷ 2 = 0.345.',
    },
    correctDecimal: 0.345,
    hint: 'Express both endpoints in thousandths: 0.340 and 0.350.',
    workedSteps: [
      'Write 0.34 as 0.340 and 0.35 as 0.350.',
      'The number halfway between 340 thousandths and 350 thousandths is 345 thousandths (0.345).',
    ],
  },
  {
    id: 'q-dec-comp-4',
    moduleId: 'dec-compare-round',
    domain: 'decimals',
    difficulty: '6th-Grade Accelerated',
    type: 'decimal-input',
    contextScenario: 'Solar Observatory · Wavelength Filter',
    prompt:
      'Round 19.964 to the nearest tenth.',
    subPrompt: 'Watch how rounding 9 tenths up carries into the ones and tens place.',
    visualConfig: {
      mode: 'decimal-number-line',
      decimalA: 0.964,
      numberLineMin: 0.9,
      numberLineMax: 1.0,
      roundingPlace: 'tenths',
      canvasCaption: '0.964 rounds up by adding 0.1 to 19.9, giving 20.0.',
    },
    correctDecimal: 20.0,
    hint: 'The hundredths digit is 6 (≥ 5), so 19.9 rounds up to 20.0 (or 20).',
    workedSteps: [
      'Identify the tenths digit (9) and the hundredths digit to its right (6).',
      'Since 6 ≥ 5, add 0.1 to 19.9: 19.9 + 0.1 = 20.0.',
    ],
  },

  // ================= MODULE 07: MULTI-DIGIT DECIMAL OPERATIONS & PRODUCT SCALING =================
  {
    id: 'q-dec-add-1',
    moduleId: 'dec-add-sub',
    domain: 'decimals',
    difficulty: 'Foundation',
    type: 'decimal-input',
    contextScenario: 'Chemistry Titration · Liquid Volume',
    prompt:
      'A graduated cylinder holds 4.6 liters of distilled water. After an experiment uses 1.85 liters, how many liters remain?',
    subPrompt: 'Rewrite 4.6 as 4.60 before subtracting 1.85.',
    visualConfig: {
      mode: 'decimal-grid',
      decimalA: 0.75,
      operation: '-',
      canvasCaption: '4.60 - 1.85 = 2.75 liters.',
    },
    correctDecimal: 2.75,
    hint: 'Align decimal points: 4.60 - 1.85.',
    workedSteps: [
      'Pad 4.6 with a trailing zero: 4.60 - 1.85.',
      'Subtract hundredths and tenths with regrouping: 2.75 liters.',
    ],
  },
  {
    id: 'q-dec-add-2',
    moduleId: 'dec-add-sub',
    domain: 'decimals',
    difficulty: 'Grade-Level',
    type: 'decimal-input',
    contextScenario: '6th-Grade Fluency · Decimal-by-Decimal Multiplication (6.NS.B.3)',
    prompt:
      'Calculate the exact product: 0.6 × 0.35.',
    subPrompt: 'Multiply 6 × 35 = 210, then place the decimal point for 3 total decimal places.',
    visualConfig: {
      mode: 'decimal-grid',
      decimalA: 0.21,
      canvasCaption: '0.6 has 1 decimal place and 0.35 has 2 decimal places → 3 decimal places (0.210 = 0.21).',
    },
    correctDecimal: 0.21,
    hint: '6 × 35 = 210. With 1 + 2 = 3 decimal places, 210 thousandths is 0.210 (or 0.21).',
    workedSteps: [
      'Multiply whole numbers: 6 × 35 = 210.',
      'Count decimal places in the factors: 0.6 (1 place) + 0.35 (2 places) = 3 places.',
      'Place the decimal 3 digits from the right: 0.210 = 0.21.',
    ],
  },
  {
    id: 'q-dec-add-3',
    moduleId: 'dec-add-sub',
    domain: 'decimals',
    difficulty: '6th-Grade Accelerated',
    type: 'decimal-input',
    contextScenario: 'Aerospace Materials · Titanium Alloy Mass',
    prompt:
      'A titanium bolt weighs 2.45 grams. What is the total mass of 3.2 bolts (compute 2.45 × 3.2)?',
    subPrompt: 'Enter the exact decimal product.',
    visualConfig: {
      mode: 'decimal-grid',
      decimalA: 0.84,
      canvasCaption: '245 × 32 = 7,840. With 3 decimal places, 7.840 = 7.84 grams.',
    },
    correctDecimal: 7.84,
    hint: 'Multiply 245 × 32 = 7,840, then apply 3 decimal places to get 7.840 (7.84).',
    workedSteps: [
      'Multiply 245 × 32: (245 × 30 = 7,350) + (245 × 2 = 490) = 7,840.',
      'Total decimal places: 2 places (in 2.45) + 1 place (in 3.2) = 3 places.',
      '7.840 = 7.84 grams.',
    ],
  },
  {
    id: 'q-dec-add-4',
    moduleId: 'dec-add-sub',
    domain: 'decimals',
    difficulty: '6th-Grade Accelerated',
    type: 'decimal-input',
    contextScenario: 'Track Meet · Relay Split Improvement',
    prompt:
      'A relay team finished in 52.4 seconds in April and improved their time by 3.68 seconds in May. What was their May race time?',
    subPrompt: 'Compute 52.40 - 3.68.',
    visualConfig: {
      mode: 'decimal-grid',
      decimalA: 0.72,
      operation: '-',
      canvasCaption: '52.40 - 3.68 = 48.72 seconds.',
    },
    correctDecimal: 48.72,
    hint: 'Write 52.40 - 3.68 and regroup across the decimal point.',
    workedSteps: [
      'Align decimals with placeholder zero: 52.40 - 3.68.',
      'Result: 48.72 seconds.',
    ],
  },

  // ================= MODULE 08: DECIMAL DIVISION & FRACTION-DECIMAL-PERCENT FLUENCY =================
  {
    id: 'q-bridge-1',
    moduleId: 'dec-frac-bridge',
    domain: 'decimals',
    difficulty: 'Foundation',
    type: 'fraction-input',
    contextScenario: 'Precision Carpentry · Metric-to-Fraction Conversion',
    prompt:
      'A blueprint calls for a 0.35-meter steel bracket. Write 0.35 as a fraction in simplest form.',
    subPrompt: 'Start with 35/100 and divide numerator and denominator by their GCF (5).',
    visualConfig: {
      mode: 'equivalence-bridge',
      numA: 7,
      denA: 20,
      decimalA: 0.35,
      canvasCaption: '0.35 = 35/100 = 7/20.',
    },
    correctFraction: { num: 7, den: 20, requireSimplified: true },
    hint: 'Divide 35 and 100 by 5.',
    workedSteps: [
      '0.35 = 35/100.',
      'Divide numerator and denominator by GCF(35, 100) = 5: 7/20.',
    ],
  },
  {
    id: 'q-bridge-2',
    moduleId: 'dec-frac-bridge',
    domain: 'decimals',
    difficulty: '6th-Grade Accelerated',
    type: 'decimal-input',
    contextScenario: '6th-Grade Decimal Division · Divisor Shift (6.NS.B.3)',
    prompt:
      'Divide the decimals: 3.6 ÷ 0.15.',
    subPrompt: 'Multiply both dividend and divisor by 100 to compute 360 ÷ 15.',
    visualConfig: {
      mode: 'equivalence-bridge',
      numA: 6,
      denA: 10,
      decimalA: 0.6,
      canvasCaption: '3.6 ÷ 0.15 = (3.6 × 100) ÷ (0.15 × 100) = 360 ÷ 15 = 24.',
    },
    correctDecimal: 24,
    hint: 'Shift the decimal 2 places right in both numbers: 3.60 ÷ 0.15 = 360 ÷ 15.',
    workedSteps: [
      'Multiply both 3.6 and 0.15 by 100 to make the divisor a whole number: 360 ÷ 15.',
      'Divide: 360 ÷ 15 = 24.',
    ],
  },
  {
    id: 'q-bridge-3',
    moduleId: 'dec-frac-bridge',
    domain: 'decimals',
    difficulty: '6th-Grade Accelerated',
    type: 'decimal-input',
    contextScenario: 'Circuit Board Manufacturing · Micro-Spacing',
    prompt:
      'A 4.32-centimeter copper trace is divided into equal segments of 0.12 centimeters each. How many segments are formed (4.32 ÷ 0.12)?',
    subPrompt: 'Scale both values by 100 to compute 432 ÷ 12.',
    visualConfig: {
      mode: 'equivalence-bridge',
      numA: 8,
      denA: 10,
      decimalA: 0.32,
      canvasCaption: '4.32 ÷ 0.12 = 432 ÷ 12 = 36 segments.',
    },
    correctDecimal: 36,
    hint: '432 ÷ 12: since 36 × 12 = 432, the quotient is 36.',
    workedSteps: [
      'Multiply dividend and divisor by 100: 4.32 ÷ 0.12 = 432 ÷ 12.',
      '432 ÷ 12 = 36 segments.',
    ],
  },
  {
    id: 'q-bridge-4',
    moduleId: 'dec-frac-bridge',
    domain: 'decimals',
    difficulty: '6th-Grade Accelerated',
    type: 'multiple-choice',
    contextScenario: 'machine Shop · Fraction-Decimal-Percent Triad',
    prompt:
      'Which choice shows the correct decimal AND percent equivalent for the benchmark fraction 5/8?',
    visualConfig: {
      mode: 'equivalence-bridge',
      numA: 5,
      denA: 8,
      decimalA: 0.625,
      canvasCaption: '5/8 = 0.625 = 62.5%.',
    },
    options: [
      '0.58 and 58%',
      '0.625 and 62.5%',
      '0.65 and 65%',
      '0.625 and 6.25%',
    ],
    correctChoiceIndex: 1,
    hint: '5 ÷ 8 = 0.625. Multiply by 100 to convert the decimal into a percent (62.5%).',
    workedSteps: [
      '5/8 = 4/8 + 1/8 = 0.500 + 0.125 = 0.625.',
      'To express 0.625 as a percent (per hundred), multiply by 100: 62.5%.',
    ],
  },

  // ================= MODULE 09: RATIOS, UNIT RATES & PERCENTS (6.RP.A.1–3) =================
  {
    id: 'q-bridge-rp-1',
    moduleId: 'bridge-ratios-percents',
    domain: 'bridge6',
    difficulty: 'Grade-Level',
    type: 'decimal-input',
    contextScenario: '6th-Grade Proportional Reasoning · Unit Rate Speed (6.RP.A.2)',
    prompt:
      'A high-speed electric train travels 189 kilometers in 1.5 hours. What is the train’s unit rate in kilometers per hour (km/h)?',
    subPrompt: 'Compute 189 ÷ 1.5 (equivalent to 1,890 ÷ 15).',
    visualConfig: {
      mode: 'fraction-bar',
      numA: 3,
      denA: 2,
      numB: 6,
      denB: 4,
      canvasCaption: '1.5 hours = 3/2 hours. Dividing 189 by 1.5 finds the distance traveled in 1 hour.',
    },
    correctDecimal: 126,
    hint: 'Divide 189 by 1.5 (or multiply 189 by 2/3).',
    workedSteps: [
      'Unit rate = 189 km ÷ 1.5 hours.',
      'Multiply both by 10: 1,890 ÷ 15 = 126 km/h.',
    ],
  },
  {
    id: 'q-bridge-rp-2',
    moduleId: 'bridge-ratios-percents',
    domain: 'bridge6',
    difficulty: '6th-Grade Accelerated',
    type: 'decimal-input',
    contextScenario: '6th-Grade Percent Proportions · Solar Battery (6.RP.A.3c)',
    prompt:
      'A home battery bank has a total capacity of 40 kilowatt-hours (kWh) and is currently at 35% charge. How many kilowatt-hours of energy are stored right now?',
    subPrompt: 'Compute 35% of 40 (0.35 × 40 or (7/20) × 40).',
    visualConfig: {
      mode: 'decimal-grid',
      decimalA: 0.35,
      canvasCaption: '35% = 35/100 = 0.35 on the hundredths grid. Multiply 0.35 × 40.',
    },
    correctDecimal: 14,
    hint: '10% of 40 is 4, so 30% is 12 and 5% is 2. Add 12 + 2.',
    workedSteps: [
      'Convert 35% to a decimal or simplified fraction: 35% = 0.35 = 7/20.',
      'Multiply by total capacity: (7/20) × 40 = 7 × 2 = 14 kWh.',
    ],
  },
  {
    id: 'q-bridge-rp-3',
    moduleId: 'bridge-ratios-percents',
    domain: 'bridge6',
    difficulty: '6th-Grade Accelerated',
    type: 'fraction-input',
    contextScenario: 'Botanical Pigment Ratio · Part-to-Whole Analysis (6.RP.A.1)',
    prompt:
      'A green glaze recipe uses a ratio of 3 parts cobalt blue to 5 parts ochre yellow. What fraction of the TOTAL glaze mixture is cobalt blue?',
    subPrompt: 'Be careful: convert the part-to-part ratio (3 : 5) into a part-to-whole fraction.',
    visualConfig: {
      mode: 'fraction-bar',
      numA: 3,
      denA: 8,
      numB: 3,
      denB: 8,
      canvasCaption: '3 parts blue + 5 parts yellow = 8 total parts in the whole batch.',
    },
    correctFraction: { num: 3, den: 8, requireSimplified: true },
    hint: 'Add the parts (3 + 5 = 8) to find the total number of parts in the whole mixture.',
    workedSteps: [
      'Total parts in the mixture = 3 (blue) + 5 (yellow) = 8 parts.',
      'The fraction of the total mixture that is cobalt blue is 3/8.',
    ],
  },

  // ================= MODULE 10: EXPONENTS (PEMDAS), VOLUME & COORDINATES =================
  {
    id: 'q-bridge-ev-1',
    moduleId: 'bridge-expressions-volume',
    domain: 'bridge6',
    difficulty: 'Grade-Level',
    type: 'decimal-input',
    contextScenario: 'Order of Operations with Exponents (5.OA.A.1 → 6.EE.A.1)',
    prompt:
      'Evaluate the numerical expression using the order of operations (PEMDAS): 4² + 3 × (10 - 2²) ÷ 2.',
    subPrompt: 'Evaluate inside parentheses first (including 2²), then 4², then multiplication/division, then addition.',
    visualConfig: {
      mode: 'fraction-multiply',
      numA: 4,
      denA: 4,
      numB: 2,
      denB: 2,
      canvasCaption: '4² = 16 and 2² = 4. Follow PEMDAS step by step.',
    },
    correctDecimal: 25,
    hint: 'Inside parentheses: 10 - 2² = 10 - 4 = 6. Then 4² + 3 × 6 ÷ 2 = 16 + 9.',
    workedSteps: [
      'Parentheses first: 2² = 4, so (10 - 4) = 6.',
      'Exponents: 4² = 16.',
      'Multiply and divide left to right: 3 × 6 ÷ 2 = 18 ÷ 2 = 9.',
      'Add: 16 + 9 = 25.',
    ],
  },
  {
    id: 'q-bridge-ev-2',
    moduleId: 'bridge-expressions-volume',
    domain: 'bridge6',
    difficulty: '6th-Grade Accelerated',
    type: 'fraction-input',
    contextScenario: '3D Geometry · Fractional-Edge Prism Volume (5.MD.C.5 → 6.G.A.2)',
    prompt:
      'A rectangular glass terrarium has length 3/2 meters, width 2/3 meter, and height 3/4 meter. What is its volume (V = l × w × h) in cubic meters in simplest form?',
    subPrompt: 'Multiply (3/2) × (2/3) × (3/4) and simplify.',
    visualConfig: {
      mode: 'fraction-multiply',
      numA: 3,
      denA: 4,
      numB: 2,
      denB: 3,
      operation: '×',
      canvasCaption: 'Notice that (3/2) × (2/3) = 1 whole, leaving 1 × (3/4) = 3/4 m³.',
    },
    correctFraction: { num: 3, den: 4, requireSimplified: true },
    hint: 'First multiply (3/2) × (2/3) = 6/6 = 1, then multiply 1 × (3/4).',
    workedSteps: [
      'Volume formula: V = length × width × height = (3/2) × (2/3) × (3/4).',
      'Since (3/2) and (2/3) are reciprocals, their product is 1.',
      '1 × (3/4) = 3/4 cubic meter.',
    ],
  },
  {
    id: 'q-bridge-ev-3',
    moduleId: 'bridge-expressions-volume',
    domain: 'bridge6',
    difficulty: '6th-Grade Accelerated',
    type: 'decimal-input',
    contextScenario: 'Coordinate Plane Geometry · Rational Distance (5.G.A.2 → 6.G.A.3)',
    prompt:
      'On a coordinate grid, Sensor A is located at (2.5, 1.25) and Sensor B is located at (2.5, 6.75). Since both points share the same x-coordinate, what is the vertical distance between Sensor A and Sensor B?',
    subPrompt: 'Subtract the y-coordinates: 6.75 - 1.25.',
    visualConfig: {
      mode: 'decimal-number-line',
      decimalA: 0.5,
      numberLineMin: 0,
      numberLineMax: 1,
      canvasCaption: 'Vertical distance along x = 2.5 is 6.75 - 1.25 = 5.5 units.',
    },
    correctDecimal: 5.5,
    hint: 'Compute 6.75 - 1.25.',
    workedSteps: [
      'Both points lie on the vertical line x = 2.5.',
      'Subtract the y-coordinates: 6.75 - 1.25 = 5.50 = 5.5 units.',
    ],
  },
];

/**
 * Procedural 5th-to-6th Grade Accelerated Question Generator
 */
export function generateDynamicQuestions(
  filterDomain: DomainCategory | 'mixed',
  moduleId?: ModuleId,
  count: number = 6
): QuizQuestion[] {
  const generated: QuizQuestion[] = [];
  const stamp = Date.now();

  const targetModules: ModuleId[] = moduleId
    ? [moduleId]
    : filterDomain === 'fractions'
      ? ['frac-equiv', 'frac-add-sub', 'frac-mixed', 'frac-mult-div']
      : filterDomain === 'decimals'
        ? ['dec-place-value', 'dec-compare-round', 'dec-add-sub', 'dec-frac-bridge']
        : filterDomain === 'bridge6'
          ? ['bridge-ratios-percents', 'bridge-expressions-volume']
          : CURRICULUM_MODULES.map((m) => m.id);

  for (let i = 0; i < count; i++) {
    const mod = targetModules[i % targetModules.length];
    const qId = `dyn-${mod}-${stamp}-${i}`;

    if (mod === 'frac-equiv') {
      const bases = [
        { n: 3, d: 4 },
        { n: 2, d: 5 },
        { n: 5, d: 6 },
        { n: 3, d: 8 },
        { n: 4, d: 7 },
      ];
      const base = bases[(i + Math.floor(Math.random() * bases.length)) % bases.length];
      const mult = [6, 8, 9, 12][(i + 1) % 4];
      const unsimplifiedN = base.n * mult;
      const unsimplifiedD = base.d * mult;

      generated.push({
        id: qId,
        moduleId: 'frac-equiv',
        domain: 'fractions',
        difficulty: '6th-Grade Accelerated',
        type: 'fraction-input',
        contextScenario: 'Dynamic Practice · GCF Simplification',
        prompt: `Reduce the ratio ${unsimplifiedN}/${unsimplifiedD} to its simplest form using GCF(${unsimplifiedN}, ${unsimplifiedD}).`,
        subPrompt: 'Divide both numerator and denominator by their Greatest Common Factor.',
        visualConfig: {
          mode: 'fraction-bar',
          numA: base.n,
          denA: base.d,
          numB: base.n,
          denB: base.d,
          canvasCaption: `GCF(${unsimplifiedN}, ${unsimplifiedD}) = ${mult}.`,
        },
        correctFraction: { num: base.n, den: base.d, requireSimplified: true },
        hint: `Both ${unsimplifiedN} and ${unsimplifiedD} are divisible by ${mult}.`,
        workedSteps: [
          `GCF(${unsimplifiedN}, ${unsimplifiedD}) = ${mult}.`,
          `(${unsimplifiedN} ÷ ${mult}) / (${unsimplifiedD} ÷ ${mult}) = ${base.n}/${base.d}.`,
        ],
      });
    } else if (mod === 'frac-add-sub') {
      const pairs = [
        { n1: 3, d1: 4, n2: 1, d2: 6 },
        { n1: 5, d1: 6, n2: 3, d2: 8 },
        { n1: 7, d1: 10, n2: 1, d2: 4 },
        { n1: 2, d1: 3, n2: 1, d2: 8 },
      ];
      const pair = pairs[i % pairs.length];
      const commonD = lcm(pair.d1, pair.d2);
      const scaled1 = pair.n1 * (commonD / pair.d1);
      const scaled2 = pair.n2 * (commonD / pair.d2);
      const diffN = scaled1 - scaled2;
      const g = gcd(diffN, commonD);

      generated.push({
        id: qId,
        moduleId: 'frac-add-sub',
        domain: 'fractions',
        difficulty: '6th-Grade Accelerated',
        type: 'fraction-input',
        contextScenario: 'Dynamic Practice · Fractional Equations (6.EE.B.7)',
        prompt: `Solve for x in simplest form: x + ${pair.n2}/${pair.d2} = ${pair.n1}/${pair.d1}.`,
        subPrompt: `Subtract ${pair.n2}/${pair.d2} from ${pair.n1}/${pair.d1} using LCD = ${commonD}.`,
        visualConfig: {
          mode: 'lcd-grid',
          numA: pair.n1,
          denA: pair.d1,
          numB: pair.n2,
          denB: pair.d2,
          operation: '-',
          canvasCaption: `x = ${pair.n1}/${pair.d1} - ${pair.n2}/${pair.d2} (LCD = ${commonD}).`,
        },
        correctFraction: { num: diffN / g, den: commonD / g, requireSimplified: true },
        hint: `Convert to denominator ${commonD}: ${scaled1}/${commonD} - ${scaled2}/${commonD}.`,
        workedSteps: [
          `Isolate x: x = ${pair.n1}/${pair.d1} - ${pair.n2}/${pair.d2}.`,
          `With LCD = ${commonD}: ${scaled1}/${commonD} - ${scaled2}/${commonD} = ${diffN}/${commonD}.`,
          `Simplified: ${diffN / g}/${commonD / g}.`,
        ],
      });
    } else if (mod === 'frac-mixed') {
      const whole = 2 + (i % 3);
      const den = [4, 5, 6, 8][i % 4];
      const num = 1 + (i % (den - 1));
      const improperNum = whole * den + num;

      generated.push({
        id: qId,
        moduleId: 'frac-mixed',
        domain: 'fractions',
        difficulty: 'Grade-Level',
        type: 'fraction-input',
        contextScenario: 'Dynamic Practice · Mixed to Improper Conversion',
        prompt: `Convert the mixed number ${whole} ${num}/${den} into an improper fraction.`,
        subPrompt: `Compute (${whole} × ${den} + ${num}) / ${den}.`,
        visualConfig: {
          mode: 'mixed-number-line',
          numA: improperNum,
          denA: den,
          numberLineMin: 0,
          numberLineMax: whole + 1,
          canvasCaption: `${whole} wholes = ${whole * den}/${den}, plus ${num}/${den}.`,
        },
        correctFraction: { num: improperNum, den },
        hint: `Multiply ${whole} × ${den} = ${whole * den}, then add ${num}.`,
        workedSteps: [
          `${whole} × ${den} = ${whole * den}.`,
          `${whole * den}/${den} + ${num}/${den} = ${improperNum}/${den}.`,
        ],
      });
    } else if (mod === 'frac-mult-div') {
      const divCombos = [
        { n1: 2, d1: 3, n2: 4, d2: 9 },
        { n1: 3, d1: 5, n2: 9, d2: 10 },
        { n1: 5, d1: 8, n2: 1, d2: 4 },
        { n1: 4, d1: 7, n2: 2, d2: 7 },
      ];
      const c = divCombos[i % divCombos.length];
      const rawN = c.n1 * c.d2;
      const rawD = c.d1 * c.n2;
      const g = gcd(rawN, rawD);

      generated.push({
        id: qId,
        moduleId: 'frac-mult-div',
        domain: 'fractions',
        difficulty: '6th-Grade Accelerated',
        type: 'fraction-input',
        contextScenario: 'Dynamic Practice · Reciprocal Fraction Division (6.NS.A.1)',
        prompt: `Divide (${c.n1}/${c.d1}) ÷ (${c.n2}/${c.d2}) and express the quotient in simplest form (use denominator 1 for a whole number).`,
        subPrompt: `Multiply ${c.n1}/${c.d1} by the reciprocal ${c.d2}/${c.n2}.`,
        visualConfig: {
          mode: 'fraction-multiply',
          numA: c.n1,
          denA: c.d1,
          numB: c.n2,
          denB: c.d2,
          operation: '×',
          canvasCaption: `(${c.n1}/${c.d1}) × (${c.d2}/${c.n2}) = ${rawN}/${rawD} = ${rawN / g}/${rawD / g}.`,
        },
        correctFraction: { num: rawN / g, den: rawD / g, requireSimplified: true },
        hint: `Multiply (${c.n1} × ${c.d2}) / (${c.d1} × ${c.n2}) = ${rawN}/${rawD}, then divide by ${g}.`,
        workedSteps: [
          `Multiply by the reciprocal: (${c.n1}/${c.d1}) × (${c.d2}/${c.n2}) = ${rawN}/${rawD}.`,
          `Simplify by dividing numerator and denominator by ${g}: ${rawN / g}/${rawD / g}.`,
        ],
      });
    } else if (mod === 'dec-place-value') {
      const tenths = 3 + ((i * 2) % 6);
      const hundredths = 2 + ((i * 3) % 7);
      const val = Number((tenths * 0.1 + hundredths * 0.01).toFixed(2));

      generated.push({
        id: qId,
        moduleId: 'dec-place-value',
        domain: 'decimals',
        difficulty: 'Foundation',
        type: 'visual-decimal-grid',
        contextScenario: 'Dynamic Practice · Base-10 Grid Shading',
        prompt: `Shade the 10 × 10 hundredths grid on the left to represent (${tenths} × 0.1) + (${hundredths} × 0.01).`,
        subPrompt: `Shade ${tenths} tenths and ${hundredths} hundredths (${val.toFixed(2)}).`,
        visualConfig: {
          mode: 'decimal-grid',
          decimalA: 0,
          canvasCaption: `Target: ${tenths} tenths + ${hundredths} hundredths = ${val.toFixed(2)}.`,
        },
        correctDecimal: val,
        hint: `${tenths * 10 + hundredths} hundredths squares = ${val.toFixed(2)}.`,
        workedSteps: [
          `${tenths} × 0.1 = ${(tenths * 0.1).toFixed(2)} and ${hundredths} × 0.01 = ${(hundredths * 0.01).toFixed(2)}.`,
          `Sum: ${val.toFixed(2)}.`,
        ],
      });
    } else if (mod === 'dec-compare-round') {
      const samples = [
        { raw: 6.478, rounded: 6.48, min: 0.4, max: 0.5, fracPart: 0.478 },
        { raw: 9.234, rounded: 9.23, min: 0.2, max: 0.3, fracPart: 0.234 },
        { raw: 15.865, rounded: 15.87, min: 0.8, max: 0.9, fracPart: 0.865 },
      ];
      const s = samples[i % samples.length];

      generated.push({
        id: qId,
        moduleId: 'dec-compare-round',
        domain: 'decimals',
        difficulty: 'Grade-Level',
        type: 'decimal-input',
        contextScenario: 'Dynamic Practice · Precision Rounding',
        prompt: `Round the decimal ${s.raw} to the nearest hundredth.`,
        subPrompt: 'Inspect the thousandths digit to determine whether to round up or down.',
        visualConfig: {
          mode: 'decimal-number-line',
          decimalA: s.fracPart,
          numberLineMin: s.min,
          numberLineMax: s.max,
          roundingPlace: 'hundredths',
          canvasCaption: `Locate ${s.fracPart.toFixed(3)} on the hundredths interval.`,
        },
        correctDecimal: s.rounded,
        hint: `Check the thousandths digit of ${s.raw}.`,
        workedSteps: [
          `Rounding ${s.raw} to the nearest hundredth yields ${s.rounded.toFixed(2)}.`,
        ],
      });
    } else if (mod === 'dec-add-sub') {
      const a = Number((0.4 + (i % 4) * 0.2).toFixed(1));
      const b = Number((0.25 + (i % 3) * 0.15).toFixed(2));
      const prod = Number((a * b).toFixed(3));

      generated.push({
        id: qId,
        moduleId: 'dec-add-sub',
        domain: 'decimals',
        difficulty: '6th-Grade Accelerated',
        type: 'decimal-input',
        contextScenario: 'Dynamic Practice · Decimal Product Scaling (6.NS.B.3)',
        prompt: `Multiply the decimals: ${a} × ${b}.`,
        subPrompt: 'Count the total decimal places in both factors.',
        visualConfig: {
          mode: 'decimal-grid',
          decimalA: prod,
          canvasCaption: `${a} × ${b} = ${prod}.`,
        },
        correctDecimal: prod,
        hint: `Multiply whole numbers then place the decimal point so the product has 3 decimal places (trailing zeros may be omitted).`,
        workedSteps: [
          `${a} × ${b} = ${prod}.`,
        ],
      });
    } else if (mod === 'dec-frac-bridge') {
      const divs = [
        { dividend: 4.5, divisor: 0.15, ans: 30 },
        { dividend: 2.88, divisor: 0.12, ans: 24 },
        { dividend: 6.4, divisor: 0.16, ans: 40 },
      ];
      const dv = divs[i % divs.length];

      generated.push({
        id: qId,
        moduleId: 'dec-frac-bridge',
        domain: 'decimals',
        difficulty: '6th-Grade Accelerated',
        type: 'decimal-input',
        contextScenario: 'Dynamic Practice · Decimal-by-Decimal Division (6.NS.B.3)',
        prompt: `Divide the decimals: ${dv.dividend} ÷ ${dv.divisor}.`,
        subPrompt: `Multiply both numbers by 100 to create a whole-number divisor (${Math.round(dv.dividend * 100)} ÷ ${Math.round(dv.divisor * 100)}).`,
        visualConfig: {
          mode: 'equivalence-bridge',
          numA: 3,
          denA: 4,
          decimalA: 0.75,
          canvasCaption: `${dv.dividend} ÷ ${dv.divisor} = ${Math.round(dv.dividend * 100)} ÷ ${Math.round(dv.divisor * 100)} = ${dv.ans}.`,
        },
        correctDecimal: dv.ans,
        hint: `Compute ${Math.round(dv.dividend * 100)} ÷ ${Math.round(dv.divisor * 100)}.`,
        workedSteps: [
          `Multiply dividend and divisor by 100: ${Math.round(dv.dividend * 100)} ÷ ${Math.round(dv.divisor * 100)} = ${dv.ans}.`,
        ],
      });
    } else if (mod === 'bridge-ratios-percents') {
      const pcts = [
        { pct: 25, whole: 80, ans: 20 },
        { pct: 40, whole: 65, ans: 26 },
        { pct: 75, whole: 48, ans: 36 },
      ];
      const p = pcts[i % pcts.length];

      generated.push({
        id: qId,
        moduleId: 'bridge-ratios-percents',
        domain: 'bridge6',
        difficulty: '6th-Grade Accelerated',
        type: 'decimal-input',
        contextScenario: 'Dynamic Practice · Percent of a Quantity (6.RP.A.3c)',
        prompt: `Calculate ${p.pct}% of ${p.whole}.`,
        subPrompt: `Convert ${p.pct}% to a decimal (${(p.pct / 100).toFixed(2)}) or benchmark fraction and multiply by ${p.whole}.`,
        visualConfig: {
          mode: 'decimal-grid',
          decimalA: p.pct / 100,
          canvasCaption: `${p.pct}% = ${p.pct}/100 = ${(p.pct / 100).toFixed(2)}.`,
        },
        correctDecimal: p.ans,
        hint: `Multiply ${(p.pct / 100).toFixed(2)} × ${p.whole}.`,
        workedSteps: [
          `${p.pct}% = ${p.pct}/100 = ${(p.pct / 100).toFixed(2)}.`,
          `${(p.pct / 100).toFixed(2)} × ${p.whole} = ${p.ans}.`,
        ],
      });
    } else {
      const exps = [
        { expr: '3² + 4 × (8 - 3)', ans: 29, steps: ['8 - 3 = 5', '3² = 9', '4 × 5 = 20', '9 + 20 = 29'] },
        { expr: '5² - 2 × (6 + 2²)', ans: 5, steps: ['2² = 4, so 6 + 4 = 10', '5² = 25', '2 × 10 = 20', '25 - 20 = 5'] },
      ];
      const ex = exps[i % exps.length];

      generated.push({
        id: qId,
        moduleId: 'bridge-expressions-volume',
        domain: 'bridge6',
        difficulty: '6th-Grade Accelerated',
        type: 'decimal-input',
        contextScenario: 'Dynamic Practice · Exponents & Order of Operations (6.EE.A.1)',
        prompt: `Evaluate the expression: ${ex.expr}.`,
        subPrompt: 'Follow PEMDAS: Parentheses, Exponents, Multiplication/Division, Addition/Subtraction.',
        visualConfig: {
          mode: 'fraction-multiply',
          numA: 3,
          denA: 3,
          numB: 2,
          denB: 2,
          canvasCaption: 'Evaluate exponents and parentheses before multiplication and addition.',
        },
        correctDecimal: ex.ans,
        hint: ex.steps[0],
        workedSteps: ex.steps,
      });
    }
  }

  return generated;
}

/**
 * Computes all 8 Mastery Achievement Badges dynamically from a student's live progress
 */
export function evaluateStudentAchievements(
  student: StudentProfile
): AchievementBadge[] {
  const fracMods: ModuleId[] = [
    'frac-equiv',
    'frac-add-sub',
    'frac-mixed',
    'frac-mult-div',
  ];
  const decMods: ModuleId[] = [
    'dec-place-value',
    'dec-compare-round',
    'dec-add-sub',
    'dec-frac-bridge',
  ];
  const bridgeMods: ModuleId[] = [
    'bridge-ratios-percents',
    'bridge-expressions-volume',
  ];
  const allMods: ModuleId[] = [...fracMods, ...decMods, ...bridgeMods];

  const countMastered = (ids: ModuleId[]) =>
    ids.filter((id) => student.moduleProgress[id]?.masteryLevel === 'Mastered')
      .length;

  const fracMastered = countMastered(fracMods);
  const decMastered = countMastered(decMods);
  const bridgeMastered = countMastered(bridgeMods);
  const totalMastered = countMastered(allMods);

  const modulesAttempted = allMods.filter(
    (id) => (student.moduleProgress[id]?.questionsAttempted ?? 0) > 0
  ).length;

  const hasPerfectQuiz =
    student.attemptHistory.some((a) => a.accuracyPercent === 100) ||
    allMods.some((id) => (student.moduleProgress[id]?.bestQuizScore ?? 0) === 100);

  const maxModuleStreak = Math.max(
    student.dailyStreak,
    ...allMods.map((id) => student.moduleProgress[id]?.currentStreak ?? 0)
  );

  const equivAndBridgeMastered =
    (student.moduleProgress['frac-equiv']?.masteryLevel === 'Mastered' ? 1 : 0) +
    (student.moduleProgress['dec-frac-bridge']?.masteryLevel === 'Mastered'
      ? 1
      : 0);

  const sixthReadyCount =
    (student.moduleProgress['frac-mult-div']?.masteryLevel === 'Mastered'
      ? 1
      : 0) +
    (student.moduleProgress['bridge-ratios-percents']?.masteryLevel === 'Mastered'
      ? 1
      : 0) +
    (student.moduleProgress['bridge-expressions-volume']?.masteryLevel ===
    'Mastered'
      ? 1
      : 0);

  const findNextUnmastered = (ids: ModuleId[], fallback: ModuleId): ModuleId =>
    ids.find((id) => student.moduleProgress[id]?.masteryLevel !== 'Mastered') ??
    fallback;

  return [
    {
      id: 'badge-fraction-pro',
      title: 'Fraction Pro',
      categoryLabel: 'Fractions Track · CCSS.5.NF → 6.NS.A',
      description:
        'Demonstrate ≥85% mastery across at least 3 advanced fraction modules (Equivalence & GCF, LCD Equations, Mixed Scaling, or Reciprocal Division).',
      criteriaText: 'Master 3+ Fractions Modules',
      unlocked: fracMastered >= 3,
      progressCurrent: Math.min(3, fracMastered),
      progressTarget: 3,
      progressUnit: 'Modules Mastered',
      accentColor: 'azure',
      recommendedModuleId: findNextUnmastered(fracMods, 'frac-mult-div'),
      iconType: 'fraction-pro',
    },
    {
      id: 'badge-decimal-master',
      title: 'Decimal Master',
      categoryLabel: 'Decimals Track · CCSS.5.NBT → 6.NS.B',
      description:
        'Demonstrate ≥85% mastery across at least 3 precision decimal modules (Powers of 10, Rational Number Line, Product Scaling, or Decimal Division).',
      criteriaText: 'Master 3+ Decimals Modules',
      unlocked: decMastered >= 3,
      progressCurrent: Math.min(3, decMastered),
      progressTarget: 3,
      progressUnit: 'Modules Mastered',
      accentColor: 'emerald',
      recommendedModuleId: findNextUnmastered(decMods, 'dec-add-sub'),
      iconType: 'decimal-master',
    },
    {
      id: 'badge-sixth-ready',
      title: '6th-Grade Ready Scholar',
      categoryLabel: 'Grade 6 Acceleration · CCSS.6.RP & 6.EE',
      description:
        'Master the 6th-grade transition modules: Reciprocal Fraction Division (6.NS.A.1), Ratios & Unit Rates (6.RP.A), and Exponents & Volume (6.EE/6.G).',
      criteriaText: 'Master All 3 Grade-6 Bridge Modules',
      unlocked: sixthReadyCount >= 3,
      progressCurrent: sixthReadyCount,
      progressTarget: 3,
      progressUnit: 'Bridge Modules',
      accentColor: 'azure',
      recommendedModuleId: findNextUnmastered(
        ['frac-mult-div', 'bridge-ratios-percents', 'bridge-expressions-volume'],
        'bridge-ratios-percents'
      ),
      iconType: 'sixth-ready',
    },
    {
      id: 'badge-precision-100',
      title: 'Precision Architect',
      categoryLabel: 'Accuracy Milestone · 100% Score',
      description:
        'Achieve a flawless 100% accuracy score on any module assessment or spiral diagnostic quiz.',
      criteriaText: 'Score 100% on Any Quiz',
      unlocked: hasPerfectQuiz,
      progressCurrent: hasPerfectQuiz
        ? 100
        : Math.max(
            0,
            ...allMods.map((id) => student.moduleProgress[id]?.bestQuizScore ?? 0)
          ),
      progressTarget: 100,
      progressUnit: '% Best Quiz',
      accentColor: 'emerald',
      recommendedModuleId: 'dec-place-value',
      iconType: 'precision-100',
    },
    {
      id: 'badge-percent-virtuoso',
      title: 'Equivalence & Percent Virtuoso',
      categoryLabel: 'Cross-Domain Fluency · Fractions ↔ Decimals ↔ %',
      description:
        'Master both Module 01 (Equivalent Fractions, GCF & LCM) and Module 08 (Decimal Division & Percent Fluency).',
      criteriaText: 'Master Modules 01 & 08',
      unlocked: equivAndBridgeMastered >= 2,
      progressCurrent: equivAndBridgeMastered,
      progressTarget: 2,
      progressUnit: 'Core Modules',
      accentColor: 'amber',
      recommendedModuleId:
        student.moduleProgress['frac-equiv']?.masteryLevel !== 'Mastered'
          ? 'frac-equiv'
          : 'dec-frac-bridge',
      iconType: 'percent-bridge',
    },
    {
      id: 'badge-streak-champion',
      title: 'Unstoppable Streak',
      categoryLabel: 'Consistency Milestone · 5+ Streak',
      description:
        'Maintain a 5-day active learning streak or answer 5+ consecutive problems correctly within a module.',
      criteriaText: 'Reach Streak of 5+',
      unlocked: maxModuleStreak >= 5,
      progressCurrent: Math.min(5, maxModuleStreak),
      progressTarget: 5,
      progressUnit: 'Streak Count',
      accentColor: 'amber',
      recommendedModuleId: 'frac-add-sub',
      iconType: 'streak-flame',
    },
    {
      id: 'badge-polymath-explorer',
      title: 'Polymath Explorer',
      categoryLabel: 'Breadth Milestone · All 10 Topics',
      description:
        'Solve practice or diagnostic problems across all 10 Grade 5→6 curriculum modules.',
      criteriaText: 'Practice All 10 Modules',
      unlocked: modulesAttempted >= 10,
      progressCurrent: modulesAttempted,
      progressTarget: 10,
      progressUnit: 'Modules Explored',
      accentColor: 'slate',
      recommendedModuleId:
        allMods.find(
          (id) => (student.moduleProgress[id]?.questionsAttempted ?? 0) === 0
        ) ?? 'bridge-expressions-volume',
      iconType: 'polymath-compass',
    },
    {
      id: 'badge-rational-grandmaster',
      title: 'Rational Number Grandmaster',
      categoryLabel: 'Capstone Distinction · Complete Mastery',
      description:
        'Achieve "Mastered" status (≥85% accuracy) in all 10 Fractions, Decimals, Ratios, and Expressions modules.',
      criteriaText: 'Master All 10 Curriculum Modules',
      unlocked: totalMastered >= 10 && bridgeMastered >= 2,
      progressCurrent: totalMastered,
      progressTarget: 10,
      progressUnit: 'Modules Mastered',
      accentColor: 'emerald',
      recommendedModuleId: findNextUnmastered(allMods, 'bridge-expressions-volume'),
      iconType: 'grandmaster-crown',
    },
  ];
}

export const INITIAL_STUDENT_PROFILES: StudentProfile[] = [
  {
    id: 'student-maya',
    name: 'Maya Lin',
    gradeLabel: 'Entering 6th Grade · Accelerated Cohort (5th Grade Mastered)',
    dailyStreak: 7,
    moduleProgress: {
      'frac-equiv': {
        moduleId: 'frac-equiv',
        questionsAttempted: 12,
        questionsCorrect: 11,
        bestQuizScore: 92,
        lastPracticed: 'Today',
        currentStreak: 6,
        masteryLevel: 'Mastered',
      },
      'frac-add-sub': {
        moduleId: 'frac-add-sub',
        questionsAttempted: 10,
        questionsCorrect: 9,
        bestQuizScore: 90,
        lastPracticed: 'Yesterday',
        currentStreak: 4,
        masteryLevel: 'Mastered',
      },
      'frac-mixed': {
        moduleId: 'frac-mixed',
        questionsAttempted: 10,
        questionsCorrect: 9,
        bestQuizScore: 90,
        lastPracticed: 'Yesterday',
        currentStreak: 5,
        masteryLevel: 'Mastered',
      },
      'frac-mult-div': {
        moduleId: 'frac-mult-div',
        questionsAttempted: 8,
        questionsCorrect: 6,
        bestQuizScore: 75,
        lastPracticed: '2 days ago',
        currentStreak: 2,
        masteryLevel: 'Developing',
      },
      'dec-place-value': {
        moduleId: 'dec-place-value',
        questionsAttempted: 12,
        questionsCorrect: 12,
        bestQuizScore: 100,
        lastPracticed: 'Today',
        currentStreak: 8,
        masteryLevel: 'Mastered',
      },
      'dec-compare-round': {
        moduleId: 'dec-compare-round',
        questionsAttempted: 10,
        questionsCorrect: 9,
        bestQuizScore: 90,
        lastPracticed: 'Yesterday',
        currentStreak: 4,
        masteryLevel: 'Mastered',
      },
      'dec-add-sub': {
        moduleId: 'dec-add-sub',
        questionsAttempted: 8,
        questionsCorrect: 6,
        bestQuizScore: 75,
        lastPracticed: '2 days ago',
        currentStreak: 2,
        masteryLevel: 'Developing',
      },
      'dec-frac-bridge': {
        moduleId: 'dec-frac-bridge',
        questionsAttempted: 10,
        questionsCorrect: 9,
        bestQuizScore: 90,
        lastPracticed: 'Today',
        currentStreak: 4,
        masteryLevel: 'Mastered',
      },
      'bridge-ratios-percents': {
        moduleId: 'bridge-ratios-percents',
        questionsAttempted: 8,
        questionsCorrect: 7,
        bestQuizScore: 88,
        lastPracticed: 'Today',
        currentStreak: 4,
        masteryLevel: 'Mastered',
      },
      'bridge-expressions-volume': {
        moduleId: 'bridge-expressions-volume',
        questionsAttempted: 6,
        questionsCorrect: 4,
        bestQuizScore: 67,
        lastPracticed: '3 days ago',
        currentStreak: 1,
        masteryLevel: 'Needs Review',
      },
    },
    attemptHistory: [
      {
        id: 'att-101',
        timestamp: 'Today · 8:40 AM',
        title: '09. Ratios, Unit Rates & Proportional Reasoning',
        domain: 'bridge6',
        moduleId: 'bridge-ratios-percents',
        score: 3,
        totalQuestions: 3,
        accuracyPercent: 100,
        durationSeconds: 155,
        questionResults: [
          {
            questionId: 'q-bridge-rp-1',
            moduleId: 'bridge-ratios-percents',
            domain: 'bridge6',
            prompt: 'A high-speed electric train travels 189 kilometers in 1.5 hours. What is the unit rate in km/h?',
            userAnswerText: '126',
            correctAnswerText: '126',
            isCorrect: true,
            explanation: '189 ÷ 1.5 = 1,890 ÷ 15 = 126 km/h.',
          },
          {
            questionId: 'q-bridge-rp-2',
            moduleId: 'bridge-ratios-percents',
            domain: 'bridge6',
            prompt: 'A home battery bank has a capacity of 40 kWh and is at 35% charge. How many kWh are stored?',
            userAnswerText: '14',
            correctAnswerText: '14',
            isCorrect: true,
            explanation: '0.35 × 40 = 14 kWh.',
          },
        ],
      },
      {
        id: 'att-102',
        timestamp: 'Yesterday · 4:15 PM',
        title: '04. Fraction-by-Fraction Division & Reciprocals',
        domain: 'fractions',
        moduleId: 'frac-mult-div',
        score: 3,
        totalQuestions: 4,
        accuracyPercent: 75,
        durationSeconds: 210,
        questionResults: [
          {
            questionId: 'q-frac-mult-2',
            moduleId: 'frac-mult-div',
            domain: 'fractions',
            prompt: 'Divide the fractions: (3/4) ÷ (3/8).',
            userAnswerText: '2/1',
            correctAnswerText: '2/1',
            isCorrect: true,
            explanation: '(3/4) × (8/3) = 24/12 = 2/1.',
          },
          {
            questionId: 'q-frac-mult-3',
            moduleId: 'frac-mult-div',
            domain: 'fractions',
            prompt: 'Express (5/6) ÷ (2/9) as an improper fraction in simplest form.',
            userAnswerText: '45/12',
            correctAnswerText: '15/4',
            isCorrect: false,
            explanation: '45/12 is equivalent, but dividing numerator and denominator by GCF = 3 gives 15/4.',
          },
        ],
      },
    ],
  },
  {
    id: 'student-leo',
    name: 'Leo Vance',
    gradeLabel: 'Entering 6th Grade · Accelerated Cohort (5th Grade Mastered)',
    dailyStreak: 4,
    moduleProgress: {
      'frac-equiv': {
        moduleId: 'frac-equiv',
        questionsAttempted: 8,
        questionsCorrect: 7,
        bestQuizScore: 88,
        lastPracticed: 'Today',
        currentStreak: 3,
        masteryLevel: 'Mastered',
      },
      'frac-add-sub': {
        moduleId: 'frac-add-sub',
        questionsAttempted: 8,
        questionsCorrect: 7,
        bestQuizScore: 88,
        lastPracticed: 'Yesterday',
        currentStreak: 4,
        masteryLevel: 'Mastered',
      },
      'frac-mixed': {
        moduleId: 'frac-mixed',
        questionsAttempted: 6,
        questionsCorrect: 5,
        bestQuizScore: 83,
        lastPracticed: '2 days ago',
        currentStreak: 2,
        masteryLevel: 'Developing',
      },
      'frac-mult-div': {
        moduleId: 'frac-mult-div',
        questionsAttempted: 8,
        questionsCorrect: 7,
        bestQuizScore: 88,
        lastPracticed: 'Yesterday',
        currentStreak: 3,
        masteryLevel: 'Mastered',
      },
      'dec-place-value': {
        moduleId: 'dec-place-value',
        questionsAttempted: 8,
        questionsCorrect: 7,
        bestQuizScore: 88,
        lastPracticed: 'Today',
        currentStreak: 3,
        masteryLevel: 'Mastered',
      },
      'dec-compare-round': {
        moduleId: 'dec-compare-round',
        questionsAttempted: 6,
        questionsCorrect: 4,
        bestQuizScore: 67,
        lastPracticed: '3 days ago',
        currentStreak: 1,
        masteryLevel: 'Developing',
      },
      'dec-add-sub': {
        moduleId: 'dec-add-sub',
        questionsAttempted: 6,
        questionsCorrect: 5,
        bestQuizScore: 83,
        lastPracticed: 'Yesterday',
        currentStreak: 2,
        masteryLevel: 'Developing',
      },
      'dec-frac-bridge': {
        moduleId: 'dec-frac-bridge',
        questionsAttempted: 8,
        questionsCorrect: 7,
        bestQuizScore: 88,
        lastPracticed: 'Today',
        currentStreak: 4,
        masteryLevel: 'Mastered',
      },
      'bridge-ratios-percents': {
        moduleId: 'bridge-ratios-percents',
        questionsAttempted: 6,
        questionsCorrect: 6,
        bestQuizScore: 100,
        lastPracticed: 'Today',
        currentStreak: 6,
        masteryLevel: 'Mastered',
      },
      'bridge-expressions-volume': {
        moduleId: 'bridge-expressions-volume',
        questionsAttempted: 6,
        questionsCorrect: 6,
        bestQuizScore: 100,
        lastPracticed: 'Yesterday',
        currentStreak: 6,
        masteryLevel: 'Mastered',
      },
    },
    attemptHistory: [
      {
        id: 'att-201',
        timestamp: 'Today · 9:15 AM',
        title: '10. Order of Operations (Exponents), Volume & Coordinates',
        domain: 'bridge6',
        moduleId: 'bridge-expressions-volume',
        score: 3,
        totalQuestions: 3,
        accuracyPercent: 100,
        durationSeconds: 160,
        questionResults: [
          {
            questionId: 'q-bridge-ev-1',
            moduleId: 'bridge-expressions-volume',
            domain: 'bridge6',
            prompt: 'Evaluate 4² + 3 × (10 - 2²) ÷ 2.',
            userAnswerText: '25',
            correctAnswerText: '25',
            isCorrect: true,
            explanation: '16 + 3 × 6 ÷ 2 = 16 + 9 = 25.',
          },
        ],
      },
    ],
  },
];
