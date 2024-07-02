import React from "react";
import { ColorPaletteProps } from "../types/ColorPaletteProps";

const ColorPalette: React.FC<ColorPaletteProps> = ({ colors }) => {
  const copyToClipboard = (color: string) => {
    navigator.clipboard.writeText(color).then(() => {
      alert(`Copied ${color} to clipboard!`);
    });
  };

  return (
    <div className="color-palette fade-in">
      {colors.map((color, index) => (
        <div
          key={index}
          className="color-swatch"
          style={{ backgroundColor: color }}
          onClick={() => copyToClipboard(color)}
          title="Click to copy"
        >
          {color}
        </div>
      ))}
    </div>
  );
};

export default ColorPalette;
