"use client";

import { Editor as CraftEditor, Frame, Element } from "@craftjs/core";
import { Text, Button, Container } from "./user";
import { Toolbox } from "./Toolbox";
import { SettingsPanel } from "./SettingsPanel";
import { Topbar } from "./Topbar";
import { TextSettings, ButtonSettings, ContainerSettings } from "./settings";

export default function Editor() {
  return (
    <CraftEditor
      resolver={{
        Text,
        Button,
        Container,
        TextSettings,
        ButtonSettings,
        ContainerSettings,
      }}
      enabled={true}
    >
      <div className="flex flex-col h-screen bg-gray-50">
        <Topbar />
        <div className="flex flex-1 overflow-hidden">
          <Toolbox />
          <div className="flex-1 overflow-auto p-8 bg-gray-100">
            <Frame>
              <Element
                canvas
                is={Container}
                backgroundColor="#ffffff"
                padding="40px"
                id="ROOT"
              >
                <Element
                  canvas
                  is={Container}
                  backgroundColor="#f3f4f6"
                  padding="20px"
                >
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
          <SettingsPanel />
        </div>
      </div>
    </CraftEditor>
  );
}
