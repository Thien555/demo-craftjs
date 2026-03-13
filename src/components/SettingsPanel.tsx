"use client";

import { useEditor } from "@craftjs/core";
// useEditor: Hook để lắng nghe state và thực hiện actions

export const SettingsPanel = () => {
  /**
   * useEditor với selector function:
   * - state: Toàn bộ editor state (nodes, events, options)
   * - query: Các hàm để query thông tin từ editor
   *
   * Selector trả về:
   * - selected: Thông tin về node đang được chọn (id, name, settings, isDeletable)
   */
  const { selected, actions } = useEditor((state, query) => {
    // Lấy ID của node đang được selected (selected là một Set)
    const currentNodeId = Array.from(state.events.selected).pop();
    let selected;

    if (currentNodeId) {
      selected = {
        id: currentNodeId,
        // name: Tên component type (Text, Button, Container...)
        name: state.nodes[currentNodeId].data.name,
        // related.settings: Component settings form được định nghĩa trong .craft.related
        settings:
          state.nodes[currentNodeId].related &&
          state.nodes[currentNodeId].related.settings,
        // Kiểm tra node có thể xóa được không (ROOT không thể xóa)
        isDeletable: query.node(currentNodeId).isDeletable(),
      };
    }

    return {
      selected,
    };
  });

  // Conditional rendering: Nếu có component được chọn thì hiển thị settings
  return selected ? (
    <div className="w-72 bg-white border-l border-gray-200 flex flex-col">
      {/* Header: Hiển thị tên component */}
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800">Settings</h2>
        <p className="text-sm text-gray-500">{selected.name}</p>
      </div>

      {/* Content: Render settings form tương ứng với component type */}
      <div className="flex-1 overflow-auto">
        {/* selected.settings là một React component, render như <TextSettings />, <ButtonSettings />... */}
        {selected.settings && <selected.settings />}
      </div>

      {/* Delete button: Chỉ hiển thị nếu component có thể xóa */}
      {selected.isDeletable && (
        <div className="p-4 border-t border-gray-200">
          <button
            className="w-full px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            onClick={() => {
              // actions.delete: Xóa node khỏi editor tree
              actions.delete(selected.id);
            }}
          >
            Delete Component
          </button>
        </div>
      )}
    </div>
  ) : (
    // State khi không có component nào được chọn
    <div className="w-72 bg-white border-l border-gray-200 p-4">
      <h2 className="text-lg font-semibold text-gray-800">Settings</h2>
      <p className="text-sm text-gray-500 mt-2">
        Select a component to edit its properties
      </p>
    </div>
  );
};
