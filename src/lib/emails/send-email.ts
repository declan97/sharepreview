import { generateAlertEmailHtml, generateAlertEmailText, generateAlertEmailSubject } from "./alert-email";
import type { Monitor, MonitorCheck, Alert } from "@prisma/client";

interface SendAlertEmailParams {
  to: string;
  monitor: Monitor;
  check: MonitorCheck;
  alert: Alert;
}

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const FROM_EMAIL = process.env.FROM_EMAIL || "alerts@sharepreview.com";
const DASHBOARD_URL = process.env.NEXT_PUBLIC_APP_URL || "https://sharepreview.com";

export async function sendAlertEmail(params: SendAlertEmailParams): Promise<{ success: boolean; error?: string }> {
  const { to, monitor, check, alert } = params;

  if (!RESEND_API_KEY) {
    console.warn("RESEND_API_KEY not set - skipping email");
    return { success: false, error: "Email not configured" };
  }

  const subject = generateAlertEmailSubject(alert, monitor);
  const html = generateAlertEmailHtml({
    monitor,
    check,
    alert,
    dashboardUrl: DASHBOARD_URL,
  });
  const text = generateAlertEmailText({
    monitor,
    check,
    alert,
    dashboardUrl: DASHBOARD_URL,
  });

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: `SharePreview <${FROM_EMAIL}>`,
        to: [to],
        subject,
        html,
        text,
        tags: [
          { name: "category", value: "alert" },
          { name: "monitor_id", value: monitor.id },
          { name: "alert_type", value: alert.type },
        ],
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("Failed to send email:", error);
      return { success: false, error };
    }

    const data = await response.json();
    console.log("Email sent:", data.id);
    return { success: true };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, error: String(error) };
  }
}

// Batch send alerts for a single monitor (e.g., when multiple issues detected)
export async function sendBatchAlertEmail(params: {
  to: string;
  monitor: Monitor;
  check: MonitorCheck;
  alerts: Alert[];
}): Promise<{ success: boolean; error?: string }> {
  const { to, monitor, check, alerts } = params;

  if (alerts.length === 0) {
    return { success: true };
  }

  // For now, just send the first alert
  // In production, you might want to combine multiple alerts into one email
  return sendAlertEmail({
    to,
    monitor,
    check,
    alert: alerts[0],
  });
}
