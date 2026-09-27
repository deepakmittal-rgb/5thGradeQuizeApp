import {
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
  // FRACTIONS TRACK (CCSS.5.NF)
  {
    id: 'frac-equiv',
    indexNumber: '01',
    title: 'Equivalent Fractions & Simplest Form',
    domain: 'fractions',
    ccssCode: 'CCSS.5.NF.A.1',
    shortDescription:
      'Generate equivalent fractions by partitioning area bars and reduce fractions using greatest common factors.',
    conceptSummary:
      'Multiplying or dividing both numerator and denominator by the same non-zero whole number preserves the exact proportional value on the unit bar.',
    keyFormula: 'a / b = (a × k) / (b × k)',
    visualModelType: 'fraction-bar',
    estimatedMinutes: 6,
  },
  {
    id: 'frac-add-sub',
    indexNumber: '02',
    title: 'Adding & Subtracting Unlike Fractions',
    domain: 'fractions',
    ccssCode: 'CCSS.5.NF.A.1',
    shortDescription:
      'Find least common denominators (LCD) to add and subtract fractions with different denominators.',
    conceptSummary:
      'Before combining fractions with different-sized parts, repartition both bars into a common denominator (LCD) so every slice represents an equal unit.',
    keyFormula: 'a/b + c/d = (a·d + b·c) / (b·d)',
    visualModelType: 'lcd-grid',
    estimatedMinutes: 8,
  },
  {
    id: 'frac-mixed',
    indexNumber: '03',
    title: 'Mixed Numbers & Improper Fractions',
    domain: 'fractions',
    ccssCode: 'CCSS.5.NF.A.2',
    shortDescription:
      'Convert between mixed numbers and improper fractions and solve multi-step measurement problems.',
    conceptSummary:
      'Every improper fraction (where numerator ≥ denominator) represents one or more whole units plus a fractional remainder on the number line.',
    keyFormula: 'W n/d = ((W × d) + n) / d',
    visualModelType: 'mixed-number-line',
    estimatedMinutes: 7,
  },
  {
    id: 'frac-mult-div',
    indexNumber: '04',
    title: 'Multiplying & Dividing Unit Fractions',
    domain: 'fractions',
    ccssCode: 'CCSS.5.NF.B.4 · 5.NF.B.7',
    shortDescription:
      'Model fraction multiplication as a 2D area overlap and divide whole numbers by unit fractions.',
    conceptSummary:
      'Multiplying a/b × c/d finds the overlapping area of a rows (out of b) and c columns (out of d) inside a 1 × 1 unit square.',
    keyFormula: '(a / b) × (c / d) = (a × c) / (b × d)',
    visualModelType: 'fraction-multiply',
    estimatedMinutes: 8,
  },

  // DECIMALS TRACK (CCSS.5.NBT)
  {
    id: 'dec-place-value',
    indexNumber: '05',
    title: 'Decimal Place Value to Thousandths',
    domain: 'decimals',
    ccssCode: 'CCSS.5.NBT.A.1 · 5.NBT.A.3a',
    shortDescription:
      'Read, write, and decompose decimals in standard, word, and expanded base-10 forms to thousandths.',
    conceptSummary:
      'Each place to the right of the decimal point is 1/10 the value of the place to its left: tenths (0.1), hundredths (0.01), and thousandths (0.001).',
    keyFormula: '0.abc = a×0.1 + b×0.01 + c×0.001',
    visualModelType: 'decimal-grid',
    estimatedMinutes: 6,
  },
  {
    id: 'dec-compare-round',
    indexNumber: '06',
    title: 'Comparing, Ordering & Rounding Decimals',
    domain: 'decimals',
    ccssCode: 'CCSS.5.NBT.A.3b · 5.NBT.A.4',
    shortDescription:
      'Compare decimals to the thousandths place and round values using benchmark number lines.',
    conceptSummary:
      'To compare or round decimals, align digits by place value from left to right and locate the number relative to the midpoint on a zoomed number line.',
    keyFormula: 'Midpoint ≥ 5 → Round Up · Midpoint < 5 → Round Down',
    visualModelType: 'decimal-number-line',
    estimatedMinutes: 7,
  },
  {
    id: 'dec-add-sub',
    indexNumber: '07',
    title: 'Adding & Subtracting Decimals',
    domain: 'decimals',
    ccssCode: 'CCSS.5.NBT.B.7',
    shortDescription:
      'Add and subtract decimals to hundredths using base-10 area models and vertical place-value alignment.',
    conceptSummary:
      'Align the decimal points vertically so tenths combine with tenths and hundredths combine with hundredths; pad trailing zeros to equalize length.',
    keyFormula: '0.45 + 0.30 = 45/100 + 30/100 = 0.75',
    visualModelType: 'decimal-grid',
    estimatedMinutes: 8,
  },
  {
    id: 'dec-frac-bridge',
    indexNumber: '08',
    title: 'Fraction & Decimal Equivalency Bridge',
    domain: 'decimals',
    ccssCode: 'CCSS.5.NBT.A.3 · 5.NF.B.3',
    shortDescription:
      'Translate fluently between benchmark fractions, denominator-100 fractions, and decimal notation.',
    conceptSummary:
      'Fractions and decimals describe the exact same point on the number line. Scaling any denominator to 10, 100, or 1,000 reveals its exact decimal form.',
    keyFormula: '3/4 = 75/100 = 0.75 · 3/8 = 375/1000 = 0.375',
    visualModelType: 'equivalence-bridge',
    estimatedMinutes: 7,
  },
];

export const CURATED_QUESTIONS: QuizQuestion[] = [
  // ================= MODULE 01: EQUIVALENT FRACTIONS =================
  {
    id: 'q-frac-equiv-1',
    moduleId: 'frac-equiv',
    domain: 'fractions',
    difficulty: 'Foundation',
    type: 'visual-fraction-shade',
    contextScenario: 'Visual Partition Studio · Equivalent Bars',
    prompt:
      'Shade the bottom fraction bar (divided into 12 equal twelfths) so that it represents a fraction equivalent to 3/4.',
    subPrompt:
      'Click segments on the Interactive Workspace bar on the left until the shaded length matches 3/4.',
    visualConfig: {
      mode: 'fraction-bar',
      numA: 3,
      denA: 4,
      numB: 0,
      denB: 12,
      targetDen: 12,
      canvasCaption: 'Click segments on the 12-part bar to match the 3/4 reference bar above.',
    },
    correctFraction: { num: 9, den: 12 },
    hint: 'Multiply both the numerator (3) and denominator (4) by 3 to scale fourths into twelfths.',
    workedSteps: [
      'Start with the benchmark fraction 3/4.',
      'To convert fourths (4) into twelfths (12), multiply the denominator by 3: 4 × 3 = 12.',
      'Multiply the numerator by the same factor of 3: 3 × 3 = 9.',
      'Therefore, 9/12 is equivalent to 3/4 (9 shaded twelfths).',
    ],
  },
  {
    id: 'q-frac-equiv-2',
    moduleId: 'frac-equiv',
    domain: 'fractions',
    difficulty: 'Grade-Level',
    type: 'fraction-input',
    contextScenario: 'Botanical Greenhouse · Soil Mixture',
    prompt:
      'A 5th-grade science team filled 18/24 of a planter box with organic compost. Write 18/24 in simplest form.',
    subPrompt: 'Enter the simplified numerator and denominator in lowest terms.',
    visualConfig: {
      mode: 'fraction-bar',
      numA: 18,
      denA: 24,
      numB: 3,
      denB: 4,
      canvasCaption: 'Compare 18/24 with larger equal partitions to find the Greatest Common Factor.',
    },
    correctFraction: { num: 3, den: 4, requireSimplified: true },
    hint: 'Find the Greatest Common Factor (GCF) of 18 and 24. Both numbers are divisible by 6.',
    workedSteps: [
      'List factors of 18: 1, 2, 3, 6, 9, 18. List factors of 24: 1, 2, 3, 4, 6, 8, 12, 24.',
      'The Greatest Common Factor (GCF) of 18 and 24 is 6.',
      'Divide both numerator and denominator by 6: (18 ÷ 6) / (24 ÷ 6) = 3/4.',
    ],
  },
  {
    id: 'q-frac-equiv-3',
    moduleId: 'frac-equiv',
    domain: 'fractions',
    difficulty: 'Grade-Level',
    type: 'multiple-choice',
    contextScenario: 'Solar Array Telemetry · Panel Output',
    prompt:
      'Which of the following fractions is NOT equivalent to 2/5?',
    visualConfig: {
      mode: 'fraction-bar',
      numA: 2,
      denA: 5,
      numB: 4,
      denB: 10,
      canvasCaption: 'Use the interactive denominator controls on the left to test multiples of 2/5.',
    },
    options: ['4/10', '6/15', '8/25', '10/25'],
    correctChoiceIndex: 2,
    hint: 'Check which fraction does not maintain the 2-to-5 multiplier ratio between numerator and denominator.',
    workedSteps: [
      '2/5 × 2/2 = 4/10 (Equivalent)',
      '2/5 × 3/3 = 6/15 (Equivalent)',
      '2/5 × 5/5 = 10/25 (Equivalent)',
      '8/25 is NOT equivalent because 2 × 4 = 8, while 5 × 4 = 20 (not 25).',
    ],
  },
  {
    id: 'q-frac-equiv-4',
    moduleId: 'frac-equiv',
    domain: 'fractions',
    difficulty: 'Challenge',
    type: 'fraction-input',
    contextScenario: 'Architectural Scale · Blueprint Ratio',
    prompt:
      'Find the equivalent fraction with a denominator of 15 that equals 16/20.',
    subPrompt: 'First simplify 16/20, then scale to fifteenths (denominator = 15).',
    visualConfig: {
      mode: 'fraction-bar',
      numA: 4,
      denA: 5,
      numB: 12,
      denB: 15,
      canvasCaption: 'Simplify 16/20 to fifths first, then scale to fifteenths.',
    },
    correctFraction: { num: 12, den: 15 },
    hint: 'Simplify 16/20 by dividing numerator and denominator by 4 to get 4/5, then multiply by 3/3.',
    workedSteps: [
      'Reduce 16/20 by dividing numerator and denominator by 4: 16/20 = 4/5.',
      'Scale 4/5 to a denominator of 15 by multiplying by 3/3: (4 × 3) / (5 × 3) = 12/15.',
    ],
  },

  // ================= MODULE 02: ADDING & SUBTRACTING UNLIKE FRACTIONS =================
  {
    id: 'q-frac-add-1',
    moduleId: 'frac-add-sub',
    domain: 'fractions',
    difficulty: 'Foundation',
    type: 'fraction-input',
    contextScenario: 'Culinary Kitchen · Artisan Dough',
    prompt:
      'A baker combines 1/3 cup of rye flour with 1/4 cup of whole wheat flour. What is the total fraction of a cup of flour?',
    subPrompt: 'Use the LCD visualizer on the left to see 1/3 and 1/4 converted into twelfths.',
    visualConfig: {
      mode: 'lcd-grid',
      numA: 1,
      denA: 3,
      numB: 1,
      denB: 4,
      operation: '+',
      canvasCaption: 'Least Common Denominator (LCD) of 3 and 4 is 12.',
    },
    correctFraction: { num: 7, den: 12, requireSimplified: true },
    hint: 'The Least Common Multiple of 3 and 4 is 12. Convert both fractions to twelfths before adding.',
    workedSteps: [
      'Find the Least Common Denominator (LCD) of 3 and 4: LCM(3, 4) = 12.',
      'Convert 1/3 to twelfths: (1 × 4) / (3 × 4) = 4/12.',
      'Convert 1/4 to twelfths: (1 × 3) / (4 × 3) = 3/12.',
      'Add the numerators: 4/12 + 3/12 = 7/12.',
    ],
  },
  {
    id: 'q-frac-add-2',
    moduleId: 'frac-add-sub',
    domain: 'fractions',
    difficulty: 'Grade-Level',
    type: 'fraction-input',
    contextScenario: 'Woodworking Lab · Cedar Trim',
    prompt:
      'A carpenter has a board that is 5/6 meter long and cuts off a piece that is 1/4 meter long. How much of the board remains?',
    subPrompt: 'Enter the remaining length as a fraction in simplest form.',
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
    hint: 'The Least Common Denominator of 6 and 4 is 12 (not 24, though 24 also simplifies to twelfths).',
    workedSteps: [
      'Find the LCD of 6 and 4: LCM(6, 4) = 12.',
      'Rewrite 5/6 as twelfths: (5 × 2) / (6 × 2) = 10/12.',
      'Rewrite 1/4 as twelfths: (1 × 3) / (4 × 3) = 3/12.',
      'Subtract the numerators: 10/12 - 3/12 = 7/12 meter.',
    ],
  },
  {
    id: 'q-frac-add-3',
    moduleId: 'frac-add-sub',
    domain: 'fractions',
    difficulty: 'Grade-Level',
    type: 'multiple-choice',
    contextScenario: 'Environmental Science · Trail Distance',
    prompt:
      'Elena hiked 3/8 of the canyon trail before lunch and 1/2 of the trail after lunch. What fraction of the entire trail did she hike in all?',
    visualConfig: {
      mode: 'lcd-grid',
      numA: 3,
      denA: 8,
      numB: 1,
      denB: 2,
      operation: '+',
      canvasCaption: 'Convert 1/2 into eighths to combine with 3/8.',
    },
    options: ['4/10', '7/8', '4/8', '5/6'],
    correctChoiceIndex: 1,
    hint: 'Since 8 is a multiple of 2, use 8 as your common denominator: 1/2 = 4/8.',
    workedSteps: [
      'The denominators are 8 and 2. Since 8 is divisible by 2, LCD = 8.',
      'Convert 1/2 to eighths: (1 × 4) / (2 × 4) = 4/8.',
      'Add the fractions: 3/8 + 4/8 = 7/8 of the trail.',
    ],
  },
  {
    id: 'q-frac-add-4',
    moduleId: 'frac-add-sub',
    domain: 'fractions',
    difficulty: 'Challenge',
    type: 'fraction-input',
    contextScenario: 'Chemistry Beaker · Solution Mix',
    prompt:
      'Calculate 3/5 + 3/10 - 1/2 and express the result as a simplified fraction.',
    subPrompt: 'Convert all three fractions to tenths (denominator = 10), then simplify.',
    visualConfig: {
      mode: 'lcd-grid',
      numA: 3,
      denA: 5,
      numB: 3,
      denB: 10,
      operation: '+',
      canvasCaption: 'First combine 3/5 + 3/10 in tenths, then subtract 5/10.',
    },
    correctFraction: { num: 2, den: 5, requireSimplified: true },
    hint: 'In tenths: 3/5 = 6/10 and 1/2 = 5/10. Compute 6/10 + 3/10 - 5/10, then reduce.',
    workedSteps: [
      'Use common denominator 10: 3/5 = 6/10, 3/10 = 3/10, and 1/2 = 5/10.',
      'Combine numerators: (6 + 3 - 5) / 10 = 4/10.',
      'Simplify 4/10 by dividing numerator and denominator by 2: 2/5.',
    ],
  },

  // ================= MODULE 03: MIXED NUMBERS & IMPROPER FRACTIONS =================
  {
    id: 'q-frac-mixed-1',
    moduleId: 'frac-mixed',
    domain: 'fractions',
    difficulty: 'Foundation',
    type: 'fraction-input',
    contextScenario: 'Hydroponic Farm · Nutrient Pipe',
    prompt:
      'Convert the mixed number 2 3/5 into an improper fraction.',
    subPrompt: 'Enter the total number of fifths as Numerator / Denominator.',
    visualConfig: {
      mode: 'mixed-number-line',
      numA: 13,
      denA: 5,
      numberLineMin: 0,
      numberLineMax: 3,
      canvasCaption: '2 wholes equal 10 fifths, plus 3 more fifths on the number line.',
    },
    correctFraction: { num: 13, den: 5 },
    hint: 'Multiply the whole number (2) by the denominator (5), then add the numerator (3).',
    workedSteps: [
      'Each whole unit contains 5 fifths, so 2 wholes = 2 × 5 = 10 fifths (10/5).',
      'Add the fractional part: 10/5 + 3/5 = 13/5.',
    ],
  },
  {
    id: 'q-frac-mixed-2',
    moduleId: 'frac-mixed',
    domain: 'fractions',
    difficulty: 'Grade-Level',
    type: 'multiple-choice',
    contextScenario: 'Ceramics Studio · Clay Weight',
    prompt:
      'A pottery class used 19/6 pounds of stoneware clay. How is 19/6 written as a mixed number?',
    visualConfig: {
      mode: 'mixed-number-line',
      numA: 19,
      denA: 6,
      numberLineMin: 0,
      numberLineMax: 4,
      canvasCaption: 'Count how many full groups of 6/6 fit inside 19/6.',
    },
    options: ['2 5/6', '3 1/6', '3 3/6', '2 1/6'],
    correctChoiceIndex: 1,
    hint: 'Divide 19 by 6. The quotient is the whole number and the remainder is the numerator over 6.',
    workedSteps: [
      'Divide the numerator by the denominator: 19 ÷ 6 = 3 with a remainder of 1.',
      'The quotient 3 represents 3 whole pounds (18/6).',
      'The remainder 1 represents 1/6 pound left over, giving 3 1/6.',
    ],
  },
  {
    id: 'q-frac-mixed-3',
    moduleId: 'frac-mixed',
    domain: 'fractions',
    difficulty: 'Grade-Level',
    type: 'fraction-input',
    contextScenario: 'Track & Field · Endurance Warmup',
    prompt:
      'Liam ran 1 3/4 miles on Monday and 1 1/2 miles on Wednesday. Express his total distance as an improper fraction in fourths.',
    subPrompt: 'Add 1 3/4 + 1 2/4 and enter the result as an improper fraction (e.g. 13/4).',
    visualConfig: {
      mode: 'mixed-number-line',
      numA: 13,
      denA: 4,
      numberLineMin: 0,
      numberLineMax: 4,
      canvasCaption: '1 3/4 = 7/4 and 1 1/2 = 6/4. Combine along the number line.',
    },
    correctFraction: { num: 13, den: 4 },
    hint: 'Convert 1 3/4 to 7/4 and 1 1/2 to 6/4, then add the fourths together.',
    workedSteps: [
      'Convert 1 3/4 to fourths: (1 × 4 + 3) / 4 = 7/4.',
      'Convert 1 1/2 to fourths: 1 2/4 = (1 × 4 + 2) / 4 = 6/4.',
      'Add the improper fractions: 7/4 + 6/4 = 13/4 miles (or 3 1/4 miles).',
    ],
  },
  {
    id: 'q-frac-mixed-4',
    moduleId: 'frac-mixed',
    domain: 'fractions',
    difficulty: 'Challenge',
    type: 'multiple-choice',
    contextScenario: 'Marine Biology · Coral Reef Depth',
    prompt:
      'A diver is at a depth of 4 1/4 meters and ascends 1 3/4 meters toward the surface. What is the diver’s new depth?',
    visualConfig: {
      mode: 'mixed-number-line',
      numA: 10,
      denA: 4,
      numberLineMin: 0,
      numberLineMax: 5,
      canvasCaption: 'Regroup 1 whole from 4 1/4 into 4/4 so you can subtract 3/4.',
    },
    options: ['3 2/4 meters', '2 1/2 meters', '2 3/4 meters', '3 1/4 meters'],
    correctChoiceIndex: 1,
    hint: 'Rewrite 4 1/4 as 3 5/4 before subtracting 1 3/4, then simplify the fractional part.',
    workedSteps: [
      'Since 1/4 is less than 3/4, regroup 4 1/4 by borrowing 1 whole (4/4): 4 1/4 = 3 5/4.',
      'Subtract the whole numbers and fractions: (3 - 1) + (5/4 - 3/4) = 2 2/4.',
      'Simplify 2 2/4 by reducing 2/4 to 1/2: 2 1/2 meters.',
    ],
  },

  // ================= MODULE 04: MULTIPLYING & DIVIDING FRACTIONS =================
  {
    id: 'q-frac-mult-1',
    moduleId: 'frac-mult-div',
    domain: 'fractions',
    difficulty: 'Foundation',
    type: 'fraction-input',
    contextScenario: 'Community Garden · Herb Plot Area',
    prompt:
      '3/4 of a garden bed is planted with vegetables, and 2/3 of that vegetable section is planted with heirloom tomatoes. What fraction of the entire garden bed is heirloom tomatoes?',
    subPrompt: 'Inspect the 2D Area Overlap grid on the left and enter the simplified fraction.',
    visualConfig: {
      mode: 'fraction-multiply',
      numA: 3,
      denA: 4,
      numB: 2,
      denB: 3,
      operation: '×',
      canvasCaption: 'Area Model: 3 out of 4 rows overlapped with 2 out of 3 columns.',
    },
    correctFraction: { num: 1, den: 2, requireSimplified: true },
    hint: 'Multiply numerators (3 × 2 = 6) and denominators (4 × 3 = 12), then simplify 6/12.',
    workedSteps: [
      'Set up the product of the two fractions: (3/4) × (2/3).',
      'Multiply numerators: 3 × 2 = 6 overlapping cells.',
      'Multiply denominators: 4 × 3 = 12 total cells in the unit square.',
      'Simplify 6/12 by dividing numerator and denominator by 6: 1/2.',
    ],
  },
  {
    id: 'q-frac-mult-2',
    moduleId: 'frac-mult-div',
    domain: 'fractions',
    difficulty: 'Grade-Level',
    type: 'fraction-input',
    contextScenario: 'Architecture Studio · Glass Tile',
    prompt:
      'A rectangular mosaic tile measures 4/5 decimeter wide by 5/8 decimeter tall. What is its area in square decimeters (in simplest form)?',
    subPrompt: 'Multiply (4/5) × (5/8) and reduce to lowest terms.',
    visualConfig: {
      mode: 'fraction-multiply',
      numA: 4,
      denA: 5,
      numB: 5,
      denB: 8,
      operation: '×',
      canvasCaption: 'Notice how 20 out of 40 grid squares are double-shaded.',
    },
    correctFraction: { num: 1, den: 2, requireSimplified: true },
    hint: 'Multiply 4 × 5 = 20 and 5 × 8 = 40, then simplify 20/40.',
    workedSteps: [
      'Area = length × width = (4/5) × (5/8).',
      'Multiply across: (4 × 5) / (5 × 8) = 20/40.',
      'Divide numerator and denominator by 20: 20/40 = 1/2 square decimeter.',
    ],
  },
  {
    id: 'q-frac-mult-3',
    moduleId: 'frac-mult-div',
    domain: 'fractions',
    difficulty: 'Grade-Level',
    type: 'multiple-choice',
    contextScenario: 'Robotics Relay · Battery Packs',
    prompt:
      'A 5-meter spool of copper wire is cut into equal segments that are each 1/4 meter long. How many segments are created (5 ÷ 1/4)?',
    visualConfig: {
      mode: 'mixed-number-line',
      numA: 20,
      denA: 4,
      numberLineMin: 0,
      numberLineMax: 5,
      canvasCaption: 'Each 1-meter whole contains 4 fourths. Count fourths across 5 wholes.',
    },
    options: ['5/4 segments', '9 segments', '20 segments', '1/20 segment'],
    correctChoiceIndex: 2,
    hint: 'Ask: how many 1/4-meter pieces fit in 1 meter (4), then multiply by 5 meters.',
    workedSteps: [
      'Dividing a whole number by a unit fraction counts how many unit fractions fit inside the whole.',
      'There are 4 pieces of size 1/4 in each 1-meter length.',
      'Across 5 meters: 5 ÷ (1/4) = 5 × 4 = 20 segments.',
    ],
  },
  {
    id: 'q-frac-mult-4',
    moduleId: 'frac-mult-div',
    domain: 'fractions',
    difficulty: 'Challenge',
    type: 'fraction-input',
    contextScenario: 'Art Conservation · Pigment Ration',
    prompt:
      '1/3 liter of rare ultramarine pigment is shared equally among 4 restoration jars (1/3 ÷ 4). What fraction of a liter is in each jar?',
    subPrompt: 'Partition the 1/3 bar into 4 equal parts.',
    visualConfig: {
      mode: 'fraction-multiply',
      numA: 1,
      denA: 3,
      numB: 1,
      denB: 4,
      operation: '×',
      canvasCaption: 'Dividing 1/3 into 4 equal shares is equivalent to finding 1/4 of 1/3.',
    },
    correctFraction: { num: 1, den: 12, requireSimplified: true },
    hint: 'Sharing 1/3 equally among 4 jars means each jar receives 1/4 of 1/3.',
    workedSteps: [
      'Dividing a unit fraction 1/3 by a whole number 4 partitions each third into 4 smaller parts.',
      '(1/3) ÷ 4 = (1/3) × (1/4) = 1/12 liter per jar.',
    ],
  },

  // ================= MODULE 05: DECIMAL PLACE VALUE TO THOUSANDTHS =================
  {
    id: 'q-dec-pv-1',
    moduleId: 'dec-place-value',
    domain: 'decimals',
    difficulty: 'Foundation',
    type: 'visual-decimal-grid',
    contextScenario: 'Base-10 Hundredths Grid · Visual Shading',
    prompt:
      'Shade the 10 × 10 hundredths grid on the left to represent the decimal 4 tenths and 7 hundredths (0.47).',
    subPrompt:
      'Use the +10 Tenths Column or click cells on the hundredths grid until exactly 47 hundredths (0.47) are shaded.',
    visualConfig: {
      mode: 'decimal-grid',
      decimalA: 0.0,
      canvasCaption: 'Shade 4 full columns (4 tenths = 0.40) and 7 individual squares (7 hundredths = 0.07).',
    },
    correctDecimal: 0.47,
    hint: '4 tenths equals 40 hundredths (0.40). Add 7 hundredths (0.07) to get 0.47 (47 shaded squares).',
    workedSteps: [
      '4 tenths = 4 × 0.1 = 0.40 (40 squares out of 100).',
      '7 hundredths = 7 × 0.01 = 0.07 (7 squares out of 100).',
      'Combined value: 0.40 + 0.07 = 0.47 (47 hundredths).',
    ],
  },
  {
    id: 'q-dec-pv-2',
    moduleId: 'dec-place-value',
    domain: 'decimals',
    difficulty: 'Grade-Level',
    type: 'decimal-input',
    contextScenario: 'Precision Meteorology · Rain Gauge',
    prompt:
      'Write the expanded expression (3 × 1) + (6 × 0.1) + (0 × 0.01) + (8 × 0.001) in standard decimal form.',
    subPrompt: 'Be careful to include the placeholder zero in the hundredths place.',
    visualConfig: {
      mode: 'decimal-grid',
      decimalA: 0.608,
      canvasCaption: 'Inspect the place-value columns: Ones, Tenths, Hundredths, Thousandths.',
    },
    correctDecimal: 3.608,
    hint: 'Place 3 in the ones place, 6 in the tenths place, 0 in the hundredths place, and 8 in the thousandths place.',
    workedSteps: [
      'Ones place: 3 × 1 = 3',
      'Tenths place: 6 × 0.1 = 0.6',
      'Hundredths place: 0 × 0.01 = 0.00 (placeholder zero is essential!)',
      'Thousandths place: 8 × 0.001 = 0.008',
      'Sum: 3 + 0.6 + 0.00 + 0.008 = 3.608.',
    ],
  },
  {
    id: 'q-dec-pv-3',
    moduleId: 'dec-place-value',
    domain: 'decimals',
    difficulty: 'Grade-Level',
    type: 'multiple-choice',
    contextScenario: 'Optical Lab · Lens Thickness',
    prompt:
      'In the decimal measurement 4.725 millimeters, how does the value of the digit 7 compare to a 7 in the hundredths place (0.07)?',
    visualConfig: {
      mode: 'decimal-grid',
      decimalA: 0.725,
      canvasCaption: '7 in the tenths place (0.7) equals 10 times 7 in the hundredths place (0.07).',
    },
    options: [
      'It is 10 times as great (0.7 = 10 × 0.07)',
      'It is 1/10 as great',
      'It is 100 times as great',
      'It has the exact same value',
    ],
    correctChoiceIndex: 0,
    hint: 'Moving one place to the left in the base-10 system multiplies the place value by 10.',
    workedSteps: [
      'In 4.725, the digit 7 is in the tenths place, so its value is 0.7.',
      'A 7 in the hundredths place has a value of 0.07.',
      'Since 0.7 ÷ 0.07 = 10, the 7 in the tenths place is 10 times as great.',
    ],
  },
  {
    id: 'q-dec-pv-4',
    moduleId: 'dec-place-value',
    domain: 'decimals',
    difficulty: 'Challenge',
    type: 'decimal-input',
    contextScenario: 'Analytical Balance · Mineral Sample',
    prompt:
      'A mineral sample weighs "two and forty-five thousandths" grams. Write this measurement as a standard decimal.',
    subPrompt: 'Notice the unit is thousandths (3 decimal places after the decimal point).',
    visualConfig: {
      mode: 'decimal-grid',
      decimalA: 0.045,
      canvasCaption: '45 thousandths requires a 0 in the tenths place: 0.045.',
    },
    correctDecimal: 2.045,
    hint: 'Forty-five thousandths is 45/1000 = 0.045, not 0.45 (which would be forty-five hundredths).',
    workedSteps: [
      '"Two and..." places 2 in the ones column before the decimal point: 2.',
      '"Forty-five thousandths" is 45/1000 = 4 hundredths + 5 thousandths.',
      'Place a 0 in the tenths column so the 5 lands in the thousandths place: 2.045.',
    ],
  },

  // ================= MODULE 06: COMPARING, ORDERING & ROUNDING DECIMALS =================
  {
    id: 'q-dec-comp-1',
    moduleId: 'dec-compare-round',
    domain: 'decimals',
    difficulty: 'Foundation',
    type: 'decimal-input',
    contextScenario: 'Athletics Timing · Sprint Photo Finish',
    prompt:
      'Round the sprint time 14.376 seconds to the nearest hundredth of a second.',
    subPrompt: 'Use the zoomed number line on the left to inspect where 14.376 falls between 14.37 and 14.38.',
    visualConfig: {
      mode: 'decimal-number-line',
      decimalA: 0.376,
      numberLineMin: 0.3,
      numberLineMax: 0.4,
      roundingPlace: 'hundredths',
      canvasCaption: 'Locate 0.376 relative to the midpoint 0.375 between 0.370 and 0.380.',
    },
    correctDecimal: 14.38,
    hint: 'Look at the thousandths digit (6). Since 6 ≥ 5, round the hundredths digit (7) up to 8.',
    workedSteps: [
      'Identify the rounding place: hundredths digit is 7 (14.376 lies between 14.37 and 14.38).',
      'Look at the digit to the right (thousandths place): 6.',
      'Because 6 ≥ 5, 14.376 is closer to 14.38 than 14.37. Rounded value: 14.38.',
    ],
  },
  {
    id: 'q-dec-comp-2',
    moduleId: 'dec-compare-round',
    domain: 'decimals',
    difficulty: 'Grade-Level',
    type: 'multiple-choice',
    contextScenario: 'Robotics Machining · Shaft Diameter',
    prompt:
      'Four steel pins have diameters of 0.68 cm, 0.608 cm, 0.685 cm, and 0.658 cm. Which pin has the GREATEST diameter?',
    visualConfig: {
      mode: 'decimal-number-line',
      decimalA: 0.685,
      decimalB: 0.68,
      numberLineMin: 0.6,
      numberLineMax: 0.7,
      canvasCaption: 'Pad all decimals to 3 places (thousandths) to compare: 0.680, 0.608, 0.685, 0.658.',
    },
    options: ['0.68 cm', '0.608 cm', '0.685 cm', '0.658 cm'],
    correctChoiceIndex: 2,
    hint: 'Write each decimal with three decimal places (thousandths): 0.680, 0.608, 0.685, 0.658.',
    workedSteps: [
      'Rewrite all measurements to the thousandths place by appending trailing zeros:',
      '0.68 = 0.680 | 0.608 = 0.608 | 0.685 = 0.685 | 0.658 = 0.658.',
      'Comparing thousandths: 685 > 680 > 658 > 608, so 0.685 cm is greatest.',
    ],
  },
  {
    id: 'q-dec-comp-3',
    moduleId: 'dec-compare-round',
    domain: 'decimals',
    difficulty: 'Grade-Level',
    type: 'decimal-input',
    contextScenario: 'Solar Observatory · Wavelength Filter',
    prompt:
      'Round 8.952 to the nearest tenth.',
    subPrompt: 'Enter the rounded decimal value.',
    visualConfig: {
      mode: 'decimal-number-line',
      decimalA: 0.952,
      numberLineMin: 0.9,
      numberLineMax: 1.0,
      roundingPlace: 'tenths',
      canvasCaption: '0.952 is past the midpoint 0.950, so rounding to the nearest tenth carries into the ones place.',
    },
    correctDecimal: 9.0,
    hint: 'The tenths digit is 9 and the hundredths digit is 5, so 8.952 rounds up to 9.0 (or 9).',
    workedSteps: [
      'The tenths digit is 9 (8.952 is between 8.9 and 9.0).',
      'The hundredths digit is 5, which means round up.',
      'Adding 0.1 to 8.9 gives 9.0.',
    ],
  },
  {
    id: 'q-dec-comp-4',
    moduleId: 'dec-compare-round',
    domain: 'decimals',
    difficulty: 'Challenge',
    type: 'multiple-choice',
    contextScenario: 'Geology Lab · Quartz Density',
    prompt:
      'Which inequality statement is TRUE?',
    visualConfig: {
      mode: 'decimal-number-line',
      decimalA: 0.42,
      decimalB: 0.409,
      numberLineMin: 0.4,
      numberLineMax: 0.5,
      canvasCaption: 'Compare the hundredths digit first: 2 hundredths (0.420) vs 0 hundredths (0.409).',
    },
    options: [
      '0.409 > 0.42',
      '3.50 = 3.05',
      '0.42 > 0.409',
      '1.28 < 1.279',
    ],
    correctChoiceIndex: 2,
    hint: 'Compare digit-by-digit from left to right: in 0.42 vs 0.409, compare the hundredths digits (2 vs 0).',
    workedSteps: [
      'Write 0.42 with three decimal places: 0.420.',
      'Compare 0.420 and 0.409: tenths digits are both 4, but in the hundredths place 2 > 0.',
      'Therefore, 0.42 > 0.409 is true.',
    ],
  },

  // ================= MODULE 07: ADDING & SUBTRACTING DECIMALS =================
  {
    id: 'q-dec-add-1',
    moduleId: 'dec-add-sub',
    domain: 'decimals',
    difficulty: 'Foundation',
    type: 'decimal-input',
    contextScenario: 'Botany Lab · Seedling Growth',
    prompt:
      'A bamboo shoot grew 0.48 meters in week one and 0.35 meters in week two. What was its total growth over the two weeks?',
    subPrompt: 'Enter the exact decimal sum.',
    visualConfig: {
      mode: 'decimal-grid',
      decimalA: 0.48,
      decimalB: 0.35,
      operation: '+',
      canvasCaption: '48 hundredths + 35 hundredths = 83 hundredths (0.83) on the Base-10 grid.',
    },
    correctDecimal: 0.83,
    hint: 'Add hundredths (8 + 5 = 13 hundredths = 1 tenth + 3 hundredths), then add tenths (4 + 3 + 1 = 8 tenths).',
    workedSteps: [
      'Align decimal points vertically: 0.48 + 0.35.',
      'Hundredths column: 8 + 5 = 13 (write 3, regroup 1 tenth).',
      'Tenths column: 4 + 3 + 1 = 8 tenths.',
      'Total growth: 0.83 meters.',
    ],
  },
  {
    id: 'q-dec-add-2',
    moduleId: 'dec-add-sub',
    domain: 'decimals',
    difficulty: 'Grade-Level',
    type: 'decimal-input',
    contextScenario: 'Chemistry Titration · Liquid Volume',
    prompt:
      'A graduated cylinder holds 4.6 liters of distilled water. After an experiment uses 1.85 liters, how many liters remain?',
    subPrompt: 'Remember to rewrite 4.6 as 4.60 before subtracting 1.85.',
    visualConfig: {
      mode: 'decimal-grid',
      decimalA: 0.6,
      decimalB: 0.85,
      operation: '-',
      canvasCaption: 'Pad 4.6 with a trailing zero (4.60) so both numbers have hundredths.',
    },
    correctDecimal: 2.75,
    hint: 'Write 4.6 as 4.60, then regroup 1 tenth into 10 hundredths to subtract 5 hundredths.',
    workedSteps: [
      'Align decimals and pad with a trailing zero: 4.60 - 1.85.',
      'Regroup 6 tenths as 5 tenths + 10 hundredths: 10 - 5 = 5 hundredths.',
      'Regroup 4 ones as 3 ones + 15 tenths: 15 - 8 = 7 tenths.',
      'Ones place: 3 - 1 = 2 ones. Result: 2.75 liters.',
    ],
  },
  {
    id: 'q-dec-add-3',
    moduleId: 'dec-add-sub',
    domain: 'decimals',
    difficulty: 'Grade-Level',
    type: 'multiple-choice',
    contextScenario: 'Field Robotics · Rover Battery Draw',
    prompt:
      'A lunar rover uses 2.45 kWh for navigation, 1.8 kWh for its drill, and 0.75 kWh for communications. What is the total energy used?',
    visualConfig: {
      mode: 'decimal-grid',
      decimalA: 0.45,
      decimalB: 0.75,
      operation: '+',
      canvasCaption: 'Combine compatible hundredths first: 2.45 + 0.75 = 3.20, then add 1.80.',
    },
    options: ['4.28 kWh', '5.0 kWh', '3.38 kWh', '4.95 kWh'],
    correctChoiceIndex: 1,
    hint: 'Line up the decimal points: 2.45 + 1.80 + 0.75. Notice that 0.45 + 0.75 = 1.20.',
    workedSteps: [
      'Pad all values to hundredths: 2.45 + 1.80 + 0.75.',
      'Group compatible hundredths first: 2.45 + 0.75 = 3.20.',
      'Add the remaining value: 3.20 + 1.80 = 5.00 kWh (5.0 kWh).',
    ],
  },
  {
    id: 'q-dec-add-4',
    moduleId: 'dec-add-sub',
    domain: 'decimals',
    difficulty: 'Challenge',
    type: 'decimal-input',
    contextScenario: 'Track Meet · Relay Team Improvement',
    prompt:
      'A 5th-grade relay team finished in 52.4 seconds in April and improved their time by 3.68 seconds in May. What was their May race time?',
    subPrompt: 'Compute 52.40 - 3.68.',
    visualConfig: {
      mode: 'decimal-grid',
      decimalA: 0.4,
      decimalB: 0.68,
      operation: '-',
      canvasCaption: 'Rewrite 52.4 as 52.40 to align the hundredths column.',
    },
    correctDecimal: 48.72,
    hint: 'Write 52.40 - 3.68. In the hundredths place, 10 - 8 = 2.',
    workedSteps: [
      'Align decimal points with a placeholder zero: 52.40 - 3.68.',
      'Subtract hundredths: 10 - 8 = 2 hundredths (leaving 3 tenths).',
      'Subtract tenths: 13 - 6 = 7 tenths (leaving 51 ones).',
      'Subtract ones: 51 - 3 = 48 ones. Result: 48.72 seconds.',
    ],
  },

  // ================= MODULE 08: FRACTION ↔ DECIMAL EQUIVALENCY =================
  {
    id: 'q-bridge-1',
    moduleId: 'dec-frac-bridge',
    domain: 'decimals',
    difficulty: 'Foundation',
    type: 'decimal-input',
    contextScenario: 'Dual Scale Explorer · Benchmark Conversion',
    prompt:
      'Convert the fraction 3/5 into its exact decimal equivalent.',
    subPrompt: 'Use the Dual Equivalence Bridge on the left to compare fifths with tenths and hundredths.',
    visualConfig: {
      mode: 'equivalence-bridge',
      numA: 3,
      denA: 5,
      decimalA: 0.6,
      canvasCaption: 'Scale 3/5 to tenths (6/10) or hundredths (60/100) to read the decimal directly.',
    },
    correctDecimal: 0.6,
    hint: 'Multiply numerator and denominator of 3/5 by 2 to get 6/10.',
    workedSteps: [
      'Find an equivalent fraction with a base-10 denominator (10 or 100).',
      'Multiply numerator and denominator by 2: (3 × 2) / (5 × 2) = 6/10.',
      '6 tenths is written in decimal notation as 0.6 (or 0.60).',
    ],
  },
  {
    id: 'q-bridge-2',
    moduleId: 'dec-frac-bridge',
    domain: 'decimals',
    difficulty: 'Grade-Level',
    type: 'fraction-input',
    contextScenario: 'Precision Carpentry · Drill Bit Conversion',
    prompt:
      'A blueprint calls for a 0.35-meter steel bracket. Write 0.35 as a fraction in simplest form.',
    subPrompt: 'Start with 35/100 and divide numerator and denominator by their Greatest Common Factor.',
    visualConfig: {
      mode: 'equivalence-bridge',
      numA: 7,
      denA: 20,
      decimalA: 0.35,
      canvasCaption: '0.35 = 35/100. Divide both parts by 5 to reveal twentieths.',
    },
    correctFraction: { num: 7, den: 20, requireSimplified: true },
    hint: '0.35 means 35 hundredths (35/100). Divide both 35 and 100 by 5.',
    workedSteps: [
      'Write 0.35 as a fraction over 100: 35/100.',
      'Find the Greatest Common Factor of 35 and 100, which is 5.',
      'Divide numerator and denominator by 5: (35 ÷ 5) / (100 ÷ 5) = 7/20.',
    ],
  },
  {
    id: 'q-bridge-3',
    moduleId: 'dec-frac-bridge',
    domain: 'decimals',
    difficulty: 'Grade-Level',
    type: 'decimal-input',
    contextScenario: 'Acoustic Engineering · Sound Absorption',
    prompt:
      'Acoustic panels cover 7/20 of a studio wall. Express 7/20 as a decimal.',
    subPrompt: 'Scale denominator 20 up to 100 by multiplying by 5.',
    visualConfig: {
      mode: 'equivalence-bridge',
      numA: 7,
      denA: 20,
      decimalA: 0.35,
      canvasCaption: 'Multiply 7/20 by 5/5 to convert twentieths into hundredths.',
    },
    correctDecimal: 0.35,
    hint: 'Since 20 × 5 = 100, multiply the numerator 7 by 5 as well: 35/100.',
    workedSteps: [
      'Scale denominator 20 to 100 by multiplying by 5: 20 × 5 = 100.',
      'Multiply numerator by 5: 7 × 5 = 35.',
      '35/100 is written as 0.35.',
    ],
  },
  {
    id: 'q-bridge-4',
    moduleId: 'dec-frac-bridge',
    domain: 'decimals',
    difficulty: 'Challenge',
    type: 'multiple-choice',
    contextScenario: 'Machine Shop · Imperial-to-Metric Caliper',
    prompt:
      'Which decimal is equivalent to the benchmark fraction 5/8?',
    visualConfig: {
      mode: 'equivalence-bridge',
      numA: 5,
      denA: 8,
      decimalA: 0.625,
      canvasCaption: '1/8 = 0.125 (125 thousandths). Multiply 0.125 by 5.',
    },
    options: ['0.58', '0.625', '0.65', '0.525'],
    correctChoiceIndex: 1,
    hint: 'Remember that 4/8 = 1/2 = 0.500 and 1/8 = 0.125. Add 0.500 + 0.125.',
    workedSteps: [
      'Decompose 5/8 into 4/8 + 1/8.',
      '4/8 = 1/2 = 0.500, and 1/8 = 125/1000 = 0.125.',
      'Add them together: 0.500 + 0.125 = 0.625.',
    ],
  },
];

/**
 * Procedural 5th-Grade Question Generator for endless fresh quizzes
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
        : [
            'frac-equiv',
            'frac-add-sub',
            'frac-mixed',
            'frac-mult-div',
            'dec-place-value',
            'dec-compare-round',
            'dec-add-sub',
            'dec-frac-bridge',
          ];

  for (let i = 0; i < count; i++) {
    const mod = targetModules[i % targetModules.length];
    const qId = `dyn-${mod}-${stamp}-${i}`;

    if (mod === 'frac-equiv') {
      const bases = [
        { n: 1, d: 2 },
        { n: 2, d: 3 },
        { n: 3, d: 4 },
        { n: 2, d: 5 },
        { n: 3, d: 5 },
        { n: 4, d: 5 },
        { n: 5, d: 6 },
      ];
      const base = bases[(i + Math.floor(Math.random() * bases.length)) % bases.length];
      const mult = [2, 3, 4][(i + 1) % 3];
      const unsimplifiedN = base.n * mult;
      const unsimplifiedD = base.d * mult;

      generated.push({
        id: qId,
        moduleId: 'frac-equiv',
        domain: 'fractions',
        difficulty: 'Grade-Level',
        type: 'fraction-input',
        contextScenario: 'Dynamic Practice · Equivalent Fractions',
        prompt: `Reduce the fraction ${unsimplifiedN}/${unsimplifiedD} to its simplest form.`,
        subPrompt: 'Divide both numerator and denominator by their Greatest Common Factor (GCF).',
        visualConfig: {
          mode: 'fraction-bar',
          numA: base.n,
          denA: base.d,
          numB: base.n,
          denB: base.d,
          canvasCaption: `GCF(${unsimplifiedN}, ${unsimplifiedD}) = ${mult}. Compare the simplified partition.`,
        },
        correctFraction: { num: base.n, den: base.d, requireSimplified: true },
        hint: `Both ${unsimplifiedN} and ${unsimplifiedD} are divisible by ${mult}.`,
        workedSteps: [
          `Find the Greatest Common Factor of ${unsimplifiedN} and ${unsimplifiedD}, which is ${mult}.`,
          `Divide numerator by ${mult}: ${unsimplifiedN} ÷ ${mult} = ${base.n}.`,
          `Divide denominator by ${mult}: ${unsimplifiedD} ÷ ${mult} = ${base.d}.`,
          `Simplest form: ${base.n}/${base.d}.`,
        ],
      });
    } else if (mod === 'frac-add-sub') {
      const pairs = [
        { n1: 1, d1: 2, n2: 1, d2: 3 },
        { n1: 2, d1: 3, n2: 1, d2: 6 },
        { n1: 3, d1: 4, n2: 1, d2: 8 },
        { n1: 2, d1: 5, n2: 3, d2: 10 },
        { n1: 1, d1: 4, n2: 2, d2: 3 },
      ];
      const pair = pairs[(i + Math.floor(Math.random() * pairs.length)) % pairs.length];
      const commonD = lcm(pair.d1, pair.d2);
      const scaled1 = pair.n1 * (commonD / pair.d1);
      const scaled2 = pair.n2 * (commonD / pair.d2);
      const sumN = scaled1 + scaled2;
      const g = gcd(sumN, commonD);
      const finalN = sumN / g;
      const finalD = commonD / g;

      generated.push({
        id: qId,
        moduleId: 'frac-add-sub',
        domain: 'fractions',
        difficulty: 'Grade-Level',
        type: 'fraction-input',
        contextScenario: 'Dynamic Practice · LCD Addition',
        prompt: `Add the unlike fractions ${pair.n1}/${pair.d1} + ${pair.n2}/${pair.d2} and express your answer in simplest form.`,
        subPrompt: `Use the Least Common Denominator (${commonD}) to combine the fractions.`,
        visualConfig: {
          mode: 'lcd-grid',
          numA: pair.n1,
          denA: pair.d1,
          numB: pair.n2,
          denB: pair.d2,
          operation: '+',
          canvasCaption: `Convert both fractions to denominator ${commonD} before adding.`,
        },
        correctFraction: { num: finalN, den: finalD, requireSimplified: true },
        hint: `Convert ${pair.n1}/${pair.d1} to ${scaled1}/${commonD} and ${pair.n2}/${pair.d2} to ${scaled2}/${commonD}.`,
        workedSteps: [
          `Least Common Denominator of ${pair.d1} and ${pair.d2} is ${commonD}.`,
          `${pair.n1}/${pair.d1} = ${scaled1}/${commonD} and ${pair.n2}/${pair.d2} = ${scaled2}/${commonD}.`,
          `Add numerators: (${scaled1} + ${scaled2}) / ${commonD} = ${sumN}/${commonD}.`,
          `Simplified result: ${finalN}/${finalD}.`,
        ],
      });
    } else if (mod === 'frac-mixed') {
      const whole = 1 + (i % 3);
      const den = [3, 4, 5, 6][i % 4];
      const num = 1 + (i % (den - 1));
      const improperNum = whole * den + num;

      generated.push({
        id: qId,
        moduleId: 'frac-mixed',
        domain: 'fractions',
        difficulty: 'Foundation',
        type: 'fraction-input',
        contextScenario: 'Dynamic Practice · Mixed to Improper',
        prompt: `Convert the mixed number ${whole} ${num}/${den} into an improper fraction.`,
        subPrompt: `Compute (${whole} × ${den} + ${num}) / ${den}.`,
        visualConfig: {
          mode: 'mixed-number-line',
          numA: improperNum,
          denA: den,
          numberLineMin: 0,
          numberLineMax: whole + 1,
          canvasCaption: `${whole} wholes equal ${whole * den}/${den}, plus ${num}/${den}.`,
        },
        correctFraction: { num: improperNum, den },
        hint: `Multiply ${whole} × ${den} = ${whole * den}, then add ${num}.`,
        workedSteps: [
          `Convert ${whole} wholes into parts of size 1/${den}: ${whole} × ${den} = ${whole * den}/${den}.`,
          `Add the fractional remainder: ${whole * den}/${den} + ${num}/${den} = ${improperNum}/${den}.`,
        ],
      });
    } else if (mod === 'frac-mult-div') {
      const combos = [
        { n1: 2, d1: 3, n2: 3, d2: 5 },
        { n1: 3, d1: 4, n2: 1, d2: 3 },
        { n1: 2, d1: 5, n2: 5, d2: 6 },
        { n1: 3, d1: 5, n2: 1, d2: 2 },
      ];
      const c = combos[i % combos.length];
      const rawN = c.n1 * c.n2;
      const rawD = c.d1 * c.d2;
      const g = gcd(rawN, rawD);

      generated.push({
        id: qId,
        moduleId: 'frac-mult-div',
        domain: 'fractions',
        difficulty: 'Grade-Level',
        type: 'fraction-input',
        contextScenario: 'Dynamic Practice · Area Overlap Multiplication',
        prompt: `Find the product (${c.n1}/${c.d1}) × (${c.n2}/${c.d2}) in simplest form.`,
        subPrompt: 'Use the 2D unit square overlap grid on the left to verify the product.',
        visualConfig: {
          mode: 'fraction-multiply',
          numA: c.n1,
          denA: c.d1,
          numB: c.n2,
          denB: c.d2,
          operation: '×',
          canvasCaption: `${rawN} overlapping squares out of ${rawD} total squares.`,
        },
        correctFraction: { num: rawN / g, den: rawD / g, requireSimplified: true },
        hint: `Multiply numerators (${c.n1} × ${c.n2} = ${rawN}) and denominators (${c.d1} × ${c.d2} = ${rawD}), then divide by ${g}.`,
        workedSteps: [
          `Multiply numerators: ${c.n1} × ${c.n2} = ${rawN}.`,
          `Multiply denominators: ${c.d1} × ${c.d2} = ${rawD}.`,
          `Reduce ${rawN}/${rawD} by dividing by ${g}: ${rawN / g}/${rawD / g}.`,
        ],
      });
    } else if (mod === 'dec-place-value') {
      const tenths = 2 + ((i * 2) % 7);
      const hundredths = 1 + ((i * 3) % 8);
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
        hint: `${tenths} tenths is ${tenths * 10} squares, plus ${hundredths} individual hundredths squares = ${tenths * 10 + hundredths} squares (${val.toFixed(2)}).`,
        workedSteps: [
          `${tenths} × 0.1 = ${(tenths * 0.1).toFixed(2)} (${tenths} full columns of 10).`,
          `${hundredths} × 0.01 = ${(hundredths * 0.01).toFixed(2)} (${hundredths} single squares).`,
          `Sum: ${val.toFixed(2)}.`,
        ],
      });
    } else if (mod === 'dec-compare-round') {
      const samples = [
        { raw: 3.468, rounded: 3.47, min: 0.4, max: 0.5, fracPart: 0.468 },
        { raw: 7.234, rounded: 7.23, min: 0.2, max: 0.3, fracPart: 0.234 },
        { raw: 12.815, rounded: 12.82, min: 0.8, max: 0.9, fracPart: 0.815 },
        { raw: 5.642, rounded: 5.64, min: 0.6, max: 0.7, fracPart: 0.642 },
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
        subPrompt: 'Inspect the thousandths digit to decide whether to round up or down.',
        visualConfig: {
          mode: 'decimal-number-line',
          decimalA: s.fracPart,
          numberLineMin: s.min,
          numberLineMax: s.max,
          roundingPlace: 'hundredths',
          canvasCaption: `Locate the fractional part ${s.fracPart.toFixed(3)} on the hundredths interval.`,
        },
        correctDecimal: s.rounded,
        hint: `Look at the last digit (thousandths place) of ${s.raw}. If it is 5 or greater, increase the hundredths digit by 1.`,
        workedSteps: [
          `Identify the hundredths digit and the thousandths digit to its right in ${s.raw}.`,
          `Rounding to the nearest hundredth yields ${s.rounded.toFixed(2)}.`,
        ],
      });
    } else if (mod === 'dec-add-sub') {
      const a = Number((0.25 + (i % 5) * 0.12).toFixed(2));
      const b = Number((0.18 + (i % 4) * 0.09).toFixed(2));
      const sum = Number((a + b).toFixed(2));

      generated.push({
        id: qId,
        moduleId: 'dec-add-sub',
        domain: 'decimals',
        difficulty: 'Grade-Level',
        type: 'decimal-input',
        contextScenario: 'Dynamic Practice · Hundredths Addition',
        prompt: `Compute the decimal sum: ${a.toFixed(2)} + ${b.toFixed(2)}.`,
        subPrompt: 'Align the decimal points vertically and regroup hundredths into tenths if needed.',
        visualConfig: {
          mode: 'decimal-grid',
          decimalA: a,
          decimalB: b,
          operation: '+',
          canvasCaption: `Combine ${Math.round(a * 100)} hundredths and ${Math.round(b * 100)} hundredths on the Base-10 grid.`,
        },
        correctDecimal: sum,
        hint: `${Math.round(a * 100)} hundredths + ${Math.round(b * 100)} hundredths = ${Math.round(sum * 100)} hundredths.`,
        workedSteps: [
          `Align decimals: ${a.toFixed(2)} + ${b.toFixed(2)}.`,
          `Combine hundredths: ${Math.round(a * 100)}/100 + ${Math.round(b * 100)}/100 = ${Math.round(sum * 100)}/100.`,
          `Decimal sum: ${sum.toFixed(2)}.`,
        ],
      });
    } else {
      const bridges = [
        { n: 1, d: 4, dec: 0.25 },
        { n: 3, d: 4, dec: 0.75 },
        { n: 2, d: 5, dec: 0.4 },
        { n: 4, d: 5, dec: 0.8 },
        { n: 9, d: 20, dec: 0.45 },
      ];
      const br = bridges[i % bridges.length];

      generated.push({
        id: qId,
        moduleId: 'dec-frac-bridge',
        domain: 'decimals',
        difficulty: 'Grade-Level',
        type: 'decimal-input',
        contextScenario: 'Dynamic Practice · Fraction-to-Decimal Bridge',
        prompt: `Convert the fraction ${br.n}/${br.d} into its exact decimal value.`,
        subPrompt: 'Scale the denominator to 10 or 100 to read the decimal.',
        visualConfig: {
          mode: 'equivalence-bridge',
          numA: br.n,
          denA: br.d,
          decimalA: br.dec,
          canvasCaption: `Scale ${br.n}/${br.d} to hundredths: ${Math.round(br.dec * 100)}/100 = ${br.dec}.`,
        },
        correctDecimal: br.dec,
        hint: `Multiply numerator and denominator by ${100 / br.d} to get ${Math.round(br.dec * 100)}/100.`,
        workedSteps: [
          `Scale denominator ${br.d} to 100 by multiplying by ${100 / br.d}.`,
          `${br.n}/${br.d} = ${Math.round(br.dec * 100)}/100 = ${br.dec}.`,
        ],
      });
    }
  }

  return generated;
}

export const INITIAL_STUDENT_PROFILES: StudentProfile[] = [
  {
    id: 'student-maya',
    name: 'Maya Lin',
    gradeLabel: '5th Grade · Room 204',
    dailyStreak: 6,
    moduleProgress: {
      'frac-equiv': {
        moduleId: 'frac-equiv',
        questionsAttempted: 12,
        questionsCorrect: 11,
        bestQuizScore: 92,
        lastPracticed: 'Today',
        currentStreak: 5,
        masteryLevel: 'Mastered',
      },
      'frac-add-sub': {
        moduleId: 'frac-add-sub',
        questionsAttempted: 10,
        questionsCorrect: 8,
        bestQuizScore: 80,
        lastPracticed: 'Yesterday',
        currentStreak: 3,
        masteryLevel: 'Developing',
      },
      'frac-mixed': {
        moduleId: 'frac-mixed',
        questionsAttempted: 8,
        questionsCorrect: 7,
        bestQuizScore: 88,
        lastPracticed: '2 days ago',
        currentStreak: 4,
        masteryLevel: 'Mastered',
      },
      'frac-mult-div': {
        moduleId: 'frac-mult-div',
        questionsAttempted: 6,
        questionsCorrect: 4,
        bestQuizScore: 67,
        lastPracticed: '3 days ago',
        currentStreak: 1,
        masteryLevel: 'Needs Review',
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
        questionsAttempted: 8,
        questionsCorrect: 7,
        bestQuizScore: 88,
        lastPracticed: 'Yesterday',
        currentStreak: 3,
        masteryLevel: 'Mastered',
      },
    },
    attemptHistory: [
      {
        id: 'att-101',
        timestamp: 'Today · 8:40 AM',
        title: '05. Decimal Place Value to Thousandths',
        domain: 'decimals',
        moduleId: 'dec-place-value',
        score: 4,
        totalQuestions: 4,
        accuracyPercent: 100,
        durationSeconds: 145,
        questionResults: [
          {
            questionId: 'q-dec-pv-1',
            moduleId: 'dec-place-value',
            domain: 'decimals',
            prompt: 'Shade the 10 × 10 hundredths grid to represent 4 tenths and 7 hundredths (0.47).',
            userAnswerText: '0.47 (47/100 shaded)',
            correctAnswerText: '0.47',
            isCorrect: true,
            explanation: '4 tenths (0.40) + 7 hundredths (0.07) = 0.47.',
          },
          {
            questionId: 'q-dec-pv-2',
            moduleId: 'dec-place-value',
            domain: 'decimals',
            prompt: 'Write (3 × 1) + (6 × 0.1) + (0 × 0.01) + (8 × 0.001) in standard decimal form.',
            userAnswerText: '3.608',
            correctAnswerText: '3.608',
            isCorrect: true,
            explanation: 'Ones: 3, Tenths: 6, Hundredths: 0, Thousandths: 8 → 3.608.',
          },
        ],
      },
      {
        id: 'att-102',
        timestamp: 'Yesterday · 4:15 PM',
        title: '02. Adding & Subtracting Unlike Fractions',
        domain: 'fractions',
        moduleId: 'frac-add-sub',
        score: 3,
        totalQuestions: 4,
        accuracyPercent: 75,
        durationSeconds: 210,
        questionResults: [
          {
            questionId: 'q-frac-add-1',
            moduleId: 'frac-add-sub',
            domain: 'fractions',
            prompt: 'A baker combines 1/3 cup of rye flour with 1/4 cup of whole wheat flour. Total cup fraction?',
            userAnswerText: '7/12',
            correctAnswerText: '7/12',
            isCorrect: true,
            explanation: 'LCD(3, 4) = 12 → 4/12 + 3/12 = 7/12.',
          },
          {
            questionId: 'q-frac-add-4',
            moduleId: 'frac-add-sub',
            domain: 'fractions',
            prompt: 'Calculate 3/5 + 3/10 - 1/2 and express as a simplified fraction.',
            userAnswerText: '4/10',
            correctAnswerText: '2/5',
            isCorrect: false,
            explanation: '4/10 is equivalent, but dividing numerator and denominator by 2 gives simplest form 2/5.',
          },
        ],
      },
      {
        id: 'att-103',
        timestamp: '3 days ago · 3:50 PM',
        title: '04. Multiplying & Dividing Unit Fractions',
        domain: 'fractions',
        moduleId: 'frac-mult-div',
        score: 2,
        totalQuestions: 4,
        accuracyPercent: 50,
        durationSeconds: 240,
        questionResults: [
          {
            questionId: 'q-frac-mult-1',
            moduleId: 'frac-mult-div',
            domain: 'fractions',
            prompt: '3/4 of a garden bed is vegetables, and 2/3 of that is heirloom tomatoes. Fraction of bed?',
            userAnswerText: '1/2',
            correctAnswerText: '1/2',
            isCorrect: true,
            explanation: '(3/4) × (2/3) = 6/12 = 1/2.',
          },
          {
            questionId: 'q-frac-mult-3',
            moduleId: 'frac-mult-div',
            domain: 'fractions',
            prompt: 'A 5-meter spool of copper wire is cut into 1/4-meter segments. How many segments (5 ÷ 1/4)?',
            userAnswerText: '5/4 segments',
            correctAnswerText: '20 segments',
            isCorrect: false,
            explanation: 'Dividing 5 wholes by 1/4 counts how many fourths fit in 5 wholes: 5 × 4 = 20 segments.',
          },
        ],
      },
    ],
  },
  {
    id: 'student-leo',
    name: 'Leo Vance',
    gradeLabel: '5th Grade · Room 204',
    dailyStreak: 3,
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
        questionsCorrect: 6,
        bestQuizScore: 75,
        lastPracticed: 'Today',
        currentStreak: 2,
        masteryLevel: 'Developing',
      },
      'dec-compare-round': {
        moduleId: 'dec-compare-round',
        questionsAttempted: 6,
        questionsCorrect: 3,
        bestQuizScore: 50,
        lastPracticed: '4 days ago',
        currentStreak: 0,
        masteryLevel: 'Needs Review',
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
        questionsAttempted: 4,
        questionsCorrect: 4,
        bestQuizScore: 100,
        lastPracticed: 'Today',
        currentStreak: 4,
        masteryLevel: 'Mastered',
      },
    },
    attemptHistory: [
      {
        id: 'att-201',
        timestamp: 'Today · 9:15 AM',
        title: '08. Fraction & Decimal Equivalency Bridge',
        domain: 'decimals',
        moduleId: 'dec-frac-bridge',
        score: 4,
        totalQuestions: 4,
        accuracyPercent: 100,
        durationSeconds: 160,
        questionResults: [
          {
            questionId: 'q-bridge-1',
            moduleId: 'dec-frac-bridge',
            domain: 'decimals',
            prompt: 'Convert the fraction 3/5 into its exact decimal equivalent.',
            userAnswerText: '0.6',
            correctAnswerText: '0.6',
            isCorrect: true,
            explanation: '3/5 = 6/10 = 0.6.',
          },
        ],
      },
    ],
  },
];
