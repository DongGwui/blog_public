/**
 * Post Repository Implementation
 * API를 통한 글 데이터 접근 구현체
 */

import type { ApiResponse, Post, PostListItem } from '@/domain/entities';
import type {
  IPostRepository,
  GetPostsParams,
  SearchPostsParams,
} from '@/domain/repositories';
import type { ApiClient } from '@/infrastructure/api/ApiClient';

export function createPostRepository(apiClient: ApiClient): IPostRepository {
  return {
    async getPosts(params?: GetPostsParams): Promise<ApiResponse<PostListItem[]>> {
      const queryParams: Record<string, string | number | undefined> = {};

      if (params?.page) {
        queryParams.page = params.page;
      }
      if (params?.perPage) {
        queryParams.per_page = params.perPage;
      }
      if (params?.categoryId) {
        queryParams.category_id = params.categoryId;
      }
      if (params?.tagId) {
        queryParams.tag_id = params.tagId;
      }

      return apiClient.get<ApiResponse<PostListItem[]>>('/posts', { params: queryParams });
    },

    async getPost(slug: string): Promise<ApiResponse<Post>> {
      return apiClient.get<ApiResponse<Post>>(`/posts/${slug}`);
    },

    async searchPosts(params: SearchPostsParams): Promise<ApiResponse<PostListItem[]>> {
      const queryParams: Record<string, string | number | undefined> = {
        q: params.query,
      };

      if (params.page) {
        queryParams.page = params.page;
      }
      if (params.perPage) {
        queryParams.per_page = params.perPage;
      }

      return apiClient.get<ApiResponse<PostListItem[]>>('/posts/search', { params: queryParams });
    },

    async incrementView(slug: string): Promise<{ view_count: number }> {
      return apiClient.post<{ view_count: number }>(`/posts/${slug}/view`);
    },

    async getPostsByCategory(
      categorySlug: string,
      params?: { page?: number; perPage?: number }
    ): Promise<ApiResponse<PostListItem[]>> {
      const queryParams: Record<string, string | number | undefined> = {};

      if (params?.page) {
        queryParams.page = params.page;
      }
      if (params?.perPage) {
        queryParams.per_page = params.perPage;
      }

      return apiClient.get<ApiResponse<PostListItem[]>>(`/categories/${categorySlug}/posts`, {
        params: queryParams,
      });
    },

    async getPostsByTag(
      tagSlug: string,
      params?: { page?: number; perPage?: number }
    ): Promise<ApiResponse<PostListItem[]>> {
      const queryParams: Record<string, string | number | undefined> = {};

      if (params?.page) {
        queryParams.page = params.page;
      }
      if (params?.perPage) {
        queryParams.per_page = params.perPage;
      }

      return apiClient.get<ApiResponse<PostListItem[]>>(`/tags/${tagSlug}/posts`, {
        params: queryParams,
      });
    },
  };
}
