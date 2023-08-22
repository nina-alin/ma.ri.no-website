const pickColorBasedOnBackground = (bgColor: string) => {
  const color = bgColor.charAt(0) === "#" ? bgColor.substring(1, 7) : bgColor;
  const rgb = [
    parseInt(color.substring(0, 2), 16) / 255,
    parseInt(color.substring(2, 4), 16) / 255,
    parseInt(color.substring(4, 6), 16) / 255,
  ];
  const colorTab = rgb.map((col) => {
    if (col <= 0.03928) {
      return col / 12.92;
    }
    return Math.pow((col + 0.055) / 1.055, 2.4);
  });
  const result =
    0.2126 * colorTab[0] + 0.7152 * colorTab[1] + 0.0722 * colorTab[2];
  return result > 0.179 ? "#000000" : "#FFFFFF";
};

export default pickColorBasedOnBackground;

// thanks to https://stackoverflow.com/questions/3942878/how-to-decide-font-color-in-white-or-black-depending-on-background-color
