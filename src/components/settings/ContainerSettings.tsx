"use client";

import { useNode } from "@craftjs/core";

interface ContainerProps {
  backgroundColor: string;
  padding: string;
}

export const ContainerSettings = () => {
  const {
    actions: { setProp },
    props,
  } = useNode((node) => ({
    props: node.data.props as ContainerProps,
  }));

  return (
    <div className="space-y-4 p-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Background Color
        </label>
        <input
          type="color"
          value={props.backgroundColor}
          onChange={(e) =>
            setProp(
              (props: ContainerProps) =>
                (props.backgroundColor = e.target.value),
            )
          }
          className="w-full h-10 px-1 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Padding
        </label>
        <input
          type="text"
          value={props.padding}
          onChange={(e) =>
            setProp((props: ContainerProps) => (props.padding = e.target.value))
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="e.g. 20px"
        />
      </div>
    </div>
  );
};
