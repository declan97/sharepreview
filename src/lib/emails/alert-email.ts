import type { Monitor, MonitorCheck, Alert } from "@prisma/client";

interface AlertEmailData {
  monitor: Monitor;
  check: MonitorCheck;
  alert: Alert;
  dashboardUrl: string;
}

export function generateAlertEmailSubject(alert: Alert, monitor: Monitor): string {
  const icons: Record<string, string> = {
    image_broken: "🔴",
    image_changed: "🟡",
    title_changed: "🟡",
    title_missing: "🔴",
    description_truncated: "🟡",
    description_missing: "🟡",
    tags_removed: "🔴",
    status_error: "🔴",
  };

  const icon = icons[alert.type] || "⚠️";
  const hostname = new URL(monitor.url).hostname;

  return `${icon} Preview issue detected: ${hostname}`;
}

export function generateAlertEmailHtml(data: AlertEmailData): string {
  const { monitor, check, alert, dashboardUrl } = data;

  const hostname = new URL(monitor.url).hostname;
  const checkUrl = `${dashboardUrl}/dashboard/monitors/${monitor.id}`;
  const settingsUrl = `${dashboardUrl}/dashboard/monitors/${monitor.id}/settings`;

  const issueMessages: Record<string, { title: string; description: string }> = {
    image_broken: {
      title: "Preview image is broken",
      description: "The OG image URL is returning an error. Your link will appear without an image on social platforms.",
    },
    image_changed: {
      title: "Preview image has changed",
      description: "The OG image for this URL has been modified since the last check.",
    },
    title_changed: {
      title: "Title has changed unexpectedly",
      description: "The page title has been modified. Verify this was intentional.",
    },
    title_missing: {
      title: "Page title is missing",
      description: "No og:title meta tag was found. Your link will show a generic title on social platforms.",
    },
    description_truncated: {
      title: "Description will be truncated",
      description: "The description exceeds platform limits and will be cut off on some social networks.",
    },
    description_missing: {
      title: "Description is missing",
      description: "No og:description meta tag was found. Your link will have no preview text.",
    },
    tags_removed: {
      title: "Meta tags were removed",
      description: "Required Open Graph tags are no longer present on this page.",
    },
    status_error: {
      title: "Page is returning an error",
      description: "The URL is returning a non-200 status code. The page may be down.",
    },
  };

  const issue = issueMessages[alert.type] || {
    title: "Preview issue detected",
    description: alert.message,
  };

  const statusColors: Record<string, { bg: string; text: string; border: string }> = {
    broken: { bg: "#fef2f2", text: "#991b1b", border: "#fecaca" },
    warning: { bg: "#fffbeb", text: "#92400e", border: "#fde68a" },
    healthy: { bg: "#f0fdf4", text: "#166534", border: "#bbf7d0" },
  };

  const statusColor = statusColors[check.status] || statusColors.warning;

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${issue.title}</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f9fafb;">
  <table role="presentation" cellpadding="0" cellspacing="0" style="width: 100%; background-color: #f9fafb;">
    <tr>
      <td style="padding: 40px 20px;">
        <table role="presentation" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);">

          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #f97316 0%, #ea580c 100%); padding: 32px 40px;">
              <table role="presentation" cellpadding="0" cellspacing="0" style="width: 100%;">
                <tr>
                  <td>
                    <img src="${dashboardUrl}/logo.png" alt="ShareLint" width="140" style="display: block;" />
                  </td>
                </tr>
                <tr>
                  <td style="padding-top: 16px;">
                    <h1 style="margin: 0; font-size: 24px; font-weight: 600; color: #ffffff;">
                      Preview Alert
                    </h1>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Alert Banner -->
          <tr>
            <td style="padding: 0 40px;">
              <table role="presentation" cellpadding="0" cellspacing="0" style="width: 100%; margin-top: -20px;">
                <tr>
                  <td style="background-color: ${statusColor.bg}; border: 1px solid ${statusColor.border}; border-radius: 8px; padding: 16px 20px;">
                    <table role="presentation" cellpadding="0" cellspacing="0" style="width: 100%;">
                      <tr>
                        <td style="width: 24px; vertical-align: top;">
                          <span style="font-size: 20px;">${check.status === "broken" ? "🔴" : "🟡"}</span>
                        </td>
                        <td style="padding-left: 12px;">
                          <p style="margin: 0; font-size: 16px; font-weight: 600; color: ${statusColor.text};">
                            ${issue.title}
                          </p>
                          <p style="margin: 4px 0 0 0; font-size: 14px; color: ${statusColor.text}; opacity: 0.9;">
                            ${issue.description}
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- URL Info -->
          <tr>
            <td style="padding: 32px 40px 0 40px;">
              <table role="presentation" cellpadding="0" cellspacing="0" style="width: 100%;">
                <tr>
                  <td>
                    <p style="margin: 0 0 8px 0; font-size: 12px; font-weight: 500; color: #6b7280; text-transform: uppercase; letter-spacing: 0.05em;">
                      Monitored URL
                    </p>
                    <p style="margin: 0; font-size: 14px; color: #111827; word-break: break-all;">
                      <a href="${monitor.url}" style="color: #f97316; text-decoration: none;">${monitor.url}</a>
                    </p>
                    ${monitor.nickname ? `<p style="margin: 4px 0 0 0; font-size: 13px; color: #6b7280;">${monitor.nickname}</p>` : ""}
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- What Changed -->
          ${alert.previousValue || alert.currentValue ? `
          <tr>
            <td style="padding: 24px 40px 0 40px;">
              <table role="presentation" cellpadding="0" cellspacing="0" style="width: 100%; background-color: #f9fafb; border-radius: 8px; padding: 16px;">
                <tr>
                  <td style="padding: 16px;">
                    <p style="margin: 0 0 12px 0; font-size: 12px; font-weight: 500; color: #6b7280; text-transform: uppercase; letter-spacing: 0.05em;">
                      What Changed
                    </p>
                    ${alert.previousValue ? `
                    <table role="presentation" cellpadding="0" cellspacing="0" style="width: 100%; margin-bottom: 12px;">
                      <tr>
                        <td style="width: 60px; font-size: 12px; color: #6b7280; vertical-align: top;">Before:</td>
                        <td style="font-size: 13px; color: #374151; word-break: break-word;">
                          <span style="text-decoration: line-through; opacity: 0.7;">${alert.previousValue}</span>
                        </td>
                      </tr>
                    </table>
                    ` : ""}
                    ${alert.currentValue ? `
                    <table role="presentation" cellpadding="0" cellspacing="0" style="width: 100%;">
                      <tr>
                        <td style="width: 60px; font-size: 12px; color: #6b7280; vertical-align: top;">After:</td>
                        <td style="font-size: 13px; color: #374151; word-break: break-word;">
                          ${alert.currentValue}
                        </td>
                      </tr>
                    </table>
                    ` : ""}
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          ` : ""}

          <!-- Timestamp -->
          <tr>
            <td style="padding: 24px 40px 0 40px;">
              <p style="margin: 0; font-size: 13px; color: #6b7280;">
                Detected on ${new Date(check.checkedAt).toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })} at ${new Date(check.checkedAt).toLocaleTimeString("en-US", {
                  hour: "numeric",
                  minute: "2-digit",
                  timeZoneName: "short",
                })}
              </p>
            </td>
          </tr>

          <!-- CTA Buttons -->
          <tr>
            <td style="padding: 32px 40px;">
              <table role="presentation" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding-right: 12px;">
                    <a href="${checkUrl}" style="display: inline-block; padding: 12px 24px; background: linear-gradient(135deg, #f97316 0%, #ea580c 100%); color: #ffffff; font-size: 14px; font-weight: 500; text-decoration: none; border-radius: 8px;">
                      View Full Report
                    </a>
                  </td>
                  <td>
                    <a href="${monitor.url}" style="display: inline-block; padding: 12px 24px; background-color: #f3f4f6; color: #374151; font-size: 14px; font-weight: 500; text-decoration: none; border-radius: 8px;">
                      Check URL Again
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style="padding: 0 40px;">
              <hr style="margin: 0; border: none; border-top: 1px solid #e5e7eb;" />
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 24px 40px 32px 40px;">
              <table role="presentation" cellpadding="0" cellspacing="0" style="width: 100%;">
                <tr>
                  <td>
                    <p style="margin: 0 0 8px 0; font-size: 13px; color: #6b7280;">
                      You're receiving this because you have monitoring enabled for this URL.
                    </p>
                    <p style="margin: 0; font-size: 13px;">
                      <a href="${settingsUrl}" style="color: #f97316; text-decoration: none;">Manage alert settings</a>
                      <span style="color: #d1d5db; margin: 0 8px;">|</span>
                      <a href="${dashboardUrl}/dashboard/monitors" style="color: #f97316; text-decoration: none;">View all monitors</a>
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>

        <!-- Bottom Text -->
        <table role="presentation" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 24px auto 0 auto;">
          <tr>
            <td style="text-align: center;">
              <p style="margin: 0; font-size: 12px; color: #9ca3af;">
                ShareLint • Preview monitoring for marketers and creators
              </p>
              <p style="margin: 8px 0 0 0; font-size: 12px; color: #9ca3af;">
                <a href="${dashboardUrl}" style="color: #9ca3af; text-decoration: none;">sharelint.com</a>
              </p>
            </td>
          </tr>
        </table>

      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

export function generateAlertEmailText(data: AlertEmailData): string {
  const { monitor, check, alert, dashboardUrl } = data;

  const checkUrl = `${dashboardUrl}/dashboard/monitors/${monitor.id}`;

  return `
SHARELINT ALERT
==================

${alert.message}

URL: ${monitor.url}
${monitor.nickname ? `Name: ${monitor.nickname}` : ""}
Status: ${check.status.toUpperCase()}
Detected: ${new Date(check.checkedAt).toLocaleString()}

${alert.previousValue ? `Before: ${alert.previousValue}` : ""}
${alert.currentValue ? `After: ${alert.currentValue}` : ""}

View full report: ${checkUrl}
Check URL again: ${monitor.url}

---
You're receiving this because you have monitoring enabled for this URL.
Manage alerts: ${dashboardUrl}/dashboard/monitors/${monitor.id}/settings

ShareLint - Preview monitoring for marketers and creators
${dashboardUrl}
  `.trim();
}
