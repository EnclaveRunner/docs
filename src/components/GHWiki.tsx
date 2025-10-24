import { useEffect, useState } from "react";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";

export function GHWiki({ wikiUrl }: { wikiUrl: string }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [wikiContent, setWikiContent] = useState<string | null>(null);

  useEffect(() => {
    fetch(wikiUrl)
      .then((res) => {
        if (!res.ok) {
          throw new Error(
            `Failed to fetch API docs from ${wikiUrl} (status: ${res.status} ${res.statusText})`
          );
        }

        return res.text();
      })
      .then(setWikiContent)
      .catch((e) => {
        setError(`Error fetching API docs from ${wikiUrl}: ${e.message}`);
      })
      .finally(() => setLoading(false));
  }, [wikiUrl]);
  if (loading) return <div>Loading Wiki documentation...</div>;
  if (error) return <div className="alert alert--danger">Error: {error}</div>;

  return (
    <>
      <Markdown rehypePlugins={[rehypeRaw]}>{wikiContent}</Markdown>
    </>
  );
}
export default GHWiki;
