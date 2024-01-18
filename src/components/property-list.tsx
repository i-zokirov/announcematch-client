import List from '@mui/material/List';
import type { FC, ReactNode } from 'react';

interface PropertyListProps {
  children: ReactNode;
}

export const PropertyList: FC<PropertyListProps> = (props) => {
  const { children } = props;

  return <List disablePadding>{children}</List>;
};
