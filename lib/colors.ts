import colormap from "colormap";

export function getColorOptions(
  min: number,
  max: number
): { value: number; color: string }[] {
  const range = max - min;
  const step = range / 19;

  const colors: string[] = colormap({
    colormap: "winter",
    nshades: 20,
    format: "hex",
    alpha: 1,
  });

  return colors.map((color, index) => {
    const value = min + step * index;
    return { value: value, color: color };
  });
}
