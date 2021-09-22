import { useState, useEffect } from 'react';
import {
  MutationMethodTypes,
  UseQueryReturnType,
  UseMutationReturnType,
  UseQueryFetchDataType,
  UseMutationFetchDataType,
} from './types';

export const useQuery = (path: string): UseQueryReturnType => {
  // Probably the only easy way to remove unnecessary updates so let it be
  let fetchData:UseQueryFetchDataType = {loading: true, error: null, headers: null, data:null}
  const [state, setState] = useState<UseQueryFetchDataType>(fetchData);

  const refetch = () => {
    fetch('https://api.github.com/' + path, {
      method: 'GET',
      headers: {
        Accept: 'application/vnd.github.v3+json',
        Authorization: 'token ' + localStorage.getItem('token'),
      },
    })
      .then((res) => {
        fetchData = {...fetchData, headers: res.headers}
        if (!res.ok) {
          throw Error(res.status + ' ' + res.statusText);
        }
        return res.json();
      })
      .then((data) => {
        fetchData = {...fetchData, data: data, loading: false}
      })
      .catch((err) => {
        console.error(err.message);
        fetchData = {...fetchData, error: err}
      }).finally(() => {
        setState(fetchData);
      });
  };

  useEffect(() => {
    refetch();
  }, []);

  return {
    ...state,
    refetch: refetch
  };
};

export const useMutation = (
  path: string,
  method: MutationMethodTypes
): UseMutationReturnType => {
  // Probably the only easy way to remove unnecessary updates so let it be
  let fetchData:UseMutationFetchDataType = {loading: true, error: null}
  const [state, setState ] = useState<UseMutationFetchDataType>(fetchData);

  const mutate = (body?: any) => {
    return fetch('https://api.github.com/' + path, {
      method: method,
      headers: {
        Accept: 'application/vnd.github.v3+json',
        Authorization: 'token ' + localStorage.getItem('token'),
      },
      body: JSON.stringify(body),
    })
      .then((res) => {
        if (!res.ok) {
          throw Error(res.status + ' ' + res.statusText);
        }
        fetchData = { ...fetchData, loading: false}
        return res.json();
      })
      .catch((err) => {
        fetchData = { ...fetchData, error: err.message}
      }).finally(() => {
        setState(fetchData);
      });

  };

  return [mutate, state];
};

// export const useLazyQuery = (path: string): UseLazyQueryReturnType => {
//   const [error, setError] = useState<null | string>(null);
//   const [loading, setLoading] = useState(true);

//   const mutate = (body?: any) => {
//     return new Promise((resolve, reject) => {
//       fetch('https://api.github.com/' + path, {
//         method: 'GET',
//         headers: {
//           Accept: 'application/vnd.github.v3+json',
//           Authorization: 'token ' + localStorage.getItem('token'),
//         },
//         body: JSON.stringify(body),
//       })
//         .then((res) => {
//           if (!res.ok) {
//             throw Error(res.status + ' ' + res.statusText);
//           }
//           return res.json();
//         })
//         .then((data) => {
//           setLoading(false);
//         })
//         .catch((err) => {
//           console.error(err.message);
//           setError(err.message);
//         });
//     });
//   };

//   return [mutate, { loading: loading, error: error }];
// };
