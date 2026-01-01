/**
 * Dynamic Sitemap Generation
 * 블로그 글, 프로젝트 등 동적 URL을 포함한 sitemap 생성
 */

import type { MetadataRoute } from 'next';

import { getApiClient } from '@/infrastructure/api';
import { createPostRepository, createProjectRepository } from '@/infrastructure/repositories';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://blog.example.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const apiClient = getApiClient();
  const postRepository = createPostRepository(apiClient);
  const projectRepository = createProjectRepository(apiClient);

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${siteUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${siteUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${siteUrl}/search`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.5,
    },
  ];

  // Dynamic blog posts
  let postPages: MetadataRoute.Sitemap = [];
  try {
    const postsResponse = await postRepository.getPosts({ page: 1, perPage: 100 });
    if (postsResponse?.data) {
      postPages = postsResponse.data.map((post) => ({
        url: `${siteUrl}/blog/${post.slug}`,
        lastModified: post.published_at ? new Date(post.published_at) : new Date(post.created_at),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      }));
    }
  } catch (error) {
    console.error('Failed to fetch posts for sitemap:', error);
  }

  // Dynamic projects
  let projectPages: MetadataRoute.Sitemap = [];
  try {
    const projectsResponse = await projectRepository.getProjects();
    if (projectsResponse?.data) {
      projectPages = projectsResponse.data.map((project) => ({
        url: `${siteUrl}/projects/${project.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      }));
    }
  } catch (error) {
    console.error('Failed to fetch projects for sitemap:', error);
  }

  return [...staticPages, ...postPages, ...projectPages];
}
