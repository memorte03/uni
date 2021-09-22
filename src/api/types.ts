export type MutationMethodTypes = 'POST' | 'DELETE' | 'PATCH';

export type UseQueryReturnType = UseQueryFetchDataType & { 
  refetch: () => void;
};

export type UseQueryFetchDataType = {
  error: string | null, loading: boolean, headers: null | Headers, data: any 
}

export type UseMutationReturnType = [
  (body?: any) => any,
  UseMutationFetchDataType 
]

export type UseMutationFetchDataType = {
    loading: boolean
    error: null | string;
}

export type UseLazyQueryReturnType = {
  data: any;
  loading: boolean;
  error: null | string;
};

