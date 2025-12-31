import type { ApiResponse, Post, PostListItem } from '@/domain/entities';

/**
 * Post Repository Interface
 * 글 데이터 접근을 위한 추상화 레이어
 */

export interface GetPostsParams {
  page?: number;
  perPage?: number;
  categoryId?: number;
  tagId?: number;
}

export interface SearchPostsParams {
  query: string;
  page?: number;
  perPage?: number;
}

export interface IPostRepository {
  /**
   * 글 목록 조회
   */
  getPosts(params?: GetPostsParams): Promise<ApiResponse<PostListItem[]>>;

  /**
   * 글 상세 조회
   */
  getPost(slug: string): Promise<ApiResponse<Post>>;

  /**
   * 글 검색
   */
  searchPosts(params: SearchPostsParams): Promise<ApiResponse<PostListItem[]>>;

  /**
   * 조회수 증가
   */
  incrementView(slug: string): Promise<{ view_count: number }>;

  /**
   * 카테고리별 글 목록 조회
   */
  getPostsByCategory(
    categorySlug: string,
    params?: { page?: number; perPage?: number }
  ): Promise<ApiResponse<PostListItem[]>>;

  /**
   * 태그별 글 목록 조회
   */
  getPostsByTag(
    tagSlug: string,
    params?: { page?: number; perPage?: number }
  ): Promise<ApiResponse<PostListItem[]>>;
}
