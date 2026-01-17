import Link from "next/link";
import { LogoIcon } from "./icons/logo-icon";

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <LogoIcon className="h-5 w-5" />
              </div>
              <span className="font-bold">SharePreview</span>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              See exactly how your links look on social media before you share them.
            </p>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-semibold">Tools</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/facebook-preview" className="hover:text-foreground">
                  Facebook Preview
                </Link>
              </li>
              <li>
                <Link href="/twitter-preview" className="hover:text-foreground">
                  Twitter Card Validator
                </Link>
              </li>
              <li>
                <Link href="/linkedin-preview" className="hover:text-foreground">
                  LinkedIn Preview
                </Link>
              </li>
              <li>
                <Link href="/discord-preview" className="hover:text-foreground">
                  Discord Embed Preview
                </Link>
              </li>
              <li>
                <Link href="/slack-preview" className="hover:text-foreground">
                  Slack Unfurl Preview
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-semibold">Resources</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/blog/og-image-size-guide" className="hover:text-foreground">
                  OG Image Size Guide
                </Link>
              </li>
              <li>
                <Link href="/blog/fix-facebook-preview" className="hover:text-foreground">
                  Fix Facebook Preview
                </Link>
              </li>
              <li>
                <Link href="/blog/twitter-card-tutorial" className="hover:text-foreground">
                  Twitter Card Tutorial
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-semibold">Company</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/pricing" className="hover:text-foreground">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-foreground">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-foreground">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} SharePreview. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
