"use client";

import { useEditor } from "@craftjs/core";
import { useState } from "react";
import { Button, Modal, Input, Space, Typography } from "antd";
import {
  CopyOutlined,
  EyeOutlined,
  EditOutlined,
  ClearOutlined,
  CodeOutlined,
} from "@ant-design/icons";

const { TextArea } = Input;
const { Text } = Typography;

export const Topbar = () => {
  /**
   * useEditor:
   * - actions: Các hành động thay đổi state (setOptions, delete, add...)
   * - query: Query methods (serialize, getNodes...)
   * - enabled: Trạng thái editor (true = edit mode, false = preview mode)
   */
  const { actions, query, enabled } = useEditor((state) => ({
    enabled: state.options.enabled,
  }));

  // State cho serialize dialog
  const [modalOpen, setModalOpen] = useState(false);
  const [jsonData, setJsonData] = useState("");

  const handleSerialize = () => {
    setJsonData(JSON.stringify(query.serialize(), null, 2));
    setModalOpen(true);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonData);
  };

  const handleClear = () => {
    Modal.confirm({
      title: "Clear Canvas",
      content: "Are you sure you want to clear the canvas?",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: () => {
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
      },
    });
  };

  return (
    <div className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-4">
      {/* Logo/Title */}
      <h1 className="text-xl font-bold text-gray-800">Craft.js Builder</h1>

      {/* Toolbar buttons */}
      <Space>
        {/* 
          Preview/Edit toggle button:
          - enabled = true: Đang ở edit mode, hiển thị "Preview"
          - enabled = false: Đang ở preview mode, hiển thị "Edit"
          - actions.setOptions: Thay đổi editor options
        */}
        <Button
          type={enabled ? "primary" : "default"}
          icon={enabled ? <EyeOutlined /> : <EditOutlined />}
          onClick={() =>
            actions.setOptions((options) => (options.enabled = !enabled))
          }
        >
          {enabled ? "Preview" : "Edit"}
        </Button>

        {/* 
          Serialize button:
          - query.serialize(): Chuyển toàn bộ editor tree thành JSON
          - Dùng để lưu layout vào database hoặc chia sẻ
        */}
        <Button
          type="primary"
          icon={<CodeOutlined />}
          onClick={handleSerialize}
        >
          Serialize
        </Button>

        {/* Clear button: Xóa tất cả components khỏi canvas */}
        <Button icon={<ClearOutlined />} onClick={handleClear}>
          Clear
        </Button>
      </Space>

      {/* Serialize Modal: Hiển thị JSON data */}
      <Modal
        title="Serialized JSON"
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        width={800}
        footer={[
          <Button key="close" onClick={() => setModalOpen(false)}>
            Close
          </Button>,
          <Button
            key="copy"
            type="primary"
            icon={<CopyOutlined />}
            onClick={handleCopy}
          >
            Copy
          </Button>,
        ]}
      >
        <TextArea
          value={jsonData}
          readOnly
          rows={15}
          className="font-mono text-sm"
        />
      </Modal>
    </div>
  );
};
