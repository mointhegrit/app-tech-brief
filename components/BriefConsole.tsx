"use client";

import { useEffect, useRef, useState } from "react";
import { getBrief, type TechBriefResponse } from "@/lib/n8n";
import BriefView from "./BriefView";

const EXAMPLES = ["ai agents", "rust", "open source", "developer tools"];

const LOG_STEPS = [
  "querying hacker news",
  "querying dev.to",
  "querying github trending",
  "merging sources",
  "synthesizing brief",
];

export default function BriefConsole() {
  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<TechBriefResponse | null>(null);
  const [logCount, setLogCount] = useState(0);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  async function run(focus: string) {
    if (loading) return;
    setLoading(true);
    setError(null);
    setResult(null);

    // Reveal the log lines on a cadence while the request is in flight.
    timers.current.forEach(clearTimeout);
    setLogCount(1);
    timers.current = LOG_STEPS.map((_, i) =>
      setTimeout(() => setLogCount(i + 1), i * 700)
    );

    try {
      const data = await getBrief({ topic: focus.trim() || undefined });
      setResult(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong.");
    } finally {
      timers.current.forEach(clearTimeout);
      setLoading(false);
    }
  }

  return (
    <>
      <div className="console">
        <div className="console-bar">
          <span className="tl a" />
          <span className="tl" />
          <span className="tl" />
          <span className="path">analyst@intel — brief</span>
        </div>

        <form
          className="prompt"
          onSubmit={(e) => {
            e.preventDefault();
            run(topic);
          }}
        >
          <span className="prompt-sigil">brief --topic ▸</span>
          <input
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="leave blank for general tech"
            aria-label="Focus topic"
            autoComplete="off"
            spellCheck={false}
            disabled={loading}
          />
          <button className="run" type="submit" disabled={loading}>
            {loading ? "Running" : "Run"}
          </button>
        </form>

        <div className="hint">
          {EXAMPLES.map((ex) => (
            <button
              key={ex}
              type="button"
              className="chip"
              disabled={loading}
              onClick={() => {
                setTopic(ex);
                run(ex);
              }}
            >
              {ex}
            </button>
          ))}
        </div>
      </div>

      {loading && (
        <div className="stream" role="status" aria-live="polite">
          {LOG_STEPS.slice(0, logCount).map((step, i) => {
            const isLast = i === logCount - 1;
            return (
              <div key={step} className={`ln${isLast ? " cursor" : ""}`}>
                <b>→</b> {step}
                {!isLast && " ✓"}
              </div>
            );
          })}
        </div>
      )}

      {error && !loading && (
        <div className="error" role="alert">
          <b>halted.</b> {error}
        </div>
      )}

      {result && !loading && <BriefView data={result} />}
    </>
  );
}
