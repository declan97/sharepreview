"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "./ui/button";
import { LogoIcon } from "./icons/logo-icon";
import { Menu, X, ChevronDown } from "lucide-react";

const navLinks = [
  { href: "/facebook-preview", label: "Facebook" },
  { href: "/twitter-preview", label: "Twitter" },
  { href: "/linkedin-preview", label: "LinkedIn" },
  { href: "/discord-preview", label: "Discord" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 lg:h-18">
        {/* Logo */}
        <div className="flex items-center gap-8">
          <Link href="/" className="group flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-[0_2px_8px_rgba(249,115,22,0.3)] transition-all duration-200 group-hover:shadow-[0_4px_16px_rgba(249,115,22,0.4)] group-hover:-translate-y-0.5">
              <LogoIcon className="h-5 w-5" />
            </div>
            <span className="text-xl font-semibold tracking-tight">
              Share<span className="text-primary">Preview</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
            <div className="relative group">
              <button className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
                Resources
                <ChevronDown className="h-4 w-4 opacity-50" />
              </button>
              {/* Dropdown */}
              <div className="invisible absolute left-0 top-full pt-2 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
                <div className="w-56 rounded-xl border border-border bg-card p-2 shadow-lg">
                  <Link
                    href="/guides/og-image-size"
                    className="block rounded-lg px-3 py-2 text-sm hover:bg-muted"
                  >
                    OG Image Size Guide
                  </Link>
                  <Link
                    href="/guides/twitter-card-size"
                    className="block rounded-lg px-3 py-2 text-sm hover:bg-muted"
                  >
                    Twitter Card Size Guide
                  </Link>
                  <Link
                    href="/fix/facebook-preview-not-showing"
                    className="block rounded-lg px-3 py-2 text-sm hover:bg-muted"
                  >
                    Fix Facebook Preview
                  </Link>
                  <Link
                    href="/fix/twitter-card-not-working"
                    className="block rounded-lg px-3 py-2 text-sm hover:bg-muted"
                  >
                    Fix Twitter Card
                  </Link>
                </div>
              </div>
            </div>
            <Link
              href="/pricing"
              className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
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
              Get Pro
              <span className="ml-1.5 rounded-md bg-white/20 px-1.5 py-0.5 text-[10px] font-semibold uppercase">
                Free Trial
              </span>
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-border lg:hidden"
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
        <div className="border-t border-border bg-background lg:hidden">
          <nav className="container mx-auto flex flex-col gap-1 px-4 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-lg px-3 py-3 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/pricing"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-lg px-3 py-3 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              Pricing
            </Link>
            <hr className="my-2 border-border" />
            <Link
              href="/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-lg px-3 py-3 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              Dashboard
            </Link>
            <Link href="/pricing" onClick={() => setMobileMenuOpen(false)}>
              <Button className="mt-2 w-full">
                Get Pro
                <span className="ml-1.5 rounded-md bg-white/20 px-1.5 py-0.5 text-[10px] font-semibold uppercase">
                  Free Trial
                </span>
              </Button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
