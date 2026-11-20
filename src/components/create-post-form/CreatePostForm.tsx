"use client";

import { useRouter } from "next/navigation";
import { useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { Alert } from "@/components/alert/Alert";
import { Button } from "@/components/button/Button";
import { ProgressBar } from "@/components/progress-bar/ProgressBar";
import { RichTextEditor } from "@/components/rich-text-editor/RichTextEditor";
import { SelectField } from "@/components/select-field/SelectField";
import { TextField } from "@/components/text-field/TextField";
import type { UploadSignature } from "@/services/media.service";
import { callApi } from "@/utils/api";
import { uploadToCloudinary } from "@/utils/cloudinary-upload";
import { BLOG_TYPE_OPTIONS, POST_CATEGORIES, UPLOAD_LIMITS } from "@/utils/constants";

const EMPTY = { title: "", content: "", fileType: "", blogType: "", category: "", publishBy: "" };
const FILE_TYPES = [
  { value: "image", label: "Image" },
  { value: "video", label: "Video" },
];
const CATEGORY_OPTIONS = POST_CATEGORIES.map((c) => ({ value: c.slug, label: c.label }));

export function CreatePostForm() {
  const router = useRouter();
  const fileInput = useRef<HTMLInputElement>(null);
  const [values, setValues] = useState(EMPTY);
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "danger"; text: string } | null>(null);

  const set = (key: keyof typeof EMPTY, value: string) => setValues((current) => ({ ...current, [key]: value }));
  const text = (key: keyof typeof EMPTY) => ({
    value: values[key],
    onChange: (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => set(key, event.target.value),
  });

  const pickFile = (event: ChangeEvent<HTMLInputElement>) => {
    const picked = event.target.files?.[0] ?? null;
    setStatus(null);
    if (picked && values.fileType) {
      const limit = values.fileType === "image" ? UPLOAD_LIMITS.imageBytes : UPLOAD_LIMITS.videoBytes;
      if (!picked.type.startsWith(`${values.fileType}/`)) {
        setStatus({ type: "danger", text: `Wrong file selected. Please choose a ${values.fileType} file.` });
        event.target.value = "";
        return setFile(null);
      }
      if (picked.size > limit) {
        setStatus({
          type: "danger",
          text: `File size exceeds the ${Math.round(limit / 1024 / 1024)}MB limit. Please choose a smaller file.`,
        });
        event.target.value = "";
        return setFile(null);
      }
    }
    setFile(picked);
  };

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setStatus(null);

    const missing = !file || !values.title.trim() || !values.content || !values.fileType || !values.blogType || !values.category;
    if (missing) {
      setStatus({ type: "danger", text: "Required field missing." });
      return;
    }
    if (!file.type.startsWith(`${values.fileType}/`)) {
      setStatus({ type: "danger", text: "Wrong file selected for the chosen file type." });
      return;
    }

    setLoading(true);
    setProgress(0);
    try {
      const signature = await callApi<UploadSignature>("/api/uploads/sign", { body: { fileType: values.fileType } });
      if (file.size > signature.maxBytes) throw new Error("File size exceeds the limit. Please choose a smaller file.");
      const imageUrl = await uploadToCloudinary(file, signature, setProgress);
      await callApi("/api/posts", { body: { ...values, imageUrl } });

      setValues(EMPTY);
      setFile(null);
      if (fileInput.current) fileInput.current.value = "";
      setStatus({ type: "success", text: "Post created successfully." });
      router.refresh();
    } catch (error) {
      setStatus({ type: "danger", text: (error as Error).message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} noValidate className="rounded-lg bg-white">
      <TextField label="Title:" name="title" maxLength={100} required {...text("title")} />

      <label className="mb-2 inline-block">Content:</label>
      <RichTextEditor value={values.content} onChange={(html) => set("content", html)} />

      <SelectField label="File Type:" name="fileType" placeholder="Select File" options={FILE_TYPES} required {...text("fileType")} />
      <SelectField label="Blog Type:" name="blogType" placeholder="Select" options={BLOG_TYPE_OPTIONS} required {...text("blogType")} />

      <div className="mb-4">
        <label htmlFor="file" className="mb-2 inline-block">
          Upload File:
        </label>
        <input
          ref={fileInput}
          id="file"
          type="file"
          accept={values.fileType ? `${values.fileType}/*` : "image/*,video/*"}
          onChange={pickFile}
          className="w-full rounded-md border border-[#ced4da] bg-white px-3 py-2 file:mr-3 file:rounded file:border-0 file:bg-navy file:px-3 file:py-1 file:text-white"
        />
        <p className="mt-1 text-sm text-[#6c757d]">
          Images up to {UPLOAD_LIMITS.imageBytes / 1024 / 1024}MB, videos up to {UPLOAD_LIMITS.videoBytes / 1024 / 1024}MB.
        </p>
      </div>

      <SelectField label="Category:" name="category" placeholder="Select Category" options={CATEGORY_OPTIONS} required {...text("category")} />
      <TextField label="Published by:" name="publishBy" maxLength={50} {...text("publishBy")} />

      {loading && progress > 0 && (
        <div className="mb-4">
          <ProgressBar value={progress} />
        </div>
      )}
      <Button type="submit" variant="success" loading={loading} loadingText="Please wait..">
        Create Post
      </Button>
      {status && <Alert variant={status.type} className="mt-4">{status.text}</Alert>}
    </form>
  );
}
