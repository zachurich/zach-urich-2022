import { PrismicRichText } from '@prismicio/react';
import type { RTNode } from '@prismicio/types';

type Props = {
  content: [RTNode, ...RTNode[]];
};

export const RenderContent = ({ content }: Props) => {
  return <PrismicRichText field={content} />;
};
