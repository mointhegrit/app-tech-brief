// Single place that defines the app <-> n8n contract.
// Browser POSTs directly to the workflow's webhook URL.
//
// Workflow: "🌐 Free-Tier Tech Intelligence Brief + AI Agent (Webhook App)"
//   POST { topic? } -> { brief (markdown), topic, generatedAt (ISO) }

const WEBHOOK_URL = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL;

export type TechBriefInput = {
  /** Optional focus topic. Workflow defaults to "general tech" when omitted. */
  topic?: string;
};

export type TechBriefResponse = {
  /** The daily brief, in markdown. */
  brief: string;
  /** Resolved focus topic the brief was written for. */
  topic: string;
  /** ISO timestamp of when the brief was generated. */
  generatedAt: string;
};

export async function getBrief(input: TechBriefInput): Promise<TechBriefResponse> {
  if (!WEBHOOK_URL) {
    throw new Error(
      "NEXT_PUBLIC_N8N_WEBHOOK_URL is not set. Copy .env.example to .env.local and add the webhook URL."
    );
  }

  let res: Response;
  try {
    res = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });
  } catch {
    throw new Error("Couldn't reach the brief service. Check your connection and that the workflow is active.");
  }

  if (!res.ok) {
    throw new Error(`The brief service returned ${res.status}. The n8n workflow may be inactive.`);
  }

  return res.json() as Promise<TechBriefResponse>;
}
