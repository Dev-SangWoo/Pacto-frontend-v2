"use client";

import dynamic from "next/dynamic";
import { useCallback, useState } from "react";

import { markdownToTiptapGuidelines } from "./guideline-markdown";

type TiptapTextNode = {
  marks?: Array<{
    attrs?: Record<string, string>;
    type: "bold" | "code" | "italic" | "link";
  }>;
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

const MarkdownGuidelineEditor = dynamic(
  () => import("./markdown-guideline-editor").then((module) => module.MarkdownGuidelineEditor),
  {
    loading: () => <div className="guideline-editor-loading">편집기를 불러오는 중입니다.</div>,
    ssr: false,
  },
);

export function GuidelineEditor({ onChange }: GuidelineEditorProps) {
  const [guidelines, setGuidelines] = useState<TiptapGuidelines>(() =>
    markdownToTiptapGuidelines(""),
  );

  const handleChange = useCallback(
    (markdown: string) => {
      const nextGuidelines = markdownToTiptapGuidelines(markdown);
      setGuidelines(nextGuidelines);
      onChange?.(nextGuidelines);
    },
    [onChange],
  );

  return (
    <section className="guideline-editor full-row">
      <div className="guideline-editor-header">
        <div>
          <span>미션 가이드</span>
          <p>Markdown으로 작성합니다. 지원: 제목, 강조, 목록, 인용, 링크, 이미지</p>
        </div>
      </div>
      <MarkdownGuidelineEditor onChange={handleChange} />
      <input name="guidelines" type="hidden" value={JSON.stringify(guidelines)} />
    </section>
  );
}
