import { MDXRemote } from 'next-mdx-remote/rsc';

export default async function BlogContent({ content }) {
  return (
    <div className="prose prose-lg max-w-none blog-content">
      <MDXRemote source={content} />
    </div>
  );
}

