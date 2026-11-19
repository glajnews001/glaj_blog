import type { PostView } from "@/models/post.model";
import { formatStamp } from "@/utils/time";
import { MediaViewer } from "@/components/media-viewer/MediaViewer";

export function PostDetailModal({ post, onClose, onDelete }: { post: PostView; onClose: () => void; onDelete: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded bg-white text-[#1e1e26]">
        <div className="bg-[#050434] px-5 py-4 text-xl text-white">Post Details</div>
        <div className="space-y-4 px-5 py-6">
          <Detail label="Tittle" value={post.title} />
          <Detail label="Category" value={post.category} />
          <Detail label="status" value={post.is_active ? "Active" : "Deleted"} />
          <Detail label="Reference" value={post.blogid} />
          <Detail label="Date" value={formatStamp(post.createdAt)} />
          <div className="grid grid-cols-1 gap-3 border-b border-[#ed1864] py-4 sm:grid-cols-[40%_60%]">
            <strong>Media</strong>
            <MediaViewer mediaUrl={post.imageUrl} mediaType={post.fileType} />
          </div>
          <div className="grid grid-cols-1 gap-3 border-b border-[#ed1864] py-4 sm:grid-cols-[40%_60%]">
            <strong>Content</strong>
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </div>
        </div>
        <div className="flex justify-end gap-2 px-5 py-4">
          <button type="button" onClick={onDelete} className="rounded bg-red-700 px-4 py-2 text-white">
            Delete Post
          </button>
          <button type="button" onClick={onClose} className="rounded bg-gray-600 px-4 py-2 text-white">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-1 gap-3 border-b border-[#ed1864] py-4 sm:grid-cols-[40%_60%]">
      <strong>{label}</strong>
      <p>{value}</p>
    </div>
  );
}
