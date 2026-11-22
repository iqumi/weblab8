export function formatInput(value: number): string;
export function formatInput(value: string): string;
export function formatInput(value: Date): string;
export function formatInput(value: number | string | Date): string {
  if (value instanceof Date) {
    return value.toISOString();
  }

  switch (typeof value) {
    case "number":
      return value.toFixed(2);
    case "string":
      return value.trim();
    default: {
      const unhandledValue: never = value;
      throw new Error(`Unsupported value: ${String(unhandledValue)}`);
    }
  }
}

console.log(formatInput(3.14));
console.log(formatInput(20));
console.log(`"${formatInput("qwerty")}"`);
console.log(formatInput(new Date("2024-09-01T10:30:00Z")));
