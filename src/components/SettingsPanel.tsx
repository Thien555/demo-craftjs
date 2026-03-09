"use client";

import { useEditor } from "@craftjs/core";

export const SettingsPanel = () => {
  const { selected, actions } = useEditor((state, query) => {
    const currentNodeId = Array.from(state.events.selected).pop();
    let selected;

    if (currentNodeId) {
      selected = {
        id: currentNodeId,
        name: state.nodes[currentNodeId].data.name,
        settings:
          state.nodes[currentNodeId].related &&
          state.nodes[currentNodeId].related.settings,
        isDeletable: query.node(currentNodeId).isDeletable(),
      };
    }

    return {
      selected,
    };
  });

  return selected ? (
    <div className="w-72 bg-white border-l border-gray-200 flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800">Settings</h2>
        <p className="text-sm text-gray-500">{selected.name}</p>
      </div>

      <div className="flex-1 overflow-auto">
        {selected.settings && <selected.settings />}
      </div>

      {selected.isDeletable && (
        <div className="p-4 border-t border-gray-200">
          <button
            className="w-full px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            onClick={() => {
              actions.delete(selected.id);
            }}
          >
            Delete Component
          </button>
        </div>
      )}
    </div>
  ) : (
    <div className="w-72 bg-white border-l border-gray-200 p-4">
      <h2 className="text-lg font-semibold text-gray-800">Settings</h2>
      <p className="text-sm text-gray-500 mt-2">
        Select a component to edit its properties
      </p>
    </div>
  );
};
