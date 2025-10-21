# Bakstunden Ad Implementation Strategy

## 🎯 Ad Placement Strategy

### 1. **Sticky Ads (High Revenue, Low UX Impact)**
- **Sticky Footer (728x90)**: `hbagency_space_241541`
- **Sticky Left Banner (300x600)**: `hbagency_space_241542`
- **Placement**: Global layout (layout.js)
- **SEO Impact**: ✅ Minimal - positioned outside main content
- **UX Impact**: ⚠️ Medium - can be closed by users

### 2. **Content Ads (High Revenue, Medium UX Impact)**
- **In-Page Ads**: `hbagency_space_241545`
- **Placement**: Recipe pages, homepage, category pages
- **SEO Impact**: ✅ Good - contextual placement
- **UX Impact**: ⚠️ Medium - integrated with content

### 3. **Image Ads (Medium Revenue, Low UX Impact)**
- **In-Image Ads**: `hbagency_space_241544`
- **Placement**: Recipe hero images
- **SEO Impact**: ✅ Good - doesn't affect content structure
- **UX Impact**: ✅ Low - overlay on images

### 4. **Interstitial Ads (High Revenue, High UX Impact)**
- **Interstitial**: `hbagency_space_241543`
- **Placement**: Page transitions (use sparingly)
- **SEO Impact**: ⚠️ Medium - can affect page load
- **UX Impact**: ❌ High - interrupts user flow

## 📍 Specific Ad Placements

### Recipe Pages (`/recept/[slug]`)
1. **Between recipe content and related recipes** - In-Page Ad
2. **After related recipes section** - In-Page Ad
3. **Sticky footer and left banner** - Global sticky ads

### Homepage (`/`)
1. **Between seasonal inspiration and social proof** - In-Page Ad
2. **Sticky footer and left banner** - Global sticky ads

### Category Pages (`/kategorier`)
1. **Between categories and CTA section** - In-Page Ad
2. **Sticky footer and left banner** - Global sticky ads

### Recipe Listing (`/recept`)
1. **Between recipe grid and pagination** - In-Page Ad
2. **Sticky footer and left banner** - Global sticky ads

## 🚀 SEO Optimization

### ✅ SEO-Friendly Features
- **Lazy Loading**: Ads load only when visible
- **Non-blocking**: Ads don't affect page load speed
- **Semantic HTML**: Proper ad labeling
- **Mobile Responsive**: Works on all devices
- **Accessibility**: Screen reader friendly

### 📊 Core Web Vitals Impact
- **LCP**: Minimal impact - ads load after content
- **FID**: No impact - ads are non-interactive
- **CLS**: Minimal impact - ads have fixed dimensions

## 🎨 User Experience

### ✅ UX-Friendly Features
- **Close buttons** on sticky ads
- **Loading states** with skeleton animations
- **Responsive design** for all screen sizes
- **Non-intrusive** placement
- **Contextual relevance** to content

### 📱 Mobile Optimization
- **Sticky left banner hidden** on mobile
- **Smaller sticky footer** on mobile
- **Touch-friendly** close buttons
- **Optimized spacing** for mobile

## 💰 Revenue Optimization

### High-Value Placements
1. **Recipe pages** - High engagement, long session time
2. **Homepage** - High traffic, good visibility
3. **Category pages** - Targeted audience, good CTR

### Ad Frequency
- **Recipe pages**: 2-3 ads per page
- **Homepage**: 1-2 ads per page
- **Category pages**: 1-2 ads per page
- **Listing pages**: 1 ad per page

## 🔧 Technical Implementation

### Ad Manager Features
- **Lazy loading** for performance
- **User preferences** (ads on/off)
- **A/B testing** support
- **Analytics integration**
- **Error handling**

### Performance Monitoring
- **Ad load times**
- **User engagement**
- **Revenue tracking**
- **Core Web Vitals** monitoring

## 📈 Expected Results

### Revenue Impact
- **+40-60%** revenue increase
- **High CPM** from sticky ads
- **Good CTR** from content ads
- **Premium placements** for better rates

### SEO Impact
- **Minimal negative impact** on rankings
- **Maintained page speed** scores
- **Good user signals** from relevant ads
- **Enhanced monetization** without SEO penalty

## 🎯 Recommendations

### Phase 1 (Immediate)
- ✅ Implement sticky ads (footer + left banner)
- ✅ Add content ads to recipe pages
- ✅ Add homepage ad placement

### Phase 2 (Next 2 weeks)
- 🔄 A/B test ad placements
- 🔄 Optimize ad placements based performance
- 🔄 Add more content ads to category pages

### Phase 3 (Future)
- 🔄 Consider interstitial ads for high-value pages
- 🔄 Implement advanced ad targeting
- 🔄 Add video ad support

## 🚨 Important Notes

### Ad Blocking Considerations
- **Respect user preferences** for ad blocking
- **Provide value** to users who see ads
- **Don't over-saturate** with ads
- **Maintain content quality** above all

### Legal Compliance
- **GDPR compliance** for EU users
- **Cookie consent** for ad tracking
- **Transparent labeling** of ads
- **User control** over ad preferences

## 📊 Monitoring & Analytics

### Key Metrics to Track
- **Ad viewability rates**
- **Click-through rates (CTR)**
- **Revenue per page view (RPM)**
- **User engagement metrics**
- **Core Web Vitals scores**

### Success Indicators
- **Revenue increase** without SEO penalty
- **Maintained user experience** scores
- **Good ad performance** metrics
- **Positive user feedback**

This strategy balances revenue generation with SEO optimization and user experience, ensuring sustainable growth for Bakstunden.
