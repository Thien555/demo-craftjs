"use client";

import { Element, useEditor } from "@craftjs/core";
// useEditor: Hook để truy cập Craft.js editor instance và các methods
// Element: Component để tạo draggable elements

import { Text, Button, Container } from "./user";

export const Toolbox = () => {
  // useEditor trả về object chứa connectors và các methods
  // connectors: Các hàm để kết nối DOM elements với editor (drag, drop, create)
  const { connectors } = useEditor();

  return (
    // Panel bên trái: w-64 = 256px, bg-white nền trắng, border-r viền phải
    <div className="w-64 bg-white border-r border-gray-200 p-4">
      <h2 className="text-lg font-semibold mb-4 text-gray-800">Toolbox</h2>

      {/* space-y-2: Khoảng cách dọc giữa các items */}
      <div className="space-y-2">
        {/* 
          Draggable Item - Text:
          ref={(ref) => {...}}: Callback ref để kết nối element với Craft.js
          connectors.create(ref, <Component />): Tạo một draggable item
          Khi kéo item này vào canvas, Craft.js sẽ tạo instance của Text component
        */}
        <div
          ref={(ref) => {
            if (ref)
              connectors.create(
                ref,
                <Text
                  text="New Text"
                  fontSize="16px"
                  textAlign="left"
                  color="#000000"
                />,
              );
          }}
          // Styling: cursor-move cho biết có thể kéo, hover effects
          className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-blue-500 transition-all text-left flex items-center gap-2 cursor-move"
        >
          <span className="text-xl">📝</span>
          <span>Text</span>
        </div>

        {/* Draggable Item - Button */}
        <div
          ref={(ref) => {
            if (ref)
              connectors.create(
                ref,
                <Button
                  text="Click me"
                  backgroundColor="#3b82f6"
                  color="#ffffff"
                  borderRadius="6px"
                  padding="10px 20px"
                />,
              );
          }}
          className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-blue-500 transition-all text-left flex items-center gap-2 cursor-move"
        >
          <span className="text-xl">🔘</span>
          <span>Button</span>
        </div>

        {/* Draggable Item - Container
            Element canvas: Container này có thể chứa các components khác
        */}
        <div
          ref={(ref) => {
            if (ref)
              connectors.create(
                ref,
                <Element
                  canvas
                  is={Container}
                  backgroundColor="#f3f4f6"
                  padding="20px"
                />,
              );
          }}
          className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-blue-500 transition-all text-left flex items-center gap-2 cursor-move"
        >
          <span className="text-xl">📦</span>
          <span>Container</span>
        </div>
      </div>

      {/* Phần hướng dẫn sử dụng */}
      <div className="mt-8">
        <h3 className="text-sm font-medium text-gray-500 mb-2">Instructions</h3>
        <ul className="text-xs text-gray-400 space-y-1">
          <li>• Drag components to canvas</li>
          <li>• Click to select</li>
          <li>• Double-click text to edit</li>
          <li>• Use Settings panel to customize</li>
        </ul>
      </div>
    </div>
  );
};
