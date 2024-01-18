import Box from '@mui/material/Box';
import type { ListItemProps } from '@mui/material/ListItem';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import type { FC } from 'react';

type Direction = 'horizontal' | 'vertical';

interface PropertyListItemProps extends ListItemProps {
  align?: Direction;
  label: string;
  value?: string | any;
}

export const PropertyListItem: FC<PropertyListItemProps> = (props) => {
  const { align = 'vertical', children, disableGutters, value, label, ...other } = props;

  if (!value) return <></>;

  return (
    <ListItem
      sx={{
        px: disableGutters ? 0 : 3,
        py: 1.5
      }}
      {...other}
    >
      <ListItemText
        disableTypography
        primary={
          <Typography
            sx={{ minWidth: align === 'vertical' ? 'inherit' : 180 }}
            variant="subtitle2"
          >
            {label}
          </Typography>
        }
        secondary={
          <Box
            sx={{
              flex: 1,
              mt: align === 'vertical' ? 0.5 : 0
            }}
          >
            {children || (value && typeof value === 'string' && value.includes('\n')) ? (
              value.split('\n').map((v: string, i: number) => (
                <Typography
                  key={i}
                  color="text.secondary"
                  variant="body2"
                >
                  {v}
                </Typography>
              ))
            ) : (
              <Typography
                color="text.secondary"
                variant="body2"
              >
                {value}
              </Typography>
            )}
          </Box>
        }
        sx={{
          display: 'flex',
          flexDirection: align === 'vertical' ? 'column' : 'row',
          my: 0
        }}
      />
    </ListItem>
  );
};
