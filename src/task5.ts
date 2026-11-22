type Step<Input, Output> = (input: Input) => Output;

export function applyPipeline<A, B>(input: A, step1: Step<A, B>): B;
export function applyPipeline<A, B, C>(
  input: A,
  step1: Step<A, B>,
  step2: Step<B, C>,
): C;
export function applyPipeline<A, B, C, D>(
  input: A,
  step1: Step<A, B>,
  step2: Step<B, C>,
  step3: Step<C, D>,
): D;
export function applyPipeline(
  input: unknown,
  ...steps: Array<Step<unknown, unknown>>
): unknown {
  return steps.reduce((value, step) => step(value), input);
}

const double = (value: number): number => value * 2;
const toLabel = (value: number): string => `Result: ${value}`;
const toUpperCase = (value: string): string => value.toUpperCase();
const trim = (text: string): string => text.trim();

const threeSteps = applyPipeline(5, double, toLabel, toUpperCase);
console.log(threeSteps);

const twoSteps = applyPipeline(21, double, toLabel);
console.log(twoSteps);

const oneStep = applyPipeline("  trimmed  ", trim);
console.log(`"${oneStep}"`);

// applyPipeline(5, toLabel, double);
// Compile error: toLabel returns string, but double expects number,
// so the second step cannot accept the result of the first one.
