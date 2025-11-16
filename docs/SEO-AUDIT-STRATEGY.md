# 🔍 Comprehensive SEO Audit & Growth Strategy
## Bakstunden - Full SEO Assessment & Action Plan

**Date:** January 2025  
**Auditor Role:** Senior SEO Expert (20+ years)  
**Scope:** Complete application audit for recipe website

---

## 📊 Executive Summary

**Current Status:** Good foundation with solid technical SEO, but significant opportunities for growth.

**Key Findings:**
- ✅ Strong technical foundation (structured data, sitemaps, meta tags)
- ⚠️ Content quality inconsistencies across recipes
- ⚠️ Keyword strategy needs refinement
- ⚠️ Missing critical on-page elements
- ⚠️ Image optimization gaps
- ⚠️ Internal linking can be improved
- ⚠️ No content clusters/topic authority strategy

**Potential Impact:** With proper implementation, 3-5x organic traffic increase within 6-12 months.

---

## 🚨 CRITICAL ISSUES (Fix Immediately - Week 1)

### 1. **Missing Alt Text on Hero Images**
**Problem:** Many recipe hero images have generic or missing alt text
- Example: `alt: "Gravad lax"` should be `alt: "Gravad lax recept - klassisk svensk gravad lax med dill och citron serverad på bröd"`

**Impact:** High - Accessibility issue + missed SEO opportunity

**Fix:**
```javascript
// Update all MDX files - alt text must:
// 1. Include primary keyword naturally
// 2. Be descriptive (50-100 chars)
// 3. Describe what's visible in image
```

**Action Items:**
- Audit all 78+ recipes for alt text quality
- Create alt text template: `"[Recipe name] recept - [visual description] [serving context]"`
- Example: `"Kladdkaka recept - mörk chokladkaka med kladdig konsistens serverad med vispad grädde och jordgubbar"`

### 2. **Inconsistent Meta Descriptions**
**Problem:** Some recipes use exact excerpt, missing CTR optimization

**Fix:**
- Meta descriptions should be 150-160 characters
- Include primary keyword in first 50 characters
- Add call-to-action or value proposition
- Include numbers (time, servings) when possible

**Template:** `"[Primary keyword] - [Value prop] | [Time] min | [Servings] portioner | [CTA]"`

### 3. **Missing H2 Structure in Content**
**Problem:** Content body lacks proper H2 headings for keyword optimization

**Fix:** Every recipe content should have at least 2-3 H2 headings:
```markdown
## [Primary Keyword] – [Benefit]
## Så lagar du [Primary Keyword]
## Tips för bästa [Primary Keyword]
## Serveringsförslag till [Primary Keyword]
```

### 4. **Keyword Cannibalization Risk**
**Problem:** Multiple recipes target same keywords without differentiation
- Example: "kladdkaka recept" appears in many files

**Fix:** Each recipe must target unique keyword intent:
- `klassisk-kladdkaka-recept.mdx` → "klassisk kladdkaka recept"
- `snabb-kladdkaka-recept.mdx` → "snabb kladdkaka recept"
- Differentiate by modifier (klassisk, snabb, enkel, mörk, etc.)

---

## 📝 CONTENT QUALITY ASSESSMENT

### Current MDX File Review

**Strengths:**
✅ Good frontmatter structure  
✅ Proper structured data  
✅ FAQs included  
✅ Tips sections valuable  

**Critical Issues Found:**

#### Issue 1: Content Length Inconsistency
- **Problem:** Some recipes have 50 words, others 300+
- **Standard:** Minimum 300 words, optimal 500-800 words
- **Why:** Google favors comprehensive content that fully answers query

**Required Content Structure:**
```
1. Opening paragraph (100 words) - includes primary keyword 2-3x naturally
2. H2: "Så lagar du [recipe]" (150-200 words) - process overview
3. H2: "Tips för bästa resultat" (100-150 words) - expert tips
4. H2: "Varianter och variationer" (50-100 words) - alternatives
5. H2: "Serveringsförslag" (50-100 words) - pairing ideas
6. Closing paragraph (50-100 words) - personal touch
```

#### Issue 2: Keyword Density Issues
**Problem:** Primary keyword not appearing frequently enough in content

**Optimal Distribution:**
- First 100 words: Primary keyword 2-3x
- H1: Primary keyword (natural)
- H2 headings: 1-2x with keyword
- Throughout content: 1-2% keyword density
- Last 100 words: Primary keyword 1x

#### Issue 3: Missing Long-Tail Keywords
**Problem:** Only targeting head terms, missing question-based queries

**Opportunity:** Add sections targeting:
- "hur man lagar [recipe]"
- "[recipe] recept enkelt"
- "[recipe] recept snabbt"
- "bästa [recipe] recept"
- "[recipe] recept svensk"

---

## 🔧 TECHNICAL SEO FIXES

### 1. **Sitemap Enhancements**

**Current:** Basic sitemap with recipes and categories  
**Missing:**
- Last modified dates not accurate
- Priority scores not optimized
- Missing image sitemap
- No news/article sitemap

**Fix:**
```javascript
// Update sitemap.js to include:
1. Image sitemap for all recipe images
2. Priority based on:
   - Homepage: 1.0
   - Popular recipes: 0.9
   - Regular recipes: 0.8
   - Categories: 0.7
   - Static pages: 0.6
3. Change frequency based on update frequency
```

### 2. **Robots.txt Optimization**

**Current:** Basic allow/disallow  
**Enhancement:**
```txt
# Add crawl budget optimization
Crawl-delay: 0 (remove delay)

# Allow important paths explicitly
Allow: /recept/
Allow: /kategorier/
Allow: /stories/

# Block duplicate content sources
Disallow: /api/
Disallow: /_next/
```

### 3. **Missing Canonical Tags**
**Check:** Verify all pages have proper canonical tags
- Recipe pages: ✅ Present
- Category pages: ⚠️ Need verification
- Homepage: ⚠️ Need verification

### 4. **Structured Data Enhancements**

**Current:** Good Recipe schema  
**Missing:**
- VideoObject schema (if videos exist)
- BreadcrumbList on all pages
- HowTo schema for steps (can enhance Recipe schema)
- Review/Rating schema (if user reviews exist)

**Add:**
```javascript
// Enhanced HowTo schema for steps
{
  "@type": "HowTo",
  "name": recipe.title,
  "step": recipe.steps.map(step => ({
    "@type": "HowToStep",
    "position": step.order,
    "name": step.title,
    "text": step.description,
    "image": step.image // Add step images!
  }))
}
```

---

## 🎯 KEYWORD STRATEGY & RESEARCH

### Current State Analysis

**Strengths:**
- Good primary keyword coverage
- Swedish market focus clear

**Gaps:**
1. Missing question keywords
2. No topic clustering
3. Limited long-tail coverage
4. Seasonal keywords not leveraged

### Recommended Keyword Expansion

#### Tier 1: High-Value Head Terms (Competitive)
- "kladdkaka recept"
- "pannkakor recept"
- "kyckling recept"
- "lax recept"

**Strategy:** Create pillar content + supporting variations

#### Tier 2: Long-Tail Gold (Lower Competition, High Intent)
Target these patterns:

**Question Intent:**
- "hur gör man [recipe]"
- "hur lång tid tar det att laga [recipe]"
- "vilka ingredienser behövs för [recipe]"
- "varför blir min [recipe] [problem]"
- "hur förvarar man [recipe]"

**Comparative Intent:**
- "[recipe] vs [alternative]"
- "skillnaden mellan [recipe A] och [recipe B]"
- "bästa [recipe] recept"

**Modifier Intent:**
- "enkelt [recipe] recept"
- "snabbt [recipe] recept"
- "snabb [recipe] recept"
- "nyttigt [recipe] recept"
- "vegetarisk [recipe]"

#### Tier 3: Seasonal & Trending
- "[recipe] till jul"
- "[recipe] till påsk"
- "[recipe] till midsommar"
- "[recipe] recept 2025" (update yearly)

### Keyword Mapping Strategy

**Create Content Clusters:**

```
Cluster 1: Kladdkaka
├── Pillar: "Kladdkaka recept - komplett guide"
├── Support: "klassisk kladdkaka recept"
├── Support: "snabb kladdkaka recept"
├── Support: "mörk choklad kladdkaka recept"
├── Support: "vegetarisk kladdkaka recept"
├── Support: "hur gör man kladdkaka"
└── Support: "bästa kladdkaka recept"
```

**Implementation:**
- Create 1 pillar page per cluster (3000+ words)
- Link all related recipes to pillar
- Use consistent internal linking structure

---

## 📈 ON-PAGE SEO IMPROVEMENTS

### 1. **Title Tag Optimization**

**Current Issue:** Some titles don't include primary keyword at start

**Rule:** Primary keyword must be first 3 words of title

**Templates:**
```
[Primary Keyword] recept – [Benefit/Description]
[Primary Keyword] – [Time] min | [Servings] port | [Benefit]
```

**Examples:**
- ❌ "Filips bästa kladdkaka – klassisk dessert"
- ✅ "Kladdkaka recept – Filips bästa klassiska dessert"

### 2. **Meta Description Formula**

**Template:**
```
[Primary keyword] recept - [Unique value prop]. [Time] min | [Servings] portioner | [Dietary info]. [CTA: Prova idag!]
```

**Character Count:** 150-160 (optimal for SERP display)

**Example:**
- ✅ "Kladdkaka recept – klassisk svensk chokladkaka med perfekt kladdig konsistens. 25 min | 8 portioner | Glutenfritt alternativ. Prova receptet idag!"

### 3. **URL Structure**

**Current:** Good slug structure  
**Enhancement:** Ensure all slugs include primary keyword

**Pattern:** `/[primary-keyword]-recept` or `/[recipe-name]-recept`

### 4. **H1/H2/H3 Optimization**

**Rules:**
- Only ONE H1 per page (recipe title)
- H2 must include primary keyword or close variant
- Use H3 for subsections
- Never skip heading levels (H1 → H2 → H3)

**Template:**
```markdown
# [Primary Keyword] Recept

## Så lagar du [Primary Keyword]
## Tips för bästa [Primary Keyword]
### Variationer och alternativ
### Serveringsförslag
## Vanliga frågor om [Primary Keyword]
```

### 5. **Internal Linking Enhancement**

**Current:** Basic related recipes  
**Enhancement:**

**Add Contextual Internal Links:**
- In content, link to related recipes naturally
- Link to category pages from relevant mentions
- Link to ingredient pages (if created)
- Create topic clusters with pillar pages

**Example:**
```
"...det här kladdkaka recept fungerar lika bra som vårt klassiska kladdkaka recept..."
[Links to: /recept/klassisk-kladdkaka-recept]
```

### 6. **External Linking Strategy**

**Current:** Missing  
**Add:**
- Link to authoritative sources (ICA, Arla, etc.) when relevant
- Link to nutritional information
- Link to ingredient suppliers (build trust)

**Rule:** 2-3 external links per recipe (high-quality, relevant)

---

## 🎨 CONTENT STRATEGY

### 1. **Content Depth Requirements**

**Minimum Standards Per Recipe:**

| Element | Minimum | Optimal |
|---------|---------|---------|
| Word Count | 300 | 500-800 |
| Images | 1 | 3-5 |
| H2 Headings | 2 | 3-4 |
| Internal Links | 2 | 4-6 |
| External Links | 0 | 2-3 |
| FAQs | 3 | 5-6 |
| Tips | 2 | 3-4 |

### 2. **Content Templates**

**Create standardized templates for:**
- Classic recipes
- Quick recipes
- Traditional recipes
- Modern twists
- Dietary variations

### 3. **Content Freshness Strategy**

**Update Frequency:**
- High-traffic recipes: Quarterly review
- Seasonal recipes: Update annually
- All recipes: Refresh metadata yearly

**Update Checklist:**
- [ ] Refresh dates (updatedAt)
- [ ] Review and update tips
- [ ] Add new FAQs based on search trends
- [ ] Update images if needed
- [ ] Refresh internal links

### 4. **Content Gaps Analysis**

**Missing Content Types:**
1. **Ingredient Guides** (e.g., "Vad är dill och hur används det?")
2. **Technique Guides** (e.g., "Hur gräddar man i vattenbad")
3. **Equipment Guides** (e.g., "Bästa springform till kladdkaka")
4. **Meal Planning Content** (e.g., "Veckomeny med kladdkaka")
5. **Dietary Guides** (e.g., "Vegetariska alternativ till kyckling")

**Priority:** Create these as supporting content for recipe clusters

### 5. **User-Generated Content Strategy**

**Add:**
- Recipe ratings (already have structure)
- User reviews/comments
- User-submitted photos
- Recipe variations from community

**SEO Benefit:** Fresh content signals + E-E-A-T boost

---

## 🔗 LINK BUILDING & AUTHORITY

### Internal Linking Strategy

**Current:** Basic related recipes  
**Enhanced Strategy:**

1. **Hub & Spoke Model:**
   - Create category hub pages
   - Link all recipes to hub
   - Link hubs to homepage

2. **Contextual Linking:**
   - Link naturally within content
   - Use descriptive anchor text (not "click here")
   - Link to 3-5 related recipes per page

3. **Breadcrumb Enhancement:**
   - Ensure all pages have breadcrumbs
   - Make breadcrumbs clickable
   - Add breadcrumb schema

### External Link Building

**Strategies:**
1. **Resource Pages:** Create valuable guides, get natural backlinks
2. **Recipe Roundups:** Submit to food blogs for inclusion
3. **Press Coverage:** Reach out to Swedish food media
4. **Social Proof:** Get featured on recipe aggregators

---

## ⚡ PERFORMANCE OPTIMIZATION

### 1. **Image Optimization**

**Current Issues:**
- Missing image sitemap
- Inconsistent alt text
- No lazy loading strategy

**Fixes:**
```javascript
// All images must have:
1. Descriptive alt text (50-100 chars)
2. Proper sizing (Next.js Image handles this)
3. WebP/AVIF format (configured ✅)
4. Lazy loading for below-fold images
5. Image schema markup
```

### 2. **Core Web Vitals**

**Check:**
- [ ] LCP (Largest Contentful Paint) < 2.5s
- [ ] FID (First Input Delay) < 100ms
- [ ] CLS (Cumulative Layout Shift) < 0.1

**Optimizations:**
- Preload hero images
- Minimize JavaScript
- Optimize fonts
- Use CDN for images

### 3. **Mobile Optimization**

**Checklist:**
- [ ] All images responsive
- [ ] Text readable without zoom
- [ ] Tap targets ≥ 44x44px
- [ ] Fast mobile load times

---

## 📊 IMPLEMENTATION ROADMAP

### Phase 1: Critical Fixes (Week 1-2)

**Priority 1 - Content Quality:**
- [ ] Audit all 78 recipes for minimum word count
- [ ] Add missing H2 headings to all recipes
- [ ] Fix all alt text to include keywords
- [ ] Standardize meta descriptions

**Priority 2 - Technical:**
- [ ] Create image sitemap
- [ ] Optimize robots.txt
- [ ] Verify all canonical tags
- [ ] Add missing structured data

**Priority 3 - Keywords:**
- [ ] Create keyword mapping document
- [ ] Update titles to include primary keywords first
- [ ] Fix keyword cannibalization issues

### Phase 2: Enhancement (Week 3-6)

**Content Expansion:**
- [ ] Create 5-10 pillar pages for main categories
- [ ] Add 20-30 supporting long-tail content pieces
- [ ] Build content clusters around top keywords
- [ ] Create ingredient and technique guides

**Link Building:**
- [ ] Optimize internal linking structure
- [ ] Create hub pages for categories
- [ ] Build contextual link network
- [ ] Start external outreach

### Phase 3: Growth (Month 2-3)

**Advanced SEO:**
- [ ] Implement FAQ schema on all recipes
- [ ] Add video schema (if videos exist)
- [ ] Create seasonal content calendar
- [ ] Build topic authority in 3-5 categories

**Content Production:**
- [ ] Publish 2-3 new recipes per week
- [ ] Create comparison content
- [ ] Build user-generated content features
- [ ] Add recipe variations section

### Phase 4: Optimization (Month 4-6)

**Continuous Improvement:**
- [ ] A/B test title tags
- [ ] Monitor keyword rankings
- [ ] Analyze competitor content
- [ ] Refresh top-performing content
- [ ] Expand successful content clusters

---

## 🎯 KEYWORD RESEARCH TOOLKIT

### Recommended Tools:
1. **Google Keyword Planner** - Search volume data
2. **Ahrefs/SEMrush** - Competitor analysis
3. **Google Search Console** - Current queries
4. **AnswerThePublic** - Question-based keywords
5. **Google Trends** - Seasonal patterns

### Priority Keywords to Target:

**High Volume (1000+ searches/month):**
- kladdkaka recept
- pannkakor recept
- kyckling recept
- lasagne recept

**Medium Volume (100-1000 searches/month):**
- klassisk kladdkaka recept
- snabba pannkakor recept
- kyckling i ugn recept
- vegetarisk lasagne recept

**Long-Tail Gold (10-100 searches/month):**
- hur gör man kladdkaka recept
- enkla pannkakor recept 2 personer
- kryddig kyckling recept snabbt

---

## 📋 CONTENT QUALITY CHECKLIST

For every new recipe, ensure:

**Frontmatter:**
- [ ] Primary keyword in title (first 3 words)
- [ ] Descriptive excerpt (150-160 chars)
- [ ] All required fields populated
- [ ] Accurate dates
- [ ] Proper category assignment

**Content:**
- [ ] Minimum 300 words (optimal 500-800)
- [ ] Primary keyword in first 100 words (2-3x)
- [ ] At least 2-3 H2 headings with keywords
- [ ] Primary keyword in at least one H2
- [ ] Natural keyword distribution (1-2% density)
- [ ] Primary keyword in last 100 words

**Images:**
- [ ] Hero image with descriptive alt text
- [ ] Alt text includes primary keyword naturally
- [ ] Images properly optimized (WebP/AVIF)
- [ ] Image filenames descriptive

**SEO Elements:**
- [ ] Meta description optimized
- [ ] URL slug includes primary keyword
- [ ] Internal links (3-5 per page)
- [ ] External links (2-3 per page)
- [ ] FAQ schema present
- [ ] Recipe schema complete

**User Experience:**
- [ ] Clear ingredient list
- [ ] Step-by-step instructions
- [ ] Helpful tips section
- [ ] Serving suggestions
- [ ] Storage instructions

---

## 🚀 QUICK WINS (Can Implement Today)

1. **Fix Alt Text** - 2 hours, high impact
2. **Add H2 Headings** - 4 hours, medium impact
3. **Optimize Meta Descriptions** - 6 hours, high impact
4. **Create Image Sitemap** - 1 hour, medium impact
5. **Add Missing FAQs** - 8 hours, high impact
6. **Fix Keyword Cannibalization** - 4 hours, high impact

**Total Time:** ~25 hours  
**Expected Impact:** 20-30% traffic increase

---

## 📈 SUCCESS METRICS

**Track Monthly:**
- Organic traffic growth
- Keyword rankings
- Click-through rate (CTR) from SERP
- Average position in Google
- Pages indexed
- Core Web Vitals scores

**Target Goals (6 months):**
- 3-5x increase in organic traffic
- Top 3 ranking for 10+ primary keywords
- Top 10 ranking for 50+ long-tail keywords
- CTR improvement of 2-3%
- 100+ pages ranking on page 1

---

## 💡 FINAL RECOMMENDATIONS

### Top 5 Priorities:

1. **Content Quality** - Fix word count and structure across all recipes
2. **Keyword Optimization** - Ensure primary keywords in titles, H2s, content
3. **Internal Linking** - Build topic clusters and contextual links
4. **Image SEO** - Fix all alt text and create image sitemap
5. **Content Expansion** - Create pillar pages and supporting content

### Long-Term Strategy:

Focus on **Topic Authority** in Swedish recipe market:
- Become #1 resource for "kladdkaka recept"
- Own "pannkakor recept" category
- Build comprehensive guides for top 10 recipe categories

**Competitive Advantage:** 
- Higher content quality than competitors
- Better technical SEO
- More comprehensive answers
- Better user experience

---

**Next Steps:**
1. Review and prioritize this document
2. Create task list in project management tool
3. Assign resources to each phase
4. Set up tracking and reporting
5. Begin Phase 1 implementation immediately

---

*This audit is based on best practices from 20+ years of SEO experience and current Google ranking factors as of 2025.*

