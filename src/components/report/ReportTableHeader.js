import PropTypes from 'prop-types';
// material
import { visuallyHidden } from '@mui/utils';
import { Box, Checkbox, TableRow, TableCell, TableHead, TableSortLabel } from '@mui/material';



export default function ReportTableHeader({ headers }) {
  console.log(headers);

  return (
    <TableHead>
      <TableRow>
        {headers.map((h, index) => <TableCell key={index}>
          {h}
        </TableCell>)}
      </TableRow>
    </TableHead>
  );
}
