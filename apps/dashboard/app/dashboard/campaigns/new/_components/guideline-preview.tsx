import type { TiptapGuidelines } from "./guideline-editor";

type GuidelinePreviewProps = {
  guidelines: TiptapGuidelines;
};

type PreviewNode = {
  attrs?: Record<string, unknown>;
  content?: PreviewNode[];
  marks?: Array<{
    attrs?: Record<string, unknown>;
    type?: string;
  }>;
  text?: string;
  type?: string;
};

export function GuidelinePreview({ guidelines }: GuidelinePreviewProps) {
  const nodes = guidelines.content.content as PreviewNode[];

  if (nodes.length === 0) {
    return <p className="phone-preview-empty">아직 작성된 가이드가 없어요.</p>;
  }

  return <div className="phone-guideline-preview">{nodes.map(renderNode)}</div>;
}

function renderNode(node: PreviewNode, index: number): React.ReactNode {
  if (node.type === "heading") {
    return <h3 key={index}>{renderInlineContent(node.content)}</h3>;
  }

  if (node.type === "paragraph") {
    return <p key={index}>{renderInlineContent(node.content)}</p>;
  }

  if (node.type === "bulletList") {
    return (
      <ul key={index}>
        {(node.content ?? []).map((item, itemIndex) => (
          <li key={itemIndex}>{renderInlineContent(item.content)}</li>
        ))}
      </ul>
    );
  }

  if (node.type === "orderedList") {
    return (
      <ol key={index}>
        {(node.content ?? []).map((item, itemIndex) => (
          <li key={itemIndex}>{renderInlineContent(item.content)}</li>
        ))}
      </ol>
    );
  }

  if (node.type === "blockquote") {
    return <blockquote key={index}>{renderBlockContent(node.content)}</blockquote>;
  }

  if (node.type === "image") {
    const src = typeof node.attrs?.src === "string" ? node.attrs.src : "";
    const alt = typeof node.attrs?.alt === "string" ? node.attrs.alt : "가이드 이미지";

    return src.length > 0 ? <img alt={alt} key={index} src={src} /> : null;
  }

  return null;
}

function renderInlineContent(nodes?: PreviewNode[]): React.ReactNode {
  return (nodes ?? []).map((node, index) => {
    if (node.type === "text") {
      return renderTextNode(node, index);
    }

    if (node.type === "hardBreak") {
      return <br key={index} />;
    }

    return <span key={index}>{renderInlineContent(node.content)}</span>;
  });
}

function renderTextNode(node: PreviewNode, index: number) {
  const marks = node.marks ?? [];
  const href = marks.find((mark) => mark.type === "link")?.attrs?.href;
  const text = node.text ?? "";
  let content: React.ReactNode = text;

  if (marks.some((mark) => mark.type === "bold")) {
    content = <strong>{content}</strong>;
  }

  if (marks.some((mark) => mark.type === "italic")) {
    content = <em>{content}</em>;
  }

  if (marks.some((mark) => mark.type === "strike")) {
    content = <s>{content}</s>;
  }

  if (typeof href === "string" && href.length > 0) {
    return (
      <a href={href} key={index} rel="noopener noreferrer" target="_blank">
        {content}
      </a>
    );
  }

  return <span key={index}>{content}</span>;
}

function renderBlockContent(nodes?: PreviewNode[]): React.ReactNode {
  return (nodes ?? []).map((node, index) => {
    if (node.type === "paragraph") {
      return <p key={index}>{renderInlineContent(node.content)}</p>;
    }

    if (node.type === "heading") {
      return <h3 key={index}>{renderInlineContent(node.content)}</h3>;
    }

    return <span key={index}>{renderInlineContent(node.content)}</span>;
  });
}
