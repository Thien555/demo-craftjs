"use client";

import { useNode } from "@craftjs/core";
import { ReactNode } from "react";
import { ContainerSettings } from "../settings";

interface ContainerProps {
  backgroundColor: string;
  padding: string;
  className?: string;
  children?: ReactNode;
}

export const Container = ({
  backgroundColor,
  padding,
  className,
  children,
}: ContainerProps) => {
  const {
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
        minHeight: "100px",
      }}
      className={`w-full border-2 border-dashed border-gray-300 ${
        selected ? "ring-2 ring-blue-500 border-blue-500" : ""
      } ${className || ""}`}
    >
      {children}
    </div>
  );
};

Container.craft = {
  displayName: "Container",
  props: {
    backgroundColor: "#f3f4f6",
    padding: "20px",
  },
  rules: {
    canDrag: () => true,
    canDrop: () => true,
  },
  related: {
    settings: ContainerSettings,
  },
};
