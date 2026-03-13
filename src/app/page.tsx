/**
 * File: page.tsx
 * Đây là entry point của ứng dụng Next.js
 * Chức năng: Render trang chính và mount Editor component
 */

import Editor from "@/components/Editor";

export default function Home() {
  return (
    // <main>: Thẻ semantic HTML5, là container chính của trang
    // min-h-screen: Tailwind CSS utility - chiều cao tối thiểu = 100% viewport height
    <main className="min-h-screen">
      {/* Editor: Component chính chứa toàn bộ logic Craft.js editor */}
      <Editor />
    </main>
  );
}
