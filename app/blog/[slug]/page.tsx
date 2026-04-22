import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getBlogBySlug, getAllBlogSlugs } from "@/lib/blogs";
import TechnicalLayout from "@/components/blog/layouts/TechnicalLayout";
import CaseStudyLayout from "@/components/blog/layouts/CaseStudyLayout";
import BlogContent from "@/components/blog/BlogContent";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogBySlug(slug);
  if (!post) return {};
  return {
    title: post.frontmatter.title,
    description: post.frontmatter.description,
    openGraph: {
      title: post.frontmatter.title,
      description: post.frontmatter.description,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogBySlug(slug);
  if (!post) notFound();

  const body = <BlogContent content={post.content} accentColor={post.frontmatter.accentColor} />;

  if (post.frontmatter.layout === "caseStudy") {
    return <CaseStudyLayout post={post}>{body}</CaseStudyLayout>;
  }
  return <TechnicalLayout post={post}>{body}</TechnicalLayout>;
}
