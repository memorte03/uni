function componentToHex(c: number) {
    var hex = c.toString(16);
    return hex.length == 1 ? '0' + hex : hex;
}

function rgbToHex(r: number, g: number, b: number) {
    return '#' + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function hexToRgb(hex: string) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
        ? {
              r: parseInt(result[1], 16),
              g: parseInt(result[2], 16),
              b: parseInt(result[3], 16),
          }
        : null;
}

export const colorByBackground = (hex: string) => {
    let { r: red, g: green, b: blue }: any = hexToRgb(hex);
    if (red * 0.299 + green * 0.587 + blue * 0.114 > 186) {
        return '#000000';
    } else {
        return '#ffffff';
    }
};
