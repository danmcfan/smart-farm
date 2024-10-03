import colormap from "colormap";

export function getColorOptions(min: number, max: number): { value: number, color: string }[] {
    let range = max - min;
    let step = range / 19;

    let colors: string[] = colormap({
        colormap: "winter",
        nshades: 20,
        format: "hex",
        alpha: 1,
    });

    return colors.map(
        (color, index) => {
            let value = min + (step * index);
            return { value: value, color: color };
        }
    );
}