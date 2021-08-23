import React, { useMemo } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import codeTheme from '~/codeTheme';
import relativeTime from 'dayjs/plugin/relativeTime';
import duration from 'dayjs/plugin/duration';
import CodeBlock from '~/components/CodeBlock';
import language from 'react-syntax-highlighter/dist/esm/languages/hljs/1c';
import { useQuery } from '~/api';

// import StarIcon from '~a/svg/small/star.svg';
// import FileIcon from '~a/svg/small/File.svg';
// import CommentIcon from '~a/svg/small/Comment.svg';
// import ForkIcon from '~a/svg/small/Fork.svg';
// import GistList from './GistList';

type Props = {
  id: string;
};

const GistItem = ({ id }: Props) => {
  const { data, loading, error } = useQuery('gists/' + id);

  dayjs.extend(relativeTime);
  dayjs.extend(duration);

  const codeBlock = useMemo(() => {
    if (data) {
      const file = data.files[Object.keys(data.files)[0]];
      return <CodeBlock content={file.content} fileName={file.filename} language={file.language} />;
    }
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
