/**
 * Post Use Cases
 * 글 관련 모든 Use Cases를 re-export
 */

export type { GetPostUseCase } from './GetPost';
export { createGetPostUseCase } from './GetPost';

export type { GetPostsUseCase } from './GetPosts';
export { createGetPostsUseCase } from './GetPosts';

export type { GetPostsByCategoryUseCase } from './GetPostsByCategory';
export { createGetPostsByCategoryUseCase } from './GetPostsByCategory';

export type { GetPostsByTagUseCase } from './GetPostsByTag';
export { createGetPostsByTagUseCase } from './GetPostsByTag';

export type { IncrementViewUseCase } from './IncrementView';
export { createIncrementViewUseCase } from './IncrementView';

export type { SearchPostsUseCase } from './SearchPosts';
export { createSearchPostsUseCase } from './SearchPosts';
