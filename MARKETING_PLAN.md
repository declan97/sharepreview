# SharePreview Marketing Plan: $10K/Month Goal

## Revenue Model & Funnel Math

### Pricing Structure
| Plan | Price | Target % of Paid |
|------|-------|------------------|
| Pro | $9/mo | 70% |
| Business | $29/mo | 20% |
| API | $49/mo | 10% |

### Blended ARPU (Average Revenue Per User)
```
ARPU = (0.70 × $9) + (0.20 × $29) + (0.10 × $49)
ARPU = $6.30 + $5.80 + $4.90
ARPU = $17/month
```

### Customers Needed for $10K/month
```
$10,000 ÷ $17 = ~588 paying customers
```

### Funnel Conversion Assumptions (Conservative)
| Stage | Rate | Notes |
|-------|------|-------|
| Visitor → Free User | 8% | Industry avg for tools: 5-15% |
| Free User → Paid | 3% | Freemium SaaS avg: 2-5% |
| Overall: Visitor → Paid | 0.24% | 8% × 3% |

### Monthly Visitors Needed
```
588 customers ÷ 0.24% conversion = ~245,000 visitors total
```

But wait—this is CUMULATIVE customers. Let's think about MONTHLY acquisition:

### Monthly Growth Model
Assuming 5% monthly churn (typical for low-cost SaaS):
- To maintain 588 customers, need to replace: 588 × 5% = ~30 churned/month
- To grow, need additional new customers

**Month-by-month to 588 customers (aggressive 6-month timeline):**

| Month | Target Customers | New Needed | Visitors Needed |
|-------|------------------|------------|-----------------|
| 1 | 50 | 50 | 20,833 |
| 2 | 120 | 73 | 30,417 |
| 3 | 220 | 106 | 44,167 |
| 4 | 350 | 141 | 58,750 |
| 5 | 480 | 148 | 61,667 |
| 6 | 588 | 132 | 55,000 |

**Total visitors needed over 6 months: ~270,000**
**Average: ~45,000 visitors/month**

---

## Traffic Acquisition Strategy

### Channel Mix (Fastest Path to Revenue)

| Channel | % of Traffic | Monthly Visitors | Time to Results |
|---------|-------------|------------------|-----------------|
| **SEO (Organic)** | 50% | 22,500 | 2-4 months |
| **Content/Blog** | 20% | 9,000 | 1-3 months |
| **Social/Viral** | 15% | 6,750 | Immediate |
| **Referral/Word of Mouth** | 10% | 4,500 | Ongoing |
| **Paid (if needed)** | 5% | 2,250 | Immediate |

---

## SEO Strategy (Primary Channel)

### High-Intent Keywords to Target

**Tier 1: Direct Tool Searches (Highest Intent)**
| Keyword | Monthly Volume | Difficulty | Priority |
|---------|---------------|------------|----------|
| facebook link preview checker | 1,900 | Medium | HIGH |
| twitter card validator | 2,400 | Medium | HIGH |
| linkedin post preview | 1,600 | Medium | HIGH |
| discord embed preview | 880 | Low | HIGH |
| og image checker | 720 | Low | HIGH |
| open graph preview | 590 | Low | HIGH |
| social media preview tool | 480 | Low | HIGH |

**Tier 2: Problem-Aware Searches**
| Keyword | Monthly Volume | Difficulty | Priority |
|---------|---------------|------------|----------|
| facebook preview not showing | 2,900 | Medium | HIGH |
| twitter card not working | 1,300 | Medium | HIGH |
| linkedin image not showing | 1,100 | Medium | HIGH |
| og:image not working | 590 | Low | MEDIUM |
| fix facebook link preview | 480 | Low | HIGH |

**Tier 3: Educational/Informational**
| Keyword | Monthly Volume | Difficulty | Priority |
|---------|---------------|------------|----------|
| og image size | 5,400 | Medium | MEDIUM |
| twitter card size | 3,600 | Medium | MEDIUM |
| open graph meta tags | 2,900 | High | MEDIUM |
| facebook share image size | 2,400 | Medium | MEDIUM |

### Pages to Create/Optimize

**Already Have (Optimize):**
- `/facebook-preview` - Target: "facebook link preview checker"
- `/twitter-preview` - Target: "twitter card validator"
- `/linkedin-preview` - Target: "linkedin post preview"
- `/discord-preview` - Target: "discord embed preview"

**Need to Create:**
1. `/tools/og-image-checker` - Target: "og image checker", "open graph checker"
2. `/tools/meta-tag-generator` - Target: "og meta tag generator"
3. `/fix/facebook-preview-not-showing` - Target: "facebook preview not showing"
4. `/fix/twitter-card-not-working` - Target: "twitter card not working"
5. `/guides/og-image-size` - Target: "og image size" (5,400/mo!)
6. `/guides/twitter-card-size` - Target: "twitter card size" (3,600/mo!)

---

## Technical SEO Checklist

### Immediate Actions (Do Now)
- [x] Sitemap.xml exists
- [ ] Add structured data (JSON-LD) for SoftwareApplication
- [ ] Add FAQ schema to platform pages
- [ ] Optimize meta descriptions for CTR
- [ ] Add canonical URLs
- [ ] Ensure all images have alt text
- [ ] Add robots.txt optimization
- [ ] Create/optimize robots meta tags
- [ ] Add Open Graph tags to all pages (eat our own dog food!)
- [ ] Submit to Google Search Console
- [ ] Submit to Bing Webmaster Tools

### Page Speed & Core Web Vitals
- [ ] Verify LCP < 2.5s
- [ ] Verify FID < 100ms
- [ ] Verify CLS < 0.1
- [ ] Optimize images (WebP, lazy loading)

### Internal Linking
- [ ] Link platform pages to each other
- [ ] Link blog posts to tool pages
- [ ] Add breadcrumbs
- [ ] Create hub pages for topic clusters

---

## Content Strategy (Quick Wins)

### Blog Posts to Write (Ordered by Impact)
1. "The Complete Guide to OG Image Sizes in 2024" (5,400 searches/mo)
2. "Twitter Card Sizes: The Definitive Guide" (3,600 searches/mo)
3. "Facebook Link Preview Not Showing? Here's the Fix" (2,900 searches/mo)
4. "Open Graph Meta Tags: Everything You Need to Know" (2,900 searches/mo)
5. "LinkedIn Image Dimensions for Posts and Links" (1,100 searches/mo)

### Content Format
Each post should:
- Answer the search query in the first paragraph
- Include our tool as the solution
- Have a clear CTA to use SharePreview
- Include FAQ section (for featured snippets)
- Be 1,500-2,500 words for SEO

---

## Quick Wins (First 30 Days)

### Week 1: Technical Foundation
1. Add JSON-LD schema to all pages
2. Optimize meta titles/descriptions for target keywords
3. Submit to Search Console
4. Set up Google Analytics 4 + conversion tracking

### Week 2: Content & Pages
1. Create `/fix/` pages for problem keywords
2. Optimize existing platform pages for target keywords
3. Publish first high-volume blog post

### Week 3: Backlinks & Distribution
1. Submit to product directories (Product Hunt, etc.)
2. Post in relevant subreddits (r/webdev, r/marketing, etc.)
3. Create Twitter/X thread about link previews
4. Reach out to marketing newsletters

### Week 4: Iterate & Scale
1. Analyze Search Console data
2. Double down on what's working
3. Publish second blog post
4. Start building email list from free users

---

## Conversion Optimization

### Increase Free → Paid Conversion
Current assumption: 3%
Target: 5% (would reduce traffic needs by 40%)

**Tactics:**
1. Show upgrade prompts after 3rd check of the day
2. Add "Pro features" preview (grayed out)
3. Email nurture sequence for free users
4. Show value metrics ("You've checked 47 URLs this month")

### Increase Visitor → Free User
Current assumption: 8%
Target: 12%

**Tactics:**
1. Reduce friction (already no signup required)
2. Show instant value (demo section - DONE)
3. Add social proof with real numbers
4. Create urgency ("Your preview might be broken right now")

---

## Tracking & KPIs

### Weekly Metrics to Track
- Organic traffic (Search Console)
- Conversion rate (Visitor → Check)
- Free → Paid conversion
- Revenue (Stripe)
- Keyword rankings (top 20 targets)

### Monthly Reviews
- Channel performance
- Content ROI
- Churn rate
- ARPU changes

---

## Summary: Path to $10K/Month

| Milestone | Timeline | Key Actions |
|-----------|----------|-------------|
| Technical SEO Complete | Week 1 | Schema, meta, Search Console |
| First Rankings | Month 2 | Platform pages ranking |
| 100 Paying Customers | Month 2-3 | ~$1,700/mo |
| Blog Traffic Growing | Month 3 | High-volume posts indexed |
| 300 Paying Customers | Month 4 | ~$5,100/mo |
| SEO Compounding | Month 5-6 | Multiple pages ranking |
| 588 Paying Customers | Month 6 | $10,000/mo |

**The fastest path:** SEO + strategic content targeting high-intent keywords, combined with conversion optimization to maximize every visitor.
