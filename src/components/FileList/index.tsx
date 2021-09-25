import React, { useReducer, useState, useMemo } from 'react';
import { fileListReducer } from './fileListReducer';
import FileItem from './FileItem';
import { SubmitHandlerProps, FileType } from './types';
import { v4 as uuidv4 } from 'uuid';

type Props = {
  editMode?: boolean;
  initialFiles?: Array<FileType>;
  initialDescription?: string;
  submitHandler: ({ ...SubmitHandlerProps }) => void;
};

const FileList = ({
  editMode = false,
  initialFiles = [{ id: uuidv4(), name: '', code: '', initialName: null }],
  initialDescription,
  submitHandler,
}: Props) => {
  const [description, setDescription] = useState(
    initialDescription ? initialDescription : '',
  );
  const [state, dispatch] = useReducer(fileListReducer, initialFiles);

  const handleDescriptionInput = (e: any) => {
    setDescription(e.target.value);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    submitHandler({ description: description, files: state, isPublic: true });
  };

  const handleAdd = (e: any) => {
    e.preventDefault();
    dispatch({ type: 'ADD' });
  };

  const files = useMemo(() => {
    return state.map((file: FileType) => {
      if (!file.isDeleted) {
        return (
          <FileItem
            key={file.id}
            id={file.id}
            initialValues={{ name: file.name, code: file.code }}
            dispatch={dispatch}
          />
        );
      }
      return;
    });
  }, [state]);

  return (
    <form>
      <label>Gist description</label>
      <input
        type="text"
        name="gistName"
        className="input"
        value={description}
        onChange={handleDescriptionInput}
      ></input>
      {files}
      <div id="page-footer">
        <div id="page-footer-right">
          <button className="btn" onClick={handleAdd}>
            Add file
          </button>
          <button
            className="btn btn--green"
            type="submit"
            onClick={handleSubmit}
          >
            {editMode ? 'Edit' : 'Create'} gist
          </button>
        </div>
      </div>
    </form>
  );
};

export default FileList;
