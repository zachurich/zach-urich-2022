import { PrismicRichText } from '@prismicio/react';
import type { RTNode } from '@prismicio/types';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx';
import javascript from 'react-syntax-highlighter/dist/esm/languages/prism/javascript';
import html from 'react-syntax-highlighter/dist/esm/languages/prism/markup';
import css from 'react-syntax-highlighter/dist/esm/languages/prism/css';
import dark from 'react-syntax-highlighter/dist/esm/styles/prism/coldark-dark';

const supportedLanguages = { javascript, jsx, html, css };

Object.entries(supportedLanguages).forEach(([name, lang]) => {
  SyntaxHighlighter.registerLanguage(name, lang);
});

const languageRegex = /^\/\/\s*([^\r\n]+)(?:\r?\n|$)/;

type Props = {
  content: [RTNode, ...RTNode[]];
};

export const RenderContent = ({ content }: Props) => {
  return (
    <PrismicRichText
      field={content}
      components={{
        preformatted(props) {
          const { children, node, text, ...rest } = props;
          const match = languageRegex.exec(node.text || '');
          const language = match?.[1];
          return true ? (
            <SyntaxHighlighter
              {...rest}
              children={String(text).replace(languageRegex, '')}
              language={language}
              style={dark}
            />
          ) : (
            <pre {...rest}>{children}</pre>
          );
        },
      }}
    />
  );
};
