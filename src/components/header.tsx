"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "./ui/button";
import { LogoIcon } from "./icons/logo-icon";
import { Menu, X, ChevronDown, Sparkles } from "lucide-react";

const navLinks = [
  { href: "/facebook-preview", label: "Facebook" },
  { href: "/twitter-preview", label: "Twitter" },
  { href: "/linkedin-preview", label: "LinkedIn" },
  { href: "/discord-preview", label: "Discord" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/95 backdrop-blur-lg supports-[backdrop-filter]:bg-background/80">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 lg:h-[4.5rem]">
        {/* Logo */}
        <div className="flex items-center gap-10">
          <Link href="/" className="group flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground transition-all duration-200 group-hover:shadow-[0_0_0_4px_rgba(13,148,136,0.1)]">
              <LogoIcon className="h-5 w-5" />
            </div>
            <span className="text-lg font-bold tracking-tight">
              Share<span className="text-primary">Preview</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/features/monitoring"
              className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              Monitoring
            </Link>
            <div className="relative group">
              <button className="flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
                Resources
                <ChevronDown className="h-3.5 w-3.5 opacity-60 transition-transform duration-200 group-hover:rotate-180" />
              </button>
              {/* Dropdown */}
              <div className="invisible absolute left-0 top-full pt-2 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
                <div className="w-60 rounded-xl border border-border bg-card p-1.5 shadow-lg">
                  <Link
                    href="/guides/og-image-size"
                    className="block rounded-lg px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  >
                    <span className="font-medium text-foreground">OG Image Size Guide</span>
                    <span className="block text-xs mt-0.5 opacity-70">Optimal dimensions for all platforms</span>
                  </Link>
                  <Link
                    href="/guides/twitter-card-size"
                    className="block rounded-lg px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  >
                    <span className="font-medium text-foreground">Twitter Card Guide</span>
                    <span className="block text-xs mt-0.5 opacity-70">Summary vs Large Image cards</span>
                  </Link>
                  <div className="my-1.5 border-t border-border" />
                  <Link
                    href="/fix/facebook-preview-not-showing"
                    className="block rounded-lg px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  >
                    <span className="font-medium text-foreground">Fix Facebook Preview</span>
                    <span className="block text-xs mt-0.5 opacity-70">Troubleshoot blank previews</span>
                  </Link>
                  <Link
                    href="/fix/twitter-card-not-working"
                    className="block rounded-lg px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  >
                    <span className="font-medium text-foreground">Fix Twitter Card</span>
                    <span className="block text-xs mt-0.5 opacity-70">Resolve validation errors</span>
                  </Link>
                </div>
              </div>
            </div>
            <Link
              href="/pricing"
              className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              Pricing
            </Link>
          </nav>
        </div>

        {/* Desktop CTA */}
        <div className="hidden items-center gap-3 lg:flex">
          <Link href="/dashboard">
            <Button variant="ghost" size="sm">
              Dashboard
            </Button>
          </Link>
          <Link href="/pricing">
            <Button size="sm">
              <Sparkles className="h-3.5 w-3.5" />
              Get Pro
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-card transition-colors hover:bg-muted lg:hidden"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="border-t border-border bg-background lg:hidden animate-fade-in">
          <nav className="container mx-auto flex flex-col gap-1 px-4 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-lg px-3 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/features/monitoring"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-lg px-3 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              Monitoring
            </Link>
            <Link
              href="/pricing"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-lg px-3 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              Pricing
            </Link>
            <div className="my-2 border-t border-border" />
            <Link
              href="/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-lg px-3 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              Dashboard
            </Link>
            <Link href="/pricing" onClick={() => setMobileMenuOpen(false)}>
              <Button className="mt-2 w-full">
                <Sparkles className="h-4 w-4" />
                Get Pro
              </Button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
