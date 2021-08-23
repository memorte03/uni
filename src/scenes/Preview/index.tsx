import { useMutation, useQuery } from '~/api';
import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import CodeBlock from '~c/CodeBlock';

type ParamTypes = {
  id: string;
};

const Preview = () => {
  const { id } = useParams<ParamTypes>();
  const { data, loading, error } = useQuery('gists/' + id);
  const [deleteGist] = useMutation('gists/' + id, 'DELETE');

  const history = useHistory();

  const handleDelete = async () => {
    await deleteGist();
    history.push('/');
  };

  const handleEdit = () => {
    history.push('/edit/' + id);
  };

  const files = useMemo(() => {
    if (data) {
      return Object.keys(data.files).map((key: any, i) => {
        const file = data.files[key];

        return (
          <div className='preview-file-wrapper' key={i}>
            <CodeBlock
              content={file.content}
              language={file.language}
              fileName={file.filename}
            />
          </div>
        );
      });
    }
    return null;
  }, [data]);

  if (error) {
    return <div>{error}</div>;
  }

  if (loading) {
    return <div></div>;
  }

  return (
    <div id='body-inner-wrapper'>
      <div id='page-header'>
        {data.description}
        <div id='page-header-right'>
          <button className='btn' onClick={handleEdit}>
            Edit
          </button>
          <button className='btn btn--red' onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>
      {files}
    </div>
  );
};

export default Preview;
