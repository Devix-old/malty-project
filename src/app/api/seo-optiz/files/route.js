import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export const dynamic = 'force-dynamic';

const contentDirectory = path.join(process.cwd(), 'content');

// Security: Only allow in development/localhost
function isLocalRequest(request) {
  const host = request.headers.get('host') || '';
  return host.includes('localhost') || host.includes('127.0.0.1') || process.env.NODE_ENV === 'development';
}

/**
 * Calculate SEO issues/warnings for a file's frontmatter
 */
function analyzeFrontmatter(data, fallbackTitle) {
  try {
    const title = data?.title || fallbackTitle || '';
    const excerpt = data?.excerpt || '';
    const titleLength = title.length;
    const excerptLength = excerpt.length;

    const issues = [];
    const warnings = [];

    // Required fields
    if (!data?.title) issues.push('missing-title');
    if (!data?.excerpt) issues.push('missing-excerpt');
    if (!data?.slug) issues.push('missing-slug');
    if (!data?.category) issues.push('missing-category');
    if (!data?.publishedAt) issues.push('missing-publishedAt');
    if (!data?.updatedAt) issues.push('missing-updatedAt');

    // Title length
    if (titleLength > 0) {
      if (titleLength < 50) issues.push('title-too-short');
      else if (titleLength > 60) issues.push('title-too-long');
      else if (titleLength < 52 || titleLength > 58) warnings.push('title-near-limit');
    }

    // Excerpt length
    if (excerptLength > 0) {
      if (excerptLength < 150) issues.push('excerpt-too-short');
      else if (excerptLength > 160) issues.push('excerpt-too-long');
      else if (excerptLength < 152 || excerptLength > 158) warnings.push('excerpt-near-limit');
    }

    // Optional but valuable fields
    if (!data?.tags || (Array.isArray(data.tags) && data.tags.length === 0)) warnings.push('no-tags');
    if (!data?.heroImage) warnings.push('no-hero-image');
    if (!data?.author) warnings.push('no-author');

    return {
      title,
      titleLength,
      excerptLength,
      issues,
      warnings,
    };
  } catch (error) {
    console.error('Error in analyzeFrontmatter:', error);
    return {
      title: fallbackTitle || '',
      titleLength: 0,
      excerptLength: 0,
      issues: ['analysis-error'],
      warnings: [],
    };
  }
}

/**
 * Get all MDX files from a directory
 */
function getContentFiles(type) {
  const dir = path.join(contentDirectory, type);
  if (!fs.existsSync(dir)) {
    return [];
  }
  return fs.readdirSync(dir).filter(file => file.endsWith('.mdx'));
}

export async function GET(request) {
  // Security check
  if (!isLocalRequest(request)) {
    return Response.json({ error: 'Not allowed' }, { status: 403 });
  }

  try {
    const files = [];
    const scanErrors = [];
    const directories = ['recipes', 'articles', 'posts'];

    for (const dir of directories) {
      try {
        const dirFiles = getContentFiles(dir);
        
        for (const file of dirFiles) {
          const slug = file.replace(/\.mdx$/, '');
          const filePath = path.join(contentDirectory, dir, file);

          try {
            const fileContents = fs.readFileSync(filePath, 'utf8');
            const { data } = matter(fileContents);

            const analysis = analyzeFrontmatter(data, slug);
            
            files.push({
              slug,
              filename: file,
              path: `${dir}/${file}`,
              title: analysis.title || slug,
              directory: dir,
              titleLength: analysis.titleLength,
              excerptLength: analysis.excerptLength,
              issues: analysis.issues,
              warnings: analysis.warnings,
              issueCount: analysis.issues.length,
              warningCount: analysis.warnings.length,
              hasIssues: analysis.issues.length > 0,
              hasWarnings: analysis.warnings.length > 0,
            });
          } catch (fileError) {
            console.error(`Error parsing ${filePath}:`, fileError);
            scanErrors.push({ 
              file: `${dir}/${file}`, 
              message: fileError.message,
              stack: fileError.stack 
            });

            // Still add file to list with error status
            files.push({
              slug,
              filename: file,
              path: `${dir}/${file}`,
              title: slug,
              directory: dir,
              titleLength: slug.length,
              excerptLength: 0,
              issues: ['parse-error'],
              warnings: [],
              issueCount: 1,
              warningCount: 0,
              hasIssues: true,
              hasWarnings: false,
              errorMessage: fileError.message,
            });
          }
        }
      } catch (dirError) {
        console.error(`Error reading directory ${dir}:`, dirError);
        scanErrors.push({ 
          directory: dir, 
          message: dirError.message 
        });
      }
    }

    return Response.json({ 
      files, 
      errors: scanErrors,
      total: files.length,
      withErrors: scanErrors.length
    });
  } catch (error) {
    console.error('Fatal error in GET /api/seo-optiz/files:', error);
    console.error('Error stack:', error.stack);
    return Response.json({ 
      error: 'Failed to read files', 
      details: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
      files: [],
      errors: []
    }, { status: 500 });
  }
}
