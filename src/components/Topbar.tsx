"use client";

import { useEditor } from "@craftjs/core";
import { useState } from "react";

export const Topbar = () => {
  const { actions, query, enabled } = useEditor((state) => ({
    enabled: state.options.enabled,
  }));

  const [dialogOpen, setDialogOpen] = useState(false);
  const [jsonData, setJsonData] = useState("");

  return (
    <div className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-4">
      <h1 className="text-xl font-bold text-gray-800">Craft.js Builder</h1>

      <div className="flex items-center gap-2">
        <button
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            enabled
              ? "bg-green-500 text-white hover:bg-green-600"
              : "bg-gray-500 text-white hover:bg-gray-600"
          }`}
          onClick={() =>
            actions.setOptions((options) => (options.enabled = !enabled))
          }
        >
          {enabled ? "Preview" : "Edit"}
        </button>

        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
          onClick={() => {
            setJsonData(JSON.stringify(query.serialize(), null, 2));
            setDialogOpen(true);
          }}
        >
          Serialize
        </button>

        <button
          className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
          onClick={() => {
            if (confirm("Are you sure you want to clear the canvas?")) {
              // Lấy tất cả nodes trừ ROOT
              const nodes = query.getNodes();
              const nodeIds = Object.keys(nodes).filter((id) => id !== "ROOT");

              // Xóa từng node (theo thứ tự ngược để tránh lỗi)
              nodeIds.reverse().forEach((id) => {
                try {
                  actions.delete(id);
                } catch (e) {
                  // Bỏ qua lỗi nếu không xóa được
                }
              });
            }
          }}
        >
          Clear
        </button>
      </div>

      {dialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-[800px] max-h-[80vh] flex flex-col">
            <h3 className="text-lg font-semibold mb-4">Serialized JSON</h3>
            <textarea
              value={jsonData}
              readOnly
              className="flex-1 min-h-[300px] p-4 bg-gray-50 border border-gray-300 rounded-lg font-mono text-sm resize-none"
            />
            <div className="flex justify-end gap-2 mt-4">
              <button
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                onClick={() => setDialogOpen(false)}
              >
                Close
              </button>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                onClick={() => {
                  navigator.clipboard.writeText(jsonData);
                  alert("Copied to clipboard!");
                }}
              >
                Copy
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
