"use client";
// "use client": Directive của Next.js, báo rằng file này chỉ chạy ở client-side
// Craft.js cần DOM browser nên bắt buộc phải dùng directive này

import { Editor as CraftEditor, Frame, Element } from "@craftjs/core";
// CraftEditor: Component chính cung cấp context cho toàn bộ editor
// Frame: Vùng canvas nơi ngườ dùng có thể kéo thả và sắp xếp components
// Element: Wrapper để định nghĩa các node trong editor tree

import { Text, Button, Container } from "./user";
// Các user components: Các component UI có thể kéo thả vào editor

import { Toolbox } from "./Toolbox";
// Toolbox: Panel bên trái chứa các component có thể kéo thả

import { SettingsPanel } from "./SettingsPanel";
// SettingsPanel: Panel bên phải để chỉnh sửa properties của component được chọn

import { Topbar } from "./Topbar";
// Topbar: Thanh toolbar phía trên với các nút Preview, Serialize, Clear

import { TextSettings, ButtonSettings, ContainerSettings } from "./settings";
// Các settings components: Form chỉnh sửa properties cho từng loại component

export default function Editor() {
  return (
    // CraftEditor: Provider component, bọc toàn bộ editor
    // resolver: Map tên component -> actual component, Craft.js dùng để resolve nodes
    // enabled: Bật/tắt chế độ edit (true = có thể kéo thả, false = chỉ xem)
    <CraftEditor
      resolver={{
        Text, // Component hiển thị văn bản
        Button, // Component nút bấm
        Container, // Component chứa (layout)
        TextSettings, // Form settings cho Text
        ButtonSettings, // Form settings cho Button
        ContainerSettings, // Form settings cho Container
      }}
      enabled={true}
    >
      {/* Layout chính: flex column, chiếm full viewport height, nền xám nhạt */}
      <div className="flex flex-col h-screen bg-gray-50">
        {/* Topbar: Toolbar phía trên */}
        <Topbar />

        {/* Content area: flex-1 để chiếm phần còn lại, overflow-hidden để scroll riêng */}
        <div className="flex flex-1 overflow-hidden">
          {/* Toolbox: Panel bên trái, w-64 = 16rem = 256px */}
          <Toolbox />

          {/* Canvas area: flex-1 để chiếm hết không gian còn lại */}
          <div className="flex-1 overflow-auto p-8 bg-gray-100">
            {/* Frame: Vùng canvas chính của Craft.js - nơi render các components */}
            <Frame>
              {/* Element: Wrapper cho một node trong editor tree
                  canvas: Prop đánh dấu đây là container có thể chứa các node khác
                  is: Chỉ định component type
                  id: "ROOT" là node gốc, bắt buộc phải có
              */}
              <Element
                canvas
                is={Container}
                backgroundColor="#ffffff"
                padding="40px"
                id="ROOT"
              >
                {/* Container lồng nhau: Tạo layout phân cấp */}
                <Element
                  canvas
                  is={Container}
                  backgroundColor="#f3f4f6"
                  padding="20px"
                >
                  {/* Text components: Hiển thị văn bản với các styles */}
                  <Text
                    text="Welcome to Craft.js!"
                    fontSize="24px"
                    textAlign="center"
                    color="#1f2937"
                  />
                  <Text
                    text="Drag components from the toolbox to build your page."
                    fontSize="16px"
                    textAlign="center"
                    color="#6b7280"
                  />
                </Element>

                {/* Button component */}
                <Button
                  text="Get Started"
                  backgroundColor="#3b82f6"
                  color="#ffffff"
                  borderRadius="8px"
                  padding="12px 24px"
                />
              </Element>
            </Frame>
          </div>

          {/* SettingsPanel: Panel bên phải */}
          <SettingsPanel />
        </div>
      </div>
    </CraftEditor>
  );
}
