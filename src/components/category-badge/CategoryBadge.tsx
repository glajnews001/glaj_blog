type CategoryBadgeProps = { category: string };

/** Navy arrow-shaped label showing a post's category. */
export function CategoryBadge({ category }: CategoryBadgeProps) {
  return (
    <span
      className="inline-flex justify-center bg-navy p-4 text-center text-[0.8rem] font-extrabold uppercase text-white [clip-path:polygon(25%_0%,100%_0,100%_100%,25%_100%,0%_50%)]"
    >
      {category}
    </span>
  );
}
