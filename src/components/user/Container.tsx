"use client";

import { useNode } from "@craftjs/core";
import { ReactNode } from "react";
import { ContainerSettings } from "../settings";

// Interface định nghĩa props cho Container component
interface ContainerProps {
  backgroundColor: string; // Màu nền container
  padding: string; // Padding bên trong
  className?: string; // Classname bổ sung (optional)
  children?: ReactNode; // Các component con (nested nodes)
}

export const Container = ({
  backgroundColor,
  padding,
  className,
  children,
}: ContainerProps) => {
  const {
    /**
     * Container cần cả connect và drag:
     * - connect: Kết nối element với editor (bắt buộc)
     * - drag: Cho phép kéo cả container (để reorder trong tree)
     *
     * Kết hợp: connect(drag(ref)) -> Element vừa connect vừa draggable
     */
    connectors: { connect, drag },
    selected,
  } = useNode((state) => ({
    selected: state.events.selected,
  }));

  return (
    <div
      ref={(ref) => {
        if (ref) {
          connect(drag(ref));
        }
      }}
      style={{
        backgroundColor,
        padding,
        minHeight: "100px", // Chiều cao tối thiểu để dễ drop vào
      }}
      // border-dashed: Viền nét đứt để nhận biết là drop zone
      // border-gray-300: Màu viền mặc định
      // border-blue-500: Đổi sang viền xanh khi được chọn
      className={`w-full border-2 border-dashed border-gray-300 ${
        selected ? "ring-2 ring-blue-500 border-blue-500" : ""
      } ${className || ""}`}
    >
      {children}
    </div>
  );
};

/**
 * Craft.js configuration cho Container component
 */
Container.craft = {
  displayName: "Container",
  props: {
    backgroundColor: "#f3f4f6", // Màu xám nhạt
    padding: "20px",
  },
  rules: {
    canDrag: () => true,
    canDrop: () => true, // Container là drop zone cho các components khác
  },
  related: {
    settings: ContainerSettings,
  },
};
