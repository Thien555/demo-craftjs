"use client";

import { useNode } from "@craftjs/core";
import { ButtonSettings } from "../settings";

interface ButtonProps {
  text: string;
  backgroundColor: string;
  color: string;
  borderRadius: string;
  padding: string;
}

export const Button = ({
  text,
  backgroundColor,
  color,
  borderRadius,
  padding,
}: ButtonProps) => {
  const {
    connectors: { connect },
    selected,
  } = useNode((state) => ({
    selected: state.events.selected,
  }));

  return (
    <button
      ref={(ref) => {
        if (ref) connect(ref);
      }}
      style={{
        backgroundColor,
        color,
        borderRadius,
        padding,
      }}
      className={`cursor-pointer font-medium transition-opacity hover:opacity-80 ${
        selected ? "ring-2 ring-blue-500" : ""
      }`}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      {text}
    </button>
  );
};

Button.craft = {
  displayName: "Button",
  props: {
    text: "Click me",
    backgroundColor: "#3b82f6",
    color: "#ffffff",
    borderRadius: "6px",
    padding: "10px 20px",
  },
  rules: {
    canDrag: () => true,
    canDrop: () => true,
  },
  related: {
    settings: ButtonSettings,
  },
};
