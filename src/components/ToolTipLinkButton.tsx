import { Hotel } from 'lucide-react';
import Link from 'next/link';

import { Button } from './ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip';

interface Props {
  children: React.ReactNode;
  path: string;
  title: string;
}


export const ToolTipLinkButton = ({children, title, path}: Props) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button asChild variant="secondary" size="icon">
            <Link href={path}>
              {children}
            </Link>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{title}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
