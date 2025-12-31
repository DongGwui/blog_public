/**
 * Application DTOs
 * 모든 DTO를 re-export
 */

// Pagination
export type {
  PaginatedListDTO,
  PaginationRequestDTO,
  PaginationResponseDTO,
} from './PaginationDTO';
export { DEFAULT_PAGE, DEFAULT_PER_PAGE, MAX_PER_PAGE, normalizePagination } from './PaginationDTO';

// Post
export type {
  GetPostRequestDTO,
  GetPostsByCategoryRequestDTO,
  GetPostsByTagRequestDTO,
  GetPostsRequestDTO,
  IncrementViewRequestDTO,
  IncrementViewResponseDTO,
  SearchPostsRequestDTO,
} from './PostDTO';

// Project
export type { GetProjectRequestDTO, GetProjectsRequestDTO } from './ProjectDTO';
