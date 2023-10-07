import {
  Table,
  TableRow,
  TableCell,
  TableContainer,
  TableBody,
  Typography,
  Paper,
  TablePagination,
  useTheme,
} from "@mui/material";
import { Link } from "react-router-dom";

// import EnhancedTableHead from "../../components/EnhancedTableHead/EnhancedTableHead";

import dayjs from "dayjs";
import { sortTable } from "@src/utils/sortTable";
import EnhancedTableHead from "./EnhancedTableHead/EnhancedTableHead";
import { useTable } from "./useTable";

/**
 * 
 * headers is an Array of objects
 * each object should contain id and label
 * for Example: headers = [{
    id:1,label:"name"
 * }]
 */

const UniTable = ({ data = [], headers, title }) => {
  const {
    page,
    rowsPerPage,
    order,
    orderBy,
    setRowsPerPage,
    setPage,
    onSortClick,
  } = useTable();
  const theme = useTheme();

  const onDelete = (id) => {
    console.log(id);
  };
  return (
    <>
      <Typography
        variant="h6"
        mt={4}
        // mb={1}
        color={theme.palette.secondary[400]}
        border={`1px solid ${theme.palette.secondary[400]}`}
        borderBottom={"unset"}
        borderRadius={"10px 10px 0 0"}
        width="fit-content"
        px={2}
        py={1}
        // borderRadius={20}
        fontSize={12}
      >
        {title}
      </Typography>
      <Paper
        sx={{
          backgroundColor: theme.palette.primary[600],
          borderTop: `1px solid ${theme.palette.secondary[500]}`,
        }}
      >
        <TableContainer>
          <Table
            xs={{
              "&td": {},
            }}
          >
            <EnhancedTableHead
              headers={headers}
              order={order}
              orderBy={orderBy}
              onSortClick={onSortClick}
            />
            <TableBody>
              {sortTable(data, order, orderBy)
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((item) => (
                  <TableRow key={item.ownerID}>
                    <TableCell align="right" dir="ltr">
                      <Link to={`/dashboard/users/${item.id}`}>{item.id}</Link>
                    </TableCell>

                    {/* <TableCell align="right">
                    <Link to={`/admin/users/1`}>
                      <Stack direction={"row"} alignItems={"center"} gap={2}>
                        <Avatar src={item.customer.avatar} />
                        <span> {item.customer.name} </span>
                      </Stack>
                    </Link>
                  </TableCell> */}
                    <TableCell align="right">{item.fullName}</TableCell>
                    <TableCell align="right">{item.username}</TableCell>
                    <TableCell align="right">{item.password}</TableCell>

                    <TableCell align="right">{item.department}</TableCell>
                    <TableCell align="right">
                      {dayjs(item.addedAt).format("D/M/YYYY")}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
          <TablePagination
            component={"div"}
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            rowsPerPageOptions={[5, 10, 20]}
            onPageChange={(e, page) => {
              setPage(page);
            }}
            onRowsPerPageChange={(e) => {
              setPage(0);
              setRowsPerPage(e.target.value);
            }}
            labelRowsPerPage={"الصفوف في كل صفحة"}
            labelDisplayedRows={({ from, to, count }) =>
              `عرض ${from} من ${to}  اجمالي  ${count}`
            }
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              color: "#777",
              "& .MuiTablePagination-actions": {
                display: "flex",
                flexDirection: "row",
              },
            }}
          />
        </TableContainer>
      </Paper>
    </>
  );
};

export default UniTable;
