import type { TiptapGuidelines, TiptapNode } from "./guideline-editor";

type Mark = {
  attrs?: Record<string, string>;
  type: "bold" | "code" | "italic" | "link";
};

type TextNode = {
  marks?: Mark[];
  text: string;
  type: "text";
};

const EMPTY_GUIDELINES: TiptapGuidelines = {
  content: { content: [], type: "doc" },
  editor: "tiptap",
  version: 1,
};

export function markdownToTiptapGuidelines(markdown: string): TiptapGuidelines {
  const lines = markdown.replace(/\r\n?/g, "\n").split("\n");
  const content: TiptapNode[] = [];
  let index = 0;

  while (index < lines.length) {
    const line = lines[index] ?? "";

    if (line.trim().length === 0) {
      index += 1;
      continue;
    }

    const heading = /^(#{1,3})\s+(.+)$/.exec(line);
    if (heading != null) {
      content.push({
        attrs: { level: heading[1].length },
        content: parseInline(heading[2]),
        type: "heading",
      });
      index += 1;
      continue;
    }

    const image = /^!\[([^\]]*)\]\(([^\s)]+)(?:\s+"[^"]*")?\)$/.exec(line.trim());
    if (image != null && isSafeUrl(image[2])) {
      content.push({ attrs: { alt: image[1], src: image[2] }, type: "image" });
      index += 1;
      continue;
    }

    if (/^>\s?/.test(line)) {
      const quotedLines: string[] = [];
      while (index < lines.length && /^>\s?/.test(lines[index] ?? "")) {
        quotedLines.push((lines[index] ?? "").replace(/^>\s?/, ""));
        index += 1;
      }
      content.push({
        content: quotedLines
          .filter((quotedLine) => quotedLine.trim().length > 0)
          .map((quotedLine) => ({ content: parseInline(quotedLine), type: "paragraph" })),
        type: "blockquote",
      });
      continue;
    }

    const listMatch = /^([-*+]|\d+\.)\s+(.+)$/.exec(line);
    if (listMatch != null) {
      const ordered = /\d+\./.test(listMatch[1]);
      const itemPattern = ordered ? /^\d+\.\s+(.+)$/ : /^[-*+]\s+(.+)$/;
      const items: TiptapNode[] = [];

      while (index < lines.length) {
        const item = itemPattern.exec(lines[index] ?? "");
        if (item == null) {
          break;
        }
        items.push({
          content: [{ content: parseInline(item[1]), type: "paragraph" }],
          type: "listItem",
        });
        index += 1;
      }

      content.push({ content: items, type: ordered ? "orderedList" : "bulletList" });
      continue;
    }

    const paragraphLines = [line];
    index += 1;
    while (
      index < lines.length &&
      (lines[index] ?? "").trim().length > 0 &&
      !isBlockStart(lines[index] ?? "")
    ) {
      paragraphLines.push(lines[index] ?? "");
      index += 1;
    }
    content.push({ content: parseInline(paragraphLines.join(" ")), type: "paragraph" });
  }

  return content.length === 0
    ? EMPTY_GUIDELINES
    : { content: { content, type: "doc" }, editor: "tiptap", version: 1 };
}

function isBlockStart(line: string) {
  return /^(#{1,3})\s+|^>\s?|^([-*+]|\d+\.)\s+|^!\[[^\]]*\]\([^\s)]+/.test(line);
}

function parseInline(value: string, inheritedMarks: Mark[] = []): TextNode[] {
  const nodes: TextNode[] = [];
  const pattern = /\[([^\]]+)\]\(([^\s)]+)\)|(\*\*|__)(.+?)\3|(\*|_)(.+?)\5|`([^`]+)`/g;
  let cursor = 0;
  let match: RegExpExecArray | null;

  const appendText = (text: string, marks = inheritedMarks) => {
    if (text.length > 0) {
      nodes.push({ ...(marks.length > 0 ? { marks } : {}), text, type: "text" });
    }
  };

  while ((match = pattern.exec(value)) != null) {
    appendText(value.slice(cursor, match.index));

    if (match[1] != null && match[2] != null && isSafeUrl(match[2])) {
      nodes.push(
        ...parseInline(match[1], [...inheritedMarks, { attrs: { href: match[2] }, type: "link" }]),
      );
    } else if (match[4] != null) {
      nodes.push(...parseInline(match[4], [...inheritedMarks, { type: "bold" }]));
    } else if (match[6] != null) {
      nodes.push(...parseInline(match[6], [...inheritedMarks, { type: "italic" }]));
    } else if (match[7] != null) {
      nodes.push(...parseInline(match[7], [...inheritedMarks, { type: "code" }]));
    } else {
      appendText(match[0]);
    }

    cursor = pattern.lastIndex;
  }

  appendText(value.slice(cursor));
  return nodes;
}

function isSafeUrl(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:";
  } catch {
    return false;
  }
}
