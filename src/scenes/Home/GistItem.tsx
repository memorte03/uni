import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import duration from 'dayjs/plugin/duration';
import CodeBlock from '~/components/CodeBlock';
import { useQuery } from '~/api';

type Props = {
  id: string;
};

const GistItem = ({ id }: Props) => {
  const { data, loading, error } = useQuery('gists/' + id);

  dayjs.extend(relativeTime);
  dayjs.extend(duration);

  const codeBlock = useMemo(() => {
    if (data && Object.keys(data.files).length > 0) {
      const file = data.files[Object.keys(data.files)[0]];
      return <CodeBlock content={file.content} fileName={file.filename} language={file.language} />;
    }
    return <div className={'typography--big-label'}>Empty gist</div>
  }, [data]);

  
  const date = useMemo(() => {
    if( data){
      //TODO fix dayjs typings / change to a ts friendly library
      //@ts-ignore
      return dayjs(data.created_at).fromNow();
    }
  }, [ data ])
 
  if (error) {
    return <></>;
  }

  if (loading) {
    return <div></div>;
  }

  return (
    <Link to={'preview/' + id}>
      <div className='gist-item-wrapper'>
        <div className='gist-item__header-wrapper'>
          <div>
            <h1 className='typography--header'>{data.description}</h1>
          </div>
          {/* <div className='gist-item__header-right'>
            <div className='gist-item__prop'>
              <FileIcon className='gist-item__prop-icon' />
              {fileCount} files
            </div>

            <div className='gist-item__prop'>
              <ForkIcon className='gist-item__prop-icon' />
              {forkCount} forks
            </div>

            <div className='gist-item__prop'>
              <StarIcon className='gist-item__prop-icon' />
              {starCount} stars
            </div>

            <div className='gist-item__prop'>
              <CommentIcon className='gist-item__prop-icon' />
              {commentCount} comments
            </div>
          </div> */}
        </div>
        <div className={'gist-item__date'}>Created {date}</div>
        {codeBlock}
      </div>
    </Link>
  );
};

export default GistItem;
