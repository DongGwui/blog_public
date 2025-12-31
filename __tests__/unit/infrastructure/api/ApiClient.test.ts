import axios from 'axios';

import { ApiClient, createApiClient, ApiError } from '@/infrastructure/api/ApiClient';

jest.mock('axios');

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('ApiClient', () => {
  let apiClient: ApiClient;
  const mockAxiosInstance = {
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
    interceptors: {
      request: { use: jest.fn() },
      response: { use: jest.fn() },
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockedAxios.create.mockReturnValue(mockAxiosInstance as unknown as ReturnType<typeof axios.create>);
    apiClient = createApiClient({ baseURL: 'http://localhost:8080/api/public' });
  });

  describe('createApiClient', () => {
    it('should create axios instance with base URL', () => {
      expect(mockedAxios.create).toHaveBeenCalledWith(
        expect.objectContaining({
          baseURL: 'http://localhost:8080/api/public',
        })
      );
    });

    it('should set default headers', () => {
      expect(mockedAxios.create).toHaveBeenCalledWith(
        expect.objectContaining({
          headers: expect.objectContaining({
            'Content-Type': 'application/json',
          }),
        })
      );
    });

    it('should set default timeout', () => {
      expect(mockedAxios.create).toHaveBeenCalledWith(
        expect.objectContaining({
          timeout: expect.any(Number),
        })
      );
    });
  });

  describe('get', () => {
    it('should make GET request with correct path', async () => {
      const mockResponse = { data: { id: 1, title: 'Test' } };
      mockAxiosInstance.get.mockResolvedValue(mockResponse);

      const result = await apiClient.get('/posts');

      expect(mockAxiosInstance.get).toHaveBeenCalledWith('/posts', undefined);
      expect(result).toEqual(mockResponse.data);
    });

    it('should make GET request with query params', async () => {
      const mockResponse = { data: { data: [], meta: {} } };
      mockAxiosInstance.get.mockResolvedValue(mockResponse);

      await apiClient.get('/posts', { params: { page: 1, per_page: 10 } });

      expect(mockAxiosInstance.get).toHaveBeenCalledWith('/posts', {
        params: { page: 1, per_page: 10 },
      });
    });
  });

  describe('post', () => {
    it('should make POST request with body', async () => {
      const mockResponse = { data: { view_count: 101 } };
      mockAxiosInstance.post.mockResolvedValue(mockResponse);

      const result = await apiClient.post('/posts/test-slug/view');

      expect(mockAxiosInstance.post).toHaveBeenCalledWith('/posts/test-slug/view', undefined, undefined);
      expect(result).toEqual(mockResponse.data);
    });
  });

  describe('error handling', () => {
    it('should throw ApiError on network error', async () => {
      const networkError = new Error('Network Error');
      mockAxiosInstance.get.mockRejectedValue(networkError);

      await expect(apiClient.get('/posts')).rejects.toThrow(ApiError);
    });

    it('should throw ApiError with status code on response error', async () => {
      const responseError = {
        response: {
          status: 404,
          data: { message: 'Not found' },
        },
      };
      mockAxiosInstance.get.mockRejectedValue(responseError);

      try {
        await apiClient.get('/posts/unknown');
      } catch (error) {
        expect(error).toBeInstanceOf(ApiError);
        expect((error as ApiError).statusCode).toBe(404);
        expect((error as ApiError).message).toBe('Not found');
      }
    });

    it('should throw ApiError with default message on unknown error', async () => {
      const unknownError = {
        response: {
          status: 500,
          data: {},
        },
      };
      mockAxiosInstance.get.mockRejectedValue(unknownError);

      try {
        await apiClient.get('/posts');
      } catch (error) {
        expect(error).toBeInstanceOf(ApiError);
        expect((error as ApiError).statusCode).toBe(500);
      }
    });
  });
});

describe('ApiError', () => {
  it('should create error with message and status code', () => {
    const error = new ApiError('Not found', 404);

    expect(error.message).toBe('Not found');
    expect(error.statusCode).toBe(404);
    expect(error.name).toBe('ApiError');
  });

  it('should be instance of Error', () => {
    const error = new ApiError('Test error', 500);

    expect(error).toBeInstanceOf(Error);
    expect(error).toBeInstanceOf(ApiError);
  });
});
