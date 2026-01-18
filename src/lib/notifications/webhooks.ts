import type { Monitor, MonitorCheck, Alert } from "@prisma/client";

const DASHBOARD_URL = process.env.NEXT_PUBLIC_APP_URL || "https://sharepreview.vercel.app";

interface WebhookPayload {
  monitor: Monitor;
  check: MonitorCheck;
  alert: Alert;
}

// Slack webhook integration
export async function sendSlackWebhook(
  webhookUrl: string,
  payload: WebhookPayload
): Promise<{ success: boolean; error?: string }> {
  const { monitor, check, alert } = payload;
  const monitorUrl = `${DASHBOARD_URL}/dashboard/monitors/${monitor.id}`;

  const statusEmoji = check.status === "broken" ? ":red_circle:" : ":warning:";
  const statusColor = check.status === "broken" ? "#dc2626" : "#f59e0b";

  const slackPayload = {
    blocks: [
      {
        type: "header",
        text: {
          type: "plain_text",
          text: `${statusEmoji} Preview Alert`,
          emoji: true,
        },
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `*${alert.message}*`,
        },
      },
      {
        type: "section",
        fields: [
          {
            type: "mrkdwn",
            text: `*URL:*\n<${monitor.url}|${monitor.nickname || monitor.url}>`,
          },
          {
            type: "mrkdwn",
            text: `*Status:*\n${check.status.charAt(0).toUpperCase() + check.status.slice(1)}`,
          },
        ],
      },
    ],
    attachments: [
      {
        color: statusColor,
        blocks: [
          ...(alert.previousValue || alert.currentValue
            ? [
                {
                  type: "section",
                  text: {
                    type: "mrkdwn",
                    text: [
                      alert.previousValue ? `~${alert.previousValue}~` : null,
                      alert.currentValue ? `\`${alert.currentValue}\`` : null,
                    ]
                      .filter(Boolean)
                      .join(" → "),
                  },
                },
              ]
            : []),
          {
            type: "actions",
            elements: [
              {
                type: "button",
                text: {
                  type: "plain_text",
                  text: "View Report",
                  emoji: true,
                },
                url: monitorUrl,
                style: "primary",
              },
              {
                type: "button",
                text: {
                  type: "plain_text",
                  text: "Check URL",
                  emoji: true,
                },
                url: `${DASHBOARD_URL}/?url=${encodeURIComponent(monitor.url)}`,
              },
            ],
          },
        ],
      },
    ],
  };

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(slackPayload),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("Slack webhook failed:", error);
      return { success: false, error };
    }

    return { success: true };
  } catch (error) {
    console.error("Slack webhook error:", error);
    return { success: false, error: String(error) };
  }
}

// Discord webhook integration
export async function sendDiscordWebhook(
  webhookUrl: string,
  payload: WebhookPayload
): Promise<{ success: boolean; error?: string }> {
  const { monitor, check, alert } = payload;
  const monitorUrl = `${DASHBOARD_URL}/dashboard/monitors/${monitor.id}`;

  const statusEmoji = check.status === "broken" ? "🔴" : "🟡";
  const statusColor = check.status === "broken" ? 0xdc2626 : 0xf59e0b;

  const discordPayload = {
    embeds: [
      {
        title: `${statusEmoji} Preview Alert`,
        description: alert.message,
        color: statusColor,
        fields: [
          {
            name: "URL",
            value: `[${monitor.nickname || new URL(monitor.url).hostname}](${monitor.url})`,
            inline: true,
          },
          {
            name: "Status",
            value: check.status.charAt(0).toUpperCase() + check.status.slice(1),
            inline: true,
          },
          ...(alert.previousValue
            ? [
                {
                  name: "Before",
                  value: `~~${alert.previousValue}~~`,
                  inline: false,
                },
              ]
            : []),
          ...(alert.currentValue
            ? [
                {
                  name: "After",
                  value: `\`${alert.currentValue}\``,
                  inline: false,
                },
              ]
            : []),
        ],
        timestamp: new Date(check.checkedAt).toISOString(),
        footer: {
          text: "ShareLint",
        },
      },
    ],
    components: [
      {
        type: 1,
        components: [
          {
            type: 2,
            style: 5,
            label: "View Report",
            url: monitorUrl,
          },
          {
            type: 2,
            style: 5,
            label: "Check URL",
            url: `${DASHBOARD_URL}/?url=${encodeURIComponent(monitor.url)}`,
          },
        ],
      },
    ],
  };

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(discordPayload),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("Discord webhook failed:", error);
      return { success: false, error };
    }

    return { success: true };
  } catch (error) {
    console.error("Discord webhook error:", error);
    return { success: false, error: String(error) };
  }
}

// Generic webhook sender that routes to the appropriate service
export async function sendWebhookNotification(
  channel: "slack" | "discord",
  webhookUrl: string,
  payload: WebhookPayload
): Promise<{ success: boolean; error?: string }> {
  switch (channel) {
    case "slack":
      return sendSlackWebhook(webhookUrl, payload);
    case "discord":
      return sendDiscordWebhook(webhookUrl, payload);
    default:
      return { success: false, error: `Unknown channel: ${channel}` };
  }
}
