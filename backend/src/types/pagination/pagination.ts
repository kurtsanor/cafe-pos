export interface PaginatedResponse<T> {
  page: number;
  count: number;
  totalPages: number;
  data: T;
}
