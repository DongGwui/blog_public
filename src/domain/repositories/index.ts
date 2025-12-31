/**
 * Domain Repository Interfaces
 * 모든 Repository 인터페이스를 re-export
 */

// Post Repository
export type { GetPostsParams, IPostRepository, SearchPostsParams } from './IPostRepository';

// Category Repository
export type { ICategoryRepository } from './ICategoryRepository';

// Tag Repository
export type { ITagRepository } from './ITagRepository';

// Project Repository
export type { GetProjectsParams, IProjectRepository } from './IProjectRepository';
