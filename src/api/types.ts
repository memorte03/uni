export type MutationMethodTypes = 'POST' | 'DELETE' | 'PATCH';

export type UseQueryReturnType = {
  data: any;
  loading: boolean;
  error: null | string;
  headers: null | Headers;
  refetch: () => void;
};

export type UseMutationReturnType = [
  (body?: any) => any,
  {
    loading: boolean
    error: null | string;
  }
]

export type UseLazyQueryReturnType = {
  data: any;
  loading: boolean;
  error: null | string;
};

