import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "ShareLint privacy policy - how we collect, use, and protect your data.",
  alternates: {
    canonical: "https://sharepreview.vercel.app/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <div className="flex flex-col">
      <section className="border-b bg-gradient-to-b from-primary/5 to-background px-4 py-16">
        <div className="container mx-auto max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight">Privacy Policy</h1>
          <p className="mt-4 text-muted-foreground">
            Last updated: January 2026
          </p>
        </div>
      </section>

      <section className="px-4 py-12">
        <div className="container mx-auto max-w-3xl prose prose-invert prose-headings:font-semibold prose-headings:tracking-tight prose-p:text-muted-foreground prose-li:text-muted-foreground">
          <h2>Introduction</h2>
          <p>
            ShareLint (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is committed to protecting your privacy.
            This Privacy Policy explains how we collect, use, disclose, and safeguard your
            information when you use our website and services.
          </p>

          <h2>Information We Collect</h2>
          <h3>Information You Provide</h3>
          <ul>
            <li><strong>URLs:</strong> When you use our link preview checker, we temporarily process the URLs you submit to fetch and analyze their meta tags.</li>
            <li><strong>Email Address:</strong> If you join our waitlist or create an account, we collect your email address.</li>
            <li><strong>Payment Information:</strong> If you subscribe to a paid plan, payment processing is handled by Stripe. We do not store your credit card details.</li>
          </ul>

          <h3>Information Collected Automatically</h3>
          <ul>
            <li><strong>Usage Data:</strong> We collect information about how you use our service, including the number of URL checks performed.</li>
            <li><strong>Device Information:</strong> We may collect information about your device, including browser type, operating system, and IP address.</li>
            <li><strong>Cookies:</strong> We use essential cookies to maintain your session and preferences.</li>
          </ul>

          <h2>How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul>
            <li>Provide and maintain our service</li>
            <li>Process your URL preview requests</li>
            <li>Send you updates about our service (if you opted in)</li>
            <li>Improve and optimize our service</li>
            <li>Comply with legal obligations</li>
          </ul>

          <h2>Data Retention</h2>
          <p>
            URLs submitted for preview checking are processed in real-time and are not
            permanently stored unless you have an account with history features enabled.
            Account data is retained until you request deletion.
          </p>

          <h2>Data Sharing</h2>
          <p>
            We do not sell your personal information. We may share data with:
          </p>
          <ul>
            <li><strong>Service Providers:</strong> Third-party services that help us operate (e.g., hosting, analytics, payment processing)</li>
            <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
          </ul>

          <h2>Your Rights</h2>
          <p>Depending on your location, you may have the right to:</p>
          <ul>
            <li>Access your personal data</li>
            <li>Correct inaccurate data</li>
            <li>Delete your data</li>
            <li>Object to data processing</li>
            <li>Data portability</li>
          </ul>

          <h2>Security</h2>
          <p>
            We implement appropriate technical and organizational measures to protect
            your personal information. However, no method of transmission over the
            Internet is 100% secure.
          </p>

          <h2>Children&apos;s Privacy</h2>
          <p>
            Our service is not intended for children under 13. We do not knowingly
            collect personal information from children under 13.
          </p>

          <h2>Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify you
            of any changes by posting the new Privacy Policy on this page and updating
            the &quot;Last updated&quot; date.
          </p>

          <h2>Contact Us</h2>
          <p>
            If you have questions about this Privacy Policy, please contact us at{" "}
            <a href="mailto:privacy@sharelint.com" className="text-primary hover:underline">
              privacy@sharelint.com
            </a>
          </p>
        </div>
      </section>
    </div>
  );
}
