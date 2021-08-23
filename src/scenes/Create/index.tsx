import React from 'react';
import FileList from '~c/FileList';
import { SubmitHandlerProps } from '~c/FileList/types';
import { useMutation } from '~/api';
import { useHistory } from 'react-router';

const Create = () => {
  const [createGist, { error }] = useMutation('gists', 'POST');
  const history = useHistory();

  const submitHandler = async ({ description, files }: SubmitHandlerProps) => {
    if (files) {
      let sortedFiles: any = {};

      files.forEach((file: any) => {
        sortedFiles[file.name] = { content: file.code };
      });

      await createGist({
        description: description,
        files: sortedFiles,
      });
      
      history.push('/');
    }
  };

  return (
    <div id='body-inner-wrapper'>
      {!!error && error}
      <div id='page-header'>Create gist</div>
      <FileList submitHandler={submitHandler} />
    </div>
  );
};

export default Create;
