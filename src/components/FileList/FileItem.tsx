import React, { useState } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import codeTheme from '~/codeTheme';

type Props = {
  id: string;
  dispatch: any;
  initialValues: {
    name: string;
    code: string;
  };
};

const FileEdit = ({ initialValues, dispatch, id }: Props) => {
  const [code, setCode] = useState(initialValues.code);
  const [name, setName] = useState(initialValues.name);

  const handleCodeInput = (e: any) => {
    const updatedCode = e.target.value;
    setCode(e.target.value);
    dispatch({
      type: 'UPDATE',
      payload: {
        id: id,
        name: name,
        code: updatedCode,
      },
    });
  };

  const handleNameInput = (e: any) => {
    const updatedName = e.target.value;
    setName(updatedName);
    dispatch({
      type: 'UPDATE',
      payload: {
        id: id,
        name: updatedName,
        code: code,
      },
    });
  };

  const handleRemove = (e: any) => {
    e.preventDefault();
    dispatch({
      type: 'DELETE',
      payload: {
        id: id,
      },
    });
  };

  return (
    <div className="file-edit-wrapper">
      <label htmlFor="fileName">Filename including extension</label>
      <input
        type="text"
        name="fileName"
        className="input"
        value={name}
        onChange={handleNameInput}
      ></input>

      <label htmlFor="code">Your beautiful code</label>
      <div style={{ position: 'relative' }}>
        <SyntaxHighlighter
          language={'javascript'}
          style={codeTheme}
          showLineNumbers
        >
          {!!code ? code : ' '}
        </SyntaxHighlighter>
        <textarea
          name="code"
          className="code-textarea"
          value={code}
          onChange={handleCodeInput}
        />
      </div>
      <button
        className="btn btn--no-margin"
        onClick={handleRemove}
        style={{ marginTop: '2rem' }}
      >
        Remove file
      </button>
    </div>
  );
};

export default FileEdit;
