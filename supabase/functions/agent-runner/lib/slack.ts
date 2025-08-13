import { buildTraceLink } from "../../_shared/trace_link.ts";

type Payload = {
  company_id: string;
  task_id: string;
  msg: string;
  meta?: Record<string, unknown>;
  trace_id?: string | null;
};

export async function agentSlackError(p: Payload) {
  const hook = Deno.env.get("N8N_AGENT_LOG_WEBHOOK") || "";
  if (!hook) return;

  const traceUrl = buildTraceLink(p.trace_id);

  const body = {
    level: "error",
    timestamp: new Date().toISOString(),
    ...p,
    trace_url: traceUrl ?? undefined,
    // Slack-friendly fallback text
    text: `[ERROR] ${p.msg}` + (traceUrl ? ` | trace: ${traceUrl}` : ""),
    // Optional Block Kit (n8n can forward verbatim to Slack webhook)
    blocks: [
      {
        type: "section",
        text: { type: "mrkdwn", text: `*Agent Error* — \`${p.task_id}\`\n${p.msg}` }
      },
      {
        type: "context",
        elements: [
          { type: "mrkdwn", text: `*Company:* \`${p.company_id}\`` },
          { type: "mrkdwn", text: `*Trace:* \`${p.trace_id ?? "n/a"}\`` }
        ]
      },
      ...(traceUrl
        ? [{ type: "actions", elements: [{ type: "button", text: { type: "plain_text", text: "Open Trace" }, url: traceUrl }] }]
        : [])
    ]
  };

  try {
    await fetch(hook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });
  } catch (error) {
    console.error("Failed to notify Slack:", error);
  }
}
