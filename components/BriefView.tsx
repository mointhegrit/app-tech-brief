import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { TechBriefResponse } from "@/lib/n8n";

function formatTime(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d
    .toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    })
    .toUpperCase();
}

export default function BriefView({ data }: { data: TechBriefResponse }) {
  return (
    <article className="brief">
      <div className="brief-head">
        <span>
          focus: <span className="topic">{data.topic}</span>
        </span>
        <span>{formatTime(data.generatedAt)}</span>
      </div>
      <div className="prose">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{data.brief}</ReactMarkdown>
      </div>
    </article>
  );
}
