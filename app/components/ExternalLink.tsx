import { ExternalLinkIcon } from 'lucide-react';

type Props = {
  href: string;
  children: React.ReactNode;
  className?: string;
};

export const ExternalLink = ({ className, href, children }: Props) => {
  return (
    <a
      className={className}
      target="_blank"
      rel="noopener noreferrer"
      href={href}
    >
      {children} <ExternalLinkIcon />
    </a>
  );
};
