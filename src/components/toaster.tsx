import { useTheme } from '@mui/material/styles';
import { alpha } from '@mui/system/colorManipulator';
import type { FC } from 'react';
import { Toaster as HotToaster } from 'react-hot-toast';

export const Toaster: FC = () => {
  const theme = useTheme();

  return (
    <HotToaster
      position="bottom-right"
      toastOptions={{
        style: {
          backdropFilter: 'blur(6px)',
          background: alpha(theme.palette.neutral[900], 0.8),
          color: theme.palette.common.white,
          boxShadow: theme.shadows[16]
        }
      }}
    />
  );
};
