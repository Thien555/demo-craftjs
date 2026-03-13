"use client";

import { useNode } from "@craftjs/core";
// useNode: Hook để kết nối component với Craft.js editor
// - Cung cấp thông tin về node hiện tại trong editor tree
// - Cho phép update props, kết nối DOM với editor

import ContentEditable from "react-contenteditable";
// Thư viện cho phép inline editing - user có thể click đúp và edit text trực tiếp

import { useState, useCallback } from "react";
import { TextSettings } from "../settings";

// Định nghĩa props cho Text component
interface TextProps {
  text: string; // Nội dung văn bản
  fontSize: string; // Kích thước chữ (e.g., "16px", "1.5rem")
  textAlign: string; // Căn chỉnh (left, center, right, justify)
  color: string; // Màu chữ (hex, rgb, hsl)
}

// Component Text cơ bản
export const Text = ({ text, fontSize, textAlign, color }: TextProps) => {
  /**
   * useNode trả về:
   * - connectors: { connect, drag } - Kết nối DOM element với editor
   * - actions: { setProp } - Cập nhật props của node
   * - selected: boolean - Node này có đang được chọn không
   */
  const {
    connectors: { connect },
    actions: { setProp },
    selected,
  } = useNode((state) => ({
    selected: state.events.selected,
  }));

  // State kiểm soát chế độ edit inline
  const [editable, setEditable] = useState(false);

  // Callback khi nội dung text thay đổi
  const handleChange = useCallback(
    (evt: { target: { value: string } }) => {
      /**
       * setProp: Cập nhật props của node
       * - Callback nhận props object, modify trực tiếp
       * - Tham số thứ 2 (500): Debounce time (ms) để tránh re-render liên tục
       */
      setProp((props: TextProps) => (props.text = evt.target.value), 500);
    },
    [setProp],
  );

  return (
    <div
      // connect(ref): Kết nối DOM element với Craft.js
      // Giúp editor nhận biết vị trí và kích thước của element
      ref={(ref) => {
        if (ref) connect(ref);
      }}
      // Click vào text -> bật chế độ edit
      onClick={() => selected && setEditable(true)}
      // Click ra ngoài -> tắt chế độ edit
      onBlur={() => setEditable(false)}
      // ring-2: Hiển thị viền xanh khi component được chọn
      className={`p-2 ${selected ? "ring-2 ring-blue-500" : ""}`}
    >
      <ContentEditable
        disabled={!editable} // Chỉ cho edit khi ở chế độ edit
        onChange={handleChange} // Handler khi nội dung thay đổi
        html={text} // Nội dung HTML hiện tại
        tagName="p" // Render dưới dạng thẻ <p>
        style={{
          fontSize,
          textAlign: textAlign as "left" | "center" | "right",
          color,
        }}
        className="outline-none" // Bỏ outline mặc định khi focus
      />
    </div>
  );
};

/**
 * Craft.js configuration cho Text component
 * Đây là metadata mà Craft.js dùng để hiểu component
 */
Text.craft = {
  displayName: "Text", // Tên hiển thị trong editor
  props: {
    // Giá trị props mặc định khi tạo mới
    text: "Hello World",
    fontSize: "16px",
    textAlign: "left",
    color: "#000000",
  },
  rules: {
    canDrag: () => true, // Cho phép kéo component này
    canDrop: () => true, // Cho phép thả component khác vào đây (ít dùng với Text)
  },
  related: {
    settings: TextSettings, // Component settings form tương ứng
  },
};
