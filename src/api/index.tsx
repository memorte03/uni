import { useState, useEffect, useCallback } from 'react';
import { javascript } from 'webpack';
import {
  MutationMethodTypes,
  UseQueryReturnType,
  UseLazyQueryReturnType,
  UseMutationReturnType,
} from './types';

export const useQuery = (path: string): UseQueryReturnType => {
  const [data, setData] = useState<any>(null);
  const [headers, setHeaders] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);

  const refetch = () => {
    fetch('https://api.github.com/' + path, {
      method: 'GET',
      headers: {
        Accept: 'application/vnd.github.v3+json',
        Authorization: 'token ' + localStorage.getItem('token'),
      },
    })
      .then((res) => {
        setHeaders(res.headers);
        if (!res.ok) {
          throw Error(res.status + ' ' + res.statusText);
        }
        return res.json();
      })
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err.message);
        setError(err.message);
      });
  };

  useEffect(() => {
    refetch();
  }, []);

  return {
    data: data,
    loading: loading,
    error: error,
    headers: headers,
    refetch: refetch,
  };
};

export const useMutation = (
  path: string,
  method: MutationMethodTypes
): UseMutationReturnType => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);

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
        setLoading(false);
        return res.json();
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  return [mutate, { loading: loading, error: error }];
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
