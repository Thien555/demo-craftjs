"use client";

import { useNode } from "@craftjs/core";
import ContentEditable from "react-contenteditable";
import { useState, useCallback } from "react";
import { TextSettings } from "../settings";

// Định nghĩa props cho Text component
interface TextProps {
  text: string;
  fontSize: string;
  textAlign: string;
  color: string;
}

// Component Text cơ bản
export const Text = ({ text, fontSize, textAlign, color }: TextProps) => {
  const {
    connectors: { connect },
    actions: { setProp },
    selected,
  } = useNode((state) => ({
    selected: state.events.selected,
  }));

  const [editable, setEditable] = useState(false);

  const handleChange = useCallback(
    (evt: { target: { value: string } }) => {
      setProp((props: TextProps) => (props.text = evt.target.value), 500);
    },
    [setProp],
  );

  return (
    <div
      ref={(ref) => {
        if (ref) connect(ref);
      }}
      onClick={() => selected && setEditable(true)}
      onBlur={() => setEditable(false)}
      className={`p-2 ${selected ? "ring-2 ring-blue-500" : ""}`}
    >
      <ContentEditable
        disabled={!editable}
        onChange={handleChange}
        html={text}
        tagName="p"
        style={{
          fontSize,
          textAlign: textAlign as "left" | "center" | "right",
          color,
        }}
        className="outline-none"
      />
    </div>
  );
};

// Craft.js configuration cho Text component
Text.craft = {
  displayName: "Text",
  props: {
    text: "Hello World",
    fontSize: "16px",
    textAlign: "left",
    color: "#000000",
  },
  rules: {
    canDrag: () => true,
    canDrop: () => true,
  },
  related: {
    settings: TextSettings,
  },
};
