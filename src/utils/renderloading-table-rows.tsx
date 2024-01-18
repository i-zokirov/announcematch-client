import { Skeleton, TableCell, TableRow } from '@mui/material';

export const renderLoadingTableRows = (rows: number, cols: number) => {
  const emptyRows = rows - 1;
  const emptyCells = Array(cols).fill(null);

  return (
    <>
      {Array.from(Array(emptyRows)).map((_, index) => (
        <TableRow key={index}>
          {emptyCells.map((_, index) => (
            <TableCell key={index}>
              <Skeleton />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );
};
