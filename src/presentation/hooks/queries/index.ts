/**
 * Query Hooks
 * TanStack Query 훅들을 re-export
 */

// Posts
export { usePosts, usePostsByCategory, usePostsByTag, postsKeys } from './usePosts';
export type { UsePostsOptions, UsePostsByCategoryOptions, UsePostsByTagOptions } from './usePosts';

// Post detail
export { usePost, useIncrementView } from './usePost';
export type { UsePostOptions } from './usePost';

// Search
export { useSearch } from './useSearch';
export type { UseSearchOptions } from './useSearch';

// Projects
export { useProjects, useProject, projectsKeys } from './useProjects';
export type { UseProjectsOptions, UseProjectOptions } from './useProjects';

// Categories
export { useCategories, categoriesKeys } from './useCategories';
export type { UseCategoriesOptions } from './useCategories';

// Tags
export { useTags, tagsKeys } from './useTags';
export type { UseTagsOptions } from './useTags';
