"use client";

import Image from "@tiptap/extension-image";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
  Bold,
  Heading2,
  ImageIcon,
  Italic,
  Link2,
  List,
  ListOrdered,
  Pilcrow,
  Quote,
  Redo2,
  Undo2,
  Unlink,
} from "lucide-react";
import { useCallback, useEffect, useState, type ReactNode } from "react";

type TiptapTextNode = {
  text: string;
  type: "text";
};

export type TiptapNode = {
  attrs?: Record<string, number | string>;
  content?: Array<TiptapNode | TiptapTextNode>;
  text?: string;
  type: string;
};

export type TiptapGuidelines = {
  content: {
    content: TiptapNode[];
    type: "doc";
  };
  editor: "tiptap";
  version: 1;
};

type GuidelineEditorProps = {
  onChange?: (guidelines: TiptapGuidelines) => void;
};

const emptyGuidelines: TiptapGuidelines = {
  editor: "tiptap",
  version: 1,
  content: {
    type: "doc",
    content: [],
  },
};

export function GuidelineEditor({ onChange }: GuidelineEditorProps) {
  const [guidelines, setGuidelines] = useState<TiptapGuidelines>(emptyGuidelines);
  const commitGuidelines = useCallback(
    (nextGuidelines: TiptapGuidelines) => {
      setGuidelines(nextGuidelines);
      onChange?.(nextGuidelines);
    },
    [onChange],
  );
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        link: {
          HTMLAttributes: {
            rel: "noopener noreferrer",
            target: "_blank",
          },
          openOnClick: false,
        },
      }),
      Image.configure({
        allowBase64: false,
      }),
    ],
    editorProps: {
      attributes: {
        "aria-label": "미션 가이드",
        class: "guideline-tiptap-surface",
      },
    },
    onUpdate: ({ editor: currentEditor }) => {
      commitGuidelines(toTiptapGuidelines(currentEditor.getJSON() as TiptapGuidelines["content"]));
    },
  });
  const syncFromEditor = useCallback(() => {
    if (editor == null) {
      return;
    }

    commitGuidelines(toTiptapGuidelines(editor.getJSON() as TiptapGuidelines["content"]));
  }, [commitGuidelines, editor]);

  useEffect(() => {
    if (editor == null) {
      return;
    }

    syncFromEditor();
  }, [syncFromEditor]);

  const setLink = () => {
    if (editor == null) {
      return;
    }

    const previousUrl = editor.getAttributes("link").href as string | undefined;
    const url = window.prompt("링크 URL", previousUrl ?? "");

    if (url == null) {
      return;
    }

    if (url.trim().length === 0) {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }

    editor.chain().focus().extendMarkRange("link").setLink({ href: url.trim() }).run();
  };

  const addImage = () => {
    if (editor == null) {
      return;
    }

    const src = window.prompt("이미지 URL");

    if (src == null || src.trim().length === 0) {
      return;
    }

    editor.chain().focus().setImage({ src: src.trim() }).run();
  };

  return (
    <section className="guideline-editor full-row">
      <div className="guideline-editor-header">
        <div>
          <span>미션 가이드</span>
        </div>
        <div className="guideline-editor-tools" aria-label="가이드 편집 도구">
          <ToolbarButton
            active={editor?.isActive("heading", { level: 2 })}
            label="제목"
            onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
          >
            <Heading2 aria-hidden size={16} />
          </ToolbarButton>
          <ToolbarButton
            active={editor?.isActive("paragraph")}
            label="문단"
            onClick={() => editor?.chain().focus().setParagraph().run()}
          >
            <Pilcrow aria-hidden size={16} />
          </ToolbarButton>
          <ToolbarButton
            active={editor?.isActive("bold")}
            label="굵게"
            onClick={() => editor?.chain().focus().toggleBold().run()}
          >
            <Bold aria-hidden size={16} />
          </ToolbarButton>
          <ToolbarButton
            active={editor?.isActive("italic")}
            label="기울임"
            onClick={() => editor?.chain().focus().toggleItalic().run()}
          >
            <Italic aria-hidden size={16} />
          </ToolbarButton>
          <ToolbarButton
            active={editor?.isActive("bulletList")}
            label="글머리 목록"
            onClick={() => editor?.chain().focus().toggleBulletList().run()}
          >
            <List aria-hidden size={16} />
          </ToolbarButton>
          <ToolbarButton
            active={editor?.isActive("orderedList")}
            label="번호 목록"
            onClick={() => editor?.chain().focus().toggleOrderedList().run()}
          >
            <ListOrdered aria-hidden size={16} />
          </ToolbarButton>
          <ToolbarButton
            active={editor?.isActive("blockquote")}
            label="인용"
            onClick={() => editor?.chain().focus().toggleBlockquote().run()}
          >
            <Quote aria-hidden size={16} />
          </ToolbarButton>
          <ToolbarButton active={editor?.isActive("link")} label="링크" onClick={setLink}>
            <Link2 aria-hidden size={16} />
          </ToolbarButton>
          <ToolbarButton
            disabled={!editor?.isActive("link")}
            label="링크 해제"
            onClick={() => editor?.chain().focus().unsetLink().run()}
          >
            <Unlink aria-hidden size={16} />
          </ToolbarButton>
          <ToolbarButton label="이미지 URL" onClick={addImage}>
            <ImageIcon aria-hidden size={16} />
          </ToolbarButton>
          <ToolbarButton
            disabled={!editor?.can().undo()}
            label="되돌리기"
            onClick={() => editor?.chain().focus().undo().run()}
          >
            <Undo2 aria-hidden size={16} />
          </ToolbarButton>
          <ToolbarButton
            disabled={!editor?.can().redo()}
            label="다시 실행"
            onClick={() => editor?.chain().focus().redo().run()}
          >
            <Redo2 aria-hidden size={16} />
          </ToolbarButton>
        </div>
      </div>

      <div onInput={syncFromEditor} onKeyUp={syncFromEditor} onMouseUp={syncFromEditor}>
        <EditorContent editor={editor} />
      </div>
      <input name="guidelines" type="hidden" value={JSON.stringify(guidelines)} />
    </section>
  );
}

function ToolbarButton({
  active,
  children,
  disabled,
  label,
  onClick,
}: {
  active?: boolean;
  children: ReactNode;
  disabled?: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      aria-label={label}
      className={active ? "is-active" : undefined}
      disabled={disabled}
      onClick={onClick}
      title={label}
      type="button"
    >
      {children}
    </button>
  );
}

function toTiptapGuidelines(content: TiptapGuidelines["content"]): TiptapGuidelines {
  return {
    editor: "tiptap",
    version: 1,
    content: {
      type: "doc",
      content: content.content ?? [],
    },
  };
}
