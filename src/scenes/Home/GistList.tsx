import React, { useEffect, useMemo, useState } from 'react';
import GistItem from './GistItem';
import { useQuery } from '~/api';

type Props = {
  setPageCount: any;
  sinceDate: string | null;
  currentPage: number;
};

const GistList = ({ currentPage, setPageCount, sinceDate }: Props) => {
  const { data, loading, error, headers, refetch } = useQuery(
    `gists?per_page=20&page=${currentPage}${sinceDate ? `&since=${sinceDate}` : ''}`
  );

  useEffect(() => {
    refetch();
  }, [currentPage, sinceDate])

  useEffect(() => {
    if (headers) {
      if(headers.get('Link') !== null){
        const matches = headers.get('Link')!.match(/(?<=&page=)\d+(?<!rel="last"*.+)/gs);
        const pageCount = matches![matches!.length - 1];
        setPageCount(pageCount);
      } else{
        setPageCount(1);
      }
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
