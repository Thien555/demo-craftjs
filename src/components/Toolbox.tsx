"use client";

import { Element, useEditor } from "@craftjs/core";
import { Text, Button, Container } from "./user";

export const Toolbox = () => {
  const { connectors } = useEditor();

  return (
    <div className="w-64 bg-white border-r border-gray-200 p-4">
      <h2 className="text-lg font-semibold mb-4 text-gray-800">Toolbox</h2>
      <div className="space-y-2">
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
          className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-blue-500 transition-all text-left flex items-center gap-2 cursor-move"
        >
          <span className="text-xl">📝</span>
          <span>Text</span>
        </div>

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
