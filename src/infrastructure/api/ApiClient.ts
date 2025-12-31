/**
 * API Client
 * HTTP 요청을 처리하는 클라이언트 레이어
 */

import axios, { AxiosInstance, AxiosRequestConfig, AxiosError } from 'axios';

/**
 * API 에러 클래스
 */
export class ApiError extends Error {
  constructor(
    message: string,
    public readonly statusCode: number,
    public readonly data?: unknown
  ) {
    super(message);
    this.name = 'ApiError';

    // Error 클래스를 상속할 때 필요한 설정
    Object.setPrototypeOf(this, ApiError.prototype);
  }
}

/**
 * API 클라이언트 인터페이스
 */
export interface ApiClient {
  get<T>(path: string, config?: AxiosRequestConfig): Promise<T>;
  post<T>(path: string, data?: unknown, config?: AxiosRequestConfig): Promise<T>;
  put<T>(path: string, data?: unknown, config?: AxiosRequestConfig): Promise<T>;
  delete<T>(path: string, config?: AxiosRequestConfig): Promise<T>;
}

/**
 * API 클라이언트 설정 옵션
 */
export interface ApiClientConfig {
  baseURL: string;
  timeout?: number;
}

/**
 * API 클라이언트 생성
 */
export function createApiClient(config: ApiClientConfig): ApiClient {
  const axiosInstance: AxiosInstance = axios.create({
    baseURL: config.baseURL,
    timeout: config.timeout ?? 10000,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  /**
   * 에러 처리 함수
   */
  const handleError = (error: unknown): never => {
    // response가 있는 에러 객체 체크 (axios 에러 또는 유사한 형태)
    const errorWithResponse = error as { response?: { status: number; data?: { message?: string } } };

    if (errorWithResponse.response) {
      const statusCode = errorWithResponse.response.status;
      const message = errorWithResponse.response.data?.message || getDefaultErrorMessage(statusCode);
      throw new ApiError(message, statusCode, errorWithResponse.response.data);
    }

    // axios 에러 체크 (네트워크 에러 등)
    if (axios.isAxiosError(error)) {
      throw new ApiError('네트워크 오류가 발생했습니다.', 0);
    }

    // 알 수 없는 에러
    throw new ApiError('네트워크 오류가 발생했습니다.', 0);
  };

  return {
    async get<T>(path: string, config?: AxiosRequestConfig): Promise<T> {
      try {
        const response = await axiosInstance.get<T>(path, config);
        return response.data;
      } catch (error) {
        return handleError(error);
      }
    },

    async post<T>(path: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
      try {
        const response = await axiosInstance.post<T>(path, data, config);
        return response.data;
      } catch (error) {
        return handleError(error);
      }
    },

    async put<T>(path: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
      try {
        const response = await axiosInstance.put<T>(path, data, config);
        return response.data;
      } catch (error) {
        return handleError(error);
      }
    },

    async delete<T>(path: string, config?: AxiosRequestConfig): Promise<T> {
      try {
        const response = await axiosInstance.delete<T>(path, config);
        return response.data;
      } catch (error) {
        return handleError(error);
      }
    },
  };
}

/**
 * 상태 코드별 기본 에러 메시지
 */
function getDefaultErrorMessage(statusCode: number): string {
  switch (statusCode) {
    case 400:
      return '잘못된 요청입니다.';
    case 401:
      return '인증이 필요합니다.';
    case 403:
      return '접근이 거부되었습니다.';
    case 404:
      return '요청한 리소스를 찾을 수 없습니다.';
    case 500:
      return '서버 오류가 발생했습니다.';
    default:
      return '오류가 발생했습니다.';
  }
}

/**
 * 기본 API 클라이언트 인스턴스 생성
 */
let defaultApiClient: ApiClient | null = null;

export function getApiClient(): ApiClient {
  if (!defaultApiClient) {
    const baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api/public';
    defaultApiClient = createApiClient({ baseURL });
  }
  return defaultApiClient;
}
