import React, { useEffect, useMemo, useState } from 'react';
import GistItem from './GistItem';
import { useQuery } from '~/api';

type Props = {
  setPageCount: any;
  currentPage: number;
};

const GistList = ({ currentPage, setPageCount }: Props) => {
  const { data, loading, error, headers, refetch } = useQuery(
    `gists?per_page=20&page=${currentPage}&order=desc`
  );

  useEffect(() => {
    refetch();
  }, [currentPage])

  useEffect(() => {
    if (headers) {
      const matches = headers.get('Link')!.match(/(?<=&page=)\d+(?<!rel="last"*.+)/gs);
      const pageCount = matches![matches!.length - 1];
      setPageCount(pageCount);
    }
  }, [headers]);

  const gists = useMemo(() => {
    return data?.map((gist: any) => {
      return <GistItem key={gist.id} id={gist.id} />;
    });
  }, [data]);

  if (error) {
    return <div>{error}</div>;
  }

  if (loading) {
    return <div></div>;
  }

  return <div>{gists}</div>;
};

export default GistList;
