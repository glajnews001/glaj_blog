"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { Alert } from "@/components/alert/Alert";
import { Button } from "@/components/button/Button";
import { MediaViewer } from "@/components/media-viewer/MediaViewer";
import { ProgressBar } from "@/components/progress-bar/ProgressBar";
import { RichTextEditor } from "@/components/rich-text-editor/RichTextEditor";
import { SelectField } from "@/components/select-field/SelectField";
import { TextField } from "@/components/text-field/TextField";
import type { PostDetail } from "@/models/post.dto";
import type { UploadSignature } from "@/services/media.service";
import { callApi } from "@/utils/api";
import { uploadToCloudinary } from "@/utils/cloudinary-upload";
import { BLOG_TYPE, BLOG_TYPE_OPTIONS, LEGACY_CATEGORIES, POST_CATEGORIES, UPLOAD_LIMITS } from "@/utils/constants";

type EditPostFormProps = { post: PostDetail };

const FILE_TYPES = [
  { value: "image", label: "Image" },
  { value: "video", label: "Video" },
];

/** Corrects an existing post. The file is only re-uploaded when a new one is chosen. */
export function EditPostForm({ post }: EditPostFormProps) {
  const router = useRouter();
  const fileInput = useRef<HTMLInputElement>(null);
  const [values, setValues] = useState({
    title: post.title,
    content: post.content,
    fileType: post.fileType,
    // Older posts may hold "Not-Normal"; the form offers the same three choices as Create Post.
    blogType: BLOG_TYPE_OPTIONS.some((o) => o.value === post.blogType) ? post.blogType : BLOG_TYPE.NORMAL,
    category: post.category,
    publishBy: post.publishBy,
  });
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "danger"; text: string } | null>(null);

  // A retired category stays selectable for the post that already uses it.
  const categoryOptions = [...POST_CATEGORIES, ...LEGACY_CATEGORIES.filter((c) => c.slug === post.category)].map(
    (c) => ({ value: c.slug, label: c.label }),
  );

  const set = (key: keyof typeof values, value: string) => setValues((current) => ({ ...current, [key]: value }));
  const field = (key: keyof typeof values) => ({
    value: values[key],
    onChange: (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => set(key, event.target.value),
  });

  const pickFile = (event: ChangeEvent<HTMLInputElement>) => {
    const picked = event.target.files?.[0] ?? null;
    setStatus(null);
    if (picked) {
      const limit = values.fileType === "image" ? UPLOAD_LIMITS.imageBytes : UPLOAD_LIMITS.videoBytes;
      if (!picked.type.startsWith(`${values.fileType}/`)) {
        setStatus({ type: "danger", text: `Wrong file selected. Please choose a ${values.fileType} file.` });
        event.target.value = "";
        return setFile(null);
      }
      if (picked.size > limit) {
        setStatus({ type: "danger", text: `File size exceeds the ${Math.round(limit / 1024 / 1024)}MB limit.` });
        event.target.value = "";
        return setFile(null);
      }
    }
    setFile(picked);
  };

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setStatus(null);
    if (!values.title.trim() || !values.content || !values.blogType || !values.category) {
      setStatus({ type: "danger", text: "Required field missing." });
      return;
    }

    setLoading(true);
    setProgress(0);
    try {
      let imageUrl: string | undefined;
      if (file) {
        const signature = await callApi<UploadSignature>("/api/uploads/sign", { body: { fileType: values.fileType } });
        imageUrl = await uploadToCloudinary(file, signature, setProgress);
      }
      await callApi(`/api/posts/${post.id}`, { method: "PATCH", body: { ...values, imageUrl } });
      setFile(null);
      if (fileInput.current) fileInput.current.value = "";
      setStatus({ type: "success", text: "Post updated successfully." });
      router.refresh();
    } catch (error) {
      setStatus({ type: "danger", text: (error as Error).message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} noValidate className="rounded-lg bg-white">
      <TextField label="Title:" name="title" maxLength={100} required {...field("title")} />

      <label className="mb-2 inline-block">Content:</label>
      <RichTextEditor value={values.content} onChange={(html) => set("content", html)} />

      <SelectField label="Blog Type:" name="blogType" placeholder="Select" options={BLOG_TYPE_OPTIONS} required {...field("blogType")} />
      <SelectField label="Category:" name="category" placeholder="Select Category" options={categoryOptions} required {...field("category")} />

      <div className="mb-4">
        <p className="mb-2">Current file:</p>
        <div className="max-w-sm">
          <MediaViewer url={post.imageUrl} type={post.fileType} />
        </div>
      </div>

      <SelectField label="File Type:" name="fileType" placeholder="Select File" options={FILE_TYPES} {...field("fileType")} />
      <div className="mb-4">
        <label htmlFor="file" className="mb-2 inline-block">
          Replace File (optional):
        </label>
        <input
          ref={fileInput}
          id="file"
          type="file"
          accept={`${values.fileType}/*`}
          onChange={pickFile}
          className="w-full rounded-md border border-[#ced4da] bg-white px-3 py-2 file:mr-3 file:rounded file:border-0 file:bg-navy file:px-3 file:py-1 file:text-white"
        />
        <p className="mt-1 text-sm text-[#6c757d]">Leave empty to keep the current file.</p>
      </div>

      <TextField label="Published by:" name="publishBy" maxLength={50} {...field("publishBy")} />

      {loading && progress > 0 && (
        <div className="mb-4">
          <ProgressBar value={progress} />
        </div>
      )}
      <div className="flex gap-2">
        <Button type="submit" variant="success" loading={loading} loadingText="Please wait..">
          Save Changes
        </Button>
        <Link
          href="/auth/dashboard/viewpost"
          className="inline-flex items-center justify-center rounded-md bg-[#6c757d] px-4 py-2 font-medium text-white no-underline hover:bg-[#5c636a]"
        >
          Back
        </Link>
      </div>
      {status && <Alert variant={status.type} className="mt-4">{status.text}</Alert>}
    </form>
  );
}
