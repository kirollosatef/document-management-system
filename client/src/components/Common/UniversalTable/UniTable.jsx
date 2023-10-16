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
import dayjs from "dayjs";
import { sortTable } from "@src/utils/sortTable";
import EnhancedTableHead from "./EnhancedTableHead/EnhancedTableHead";
import { useTable } from "./useTable";
import HiddenPassword from "@components/Users/HiddenPassword/HiddenPassword";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPosition } from "@store/toolsbar/toolsbarSlice";

const UniTable = ({ data = [], headers, title, handleClick, selectedItem }) => {
  const dispatch = useDispatch();
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
  const cellContentHandler = ({ header, item }) => {
    if (header.id === "addedAt") {
      return dayjs(item[header.id]).format("DD-MM-YYYY");
    } else if (header.id === "password") {
      return <HiddenPassword password={item[header.id]} />;
    } else if (header.id === "creator") {
      return item[header.id].name
    } else {
      return item[header.id];
    }
  };
  // Change the position of the Toolbar accordion to the count of rows
  useEffect(() => {
    switch (rowsPerPage) {
      case 20:
        dispatch(setPosition("top"));
        break;

      default:
        dispatch(setPosition("bottom"));
        break;
    }
  }, [rowsPerPage]);

  return (
    <>
      <Typography
        variant="h6"
        color={theme.palette.secondary[400]}
        border={`1px solid ${theme.palette.secondary[400]}`}
        borderBottom={"unset"}
        borderRadius={"10px 10px 0 0"}
        width="fit-content"
        px={2}
        py={1}
        fontSize={12}>
        {title}
      </Typography>
      <Paper
        sx={{
          backgroundColor: theme.palette.primary[600],
          borderTop: `1px solid ${theme.palette.secondary[500]}`,
        }}>
        <TableContainer>
          <div style={{ overflowX: "auto", width: "100%" }}>
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
                    const isSelected = item._id === selectedItem?._id;

                    return (
                      <TableRow
                        key={item._id}
                        selected={isSelected}
                        hover
                        onClick={() => handleClick(item)}>
                        {headers.map((header) => (
                          <TableCell
                            key={header.id}
                            align="right"
                            sx={{ whiteSpace: "break-spaces" }}>
                            {cellContentHandler({ header, item })}
                          </TableCell>
                        ))}
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </div>
          <TablePagination
            component={"div"}
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            rowsPerPageOptions={data?.length >= 20 ? [5, 10, 20] : [5, 10]}
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
