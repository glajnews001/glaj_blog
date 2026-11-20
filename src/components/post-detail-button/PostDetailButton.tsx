"use client";

import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { Alert } from "@/components/alert/Alert";
import { Button } from "@/components/button/Button";
import { DetailRow } from "@/components/detail-row/DetailRow";
import { MediaViewer } from "@/components/media-viewer/MediaViewer";
import { Modal } from "@/components/modal/Modal";
import { RichContent } from "@/components/rich-content/RichContent";
import type { PostDetail } from "@/models/post.dto";
import { callApi } from "@/utils/api";
import { formatDateTime } from "@/utils/time";

type PostDetailButtonProps = { postId: string };

/** "View" button that opens the post details modal and lets an admin delete the post. */
export function PostDetailButton({ postId }: PostDetailButtonProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [post, setPost] = useState<PostDetail | null>(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const close = useCallback(() => setOpen(false), []);

  const show = async () => {
    setOpen(true);
    setError("");
    if (post) return;
    try {
      setPost(await callApi<PostDetail>(`/api/posts/${postId}`));
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const remove = async () => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    setBusy(true);
    try {
      await callApi(`/api/posts/${postId}`, { method: "DELETE" });
      setOpen(false);
      router.refresh();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <Button variant="success" small onClick={show}>
        View
      </Button>
      <Modal
        open={open}
        title="Post Details"
        onClose={close}
        footer={
          <>
            <Button variant="danger" onClick={remove} loading={busy} loadingText="Deleting..." disabled={!post}>
              Delete Post
            </Button>
            <Button variant="secondary" onClick={close}>
              Close
            </Button>
          </>
        }
      >
        {error && <Alert variant="danger">{error}</Alert>}
        {!post && !error && <p className="py-8 text-center">Loading...</p>}
        {post && (
          <div>
            <DetailRow label="Title">{post.title}</DetailRow>
            <DetailRow label="Category">{post.category}</DetailRow>
            <DetailRow label="Status">{post.isActive ? "Active" : "Deleted"}</DetailRow>
            <DetailRow label="Reference">{post.blogId}</DetailRow>
            <DetailRow label="Date">{formatDateTime(post.createdAt)}</DetailRow>
            <DetailRow label="Media">
              <MediaViewer url={post.imageUrl} type={post.fileType} />
            </DetailRow>
            <DetailRow label="Content">
              <RichContent html={post.content} />
            </DetailRow>
          </div>
        )}
      </Modal>
    </>
  );
}
