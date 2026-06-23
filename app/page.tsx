import BriefConsole from "@/components/BriefConsole";

export default function Page() {
  return (
    <main className="shell">
      <header className="masthead">
        <div className="brand">
          <span className="brand-mark">◊ INTEL</span>
          <span className="brand-title">Tech Brief</span>
          <span className="brand-sub">/ daily signal</span>
        </div>
        <div className="sources" aria-label="Sources">
          <span className="src hn">
            <span className="dot" />
            Hacker News
          </span>
          <span className="src dev">
            <span className="dot" />
            DEV.to
          </span>
          <span className="src gh">
            <span className="dot" />
            GitHub
          </span>
        </div>
      </header>

      <section className="hero">
        <p className="eyebrow">Three feeds · one synthesis</p>
        <h1>
          What tech is&nbsp;saying,
          <br />
          <span className="quiet">read in a minute.</span>
        </h1>
        <p>
          Name a topic. We pull what&apos;s live across Hacker News, DEV.to and
          GitHub right now, then a senior-analyst agent writes the brief —
          themes, the items that matter, and one thing to watch.
        </p>
      </section>

      <BriefConsole />

      <footer className="foot">
        <span>POST · /webhook/tech-brief</span>
        <span>n8n × OpenRouter</span>
      </footer>
    </main>
  );
}
