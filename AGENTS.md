# AGENTS.md

## Project Summary

**ShareLint** is a Next.js SaaS application that checks and validates how URLs appear on social media platforms (Facebook, Twitter, LinkedIn, Discord, Slack). It extracts meta tags, validates against platform requirements, and generates fix code.

**Live URL**: https://sharelint.com (or https://sharepreview.vercel.app)

---

## AI Search Visibility Analysis

### Current Technical Signals

| Signal | Status | Notes |
|--------|--------|-------|
| Robots.txt | ✅ Allows crawling | Explicit rules for GPTBot, PerplexityBot, ClaudeBot, anthropic-ai |
| Sitemap.xml | ✅ Present | Dynamic generation via Next.js, includes all content pages |
| JSON-LD Schema | ✅ Comprehensive | WebApplication, FAQPage, HowTo, Article schemas implemented |
| OpenGraph Tags | ✅ Present | Dynamic OG image via `/api/og` |
| Meta Description | ✅ Present | 150 chars, includes primary keywords |
| Canonical URLs | ✅ Present | Set on all major pages via `alternates.canonical` |
| llms.txt | ✅ Present | AI guidance file at `/llms.txt` |
| dateModified | ✅ Present | All schemas include dateModified for freshness signals |

### AI Crawler Accessibility

| AI System | User-Agent Pattern | Allowed | Notes |
|-----------|-------------------|---------|-------|
| GPTBot (ChatGPT) | GPTBot | ✅ Yes | Not blocked in robots.txt |
| Perplexity | PerplexityBot | ✅ Yes | Not blocked in robots.txt |
| Claude | ClaudeBot / anthropic-ai | ✅ Yes | Not blocked in robots.txt |
| Bing Copilot | bingbot | ✅ Yes | Follows standard bingbot rules |
| Google AI Overviews | Googlebot | ✅ Yes | max-snippet: -1 allows full extraction |

---

## Actionable Recommendations

### HIGH PRIORITY

#### 1. Add Comprehensive FAQ Schema to Tool Pages
**Where**: `src/app/{platform}-preview/page.tsx`  
**What**: Add FAQPage JSON-LD schema  
**Why**: AI systems heavily cite FAQ structured data for direct answers

```typescript
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is the ideal og:image size for Facebook?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "1200x630 pixels is the recommended Open Graph image size for Facebook..."
      }
    }
  ]
};
```

#### 2. Add HowTo Schema to Fix Pages
**Where**: `src/app/fix/[slug]/page.tsx`  
**What**: Add HowTo JSON-LD for step-by-step solutions  
**Why**: AI systems extract and cite HowTo content for procedural queries

#### 3. Add Canonical URLs
**Where**: Each page's metadata export  
**What**: Add `alternates.canonical` to Next.js metadata  
**Why**: Prevents duplicate content confusion for AI crawlers

```typescript
export const metadata: Metadata = {
  alternates: {
    canonical: 'https://sharelint.com/guides/og-image-size',
  },
};
```

### MEDIUM PRIORITY

#### 4. Create llms.txt File
**Where**: `public/llms.txt`  
**What**: Structured guidance file for LLMs  
**Why**: Emerging standard for AI-specific crawl guidance

```text
# ShareLint - Social Media Preview Checker
> Check how URLs appear on Facebook, Twitter, LinkedIn, Discord before sharing

## Core Tools
- /facebook-preview - Facebook link preview checker
- /twitter-preview - Twitter card validator
- /linkedin-preview - LinkedIn post preview tester
- /discord-preview - Discord embed preview checker

## Documentation
- /guides/ - Platform-specific image size and meta tag guides
- /fix/ - Troubleshooting guides for preview issues
```

#### 5. Enhance Content Sections with Clear Headings
**Where**: Guide and fix page content  
**What**: Use semantic H2/H3 structure with question-based headings  
**Why**: AI systems extract content by heading sections for citations

#### 6. Add "Last Updated" Timestamps
**Where**: All content pages  
**What**: Display and include `dateModified` in schema  
**Why**: AI systems prefer citing recently updated content

### LOW PRIORITY

#### 7. Add Article Schema to Blog Posts
**Where**: `src/app/blog/[slug]/page.tsx`  
**What**: Article or TechArticle JSON-LD  

#### 8. Create Comparison Tables in Markdown/HTML
**Where**: Compare pages  
**What**: Use semantic `<table>` elements with clear headers  
**Why**: AI systems can extract and cite tabular data

---

## Verification Commands

```bash
# Check robots.txt
curl https://sharelint.com/robots.txt

# Check sitemap
curl https://sharelint.com/sitemap.xml

# Test structured data (use Google's Rich Results Test)
# https://search.google.com/test/rich-results

# Check if AI bots can access (simulate GPTBot)
curl -A "GPTBot/1.0" https://sharelint.com/

# Validate JSON-LD syntax
npx jsonld-lint public/schema.json
```

---

## Content Gap Analysis for AI Visibility

### Queries ShareLint Should Appear For

| Query Intent | Current Coverage | Recommended Action |
|--------------|-----------------|-------------------|
| "facebook preview not showing" | ✅ /fix/facebook-preview-not-showing | Add FAQ schema |
| "og image size 2024" | ✅ /guides/og-image-size | Add date to content |
| "twitter card validator" | ✅ /twitter-preview | Add comparison to official tool |
| "how to fix linkedin preview" | ⚠️ Limited | Create dedicated fix page |
| "discord embed image size" | ✅ /discord-preview | Ensure specs in content |
| "open graph generator" | ⚠️ Feature exists | Highlight generator feature in content |
| "sharelint vs metatags.io" | ❌ Missing | Create comparison page |

---

## Files to Modify

Priority implementation order:

1. `src/app/facebook-preview/page.tsx` - Add FAQPage schema
2. `src/app/twitter-preview/page.tsx` - Add FAQPage schema  
3. `src/app/fix/[slug]/page.tsx` - Add HowTo schema
4. `public/llms.txt` - Create AI guidance file
5. `src/app/layout.tsx` - Add SoftwareApplication schema enhancements
6. All page files - Add canonical URLs

---

## Monitoring AI Visibility

### Manual Checks
1. Search "facebook preview checker" in ChatGPT, Perplexity, Bing Copilot
2. Note if ShareLint is cited or recommended
3. Track which pages get cited

### Automated (Future)
- Set up Google Search Console for AI Overview impressions
- Monitor referrer logs for AI bot user agents
