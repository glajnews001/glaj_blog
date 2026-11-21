import Link from "next/link";

type EditPostButtonProps = { postId: string };

/** "Edit" link shown next to a post in the admin register. */
export function EditPostButton({ postId }: EditPostButtonProps) {
  return (
    <Link
      href={`/auth/dashboard/viewpost/${postId}/edit`}
      className="inline-flex items-center justify-center rounded-md bg-navy px-3 py-1 text-sm font-medium text-white no-underline transition-colors hover:bg-navy-deep"
    >
      Edit
    </Link>
  );
}
