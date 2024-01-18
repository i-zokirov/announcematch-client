import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
import {
  Alert,
  Card,
  Grid,
  IconButton,
  InputAdornment,
  OutlinedInput,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip
} from '@mui/material';
import dayjs from 'dayjs';
import { ChangeEvent, useEffect, useState } from 'react';
import { SeverityPill } from '../../../components/severitypill';
import { useUsersStore } from '../../../hooks/users/use-users-store';
import { getUserRoleColor } from '../../../utils/get-user-role-color';
import { renderLoadingTableRows } from '../../../utils/renderloading-table-rows';

const UsersPage = () => {
  const [searchInput, setSearchInput] = useState('');

  const { data, isLoading, isError, error, handleFiltersChange, handleRowsPerPageChange, handlePageChange, filters } = useUsersStore();

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
    <Card>
      <Grid
        container
        sx={{ margin: 2 }}
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
      </Grid>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Role</TableCell>
            <TableCell align="center">Created At</TableCell>
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
            data.data.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.firstName + ' ' + user.lastName}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <SeverityPill color={getUserRoleColor(user.role)}>{user.role}</SeverityPill>
                </TableCell>
                <TableCell align="center">{dayjs(user.createdAt).format('DD/MM/YYYY hh:mm')}</TableCell>
                <TableCell align="right">
                  <Tooltip title="See options">
                    <IconButton>
                      <MoreVertIcon />
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
                  No users found
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
  );
};

export default UsersPage;
