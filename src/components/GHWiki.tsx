import * as React from "react";
import { useEffect, useState } from "react";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import mermaid from "mermaid";
import "./GHWiki.css";

// Initialize Mermaid with configuration
mermaid.initialize({
  startOnLoad: false,
  theme: "default",
  securityLevel: "loose",
});

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

  // Process Mermaid diagrams after content renders
  useEffect(() => {
    if (!loading && wikiContent) {
      // Use a small delay to ensure DOM is ready
      const timer = setTimeout(async () => {
        const mermaidElements = document.querySelectorAll(".mermaid");
        if (mermaidElements.length > 0) {
          try {
            await mermaid.run();
          } catch (error) {
            console.error("Mermaid rendering error:", error);
          }
        }
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [wikiContent, loading]);

  // Custom renderer for code blocks to handle mermaid diagrams
  const codeRenderer = ({ node, inline, className, children, ...props }: any) => {
    const match = /language-(\w+)/.exec(className || "");
    const language = match ? match[1] : "";

    if (!inline && language === "mermaid") {
      const code = String(children).replace(/\n$/, "");
      return (
        <div className="mermaid-container">
          <div className="mermaid" key={Math.random()}>
            {code}
          </div>
        </div>
      );
    }

    return (
      <code className={className} {...props}>
        {children}
      </code>
    );
  };

  if (loading) return <div>Loading Wiki documentation...</div>;
  if (error) return <div className="alert alert--danger">Error: {error}</div>;

  return (
    <>
      <Markdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          code: codeRenderer,
        }}
      >
        {wikiContent}
      </Markdown>
    </>
  );
}
export default GHWiki;
