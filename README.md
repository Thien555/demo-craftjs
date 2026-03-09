# Craft.js + Next.js Demo

Một project demo hoàn chỉnh sử dụng **Craft.js** - framework page builder drag-and-drop, kết hợp với **Next.js** và **Tailwind CSS**.

## 🚀 Demo Features

- ✅ **Drag & Drop** - Kéo thả component từ Toolbox vào canvas
- ✅ **Editable Components** - Click để chọn, double-click để edit text
- ✅ **Settings Panel** - Tùy chỉnh props của component
- ✅ **Preview Mode** - Chuyển đổi giữa edit và preview
- ✅ **Serialize/Deserialize** - Export/import JSON state

## 📁 Project Structure

```
demo-craftjs/
├── src/
│   ├── app/
│   │   ├── globals.css      # Global styles + Tailwind
│   │   ├── layout.tsx       # Root layout
│   │   └── page.tsx         # Home page
│   └── components/
│       ├── Editor.tsx           # Main Craft.js editor
│       ├── Toolbox.tsx          # Component toolbox
│       ├── SettingsPanel.tsx    # Settings sidebar
│       ├── Topbar.tsx           # Toolbar với actions
│       ├── user/                # User components (draggable)
│       │   ├── Text.tsx
│       │   ├── Button.tsx
│       │   └── Container.tsx
│       └── settings/            # Settings panels
│           ├── TextSettings.tsx
│           ├── ButtonSettings.tsx
│           └── ContainerSettings.tsx
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.mjs
```

## 🛠️ Components

### 1. Text Component

Component văn bản có thể edit trực tiếp trên canvas.

**Props:**

- `text` - Nội dung văn bản
- `fontSize` - Kích thước chữ (px)
- `textAlign` - Căn chỉnh (left/center/right/justify)
- `color` - Màu chữ

### 2. Button Component

Component nút bấm.

**Props:**

- `text` - Text hiển thị
- `backgroundColor` - Màu nền
- `color` - Màu chữ
- `borderRadius` - Bo góc
- `padding` - Khoảng cách padding

### 3. Container Component

Component chứa (container) có thể chứa các component khác.

**Props:**

- `backgroundColor` - Màu nền
- `padding` - Khoảng cách padding

## 🎯 Cách sử dụng

### 1. Chạy development server

```bash
npm install
npm run dev
```

Mở [http://localhost:3000](http://localhost:3000) trong browser.

### 2. Sử dụng Editor

| Thao tác              | Mô tả                                          |
| --------------------- | ---------------------------------------------- |
| **Drag**              | Kéo component từ Toolbox sang Canvas           |
| **Click**             | Chọn component để edit props                   |
| **Double-click Text** | Edit text trực tiếp                            |
| **Delete**            | Chọn component → click "Delete" trong Settings |
| **Preview**           | Click "Preview" để xem kết quả                 |
| **Serialize**         | Click "Serialize" để xuất JSON                 |

### 3. Tạo Component mới

Để tạo component mới, tạo file trong `src/components/user/`:

```tsx
// src/components/user/MyComponent.tsx
"use client";

import { useNode } from "@craftjs/core";
import { MyComponentSettings } from "../settings";

interface MyComponentProps {
  title: string;
}

export const MyComponent = ({ title }: MyComponentProps) => {
  const {
    connectors: { connect, drag },
    selected,
  } = useNode((state) => ({
    selected: state.events.selected,
  }));

  return (
    <div
      ref={(ref) => {
        if (ref) connect(drag(ref));
      }}
      className={selected ? "ring-2 ring-blue-500" : ""}
    >
      <h1>{title}</h1>
    </div>
  );
};

MyComponent.craft = {
  displayName: "My Component",
  props: { title: "Hello" },
  rules: { canDrag: () => true },
  related: { settings: MyComponentSettings },
};
```

Sau đó thêm vào `resolver` trong `Editor.tsx`.

## 📦 Dependencies chính

- `@craftjs/core` - Core framework
- `@craftjs/layers` - Layer panel (optional)
- `react-contenteditable` - In-place editing
- `next` - React framework
- `tailwindcss` - CSS utility

## 🔧 Customization

### Thêm style Tailwind

Edit `tailwind.config.ts` để thêm custom colors, fonts, etc.

### Thêm component mới

1. Tạo component trong `src/components/user/`
2. Tạo settings panel trong `src/components/settings/`
3. Register trong `Editor.tsx` resolver
4. Thêm vào `Toolbox.tsx`

## 📄 License

MIT
# demo-craftjs
