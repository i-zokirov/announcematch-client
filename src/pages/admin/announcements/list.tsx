import SearchIcon from '@mui/icons-material/Search';
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';
import {
  Alert,
  Card,
  Grid,
  IconButton,
  InputAdornment,
  MenuItem,
  OutlinedInput,
  Stack,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Tooltip,
  Typography
} from '@mui/material';
import dayjs from 'dayjs';
import { ChangeEvent, useEffect, useState } from 'react';
import { usePublishedAnnouncementsStore } from '../../../hooks/announcements/use-published-announcements-store';
import { useCategories } from '../../../hooks/categories/use-categories';
import { renderLoadingTableRows } from '../../../utils/renderloading-table-rows';

const PublishedAnnouncements = () => {
  const [searchInput, setSearchInput] = useState('');

  const { data, isLoading, isError, error, handleFiltersChange, handleRowsPerPageChange, handlePageChange, filters, handleCategoryChange } =
    usePublishedAnnouncementsStore();
  const { categories } = useCategories();
  const onQueryChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchInput && searchInput.length >= 3) {
        handleFiltersChange({ search: searchInput });
      } else {
        handleFiltersChange({ search: '' });
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [searchInput]);

  return (
    <div>
      <Stack
        spacing={1}
        sx={{ my: 2 }}
      >
        <Typography variant="h4">{'Published Announcements'}</Typography>
      </Stack>
      <Card>
        <Grid
          container
          spacing={2}
          sx={{ m: 2 }}
        >
          <Grid
            item
            xs={12}
            md={6}
          >
            <OutlinedInput
              fullWidth
              value={searchInput}
              onChange={onQueryChange}
              placeholder={'Search users by name or email...'}
              startAdornment={
                <InputAdornment position="start">
                  <SvgIcon>
                    <SearchIcon />
                  </SvgIcon>
                </InputAdornment>
              }
            />
          </Grid>
          <Grid
            item
            xs={6}
            md={3}
          >
            <TextField
              name="category"
              label="Category"
              fullWidth
              select
              sx={{ height: '54px' }}
              value={filters.category_id}
              onChange={handleCategoryChange}
            >
              <MenuItem value={''}>All</MenuItem>
              {categories.map((category) => (
                <MenuItem
                  key={category.id}
                  value={category.id}
                >
                  {category.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Expires At</TableCell>
              <TableCell>Published At</TableCell>
              <TableCell>Categories</TableCell>
              <TableCell align="right" />
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
              renderLoadingTableRows(10, 5)
            ) : isError && error ? (
              <TableRow>
                <TableCell colSpan={5}>
                  <Alert
                    severity="error"
                    color="error"
                  >
                    {error.message as any}
                  </Alert>
                </TableCell>
              </TableRow>
            ) : data?.data && data.data.length ? (
              data.data.map((announcement) => (
                <TableRow key={announcement.id}>
                  <TableCell>{announcement.title}</TableCell>
                  <TableCell>{announcement.expiresAt ? dayjs(announcement.expiresAt).format('DD/MM/YYYY hh:mm') : 'No Expiry date'}</TableCell>
                  <TableCell>{dayjs(announcement.createdAt).format('DD/MM/YYYY hh:mm')}</TableCell>
                  <TableCell>{announcement.categories.map((category) => `#${category.name}`).join(', ')}</TableCell>
                  <TableCell align="right">
                    <Tooltip title="See details">
                      <IconButton>
                        <TrendingFlatIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5}>
                  <Alert
                    severity="info"
                    color="info"
                  >
                    No announcements found
                  </Alert>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={data?.totalCount ?? 0}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
          page={filters.page}
          rowsPerPage={filters.limit}
          rowsPerPageOptions={[10, 20, 50, 100]}
        />
      </Card>
    </div>
  );
};

export default PublishedAnnouncements;
