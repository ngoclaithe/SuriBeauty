"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import ImageExt from "@tiptap/extension-image";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import { TextStyle } from "@tiptap/extension-text-style";
import FontFamily from "@tiptap/extension-font-family";
import { Extension } from "@tiptap/react";
import { useRef } from "react";
import { uploadFiles } from "@/lib/api";
import { useAuthStore } from "@/lib/auth-store";
import {
  Bold, Italic, Underline as UnderlineIcon, Strikethrough,
  Heading1, Heading2, Heading3, List, ListOrdered,
  AlignLeft, AlignCenter, AlignRight, ImagePlus, Undo, Redo, Quote, Minus, Code, Type,
} from "lucide-react";

/* ── Custom FontSize extension ── */
const FontSize = Extension.create({
  name: "fontSize",
  addOptions() { return { types: ["textStyle"] }; },
  addGlobalAttributes() {
    return [{
      types: this.options.types,
      attributes: {
        fontSize: {
          default: null,
          parseHTML: (el) => el.style.fontSize || null,
          renderHTML: (attrs) => {
            if (!attrs.fontSize) return {};
            return { style: `font-size: ${attrs.fontSize}` };
          },
        },
      },
    }];
  },
  addCommands() {
    return {
      setFontSize: (size: string) => ({ chain }: any) => chain().setMark("textStyle", { fontSize: size }).run(),
      unsetFontSize: () => ({ chain }: any) => chain().setMark("textStyle", { fontSize: null }).removeEmptyTextStyle().run(),
    };
  },
});

interface Props {
  content: string;
  onChange: (html: string) => void;
}

const FONTS = [
  { label: "Mặc định", value: "" },
  { label: "Inter", value: "Inter" },
  { label: "Roboto", value: "Roboto" },
  { label: "Arial", value: "Arial" },
  { label: "Georgia", value: "Georgia" },
  { label: "Times New Roman", value: "Times New Roman" },
  { label: "Courier New", value: "Courier New" },
  { label: "Montserrat", value: "Montserrat" },
  { label: "Playfair Display", value: "Playfair Display" },
];

const SIZES = [
  { label: "Nhỏ", value: "12px" },
  { label: "Bình thường", value: "14px" },
  { label: "16px", value: "16px" },
  { label: "18px", value: "18px" },
  { label: "20px", value: "20px" },
  { label: "24px", value: "24px" },
  { label: "28px", value: "28px" },
  { label: "32px", value: "32px" },
  { label: "36px", value: "36px" },
  { label: "48px", value: "48px" },
];

export default function RichTextEditor({ content, onChange }: Props) {
  const token = useAuthStore((s) => s.token) || "";
  const fileRef = useRef<HTMLInputElement>(null);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({ heading: { levels: [1, 2, 3] } }),
      ImageExt.configure({ inline: false, allowBase64: true }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Underline,
      TextStyle,
      FontFamily.configure({ types: ["textStyle"] }),
      FontSize,
    ],
    content,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    editorProps: {
      attributes: {
        class: "prose prose-sm max-w-none focus:outline-none min-h-[300px] px-4 py-3",
      },
    },
  });

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length || !editor) return;
    try {
      const results = await uploadFiles(token, files);
      const apiBase = process.env.NEXT_PUBLIC_API_URL?.replace("/api", "") || "http://localhost:3031";
      results.forEach((r) => {
        const url = r.url.startsWith("http") ? r.url : `${apiBase}${r.url}`;
        editor.chain().focus().setImage({ src: url }).run();
      });
    } catch (err: any) {
      alert("Upload thất bại: " + err.message);
    }
    if (fileRef.current) fileRef.current.value = "";
  };

  if (!editor) return null;

  const ToolBtn = ({ onClick, active, children, title }: { onClick: () => void; active?: boolean; children: React.ReactNode; title: string }) => (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className={`w-8 h-8 flex items-center justify-center rounded-lg transition-colors ${active ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted hover:text-foreground"
        }`}
    >
      {children}
    </button>
  );

  return (
    <div className="border border-input rounded-xl overflow-hidden bg-background">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-0.5 p-2 border-b border-border/50 bg-muted/30">
        {/* Font family */}
        <select
          value={editor.getAttributes("textStyle").fontFamily || ""}
          onChange={(e) => {
            if (e.target.value) {
              editor.chain().focus().setFontFamily(e.target.value).run();
            } else {
              editor.chain().focus().unsetFontFamily().run();
            }
          }}
          className="h-8 text-xs rounded-lg border border-border/50 bg-background px-2 text-muted-foreground max-w-[120px]"
          title="Font chữ"
        >
          {FONTS.map((f) => (
            <option key={f.value} value={f.value} style={{ fontFamily: f.value || "inherit" }}>
              {f.label}
            </option>
          ))}
        </select>

        {/* Font size */}
        <select
          value={editor.getAttributes("textStyle").fontSize || ""}
          onChange={(e) => {
            if (e.target.value) {
              (editor.commands as any).setFontSize(e.target.value);
            } else {
              (editor.commands as any).unsetFontSize();
            }
          }}
          className="h-8 text-xs rounded-lg border border-border/50 bg-background px-2 text-muted-foreground w-[80px]"
          title="Cỡ chữ"
        >
          <option value="">Cỡ chữ</option>
          {SIZES.map((s) => (
            <option key={s.value} value={s.value}>{s.label}</option>
          ))}
        </select>

        <div className="w-px h-6 bg-border/50 mx-1" />

        {/* Text formatting */}
        <ToolBtn onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive("bold")} title="Bold (Ctrl+B)">
          <Bold className="h-4 w-4" />
        </ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive("italic")} title="Italic (Ctrl+I)">
          <Italic className="h-4 w-4" />
        </ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().toggleUnderline().run()} active={editor.isActive("underline")} title="Underline (Ctrl+U)">
          <UnderlineIcon className="h-4 w-4" />
        </ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().toggleStrike().run()} active={editor.isActive("strike")} title="Strikethrough">
          <Strikethrough className="h-4 w-4" />
        </ToolBtn>

        <div className="w-px h-6 bg-border/50 mx-1" />

        {/* Headings */}
        <ToolBtn onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} active={editor.isActive("heading", { level: 1 })} title="Heading 1">
          <Heading1 className="h-4 w-4" />
        </ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} active={editor.isActive("heading", { level: 2 })} title="Heading 2">
          <Heading2 className="h-4 w-4" />
        </ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} active={editor.isActive("heading", { level: 3 })} title="Heading 3">
          <Heading3 className="h-4 w-4" />
        </ToolBtn>

        <div className="w-px h-6 bg-border/50 mx-1" />

        {/* Lists */}
        <ToolBtn onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive("bulletList")} title="Bullet list">
          <List className="h-4 w-4" />
        </ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive("orderedList")} title="Ordered list">
          <ListOrdered className="h-4 w-4" />
        </ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive("blockquote")} title="Quote">
          <Quote className="h-4 w-4" />
        </ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().toggleCodeBlock().run()} active={editor.isActive("codeBlock")} title="Code block">
          <Code className="h-4 w-4" />
        </ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().setHorizontalRule().run()} title="Divider">
          <Minus className="h-4 w-4" />
        </ToolBtn>

        <div className="w-px h-6 bg-border/50 mx-1" />

        {/* Alignment */}
        <ToolBtn onClick={() => editor.chain().focus().setTextAlign("left").run()} active={editor.isActive({ textAlign: "left" })} title="Căn trái">
          <AlignLeft className="h-4 w-4" />
        </ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().setTextAlign("center").run()} active={editor.isActive({ textAlign: "center" })} title="Căn giữa">
          <AlignCenter className="h-4 w-4" />
        </ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().setTextAlign("right").run()} active={editor.isActive({ textAlign: "right" })} title="Căn phải">
          <AlignRight className="h-4 w-4" />
        </ToolBtn>

        <div className="w-px h-6 bg-border/50 mx-1" />

        {/* Image */}
        <ToolBtn onClick={() => fileRef.current?.click()} title="Chèn ảnh">
          <ImagePlus className="h-4 w-4" />
        </ToolBtn>

        <div className="w-px h-6 bg-border/50 mx-1" />

        {/* Undo/Redo */}
        <ToolBtn onClick={() => editor.chain().focus().undo().run()} title="Undo (Ctrl+Z)">
          <Undo className="h-4 w-4" />
        </ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().redo().run()} title="Redo (Ctrl+Y)">
          <Redo className="h-4 w-4" />
        </ToolBtn>
      </div>

      {/* Editor content */}
      <EditorContent editor={editor} />

      <input ref={fileRef} type="file" accept="image/*" multiple onChange={handleImageUpload} className="hidden" />

      {/* Styles for the editor content */}
      <style jsx global>{`
        .ProseMirror {
          min-height: 300px;
          padding: 16px;
          outline: none;
        }
        .ProseMirror h1 { font-size: 1.75rem; font-weight: 700; margin: 1rem 0 0.5rem; line-height: 1.3; }
        .ProseMirror h2 { font-size: 1.35rem; font-weight: 600; margin: 0.8rem 0 0.4rem; line-height: 1.3; }
        .ProseMirror h3 { font-size: 1.15rem; font-weight: 600; margin: 0.6rem 0 0.3rem; line-height: 1.3; }
        .ProseMirror p { margin: 0.4rem 0; line-height: 1.7; }
        .ProseMirror ul, .ProseMirror ol { padding-left: 1.5rem; margin: 0.5rem 0; }
        .ProseMirror li { margin: 0.2rem 0; }
        .ProseMirror ul { list-style-type: disc; }
        .ProseMirror ol { list-style-type: decimal; }
        .ProseMirror blockquote { border-left: 3px solid hsl(var(--primary)); padding-left: 1rem; margin: 0.5rem 0; color: hsl(var(--muted-foreground)); font-style: italic; }
        .ProseMirror img { max-width: 100%; height: auto; border-radius: 12px; margin: 1rem 0; }
        .ProseMirror pre { background: hsl(var(--muted)); padding: 12px; border-radius: 8px; overflow-x: auto; margin: 0.5rem 0; font-size: 0.875rem; }
        .ProseMirror code { background: hsl(var(--muted)); padding: 2px 4px; border-radius: 4px; font-size: 0.875rem; }
        .ProseMirror hr { border: none; border-top: 1px solid hsl(var(--border)); margin: 1rem 0; }
        .ProseMirror strong { font-weight: 700; }
        .ProseMirror em { font-style: italic; }
        .ProseMirror u { text-decoration: underline; }
        .ProseMirror s { text-decoration: line-through; }
        .ProseMirror p.is-editor-empty:first-child::before {
          content: "Bắt đầu viết nội dung bài viết...";
          color: hsl(var(--muted-foreground));
          float: left;
          pointer-events: none;
          height: 0;
          opacity: 0.5;
        }
      `}</style>
    </div>
  );
}
