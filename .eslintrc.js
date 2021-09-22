//FIX DAT SHIT
module.exports = {
    root: true,
  
    rules: {
      'prettier/prettier': [
        'error',
        {
          bracketSpacing: true,
          jsxBracketSameLine: false,
          parser: 'typescript',
          printWidth: 80,
          semi: true,
          singleQuote: true,
          tabWidth: 2,
          trailingComma: 'all',
          useTabs: false,
          endOfLine: 'auto',
        },
      ],
    },
  };