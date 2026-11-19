"use client";

import { useEffect, useRef } from "react";

const actions = [
  { command: "bold", label: "B" },
  { command: "italic", label: "I" },
  { command: "underline", label: "U" },
  { command: "insertUnorderedList", label: "• List" },
  { command: "insertOrderedList", label: "1. List" },
];

export function RichTextEditor({ value, onChange }: { value: string; onChange: (html: string) => void }) {
  const editor = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (editor.current && editor.current.innerHTML !== value) {
      editor.current.innerHTML = value;
    }
  }, [value]);

  return (
    <div className="mt-1 mb-4">
      <div className="flex flex-wrap gap-1 rounded-t border border-b-0 border-[#ccc] bg-[#f7f7f7] p-2">
        {actions.map((action) => (
          <button
            key={action.command}
            type="button"
            className="rounded border border-[#ccc] bg-white px-2 py-1 text-sm"
            onMouseDown={(event) => {
              event.preventDefault();
              document.execCommand(action.command);
              onChange(editor.current?.innerHTML || "");
            }}
          >
            {action.label}
          </button>
        ))}
      </div>
      <div
        ref={editor}
        contentEditable
        data-placeholder="Write the story..."
        className="rich-editor min-h-[150px] rounded-b border border-[#ccc] bg-white p-3 text-black outline-none"
        onInput={(event) => onChange(event.currentTarget.innerHTML)}
      />
    </div>
  );
}
