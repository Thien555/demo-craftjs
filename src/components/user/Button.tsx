"use client";

import { useNode } from "@craftjs/core";
import { Button as AntdButton } from "antd";
import { ButtonSettings } from "../settings";

// Interface định nghĩa props cho Button component
interface ButtonProps {
  text: string; // Nội dung nút
  backgroundColor: string; // Màu nền
  color: string; // Màu chữ
  borderRadius: string; // Bo góc (e.g., "6px", "50%")
  padding: string; // Khoảng cách padding (e.g., "10px 20px")
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
    <AntdButton
      // connect(ref): Kết nối button với editor để nhận diện select/drag
      ref={(ref) => {
        if (ref) connect(ref);
      }}
      style={{
        backgroundColor,
        color,
        borderRadius,
        padding,
        borderColor: backgroundColor,
      }}
      className={`transition-opacity hover:opacity-80 ${
        selected ? "ring-2 ring-blue-500" : "" // Viền xanh khi được chọn
      }`}
      onClick={(e) => {
        // stopPropagation: Ngăn click button lan tới parent (tránh bị select parent)
        e.stopPropagation();
      }}
    >
      {text}
    </AntdButton>
  );
};

/**
 * Craft.js configuration cho Button component
 */
Button.craft = {
  displayName: "Button",
  props: {
    text: "Click me",
    backgroundColor: "#3b82f6", // Màu xanh blue-500
    color: "#ffffff", // Màu trắng
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
