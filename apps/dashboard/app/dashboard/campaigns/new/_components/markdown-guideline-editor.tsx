"use client";

import {
  BlockTypeSelect,
  BoldItalicUnderlineToggles,
  CreateLink,
  DiffSourceToggleWrapper,
  InsertImage,
  ListsToggle,
  MDXEditor,
  UndoRedo,
  diffSourcePlugin,
  headingsPlugin,
  imagePlugin,
  linkDialogPlugin,
  linkPlugin,
  listsPlugin,
  markdownShortcutPlugin,
  quotePlugin,
  toolbarPlugin,
} from "@mdxeditor/editor";

type MarkdownGuidelineEditorProps = {
  onChange: (markdown: string) => void;
};

export function MarkdownGuidelineEditor({ onChange }: MarkdownGuidelineEditorProps) {
  return (
    <MDXEditor
      className="guideline-markdown-editor"
      contentEditableClassName="guideline-markdown-surface"
      markdown=""
      onChange={onChange}
      plugins={[
        headingsPlugin({ allowedHeadingLevels: [1, 2, 3] }),
        listsPlugin(),
        quotePlugin(),
        linkPlugin(),
        linkDialogPlugin(),
        imagePlugin({
          disableImageResize: true,
          imageAutocompleteSuggestions: [],
        }),
        markdownShortcutPlugin(),
        diffSourcePlugin({ viewMode: "rich-text" }),
        toolbarPlugin({
          toolbarClassName: "guideline-markdown-toolbar",
          toolbarContents: () => (
            <DiffSourceToggleWrapper options={["rich-text", "source"]}>
              <UndoRedo />
              <BlockTypeSelect />
              <BoldItalicUnderlineToggles />
              <ListsToggle />
              <CreateLink />
              <InsertImage />
            </DiffSourceToggleWrapper>
          ),
        }),
      ]}
    />
  );
}
