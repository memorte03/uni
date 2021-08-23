import React, { useMemo } from 'react';
import FileList from '~c/FileList';
import { useQuery } from '~/api';
import { useParams } from 'react-router';
import { SubmitHandlerProps } from '~c/FileList/types';
import { v4 as uuidv4 } from 'uuid';
import { useMutation } from '~/api';
import { useHistory } from 'react-router';

type ParamTypes = {
  id: string;
};

const Edit = () => {
  const { id } = useParams<ParamTypes>();
  const { data, loading, error } = useQuery('gists/' + id);
  const [editGist] = useMutation('gists/' + id, 'PATCH');
  const history = useHistory();

  const submitHandler = async ({ description, files }: SubmitHandlerProps) => {
    console.log(files);

    if (files) {
      let sortedFiles: any = {};
      files.forEach((file) => {
        if (file.isDeleted) {
          sortedFiles[file.initialName as string] = {};
        } else {
          sortedFiles[file.initialName ? file.initialName : file.name] = {
            content: file.code,
            filename: file.code ? file.name : '',
          };
        }
      });

      await editGist({
        description: description,
        files: sortedFiles,
      });

      history.push('/');
    }
  };

  const initialFiles = useMemo(() => {
    if (data) {
      let initialFiles: any = [];
      Object.keys(data.files).forEach((key) => {
        const file = data.files[key];
        initialFiles.push({
          id: uuidv4(),
          name: file.filename,
          code: file.content,
          initialName: file.filename,
        });
      });

      return initialFiles;
    }
  }, [data]);

  if (error) {
    return <div>{error}</div>;
  }

  if (loading) {
    return <div></div>;
  }

  return (
    <div id='body-inner-wrapper'>
      <div id='page-header'>Edit gist</div>
      <FileList
        editMode
        initialFiles={initialFiles}
        initialDescription={data.description}
        submitHandler={submitHandler}
      />
    </div>
  );
};

export default Edit;
