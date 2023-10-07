import React, { useState } from "react";
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
  Checkbox,
} from "@mui/material";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import { sortTable } from "@src/utils/sortTable";
import EnhancedTableHead from "./EnhancedTableHead/EnhancedTableHead";
import { useTable } from "./useTable";

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

  const [selected, setSelected] = useState(null); // State for selected row

  const handleRowClick = (id) => {
    setSelected(id === selected ? null : id); // Toggle selection on row click
  };

  return (
    <>
      <Typography
        variant="h6"
        mt={4}
        color={theme.palette.secondary[400]}
        border={`1px solid ${theme.palette.secondary[400]}`}
        borderBottom={"unset"}
        borderRadius={"10px 10px 0 0"}
        width="fit-content"
        px={2}
        py={1}
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
          <Table>
            <EnhancedTableHead
              headers={headers}
              order={order}
              orderBy={orderBy}
              onSortClick={onSortClick}
            />
            <TableBody>
              {sortTable(data, order, orderBy)
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((item) => {
                  const isSelected = item.id === selected;

                  return (
                    <TableRow
                      key={item.id}
                      selected={isSelected}
                      hover
                      onClick={() => handleRowClick(item.id)}
                    >
                      {headers.map((header) => (
                        <TableCell key={header.id} align="right">
                          {header.id === "id" ? (
                            <Link to={`/dashboard/users/${item.id}`}>
                              {item[header.id]}
                            </Link>
                          ) : header.id === "addedAt" ? (
                            dayjs(item[header.id]).format("DD-MM-YYYY")
                          ) : (
                            item[header.id]
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  );
                })}
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
              marginRight: 4,
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
