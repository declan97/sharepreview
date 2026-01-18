import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "ShareLint terms of service - the rules and guidelines for using our service.",
  alternates: {
    canonical: "https://sharelint.com/terms",
  },
};

export default function TermsPage() {
  return (
    <div className="flex flex-col">
      <section className="border-b bg-gradient-to-b from-primary/5 to-background px-4 py-16">
        <div className="container mx-auto max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight">Terms of Service</h1>
          <p className="mt-4 text-muted-foreground">
            Last updated: January 2026
          </p>
        </div>
      </section>

      <section className="px-4 py-12">
        <div className="container mx-auto max-w-3xl prose prose-invert prose-headings:font-semibold prose-headings:tracking-tight prose-p:text-muted-foreground prose-li:text-muted-foreground">
          <h2>Agreement to Terms</h2>
          <p>
            By accessing or using ShareLint (&quot;the Service&quot;), you agree to be bound
            by these Terms of Service. If you do not agree to these terms, do not use
            the Service.
          </p>

          <h2>Description of Service</h2>
          <p>
            ShareLint provides tools to preview how URLs will appear when shared on
            social media platforms including Facebook, Twitter, LinkedIn, Discord, and
            Slack. We also provide OG image generation and meta tag validation services.
          </p>

          <h2>Acceptable Use</h2>
          <p>You agree not to:</p>
          <ul>
            <li>Use the Service for any unlawful purpose</li>
            <li>Submit URLs containing malware, phishing content, or illegal material</li>
            <li>Attempt to overwhelm, &quot;flood,&quot; or otherwise disrupt the Service</li>
            <li>Circumvent usage limits or access controls</li>
            <li>Use automated scripts to access the Service without our permission</li>
            <li>Resell or redistribute the Service without authorization</li>
          </ul>

          <h2>User Accounts</h2>
          <p>
            Some features require an account. You are responsible for maintaining the
            confidentiality of your account credentials and for all activities under
            your account. You must notify us immediately of any unauthorized use.
          </p>

          <h2>Free and Paid Plans</h2>
          <h3>Free Tier</h3>
          <p>
            The free tier includes limited daily URL checks. We reserve the right to
            modify free tier limits at any time.
          </p>

          <h3>Paid Subscriptions</h3>
          <ul>
            <li>Paid plans are billed monthly or annually in advance</li>
            <li>You may cancel at any time; access continues until the end of the billing period</li>
            <li>Refunds are available within 30 days of initial purchase</li>
            <li>We reserve the right to change pricing with 30 days notice</li>
          </ul>

          <h2>Intellectual Property</h2>
          <p>
            The Service, including its design, features, and content, is owned by
            ShareLint and protected by intellectual property laws. You may not copy,
            modify, or distribute any part of the Service without permission.
          </p>

          <h2>User Content</h2>
          <p>
            You retain ownership of any content you submit (such as URLs for checking).
            By using the Service, you grant us a limited license to process your
            submissions solely to provide the Service.
          </p>

          <h2>Third-Party Services</h2>
          <p>
            The Service may interact with third-party platforms (Facebook, Twitter, etc.)
            to fetch metadata. We are not responsible for the availability or accuracy
            of these platforms&apos; services.
          </p>

          <h2>Disclaimer of Warranties</h2>
          <p>
            THE SERVICE IS PROVIDED &quot;AS IS&quot; WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR
            IMPLIED. WE DO NOT GUARANTEE THAT THE SERVICE WILL BE UNINTERRUPTED,
            ERROR-FREE, OR COMPLETELY SECURE.
          </p>

          <h2>Limitation of Liability</h2>
          <p>
            TO THE MAXIMUM EXTENT PERMITTED BY LAW, SHAREPREVIEW SHALL NOT BE LIABLE
            FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES,
            OR ANY LOSS OF PROFITS OR REVENUES.
          </p>

          <h2>Indemnification</h2>
          <p>
            You agree to indemnify and hold harmless ShareLint from any claims,
            damages, or expenses arising from your use of the Service or violation
            of these Terms.
          </p>

          <h2>Modifications to Terms</h2>
          <p>
            We may modify these Terms at any time. Continued use of the Service after
            changes constitutes acceptance of the modified Terms. Material changes will
            be communicated via email or through the Service.
          </p>

          <h2>Termination</h2>
          <p>
            We may suspend or terminate your access to the Service at any time for
            violation of these Terms or for any other reason at our discretion.
          </p>

          <h2>Governing Law</h2>
          <p>
            These Terms are governed by the laws of the State of Delaware, United States,
            without regard to conflict of law principles.
          </p>

          <h2>Contact</h2>
          <p>
            For questions about these Terms, contact us at{" "}
            <a href="mailto:legal@sharelint.com" className="text-primary hover:underline">
              legal@sharelint.com
            </a>
          </p>
        </div>
      </section>
    </div>
  );
}
