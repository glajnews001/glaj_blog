"use client";

import { FormEvent, useState } from "react";
import { BLOG_TYPES, CATEGORIES, FILE_TYPES } from "@/utils/constants";
import { RichTextEditor } from "@/components/rich-text-editor/RichTextEditor";

export function CreatePostView() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [fileType, setFileType] = useState("");
  const [blogType, setBlogType] = useState("");
  const [category, setCategory] = useState("");
  const [publishBy, setPublishBy] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleFile = (next: File | null) => {
    if (next && next.size > 10 * 1024 * 1024) {
      setMessage("File size exceeds the limit. Please choose a smaller file.");
      setFile(null);
      return;
    }
    setMessage("");
    setFile(next);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!file) {
      setMessage("Required field missing");
      return;
    }
    const body = new FormData();
    body.set("title", title);
    body.set("content", content);
    body.set("fileType", fileType);
    body.set("blogType", blogType);
    body.set("category", category);
    body.set("publishBy", publishBy);
    body.set("file", file);

    setLoading(true);
    setProgress(0);
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/api/posts");
    xhr.upload.onprogress = (progressEvent) => {
      if (progressEvent.lengthComputable) setProgress((progressEvent.loaded / progressEvent.total) * 100);
    };
    xhr.onload = () => {
      setLoading(false);
      const data = JSON.parse(xhr.responseText || "{}");
      if (xhr.status >= 200 && xhr.status < 300) {
        setMessage("Post created successfully");
        setTitle("");
        setContent("");
        setFile(null);
        setFileType("");
        setBlogType("");
        setCategory("");
        setPublishBy("");
        return;
      }
      setMessage(data.message || "Could not create the post.");
    };
    xhr.onerror = () => {
      setLoading(false);
      setMessage("Could not create the post.");
    };
    xhr.send(body);
  };

  return (
    <div className="m-4 overflow-y-auto md:m-12">
      <form onSubmit={handleSubmit} className="rounded-lg bg-white p-5 text-black">
        <h2 className="mb-4 text-2xl font-semibold">Create a Post</h2>
        {message ? <p className="mb-4 rounded bg-green-100 p-3 text-green-900">{message}</p> : null}
        <label className="mt-3 block">Title</label>
        <input value={title} maxLength={100} required onChange={(event) => setTitle(event.target.value)} className="mt-1 mb-3 w-full rounded border border-[#ccc] p-2" />
        <label className="block">Content</label>
        <RichTextEditor value={content} onChange={setContent} />
        <label className="block">File Type</label>
        <select required value={fileType} onChange={(event) => setFileType(event.target.value)} className="mt-1 mb-3 w-full rounded border p-2">
          <option value="">Select File</option>
          {FILE_TYPES.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
        <label className="block">Blog Type</label>
        <select required value={blogType} onChange={(event) => setBlogType(event.target.value)} className="mt-1 mb-3 w-full rounded border p-2">
          <option value="">Select</option>
          {BLOG_TYPES.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
        <label className="block">Upload File</label>
        <input type="file" required onChange={(event) => handleFile(event.target.files?.[0] || null)} className="mt-1 mb-3 w-full" />
        <label className="block">Category</label>
        <select required value={category} onChange={(event) => setCategory(event.target.value)} className="mt-1 mb-3 w-full rounded border p-2">
          <option value="">Select Category</option>
          {CATEGORIES.map((item) => (
            <option key={item.key} value={item.key}>
              {item.title}
            </option>
          ))}
        </select>
        <label className="block">published by</label>
        <input value={publishBy} maxLength={50} onChange={(event) => setPublishBy(event.target.value)} className="mt-1 mb-3 w-full rounded border border-[#ccc] p-2" />
        {progress > 0 ? (
          <div className="mb-3 h-6 overflow-hidden rounded bg-gray-200">
            <div className="h-full bg-green-600 text-center text-xs text-white" style={{ width: `${progress}%` }}>
              {progress.toFixed(2)}%
            </div>
          </div>
        ) : null}
        <button disabled={loading} className="rounded bg-[#4caf50] px-4 py-2 text-white hover:bg-[#45a049]">
          {loading ? "Please wait.." : "Create Post"}
        </button>
      </form>
    </div>
  );
}
