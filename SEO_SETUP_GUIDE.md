# SEO & Indexing Setup Guide for Malty

## 🎯 Complete SEO Implementation

This guide covers the comprehensive SEO setup implemented for your Next.js site.

## 📋 What's Been Implemented

### 1. **Dynamic Sitemap** (`/sitemap.xml`)
- ✅ All static pages included
- ✅ All recipe pages dynamically generated
- ✅ All blog article pages included
- ✅ All category pages included
- ✅ Proper lastModified dates
- ✅ Change frequency and priority settings

### 2. **Robots.txt** (`/robots.txt`)
- ✅ Allows all search engines to crawl
- ✅ Points to sitemap location
- ✅ Blocks admin and API routes
- ✅ Optimized crawl delay

### 3. **Comprehensive Metadata**
- ✅ Open Graph tags for social sharing
- ✅ Twitter Card metadata
- ✅ Canonical URLs to prevent duplicate content
- ✅ Meta descriptions and keywords
- ✅ Author and publisher information
- ✅ Article publication dates

### 4. **Structured Data (JSON-LD)**
- ✅ Recipe schema for all recipe pages
- ✅ Article schema for blog posts
- ✅ Organization schema for site info
- ✅ Website schema with search functionality
- ✅ Breadcrumb navigation schema
- ✅ FAQ schema support
- ✅ ItemList schema for listing pages

### 5. **Technical SEO**
- ✅ Proper heading hierarchy (H1, H2, H3)
- ✅ Alt text for all images
- ✅ Semantic HTML structure
- ✅ Mobile-responsive design
- ✅ Fast loading with Next.js Image optimization
- ✅ Clean URLs with Swedish characters support

### 6. **Google Search Console Integration**
- ✅ Verification file ready (`/google-site-verification.html`)
- ✅ Sitemap submission ready
- ✅ Structured data validation ready

## 🚀 Next Steps for Production

### 1. **Environment Variables**
Create a `.env.local` file with:

```bash
# Site Configuration
NEXT_PUBLIC_SITE_URL=https://bakstunden.se
NEXT_PUBLIC_SITE_NAME=Malty

# Google Search Console Verification
GOOGLE_SITE_VERIFICATION=your_verification_code_here

# Analytics (Optional)
NEXT_PUBLIC_GA_ID=your_google_analytics_id_here
```

### 2. **Google Search Console Setup**
1. Go to [Google Search Console](https://search.google.com/search-console)
2. Add your property (https://bakstunden.se)
3. Use the HTML file method for verification
4. Upload the verification code to `/google-site-verification.html`
5. Submit your sitemap: `https://bakstunden.se/sitemap.xml`

### 3. **Additional SEO Tools**
- **Google Analytics**: Track user behavior and conversions
- **Google Tag Manager**: Manage tracking codes
- **Bing Webmaster Tools**: Submit sitemap to Bing
- **Yandex Webmaster**: For Russian search engine

### 4. **Content Optimization**
- ✅ All recipe pages have proper meta descriptions
- ✅ All images have descriptive alt text
- ✅ Internal linking between related recipes
- ✅ Category and tag pages for better organization

### 5. **Performance Optimization**
- ✅ Next.js Image optimization
- ✅ Static generation for fast loading
- ✅ Proper caching headers
- ✅ Compressed assets

## 📊 SEO Features by Page Type

### **Homepage**
- Website schema with search functionality
- Organization schema
- Featured recipes list schema
- Comprehensive meta tags

### **Recipe Pages**
- Recipe schema with ingredients, instructions, nutrition
- Breadcrumb navigation
- Related recipes suggestions
- Author and publication information

### **Blog Pages**
- Article schema
- Author information
- Publication dates
- Related articles

### **Category Pages**
- ItemList schema for recipe collections
- Category-specific meta descriptions
- Filtered content organization

## 🔍 SEO Monitoring

### **Tools to Use**
1. **Google Search Console**: Monitor indexing and search performance
2. **Google PageSpeed Insights**: Check page speed
3. **Google Rich Results Test**: Validate structured data
4. **Screaming Frog**: Technical SEO audit
5. **Ahrefs/SEMrush**: Keyword tracking and competitor analysis

### **Key Metrics to Track**
- Organic search traffic
- Click-through rates (CTR)
- Average position in search results
- Core Web Vitals scores
- Mobile usability
- Index coverage

## 🎯 Swedish SEO Optimization

### **Language-Specific Features**
- ✅ Swedish language declaration (`lang="sv"`)
- ✅ Swedish locale in Open Graph (`locale: 'sv_SE'`)
- ✅ Swedish keywords and meta descriptions
- ✅ Swedish structured data content
- ✅ Proper handling of Swedish characters in URLs

### **Local SEO Considerations**
- Swedish recipe categories
- Local cooking terminology
- Swedish food culture references
- Seasonal content optimization

## 🚀 Advanced SEO Features

### **Schema Markup Types**
- Recipe schema with cooking times and difficulty
- Article schema with author and publication info
- Organization schema with social media links
- Breadcrumb schema for navigation
- FAQ schema for common questions
- ItemList schema for recipe collections

### **Social Media Integration**
- Open Graph tags for Facebook sharing
- Twitter Card metadata
- Instagram integration ready
- Pinterest optimization

### **Performance Features**
- Static site generation (SSG)
- Image optimization with Next.js
- Lazy loading for images
- Efficient caching strategies

## 📈 Expected SEO Benefits

1. **Better Search Rankings**: Comprehensive metadata and structured data
2. **Rich Snippets**: Recipe cards in search results
3. **Social Sharing**: Optimized Open Graph tags
4. **Mobile Performance**: Responsive design and fast loading
5. **User Experience**: Clear navigation and breadcrumbs
6. **Content Discovery**: Proper categorization and tagging

## 🔧 Maintenance

### **Regular Tasks**
- Monitor Google Search Console for errors
- Update sitemap when adding new content
- Check structured data validation
- Monitor Core Web Vitals
- Update meta descriptions for better CTR

### **Content Updates**
- Add new recipes with proper SEO metadata
- Update existing content for freshness
- Monitor keyword performance
- Optimize based on search analytics

Your site is now fully optimized for search engines with comprehensive SEO implementation! 🎉
