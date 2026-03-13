"use client";

import { useNode } from "@craftjs/core";

// Interface định nghĩa props (trùng với Text.tsx)
interface TextProps {
  text: string;
  fontSize: string;
  textAlign: string;
  color: string;
}

/**
 * TextSettings: Component form để chỉnh sửa properties của Text component
 * Render trong SettingsPanel khi user chọn một Text component
 */
export const TextSettings = () => {
  /**
   * useNode trong settings context:
   * - actions.setProp: Cập nhật props của node đang được chọn
   * - props: Giá trị props hiện tại của node
   */
  const {
    actions: { setProp },
    props,
  } = useNode((node) => ({
    props: node.data.props as TextProps,
  }));

  return (
    // space-y-4: Khoảng cách đều giữa các form fields
    <div className="space-y-4 p-4">
      {/* Text content field */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Text
        </label>
        <textarea
          value={props.text}
          onChange={(e) =>
            // setProp: Callback modify props trực tiếp
            setProp((props: TextProps) => (props.text = e.target.value))
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={3}
        />
      </div>

      {/* Font Size field */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Font Size
        </label>
        <input
          type="text"
          value={props.fontSize}
          onChange={(e) =>
            setProp((props: TextProps) => (props.fontSize = e.target.value))
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Text Align field */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Text Align
        </label>
        <select
          value={props.textAlign}
          onChange={(e) =>
            setProp((props: TextProps) => (props.textAlign = e.target.value))
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="left">Left</option>
          <option value="center">Center</option>
          <option value="right">Right</option>
          <option value="justify">Justify</option>
        </select>
      </div>

      {/* Color picker field */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Color
        </label>
        {/* type="color": Input native color picker của HTML5 */}
        <input
          type="color"
          value={props.color}
          onChange={(e) =>
            setProp((props: TextProps) => (props.color = e.target.value))
          }
          className="w-full h-10 px-1 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
  );
};
