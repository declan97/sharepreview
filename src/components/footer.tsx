import Link from "next/link";
import { LogoIcon } from "./icons/logo-icon";
import { ArrowUpRight } from "lucide-react";

const toolLinks = [
  { href: "/facebook-preview", label: "Facebook Preview" },
  { href: "/twitter-preview", label: "Twitter Card Validator" },
  { href: "/linkedin-preview", label: "LinkedIn Preview" },
  { href: "/discord-preview", label: "Discord Embed Preview" },
  { href: "/slack-preview", label: "Slack Unfurl Preview" },
];

const resourceLinks = [
  { href: "/guides/og-image-size", label: "OG Image Size Guide" },
  { href: "/guides/twitter-card-size", label: "Twitter Card Size Guide" },
  { href: "/fix/facebook-preview-not-showing", label: "Fix Facebook Preview" },
  { href: "/fix/twitter-card-not-working", label: "Fix Twitter Card" },
];

const companyLinks = [
  { href: "/pricing", label: "Pricing" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
];

export function Footer() {
  return (
    <footer className="relative border-t bg-muted/30">
      {/* Decorative gradient */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

      <div className="container mx-auto px-4 py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="group inline-flex items-center gap-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm transition-all duration-200 group-hover:shadow-md">
                <LogoIcon className="h-6 w-6" />
              </div>
              <span className="text-xl font-semibold tracking-tight">
                Share<span className="text-primary">Preview</span>
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              See exactly how your links look on social media before you share them.
              Check your link preview in 2 seconds.
            </p>
            <div className="mt-6 flex items-center gap-4">
              <a
                href="https://twitter.com/sharepreview"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg border bg-card text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground"
                aria-label="Twitter"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="https://github.com/sharepreview"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg border bg-card text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground"
                aria-label="GitHub"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Tools Column */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              Tools
            </h3>
            <ul className="mt-4 space-y-3">
              {toolLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                    <ArrowUpRight className="ml-1 h-3 w-3 opacity-0 transition-all group-hover:opacity-100" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Column */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              Resources
            </h3>
            <ul className="mt-4 space-y-3">
              {resourceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                    <ArrowUpRight className="ml-1 h-3 w-3 opacity-0 transition-all group-hover:opacity-100" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              Company
            </h3>
            <ul className="mt-4 space-y-3">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                    <ArrowUpRight className="ml-1 h-3 w-3 opacity-0 transition-all group-hover:opacity-100" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t pt-8 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} SharePreview. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">
            Built with{" "}
            <span className="text-primary">Next.js</span> &{" "}
            <span className="text-primary">Tailwind CSS</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
