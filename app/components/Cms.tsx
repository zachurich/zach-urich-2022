import { PrismicRichText } from '@prismicio/react';
import type { RTNode } from '@prismicio/types';
type Props = {
  content: [RTNode, ...RTNode[]];
};

export const RenderContent = ({ content }: Props) => {
  return (
    <PrismicRichText
      field={content}
      components={{
        preformatted({children, ...rest}) {
          return <pre {...rest}>{children}</pre>
        }
      }}
      // components={{
      //   preformatted(props) {
      //     const { children, node, text, ...rest } = props;
      //     const match = languageRegex.exec(node.text || '');
      //     const language = match?.[1];
      //     return true ? (
      //       <SyntaxHighlighter
      //         {...rest}
      //         children={String(text).replace(languageRegex, '')}
      //         language={language}
      //         style={dark}
      //       />
      //     ) : (
      //       <pre {...rest}>{children}</pre>
      //     );
      //   },
      // }}
    />
  );
};
