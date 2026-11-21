"use client";

import { useEffect, useRef } from "react";
import type Quill from "quill";
import "quill/dist/quill.snow.css";

type RichTextEditorProps = {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
};

const TOOLBAR = [
  [{ header: [1, 2, 3, false] }],
  ["bold", "italic", "underline", "strike"],
  [{ list: "ordered" }, { list: "bullet" }],
  [{ align: [] }],
  ["blockquote", "link"],
  ["clean"],
];

/** Quill rich-text editor (the same editor family the original site used). */
export function RichTextEditor({ value, onChange, placeholder = "Write the story..." }: RichTextEditorProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const quillRef = useRef<Quill | null>(null);
  const onChangeRef = useRef(onChange);
  const initialRef = useRef(value);

  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  useEffect(() => {
    let cancelled = false;
    const host = hostRef.current;
    if (!host) return;

    (async () => {
      const { default: QuillClass } = await import("quill");
      if (cancelled) return;
      const container = document.createElement("div");
      host.appendChild(container);
      const quill = new QuillClass(container, {
        theme: "snow",
        placeholder,
        modules: { toolbar: TOOLBAR },
      });
      if (initialRef.current) quill.clipboard.dangerouslyPasteHTML(initialRef.current);
      quill.on("text-change", () => {
        const empty = quill.getText().trim().length === 0 && !quill.root.querySelector("img");
        onChangeRef.current(empty ? "" : quill.root.innerHTML);
      });
      quillRef.current = quill;
    })();

    return () => {
      cancelled = true;
      quillRef.current = null;
      host.innerHTML = "";
    };
  }, [placeholder]);

  // Allow the parent to clear the editor after a successful submit.
  useEffect(() => {
    const quill = quillRef.current;
    if (quill && value === "" && quill.getLength() > 1) quill.setText("");
  }, [value]);

  return (
    <div className="mb-4 bg-white [&_.ql-container]:min-h-[180px] [&_.ql-editor]:min-h-[180px] [&_.ql-editor]:text-base">
      <div ref={hostRef} />
    </div>
  );
}
