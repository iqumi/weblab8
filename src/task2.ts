export type RGBColor = [number, number, number];

export enum ColorName {
  Red = "Red",
  Green = "Green",
  Blue = "Blue",
}

const COLOR_PALETTE: Record<ColorName, RGBColor> = {
  [ColorName.Red]: [255, 0, 0],
  [ColorName.Green]: [0, 128, 0],
  [ColorName.Blue]: [0, 0, 255],
};

const MIN_CHANNEL_VALUE = 0;
const MAX_CHANNEL_VALUE = 255;

function assertValidChannel(channel: number): void {
  const isValid =
    Number.isInteger(channel) &&
    channel >= MIN_CHANNEL_VALUE &&
    channel <= MAX_CHANNEL_VALUE;

  if (!isValid) {
    throw new RangeError(
      `RGB channel must be an integer from ${MIN_CHANNEL_VALUE} to ${MAX_CHANNEL_VALUE}, received: ${channel}`,
    );
  }
}

export function rgbToHex(color: RGBColor): string {
  color.forEach(assertValidChannel);

  const hexChannels = color.map((channel) =>
    channel.toString(16).padStart(2, "0"),
  );

  return `#${hexChannels.join("")}`;
}

export function resolveColor(name: ColorName): { rgb: RGBColor; hex: string } {
  const rgb = COLOR_PALETTE[name];
  return { rgb: [...rgb], hex: rgbToHex(rgb) };
}

for (const name of Object.values(ColorName)) {
  const { rgb, hex } = resolveColor(name);
  console.log(`${name}: rgb(${rgb.join(", ")}) -> ${hex}`);
}

console.log(rgbToHex([1, 2, 3]));

const invalidColors: RGBColor[] = [
  [256, 0, 0],
  [0, -1, 0],
  [0, 0, 12.5],
];

for (const invalidColor of invalidColors) {
  try {
    rgbToHex(invalidColor);
  } catch (error) {
    if (error instanceof RangeError) {
      console.log(`RangeError: ${error.message}`);
    } else {
      throw error;
    }
  }
}
