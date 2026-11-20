import { EmptyState } from "@/components/empty-state/EmptyState";
import { NewsCard } from "@/components/news-card/NewsCard";
import { SiteShell } from "@/components/site-shell/SiteShell";
import type { SearchPayload } from "@/models/page.dto";

type SearchViewProps = { data: SearchPayload };

export function SearchView({ data }: SearchViewProps) {
  const heading = `Your searched for : ${data.term}`;

  return (
    <SiteShell withFooter={false}>
      {data.posts.length === 0 ? (
        <EmptyState title={heading} />
      ) : (
        <>
          <h2 className="pb-2 pl-4 pt-4 text-[1.3rem] underline">{heading}</h2>
          <div className="mx-3 my-8 grid grid-cols-1 gap-5 min-[601px]:grid-cols-2 min-[801px]:grid-cols-4">
            {data.posts.map((post) => (
              <NewsCard key={post.id} post={post} />
            ))}
          </div>
        </>
      )}
    </SiteShell>
  );
}
