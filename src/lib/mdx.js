import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDirectory = path.join(process.cwd(), 'content');

/**
 * Get all files from a directory
 */
export function getContentFiles(type) {
  const dir = path.join(contentDirectory, type);
  if (!fs.existsSync(dir)) {
    return [];
  }
  return fs.readdirSync(dir).filter(file => file.endsWith('.mdx'));
}

/**
 * Get content by slug with MDX content (for RSC)
 */
export async function getContentBySlug(type, slug) {
  const filePath = path.join(contentDirectory, type, `${slug}.mdx`);
  
  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    frontmatter: data,
    content, // Raw MDX content for MDXRemote RSC
    slug,
  };
}

/**
 * Get all content of a specific type
 */
export async function getAllContent(type) {
  const files = getContentFiles(type);
  
  const content = await Promise.all(
    files.map(async (file) => {
      const slug = file.replace(/\.mdx$/, '');
      const filePath = path.join(contentDirectory, type, file);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data } = matter(fileContents);
      
      return {
        slug,
        ...data,
      };
    })
  );

  // Sort by publishedAt date (newest first)
  return content.sort((a, b) => {
    return new Date(b.publishedAt) - new Date(a.publishedAt);
  });
}

/**
 * Get related content based on tags and category
 */
export async function getRelatedContent(type, currentSlug, tags, category, limit = 6) {
  const allContent = await getAllContent(type);
  
  const scored = allContent
    .filter(item => item.slug !== currentSlug)
    .map(item => {
      let score = 0;
      
      // Same category = +3 points
      if (item.category === category) score += 3;
      
      // Each shared tag = +2 points
      const sharedTags = item.tags?.filter(tag => tags?.includes(tag)) || [];
      score += sharedTags.length * 2;
      
      return { ...item, score };
    })
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);

  return scored;
}

