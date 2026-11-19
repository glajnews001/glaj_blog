import type { PostView } from "@/models/post.model";
import { EmptyState } from "@/components/empty-state/EmptyState";
import { NewsCard } from "@/components/news-card/NewsCard";
import { SiteShell } from "@/components/site-shell/SiteShell";

export function SearchView({ term, posts }: { term: string; posts: PostView[] }) {
  return (
    <SiteShell showFooter={false}>
      {posts.length === 0 ? (
        <EmptyState title={`Your seached for : ${term}`} detail="Click the button below to view more news." />
      ) : (
        <>
          <h2 className="px-4 pt-4 text-[1.3rem] underline">Your seached for : {term}</h2>
          <div className="m-3 grid grid-cols-1 gap-5 min-[601px]:grid-cols-2 min-[801px]:grid-cols-4">
            {posts.map((post) => (
              <NewsCard key={post.id} post={post} />
            ))}
          </div>
        </>
      )}
    </SiteShell>
  );
}
