import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import codeTheme from '~/codeTheme';


type Props = {
  content: string;
  language: string;
  fileName?: string;
};

const CodeBlock = ({ content, language, fileName }: Props) => {
  return (
    <div className="code-block-wrapper">
      { fileName && <div className="code-block__header">{fileName}</div>}
    <SyntaxHighlighter language={language} style={codeTheme} showLineNumbers>
      {content}
    </SyntaxHighlighter>
    </div>
  );
};

export default CodeBlock;
