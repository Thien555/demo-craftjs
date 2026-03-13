"use client";

import { useNode } from "@craftjs/core";

// Interface định nghĩa props (trùng với Button.tsx)
interface ButtonProps {
  text: string;
  backgroundColor: string;
  color: string;
  borderRadius: string;
  padding: string;
}

/**
 * ButtonSettings: Component form để chỉnh sửa properties của Button component
 */
export const ButtonSettings = () => {
  const {
    actions: { setProp },
    props,
  } = useNode((node) => ({
    props: node.data.props as ButtonProps,
  }));

  return (
    <div className="space-y-4 p-4">
      {/* Button Text field */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Button Text
        </label>
        <input
          type="text"
          value={props.text}
          onChange={(e) =>
            setProp((props: ButtonProps) => (props.text = e.target.value))
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Background Color field */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Background Color
        </label>
        <input
          type="color"
          value={props.backgroundColor}
          onChange={(e) =>
            setProp(
              (props: ButtonProps) => (props.backgroundColor = e.target.value),
            )
          }
          className="w-full h-10 px-1 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Text Color field */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Text Color
        </label>
        <input
          type="color"
          value={props.color}
          onChange={(e) =>
            setProp((props: ButtonProps) => (props.color = e.target.value))
          }
          className="w-full h-10 px-1 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Border Radius field */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Border Radius
        </label>
        <input
          type="text"
          value={props.borderRadius}
          onChange={(e) =>
            setProp(
              (props: ButtonProps) => (props.borderRadius = e.target.value),
            )
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="e.g. 6px"
        />
      </div>

      {/* Padding field */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Padding
        </label>
        <input
          type="text"
          value={props.padding}
          onChange={(e) =>
            setProp((props: ButtonProps) => (props.padding = e.target.value))
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="e.g. 10px 20px"
        />
      </div>
    </div>
  );
};
